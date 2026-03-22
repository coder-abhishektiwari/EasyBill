import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Modal, Image, ScrollView, SectionList, ActivityIndicator } from 'react-native';
import TicketCard from '../../components/TicketCard';
import { BillRecord } from '../../utils/types';
import { styles } from './style';
import { AppContext } from '../../../App';

const totalItems = (b: BillRecord) => b.items.reduce((s, i) => s + i.quantity, 0);

const groupHistoryByDate = (data: any) => {
    const groups = data.reduce((acc: { [x: string]: any[]; }, item: { date: any; }) => {
        const date = item.date;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(item);
        return acc;
    }, {});

    return Object.keys(groups).map(date => ({
        title: date,
        data: groups[date],
    }));
};

const HistoryScreen = () => {
    const { history, setHistory } = useContext(AppContext);
    const [selected, setSelected] = useState<BillRecord | null>(null);

    const fmt = (n: any) => Number(n).toFixed(2);

    return (
        <View style={styles.screen}>
            <SectionList
                sections={groupHistoryByDate(history)}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TicketCard height={100}>
                        <TouchableOpacity style={styles.innerCard} onPress={() => setSelected(item)}>
                            <View style={styles.cardLeft}>
                                <Text style={styles.cardTime}>{item.time}</Text>
                                <Text style={styles.cardItems}>{totalItems(item)} items</Text>
                            </View>
                            <View style={styles.verticalDivider} />
                            <View style={styles.cardRight}>
                                <Text style={styles.cardTotal}>💵 ₹{fmt(item.grandTotal)}</Text>
                                <Text style={styles.cardArrow}>›</Text>
                            </View>
                        </TouchableOpacity>
                    </TicketCard>
                )}
                // 🛠️ Ye hai naya part: Date Header dikhane ke liye
                renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionHeaderText}>{title}</Text>
                    </View>
                )}
                contentContainerStyle={{ padding: 12 }}
                stickySectionHeadersEnabled={true} // Date header top pe chipka rahega
            />

            {/* ── Detail Dialog ── */}
            <Modal visible={!!selected} transparent animationType="slide" onRequestClose={() => setSelected(null)}>
                <View style={styles.overlay}>
                    <View style={styles.dialog}>

                        {/* Dialog Header */}
                        <View style={styles.dialogHeader}>
                            <View>
                                <Text style={styles.dialogDate}>{selected?.date}  {selected?.time}</Text>
                                <Text style={styles.dialogSub}>Bill #{selected?.id.slice(-6)}</Text>
                            </View>
                            <TouchableOpacity onPress={() => setSelected(null)} style={styles.closeBtn}>
                                <Text style={styles.closeBtnText}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.dialogDivider} />

                        {/* Items List */}
                        <ScrollView style={styles.dialogScroll} showsVerticalScrollIndicator={false}>
                            {selected?.items.map((item) => (
                                <View key={item.barcode} style={styles.itemRow}>
                                    {/* Image */}
                                    <View style={styles.itemImgBox}>
                                        {item.image
                                            ? <Image source={{ uri: item.image }} style={styles.itemImg} resizeMode="contain" />
                                            : <Text style={styles.itemImgFallback}>📦</Text>
                                        }
                                    </View>

                                    {/* Details */}
                                    <View style={styles.itemDetails}>
                                        <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                                        <Text style={styles.itemMeta}>₹{fmt(item.price)} × {item.quantity}</Text>
                                    </View>

                                    {/* Amount */}
                                    <Text style={styles.itemAmt}>₹{fmt(item.price * item.quantity)}</Text>
                                </View>
                            ))}
                        </ScrollView>

                        <View style={styles.dialogDivider} />

                        {/* Totals */}
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Subtotal</Text>
                            <Text style={styles.totalValue}>₹{fmt(selected?.subtotal ?? 0)}</Text>
                        </View>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>GST (18%)</Text>
                            <Text style={styles.totalValue}>₹{fmt((selected?.grandTotal ?? 0) - (selected?.subtotal ?? 0))}</Text>
                        </View>
                        <View style={[styles.totalRow, styles.grandRow]}>
                            <Text style={styles.grandLabel}>Grand Total</Text>
                            <Text style={styles.grandValue}>₹{fmt(selected?.grandTotal ?? 0)}</Text>
                        </View>

                    </View>
                </View>
            </Modal>
        </View>
    );
};



export default HistoryScreen;