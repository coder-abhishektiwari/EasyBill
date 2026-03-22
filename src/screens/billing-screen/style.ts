import { StyleSheet } from "react-native";


const style = StyleSheet.create({
    main: {
        display: 'flex',
        flex: 1,
        backgroundColor: "black"
    },

    topContainer: {
        backgroundColor: "black",
        alignContent: "center",
        justifyContent: "center",
        overflow: 'hidden',
    },

    placeholderContainer: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tapText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    subTapText: {
        fontSize: 14,
        color: 'gray',
    },

    bottomContainer: {
        backgroundColor: "white",
        overflow: "hidden",
        paddingVertical: 10,
        marginTop: -15
    },

    containerHandle: {
        backgroundColor: '#5990b423',
        alignItems: "center",
        alignSelf: 'center',
        borderRadius: 20,
        marginBottom: 5,
        paddingHorizontal: 20,
        paddingVertical: 2,
    },

    cartHeader: {
        fontSize: 17,
        fontWeight: 'bold',
        color: "#1a73e8"
    },

    wrapper: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        padding: 16,
        paddingBottom: 14,
    },

    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
    },
    itemCount: {
        fontSize: 12,
        color: '#999',
        marginBottom: 2,
    },
    totalAmount: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1a1a1a',
        letterSpacing: -0.5,
    },

    actions: {
        flexDirection: 'row',
        gap: 10,
    },

    clearBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 16,
        paddingVertical: 13,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#F09595',
        backgroundColor: '#FCEBEB',
    },
    clearBtnText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#A32D2D',
    },

    checkoutBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: '#1a73e8',
        paddingVertical: 13,
        borderRadius: 12,
    },
    checkoutBtnText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#fff',
    },

});

export default style;