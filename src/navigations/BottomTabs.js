import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import BillingScreen from "../screens/billing-screen/BillingScreen";
import HistoryScreen from "../screens/history-screen/HistoryScreen";
import SettingScreen from "../screens/setting-screen/SettingScreen";

const Tab = createBottomTabNavigator();
export const BottomTabs = () => {
    return (
        <Tab.Navigator initialRouteName="BillingScreen"
            screenOptions={{
                tabBarActiveTintColor: "black",
                headerShown: false,

            }}
        >
            <Tab.Screen name="Bill History" component={HistoryScreen}
                options={{
                    tabBarLabel: "Bill History",
                    headerShown: 'true',
                    headerStyle: {
                        elevation: 0 
                    },
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="history" size={size} color={color} />
                    ),
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontFamily: 'serif'
                    }
                }}
            />
            <Tab.Screen name="BillingScreen" component={BillingScreen}
                options={{
                    tabBarLabel: "Scan & Bill",
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="qrcode-scan" size={size + 4} color={color} />
                    )

                }}
            />
            <Tab.Screen name="Settings" component={SettingScreen}
                options={{
                    tabBarLabel: "Settings",
                    headerShown: 'true',
                    headerStyle: {
                        elevation: 0 
                    },
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="cog" size={size} color={color} />
                    ),
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontFamily: 'serif'
                    }
                }}

            />
        </Tab.Navigator>
    );

}
