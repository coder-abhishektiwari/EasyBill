import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../../../App';

const STORAGE_KEY = 'shop_settings';

export interface ShopSettings {
  shopName: string;
  shopAddress: string;
  shopPhone: string;
  shopGST: string;
  upiId: string;
}

interface SettingsScreenProps {
  navigation: any;
  initialSettings?: ShopSettings;
}

const defaultSettings: ShopSettings = {
  shopName: '',
  shopAddress: '',
  shopPhone: '',
  shopGST: '',
  upiId: '',
};

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation, initialSettings }) => {
  const { settings, setSettings } = useContext(AppContext);

  const update = (key: keyof ShopSettings, value: string) =>
    setSettings((prev: any) => ({ ...prev, [key]: value }));

  const save = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      Alert.alert('Saved', 'Settings saved successfully.');
    } catch {
      Alert.alert('Error', 'Could not save settings.');
    }
  };

  return (
    <>
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>

        <Text style={styles.sectionTitle}>Shop Info</Text>

        <Field label="Shop Name" value={settings?.shopName || ""} onChangeText={(v: string) => update('shopName', v)} placeholder="e.g. SuperMart" />
        <Field label="Address" value={settings?.shopAddress || ""} onChangeText={(v: string) => update('shopAddress', v)} placeholder="e.g. 123, Main Market, Delhi" multiline />
        <Field label="Phone" value={settings?.shopPhone || ""} onChangeText={(v: string) => update('shopPhone', v)} placeholder="10-digit number" keyboardType="phone-pad" maxLength={10} />
        <Field label="GSTIN" value={settings?.shopGST || ""} onChangeText={(v: string) => update('shopGST', v)} placeholder="e.g. 07AABCU9603R1ZX" autoCapitalize="characters" />
        <Field label="UPI ID" value={settings?.upiId || ""} onChangeText={(v: string) => update('upiId', v)} placeholder="e.g. shopname@upi" autoCapitalize="none" />

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Inventory</Text>

        <TouchableOpacity style={styles.navRow} onPress={() => navigation.navigate('ItemsList')}>
          <Text style={styles.navRowText}>View Added Items</Text>
          <Text style={styles.navArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveBtn} onPress={save}>
          <Text style={styles.saveBtnText}>Save Settings</Text>
        </TouchableOpacity>

      </ScrollView>
      <SafeAreaView style={styles.bottom}>
        <Text style={[styles.text, { color: '#333030' }]}>
          Developed by Abhishek Tiwari
        </Text>
      </SafeAreaView>
    </>
  );
};

// ─── Small reusable field ─────────────────────────────────────────────────────
const Field = ({ label, ...props }: any) => (
  <View style={styles.fieldWrap}>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={[styles.input, props.multiline && { height: 64, textAlignVertical: 'top' }]} placeholderTextColor="#bbb" {...props} />
  </View>
);

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: 'white' },
  content: { padding: 16, paddingBottom: 40 },

  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#999',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 10,
    marginTop: 4,
  },

  fieldWrap: { marginBottom: 12 },
  label: { fontSize: 13, color: '#555', marginBottom: 4, fontWeight: '500' },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111',
  },

  divider: { height: 1, backgroundColor: '#e8e8e8', marginVertical: 20 },

  navRow: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  navRowText: { fontSize: 14, color: '#111', fontWeight: '500' },
  navArrow: { fontSize: 20, color: '#bbb', lineHeight: 22 },

  saveBtn: {
    backgroundColor: '#1a73e8',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  saveBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },

  bottom: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontFamily: 'sans-serif-thin',
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: 'uppercase', 
    fontWeight: '300',
    color: '#888'
  }
});

export { STORAGE_KEY };
export default SettingsScreen;