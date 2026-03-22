import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import AppInput from "../../components/AppInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast } from "../../components/showToast";
import styles from "./style"

const AddItemScreen = ({ navigation, route }: any) => {
  const { scannedBarcode, editItem } = route.params || {};

  // editItem aaya hai to fields pre-fill ho jayenge
  const [itemName, setItemName] = useState(editItem?.name || "");
  const [itemCode, setItemCode] = useState(editItem?.barcode || scannedBarcode || "");
  const [itemPrice, setItemPrice] = useState(editItem?.price?.toString() || "");

  const isEditMode = !!editItem;

  const handleSave = async () => {
    if (!itemName.trim()) { showToast("Item name daalo ❌"); return; }
    if (!itemCode.trim()) { showToast("Barcode daalo ❌"); return; }
    if (!itemPrice.trim()) { showToast("Price daalo ❌"); return; }

    try {
      const existing = await AsyncStorage.getItem("MY_ITEMS");
      let items = existing ? JSON.parse(existing) : [];

      if (isEditMode) {
        // Edit mode — barcode match karke update karo
        items = items.map((i: any) =>
          i.barcode === editItem.barcode
            ? { ...i, name: itemName, barcode: itemCode, price: itemPrice }
            : i
        );
        showToast("Item updated ✅");
      } else {
        // Add mode — duplicate barcode check
        const duplicate = items.find((i: any) => i.barcode === itemCode);
        if (duplicate) { showToast("Ye barcode pehle se exist karta hai ❌"); return; }
        items.push({ name: itemName, barcode: itemCode, price: itemPrice });
        showToast("Item saved ✅");
      }

      await AsyncStorage.setItem("MY_ITEMS", JSON.stringify(items));
      navigation.goBack();
    } catch {
      showToast("Error saving item ❌");
    }
  };

  return (
    <View style={styles.screen}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{isEditMode ? "Edit Item" : "Add Item"}</Text>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Item Name</Text>
        <AppInput
          value={itemName}
          type="alphabet"
          placeholder="e.g. Himalaya Face Wash"
          onChangeText={setItemName}
        />

        <Text style={styles.label}>Barcode</Text>
        <AppInput
          value={itemCode}
          type="alphabet"
          placeholder="barcode here..."
          onChangeText={setItemCode}
          editable= {false}
        />
        <Text style={styles.hint}>Barcode can't be edit</Text>

        <Text style={styles.label}>Price (₹)</Text>
        <AppInput
          value={itemPrice}
          type="number"
          placeholder="e.g. 85"
          onChangeText={setItemPrice}
        />
      </ScrollView>
    </View>
  );
};



export default AddItemScreen;