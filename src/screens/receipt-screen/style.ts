import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  page: { alignItems: 'center', paddingVertical: 20, backgroundColor: '#e8e8e8' },
  receipt: { width: 300, backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 20 },
  shopName: { fontSize: 20, fontWeight: '800', textAlign: 'center', letterSpacing: 1, color: '#111', marginBottom: 4 },
  shopMeta: { fontSize: 11, textAlign: 'center', color: '#555', lineHeight: 16 },
  dashedLine: { borderStyle: 'dashed', borderWidth: 1, borderColor: '#bbb', marginVertical: 8 },
  solidLine: { borderTopWidth: 1, borderColor: '#bbb', marginVertical: 6 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between' },
  metaText: { fontSize: 10, color: '#444' },
  tableHeader: { flexDirection: 'row' },
  headerText: { fontSize: 11, fontWeight: '700', color: '#111' },
  tableRow: { flexDirection: 'row', paddingVertical: 3 },
  rowText: { fontSize: 11, color: '#222', lineHeight: 16 },
  colItem: { flex: 2.2 },
  colQty:  { flex: 0.6, textAlign: 'center' },
  colRate: { flex: 1.1, textAlign: 'right' },
  colAmt:  { flex: 1.1, textAlign: 'right' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 1 },
  totalLabel: { fontSize: 12, color: '#444' },
  totalValue: { fontSize: 12, color: '#444' },
  grandLabel: { fontSize: 14, fontWeight: '800', color: '#111' },
  grandValue: { fontSize: 14, fontWeight: '800', color: '#111' },
  itemCount: { fontSize: 11, color: '#555', textAlign: 'right', marginTop: 2 },
  qrBlock: { alignItems: 'center', marginVertical: 10 },
  qrLabel: { fontSize: 13, fontWeight: '700', color: '#111', marginTop: 8, letterSpacing: 0.5 },
  qrSub: { fontSize: 10, color: '#777', marginTop: 2 },
  footer: { fontSize: 12, textAlign: 'center', color: '#333', marginTop: 2 },
  footerSmall: { fontSize: 9, textAlign: 'center', color: '#aaa', marginTop: 6 },
  shareBtn: { marginTop: 20, backgroundColor: '#25D366', paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12 },
  shareBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', alignItems: 'center' },
  modalCard: { width: 300, backgroundColor: '#fff', borderRadius: 16, padding: 24 },
  modalTitle: { fontSize: 16, fontWeight: '700', color: '#111', marginBottom: 4 },
  modalSub: { fontSize: 12, color: '#888', marginBottom: 16 },
  inputRow: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ddd', borderRadius: 10, overflow: 'hidden', marginBottom: 20 },
  countryCode: { paddingHorizontal: 12, paddingVertical: 12, backgroundColor: '#f5f5f5', fontSize: 14, color: '#333', borderRightWidth: 1, borderColor: '#ddd' },
  input: { flex: 1, paddingHorizontal: 12, fontSize: 14, color: '#111' },
  downloadBtn: {
    backgroundColor: '#0052cc', // Professional Blue (Atlassian/Jira style)
    paddingVertical: 14,
    borderRadius: 8,
    marginVertical: 10,
    width: '90%', // Screen ke hisab se balanced
    alignSelf: 'center',
    // Shadow for Depth
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  downloadBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1.2, // Professional spacing
    textTransform: 'uppercase',
  },
});

export default styles;