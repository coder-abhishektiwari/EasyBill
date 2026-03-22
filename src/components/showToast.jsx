import { Platform } from "react-native"
import { ToastAndroid } from "react-native"

export const showToast = (message) => {
    if (Platform.OS === "android") {
        ToastAndroid.showWithGravity(
                message,
                ToastAndroid.SHORT,
                ToastAndroid.TOP
        )
    }
}