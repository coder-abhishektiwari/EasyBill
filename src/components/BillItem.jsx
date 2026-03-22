import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BillItem = ({ item, onAdd, onRemove, onDelete }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleDelete = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.97, duration: 80, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start(() => onDelete(item.barcode));
  };

  const total = (item.price * item.quantity).toFixed(2);

  return (
    <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
      {/* Image / Placeholder */}
      <View style={styles.imageBox}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Icon name="package-variant" size={28} color="#b0b0b0" />
          </View>
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Top row: name + delete */}
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
            {item.name}
          </Text>
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={handleDelete}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Icon name="close" size={16} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Unit price */}
        <Text style={styles.unitPrice}>₹{item.price} per unit</Text>

        {/* Bottom row: qty selector + total */}
        <View style={styles.bottomRow}>
          <View style={styles.qtyRow}>
            <TouchableOpacity
              style={[styles.qtyBtn, item.quantity <= 1 && styles.qtyBtnDisabled]}
              onPress={() => onRemove(item.barcode)}
              activeOpacity={0.7}
            >
              <Icon
                name="minus"
                size={14}
                color={item.quantity <= 1 ? '#ccc' : '#1a73e8'}
              />
            </TouchableOpacity>

            <Text style={styles.qtyText}>{item.quantity}</Text>

            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => onAdd(item.barcode)}
              activeOpacity={0.7}
            >
              <Icon name="plus" size={14} color="#1a73e8" />
            </TouchableOpacity>
          </View>

          <Text style={styles.totalPrice}>₹{total}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginVertical: 5,
    borderRadius: 14,
    padding: 12,
    // Subtle shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },

  /* Image */
  imageBox: {
    width: 64,
    height: 64,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f7f7f7',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Content */
  content: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  name: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
    marginRight: 8,
    letterSpacing: -0.1,
  },
  deleteBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  unitPrice: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 8,
  },

  /* Bottom row */
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f7ff',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e8eeff',
  },
  qtyBtnDisabled: {
    borderColor: '#f0f0f0',
  },
  qtyText: {
    marginHorizontal: 12,
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    minWidth: 20,
    textAlign: 'center',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a73e8',
    letterSpacing: -0.3,
  },
});

export default BillItem;