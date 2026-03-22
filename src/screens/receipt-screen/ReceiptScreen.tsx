import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, Alert, ScrollView, Linking, Platform, PermissionsAndroid } from 'react-native';
import ViewShot from 'react-native-view-shot';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-qr-code';
import styles from './style';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const fmt = (n: number) => n;
const generateBillNo = () => 'BL' + Date.now().toString().slice(-8);
const nowString = () => {
  const d = new Date();
  return (
    d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) +
    '  ' +
    d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
  );
};

const ReceiptScreen = ({ route }: any) => {
  const { itemCart, totalCartValue } = route.params;

  const [shop, setShop] = useState({
    shopName: 'SuperMart',
    shopAddress: '',
    shopPhone: '',
    shopGST: '',
    upiId: '',
  });

  const receiptRef = useRef<any>(null);
  const billNo = useRef(generateBillNo()).current;
  const billDate = useRef(nowString()).current;

  useEffect(() => {
    AsyncStorage.getItem('shop_settings').then(val => {
      if (val) setShop(JSON.parse(val));
    });
  }, []);

  const subtotal = itemCart.reduce((s: number, i: any) => s + i.price * i.quantity, 0);
  const gstAmount = subtotal * 0.18;
  const grandTotal = subtotal + gstAmount;

  const downloadBill = async () => {
    try {
      if (!receiptRef.current) return;

      const uri = await receiptRef.current.capture();

      if (Platform.OS === 'android') {
        const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
        const hasPermission = await PermissionsAndroid.check(permission);

        if (!hasPermission && Platform.Version < 33) {
          const status = await PermissionsAndroid.request(permission);
          if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Required storage permission to save bill.');
            return;
          }
        }
      }

      // 3. Save to Gallery
      await CameraRoll.saveAsset(uri, { type: 'photo', album: 'EasyBill' });

      Alert.alert('Success', 'Bill is successfully saved in your Gallery ✅');

    } catch (error) {
      console.log('Download Error:', error);
      Alert.alert('Error', 'Unexpected error occured ❌');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>

      <ViewShot ref={receiptRef} options={{ format: 'jpg', quality: 0.95 }}>
        <View style={styles.receipt}>

          <Text style={styles.shopName}>{shop.shopName}</Text>
          {!!shop.shopAddress && <Text style={styles.shopMeta}>{shop.shopAddress}</Text>}
          {!!shop.shopPhone && <Text style={styles.shopMeta}>Ph: {shop.shopPhone}</Text>}
          {!!shop.shopGST && <Text style={styles.shopMeta}>GSTIN: {shop.shopGST}</Text>}


          <View style={styles.dashedLine} />

          <View style={styles.metaRow}>
            <Text style={styles.metaText}>Bill No : {billNo}</Text>
            <Text style={styles.metaText}>{billDate}</Text>
          </View>

          <View style={styles.solidLine} />

          <View style={styles.tableHeader}>
            <Text style={[styles.colItem, styles.headerText]}>ITEM</Text>
            <Text style={[styles.colQty, styles.headerText]}>QTY</Text>
            <Text style={[styles.colRate, styles.headerText]}>RATE</Text>
            <Text style={[styles.colAmt, styles.headerText]}>AMT</Text>
          </View>

          <View style={styles.solidLine} />

          {itemCart.map((item: any, idx: number) => (
            <View key={item.barcode + idx} style={styles.tableRow}>
              <Text style={[styles.colItem, styles.rowText]} numberOfLines={2}>{item.name}</Text>
              <Text style={[styles.colQty, styles.rowText]}>{item.quantity}</Text>
              <Text style={[styles.colRate, styles.rowText]}>{fmt(item.price)}</Text>
              <Text style={[styles.colAmt, styles.rowText]}>{fmt(item.price * item.quantity)}</Text>
            </View>
          ))}

          <View style={styles.dashedLine} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>₹{fmt(subtotal)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>GST (18%)</Text>
            <Text style={styles.totalValue}>₹{fmt(gstAmount)}</Text>
          </View>

          <View style={styles.solidLine} />

          <View style={styles.totalRow}>
            <Text style={styles.grandLabel}>GRAND TOTAL</Text>
            <Text style={styles.grandValue}>₹{fmt(grandTotal)}</Text>
          </View>

          <View style={styles.solidLine} />

          <Text style={styles.itemCount}>
            Total Items: {itemCart.reduce((s: number, i: any) => s + i.quantity, 0)}
          </Text>

          <View style={styles.dashedLine} />

          {!!shop.upiId && (
            <View style={styles.qrBlock}>
              <QRCode
                value={`upi://pay?pa=${shop.upiId}&pn=${encodeURIComponent(shop.shopName)}&am=${fmt(grandTotal)}&cu=INR`}
                size={110}
              />
              <Text style={styles.qrLabel}>Scan to Pay</Text>
              <Text style={styles.qrSub}>{shop.upiId}</Text>
            </View>
          )}

          <Text style={styles.footer}>Thank you for shopping!</Text>
          <Text style={styles.footer}>Visit again  ☺</Text>
          <Text style={styles.footerSmall}>*This is a computer generated bill*</Text>
        </View>
      </ViewShot>

      <TouchableOpacity
        style={styles.downloadBtn}
        onPress={downloadBill}
        activeOpacity={0.8}
      >
        <View style={styles.btnContent}>
          <Icon name="file-download-outline" size={22} color="#FFFFFF" style={styles.icon} />
          <Text style={styles.downloadBtnText}>DOWNLOAD BILL</Text>
        </View>
      </TouchableOpacity>

    </ScrollView>
  );
};

export default ReceiptScreen;