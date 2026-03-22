import { StyleSheet, TextInput, View } from "react-native";

const AppInput = ({value, placeholder, onChangeText, type, editable = true}) => {
    return (
        <View style={style.border}>
            <TextInput 
                value={value}
                style={[style.input, {color: "black", textDecorationLine: editable? 'none' :'line-through'}]}
                onChangeText={onChangeText}
                placeholder={placeholder}
                keyboardType={type=="number" ? "numeric" : "default"}
                placeholderTextColor="gray" 
                editable={editable}/>
        </View>
    )
}

const style = StyleSheet.create({
    border: {
        width: "100%",
        padding: 10,
        margin: 10,
        borderBottomColor: "black",
        borderBottomWidth: 2,
    },

    input: {
        width: "100%",
        fontSize: 20,
    }
});

export default AppInput;