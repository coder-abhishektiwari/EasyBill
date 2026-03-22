const { StyleSheet } = require("react-native");

const style = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f5f5f5' },

  header: {
    backgroundColor: "white",
    position: "relative",
    alignItems: "flex-end",
    elevation: 10,
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  headerTitle: { fontSize: 16, fontWeight: '700', color: '#111' },
  cancelBtn: { paddingVertical: 6, paddingHorizontal: 4 },
  cancelText: { fontSize: 14, color: '#888' },
  saveBtn: { backgroundColor: '#1a73e8', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 8 },
  saveText: { fontSize: 14, fontWeight: '700', color: '#fff' },

  content: { padding: 16, gap: 4 },
  label: { fontSize: 12, fontWeight: '600', color: '#666', marginBottom: 4, marginTop: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
  hint: { fontSize: 11, color: '#aaa', marginTop: 4 },

});

export default style;