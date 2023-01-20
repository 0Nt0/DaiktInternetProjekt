import { StyleSheet, TouchableOpacity, View, Text, TextInput, KeyboardAvoidingView, Linking, Alert } from "react-native";
import {ref, set, get, child, onValue} from "firebase/database";
import React, { useState } from "react";
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import { db } from "../config";
import { auth } from "../config";
import { useRoute } from "@react-navigation/native";


export default function OrderAd({navigation}) {
    //const [isActiveState, setIsActiveState] = useState(false);

    const route = useRoute();

    const [userCity, setUserCity] = useState('');
    const [userStreet, setStreet] = useState('');
    const [userHouse, setHouse] = useState('');
    const [userCode, setUserCode] = useState('');
    const [purchaseID, setPurchaceID] = useState(uuidv4());
    const [itemID, setItemID] = useState(route.params.data);
    const [driverID, setDriverID] = useState('');
    console.log(itemID);
    

    sendOrder = () => {
       
       set(ref(db, 'OrderInfo/'+purchaseID), {
            userCity: userCity,
            userStreet: userStreet,
            userHouse: userHouse,
            userCode: userCode,
            id: purchaseID,
            user: auth.currentUser.email,
            itemID: itemID,
            driverID: driverID,

        }).then(()=> {
            alert("Data is in!")
        });
        
        setUserCity('');
        setStreet('');
        setHouse('');
        setUserCode('');
        setPurchaceID('');
        setDriverID('');
    }       

    return(
        <KeyboardAvoidingView style={styles.container}>
            
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Miestas"
                        value={userCity}
                        onChangeText={text => setUserCity(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Gatve:"
                        value={userStreet}
                        onChangeText={text => setStreet(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Namo numeris:"
                        value={userHouse}
                        onChangeText={text => setHouse(text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Pasto kodas:"
                        value={userCode}
                        onChangeText={text => setUserCode(text)}
                        
                    />

                </View>

            
                <TouchableOpacity
                style={styles.inputButton}
                onPress={sendOrder}
                >
                <Text>Irasyti</Text>

                </TouchableOpacity>
                <TouchableOpacity
                style={styles.goBackButton}
                onPress={() => navigation.goBack()}
                >
                <Text>Back</Text>

                </TouchableOpacity>
        </KeyboardAvoidingView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        width: '80%',
        fontSize: 14,
        color: "red",
        backgroundColor: "white",
        paddingHorizontal: 5,
        paddingVertical: 20,
        marginTop: 30,
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1,
        
    },
    inputButton: {
        backgroundColor: 'white',
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        padding: 20,
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 3,
    },
    goBackButton: {
        backgroundColor: 'orange',
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        padding: 20,
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 3,
    },
});