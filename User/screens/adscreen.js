import { StyleSheet, TouchableOpacity, View, Text, KeyboardAvoidingView } from "react-native";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { FlatList } from "react-native";
import {ref, set, get, child, onValue} from "firebase/database";
import { useRoute } from "@react-navigation/native";

import { db } from "../config";


export default function AdScreen({navigation}) {
    const auth = getAuth();

    const route = useRoute();
    const [ad, setAd] = useState([]);

    const reference = ref(db, 'TestInfo/');
    
    const handleSignOut = () => {
        auth.signOut()
        .then(() =>{
            navigation.navigate("Login")
        })
        .catch(error => alert(error.message))
    }

    useEffect(() => {
        onValue(reference, (snapshot) => {
                setAd([]);
                snapshot.forEach((element) => {
                    const readObj = {
                        description: element.val().description,
                        id: element.val().id,
                        name: element.val().name,
                        price: element.val().price,
                    };
                    setAd(emptyArray => [...emptyArray, readObj]);
                })
                console.log(JSON.stringify(ad));
            })
    }, []);

    return(
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.text}>E-mail: {auth.currentUser?.email}</Text>

            <FlatList
                keyExtractor={(item) => item.id}
                data={ad}
                renderItem={({item}) => (
                    <View style={styles.listStyle}>
                            <Text style={styles.textTitle}>{item.name}, {item.price}$ </Text>         
                            <Text style={styles.descriptionText}>{item.description}</Text>
                                <TouchableOpacity
                                style={styles.button}
                                onPress={ () => {navigation.navigate("OrderScreen", {data : item.id});}}
                                >
                                    <Text>Pirkti</Text>
                                </TouchableOpacity>
                    </View>
  


                )}/>

            <TouchableOpacity 
            onPress={handleSignOut}
            style={styles.logoutButton}>
                <Text>Sign Out</Text>
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
    text: {
        marginTop: 30,
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',

    },
    descriptionText:{
        marginLeft: 40,
        color: 'black',
        fontSize: 12,
        fontWeight: 'bold',
    },
    inputContainer: {
        width: '60%',
        fontSize: 14,
        color: "red",
        backgroundColor: "white",
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginTop: 20,
        
    },
    textTitle: {
        
        color: 'orange',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 40,

    },
    buttonView: {
        flexdirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'right',
    },
    button: {
        backgroundColor: 'blue',
        width: 60,
        height:  25,
        alignItems: 'center',
        marginTop: 3,
        marginBottom: 3,
        borderRadius: 3,
        borderColor: 'black',
        borderWidth: 1,
        marginLeft: 40,
        
    },
    listStyle: {
        height: 120,
        width: 300,
        borderWidth:5,
        borderColor:'orange',
        backgroundColor: 'gainsboro',   
        justifyContent: 'center',
        alignContent: 'center',
        margin:12,
        borderRadius: 15,
        borderWidth: 3,
        },
    logoutButton: {
        backgroundColor: 'orange',
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        padding: 20,
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 3,
        marginBottom: 30,
        },
    buyButton: {
        backgroundColor: 'orange',
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        padding: 20,
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 3,
        marginBottom: 30,
    },
});