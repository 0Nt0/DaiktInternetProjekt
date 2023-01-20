import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

const CustomTextInput = ({ value, onChangeText, placeholder, title, secure }) => (
    <View style={styles.inputContainer}>
        <Text style={styles.title}>{title}:</Text>
        <TextInput
            style={styles.input}
            value={value}
            placeholder={placeholder}
            placeholderTextColor='#DADADA'
            onChangeText={onChangeText}
            secureTextEntry={secure}
        />
    </View>
);

const styles = StyleSheet.create({
    input: {
        padding: 7,
        color: 'black',
        backgroundColor: '#ffffff',
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
    },
    title: {
        color: 'black',
        paddingBottom: 5,
        fontSize: 16,
        textAlign: 'left',
        fontWeight: 'bold',
    },
});

export default CustomTextInput;
