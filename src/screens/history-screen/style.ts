import { StyleSheet } from "react-native";
import {ImageStyle} from 'react-native';

export const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: 'white' },

    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    empty: { alignItems: 'center', gap: 8 },
    emptyIcon: { fontSize: 48 },
    emptyText: { fontSize: 15, color: '#aaa' },

    sectionHeader: {
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 8,
        marginTop: 15,
        marginBottom: 5,
    },
    sectionHeaderText: {
        fontSize: 14,
        fontWeight: '800',
        color: '#666',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },

    verticalDivider: {
        width: 1,
        height: 60,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#ddd',
        marginHorizontal: 10,
    },
    
    innerCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        backgroundColor: 'transparent',
    },
    
    cardLeft: {
        flex: 1,
        justifyContent: 'center',
    },
    
    cardRight: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
    },

    cardDate: {
        fontSize: 15,
        fontWeight: '700',
        color: '#111',
        marginBottom: 2,
    },

    cardTime: {
        fontSize: 16,
        color: '#000000',
        fontWeight: 'bold',
    },

    cardItems: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
        backgroundColor: '#438ae72c',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        alignSelf: 'flex-start',
    },


    cardTotal: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1a73e8d7',
    },

    cardArrow: {
        fontSize: 18,
        color: '#ccc',
        marginTop: 2,
    },

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'flex-end',
    },
    dialog: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '85%',
    },
    dialogHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    dialogDate: { fontSize: 15, fontWeight: '700', color: '#111' },
    dialogSub: { fontSize: 12, color: '#999', marginTop: 2 },
    closeBtn: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#f2f2f2', justifyContent: 'center', alignItems: 'center' },
    closeBtnText: { fontSize: 13, color: '#666' },
    dialogDivider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 14 },
    dialogScroll: { maxHeight: 320 },

    itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 10 },
    itemImgBox: { width: 48, height: 48, borderRadius: 8, backgroundColor: '#f7f7f7', justifyContent: 'center', alignItems: 'center', flexShrink: 0 },
    itemImg: { width: '100%', height: '100%', borderRadius: 8 } as ImageStyle,
    itemImgFallback: { fontSize: 22 },
    itemDetails: { flex: 1 },
    itemName: { fontSize: 13, fontWeight: '600', color: '#111', marginBottom: 2 },
    itemMeta: { fontSize: 12, color: '#888' },
    itemAmt: { fontSize: 13, fontWeight: '700', color: '#333' },

    totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3 },
    totalLabel: { fontSize: 13, color: '#666' },
    totalValue: { fontSize: 13, color: '#666' },
    grandRow: { marginTop: 4 },
    grandLabel: { fontSize: 15, fontWeight: '700', color: '#111' },
    grandValue: { fontSize: 15, fontWeight: '700', color: '#1a73e8' },
});