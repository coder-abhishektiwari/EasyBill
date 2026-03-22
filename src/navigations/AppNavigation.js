const { createStackNavigator } = require("@react-navigation/stack");
import { NavigationContainer } from "@react-navigation/native";
import { BottomTabs } from "./BottomTabs";
import ReceiptScreen from "../screens/receipt-screen/ReceiptScreen";
import AddItemScreen from "../screens/add-item-screen/AddItemScreen";
import ItemsListScreen from "../screens/item-list-screen/ItemListScreen";
import { TouchableOpacity } from "react-native";

const Stack = createStackNavigator();

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="BottomTabs" component={BottomTabs} options={{ headerShown: false }} />
                <Stack.Screen name="ReceiptScreen" component={ReceiptScreen} options={{ headerShown: false }} />
                <Stack.Screen name="AddItemScreen" component={AddItemScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ItemsList" component={ItemsListScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;