import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: 'white' },

  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { alignItems: 'center', gap: 8 },
  emptyIcon: { fontSize: 48 },
  emptyText: { fontSize: 15, color: '#aaa' },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    gap: 12,
  },
  imgBox: {
    width: 56,
    height: 56,
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  img: { width: '100%', height: '100%', borderRadius: 10 },

  details: { flex: 1 },
  name: { fontSize: 14, fontWeight: '600', color: '#111', marginBottom: 2 },
  barcode: { fontSize: 11, color: '#aaa', marginBottom: 3 },
  price: { fontSize: 14, fontWeight: '700', color: '#1a73e8' },

  editBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#E8F0FE',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  deleteBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FCEBEB',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },

  footer: {
    padding: 14,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  footerText: { fontSize: 13, color: '#999' },
});

export default styles;