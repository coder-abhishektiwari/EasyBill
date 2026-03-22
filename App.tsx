import 'react-native-gesture-handler';
import React, { createContext, useEffect, useState } from 'react';
import { ActivityIndicator, Image, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import AppNavigation from "./src/navigations/AppNavigation";
import Orientation from 'react-native-orientation-locker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext<any>(null);

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [items, setItems] = useState([]);
  const [history, setHistory] = useState([]);
  const [settings, setSettings] = useState({});
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {

        const [savedItems, savedHistory, savedSettings] = await Promise.all([
          AsyncStorage.getItem('MY_ITEMS'),
          AsyncStorage.getItem('bill_history'),
          AsyncStorage.getItem('shop_settings')
        ]);

        if (savedItems) setItems(JSON.parse(savedItems));
        if (savedSettings) setSettings(JSON.parse(savedSettings));
        if (savedHistory) setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error("Data is not loaded due to", error);
      } finally {
        setIsAppReady(true);
      }
    };


    Orientation.lockToPortrait();
    loadData();
  }, []);

  if (!isAppReady) {
  return (
    <View
      style={
        styles.container}
    >
      <View style={styles.center}>
        <ActivityIndicator size="large" color={isDarkMode ? 'white' : 'black'} />
      </View>
    </View>
  );
}


  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <AppContext.Provider value={{ items, setItems, history, setHistory, settings, setSettings }}>
        <AppNavigation />
      </AppContext.Provider>
    </>
  );
}







const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 160,
    height: 160,
  },

  bottom: {
    alignItems: 'center',
    paddingBottom: 30,
  },

  text: {
    fontSize: 14,
    letterSpacing: 1,
    fontWeight: 'bold',
  },
});


export default App;
