import React, { useState, useCallback, useContext, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { AppContext } from '../../../App';

const ItemsListScreen = ({ navigation }: any) => {
  const {items, setItems} = useContext(AppContext);
  const isFocused = useIsFocused();

  // Reload every time screen is focused
  useEffect(() => {
    if (isFocused) {
      AsyncStorage.getItem('MY_ITEMS').then(val => {
        setItems(val ? JSON.parse(val) : []);
      });
    }
  }, [isFocused]);

  const deleteItem = (barcode: string) => {
    Alert.alert('Delete Item', 'Are you sure?', [
      { text: 'Cancel' },
      {
        text: 'Delete', style: 'destructive', onPress: async () => {
          const updated = items.filter((i: any) => i.barcode !== barcode);
          setItems(updated);
          await AsyncStorage.setItem('MY_ITEMS', JSON.stringify(updated));
        }
      }
    ]);
  };

  return (
      <View style={styles.screen}>
        <FlatList
          data={items}
          keyExtractor={item => item.barcode}
          contentContainerStyle={items.length === 0 ? styles.emptyContainer : { padding: 12 }}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>📦</Text>
              <Text style={styles.emptyText}>No items added yet</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              {/* Image */}
              <View style={styles.imgBox}>
                {item.image
                  ? <Image source={{ uri: item.image }} style={styles.img} resizeMode="contain" />
                  : <Icon name="package-variant" size={26} color="#bbb" />
                }
              </View>

              {/* Details */}
              <View style={styles.details}>
                <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.barcode}>#{item.barcode}</Text>
                <Text style={styles.price}>₹{Number(item.price).toFixed(2)}</Text>
              </View>

              {/* Edit */}
              <TouchableOpacity
                onPress={() => navigation.navigate('AddItemScreen', { editItem: item })}
                style={styles.editBtn}>
                <Icon name="pencil-outline" size={18} color="#1a73e8" />
              </TouchableOpacity>

              {/* Delete */}
              <TouchableOpacity onPress={() => deleteItem(item.barcode)} style={styles.deleteBtn}>
                <Icon name="trash-can-outline" size={18} color="#A32D2D" />
              </TouchableOpacity>
            </View>
          )}
        />

        {/* Item count footer */}
        {items.length > 0 && (
          <View style={styles.footer}>
            <Text style={styles.footerText}>{items.length} items in database</Text>
          </View>
        )}
      </View>
  );
};



export default ItemsListScreen;