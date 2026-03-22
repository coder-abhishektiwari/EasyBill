import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, ToastAndroid, TouchableHighlight, TouchableOpacity, View } from "react-native";
import style from "./style";
import { useContext, useEffect, useState } from "react";
import Sound from "react-native-sound";
import { Camera } from 'react-native-camera-kit';
import BarcodeMask from "react-native-barcode-mask";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast } from "../../components/showToast";
import BillItem from "../../components/BillItem";
import { useIsFocused } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BillRecord, CartItem } from "../../utils/types";
import { AppContext } from "../../../App";

const BillingScreen = ({ navigation }: any) => {
    const isFocused = useIsFocused();
    const [scannedData, setScannedData] = useState('');
    const [itemCart, setItemCart] = useState<CartItem[]>([]);
    const [isFullView, setIsFullView] = useState(false);
    const [isCameraActive, setIsCameraActive] = useState(true);
    const [timerId, setTimerId] = useState<any>(null);
    const { history, setHistory } = useContext(AppContext);
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const totalCartValue = itemCart.reduce((total, item) => {
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 0;

        return total + (price * quantity);
    }, 0);

    const findItemByBarCode = async (barcode: any) => {
        try {
            const savedItems = await AsyncStorage.getItem('MY_ITEMS');
            const items = savedItems ? JSON.parse(savedItems) : [];

            const item = items.find((i: any) => i.barcode === barcode);

            if (item) {
                setItemCart((prevCart) => {
                    const isExist = prevCart.find(i => i.barcode === barcode);
                    if (isExist) {
                        return prevCart.map(i => i.barcode === barcode ? { ...i, quantity: i.quantity + 1 } : i);
                    }
                    return [...prevCart, { ...item, quantity: 1, barcode: barcode }];
                });
                showToast("Item added in Cart. ")
                playBeep('beep.mp3');
            } else {
                playBeep('warning.mp3');
                Alert.alert(
                    "Unknown Barcode",
                    "The item is not in the database. Do you want to add it?",
                    [
                        { text: "No" },
                        { text: "Add Item", onPress: () => navigation.navigate("AddItemScreen", { scannedBarcode: barcode }) }
                    ]
                );
            }
        } catch (error) {
            console.log("Error finding item", error);
        }
    }

    const playBeep = (file: String) => {
        const beep = new Sound(file, Sound.MAIN_BUNDLE, (error) => {
            if (!error) {
                beep.play(() => beep.release());
            }
        })
    }
    const onScan = (event: any) => {
        startInactivityTimer();
        const data = event.nativeEvent.codeStringValue;
        setScannedData(data);
        console.log("Scan hua data:", data);
        findItemByBarCode(data)
    }

    const increaseQty = (barcode: String) => {
        setItemCart(prevCart =>
            prevCart.map(item =>
                item.barcode === barcode ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQty = (barcode: String) => {
        setItemCart(prevCart =>
            prevCart.map(item =>
                item.barcode === barcode && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const deleteItem = (barcode: String) => {
        setItemCart(prevCart => prevCart.filter(item => item.barcode !== barcode));
    };

    const onCheckout = async () => {
        if (itemCart.length === 0) return;
        setIsCheckingOut(true);

        const subtotal = itemCart.reduce((s, i) => s + i.price * i.quantity, 0);
        const newRecord: BillRecord = {
            id: Date.now().toString(),
            date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }),
            items: itemCart,
            subtotal,
            grandTotal: subtotal * 1.18,
        };

        try {
            const updatedHistory = [newRecord, ...(history || [])];
            setHistory(updatedHistory);

            await AsyncStorage.setItem('bill_history', JSON.stringify(updatedHistory));

            navigation.navigate('ReceiptScreen', {
                itemCart: itemCart,
                totalCartValue: totalCartValue,
            });

        } catch (error) {
            console.error("error occured:", error);
            Alert.alert("Error", "Bill can't be saved.");
        } finally {
            setIsCheckingOut(false);
        }
    }

    useEffect(() => {
        startInactivityTimer();
        return () => clearTimeout(timerId);
    }, []);

    const startInactivityTimer = () => {
        if (timerId) clearTimeout(timerId);

        const id = setTimeout(() => {
            setIsCameraActive(false);
            showToast("Scanner turned off to save battery.")
        }, 60000);

        setTimerId(id);
    }
    return (
        <View style={style.main}>

            {/* scanner */}
            <View style={[style.topContainer, { flex: isFullView ? 0 : 0.4 }]}>
                {isFocused && !isFullView && (
                    isCameraActive ?
                        <>
                            <Camera
                                style={StyleSheet.absoluteFill}
                                scanBarcode={true}
                                onReadCode={onScan}
                                showFrame={false}
                            />
                            <BarcodeMask edgeColor={'#62B1F6'} showAnimatedLine={true} />
                        </>
                        :
                        <TouchableOpacity
                            style={style.placeholderContainer}
                            onPress={() => {
                                setIsCameraActive(true);
                                startInactivityTimer(); // Dobara timer shuru karo
                            }}
                        >
                            <Icon name="barcode-scan" size={50} color="#1a73e8" />
                            <Text style={style.tapText}>Scanner Paused</Text>
                            <Text style={style.subTapText}>Tap to resume scanning</Text>
                        </TouchableOpacity>
                )
                }

            </View>

            {/* bottom container */}
            <View style={[style.bottomContainer, { flex: isFullView ? 1 : 0.6, borderTopEndRadius: isFullView ? 0 : 30, borderTopStartRadius: isFullView ? 0 : 30, }]}>

                <TouchableHighlight onPress={() => setIsFullView(!isFullView)} style={style.containerHandle}>
                    <Icon
                        name={isFullView ? "chevron-down" : "chevron-up"}
                        size={30}
                        color="#1a73e8"
                        style={{ alignSelf: 'center' }}
                    />
                </TouchableHighlight>

                {/* scanned items */}
                <View style={{ flexDirection: 'row', alignSelf: 'center', marginVertical: 10 }}>
                    <Icon name="cart" size={20} color="#1a73e8" />
                    <Text style={style.cartHeader}>Item Cart </Text>
                </View>

                {/* cart items */}
                <FlatList
                    data={itemCart}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <BillItem
                            item={item}
                            onAdd={increaseQty}
                            onRemove={decreaseQty}
                            onDelete={deleteItem} />}
                    ListEmptyComponent={() => (
                        <View style={{ padding: 20, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <Text style={{ color: 'gray', fontSize: 40 }}>🛒</Text>
                            <Text style={{ color: 'gray' }}> Cart is Empty.</Text>
                            <Text style={{ color: 'gray', fontSize: 20 }}>Scan to add items.</Text>
                        </View>
                    )} />

                {itemCart.length > 0 && (
                    <View style={style.wrapper}>

                        <View style={style.summaryRow}>
                            <View>
                                <Text style={style.itemCount}>{itemCart.length} items</Text>
                                <Text style={style.totalAmount}>₹{totalCartValue.toFixed(2)}</Text>
                            </View>
                        </View>

                        <View style={style.actions}>
                            <TouchableOpacity style={style.clearBtn} onPress={() => setItemCart([])}>
                                <Icon name="trash-can-outline" size={16} color="#A32D2D" />
                                <Text style={style.clearBtnText}>Clear</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={style.checkoutBtn} onPress={onCheckout}>
                                {!isCheckingOut ?
                                    <>
                                        <Icon name="shopping-outline" size={17} color="#fff" />
                                        <Text style={style.checkoutBtnText}> Proceed to Checkout </Text>
                                    </>
                                    : <>
                                        <ActivityIndicator size="small" color="#fff" />
                                        <Text style={style.checkoutBtnText}>Checking Out</Text>
                                    </>
                                }
                            </TouchableOpacity>
                        </View>

                    </View>
                )}
            </View>
        </View>
    );
}

export default BillingScreen;