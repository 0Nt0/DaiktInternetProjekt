import { Alert, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Animated, FlatList } from "react-native";
import { useEffect, useState,useRef } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from "react";
import MaskedView from '@react-native-masked-view/masked-view';
import {auth} from '../config';
import { getAuth } from "firebase/auth";
import {ref, set, get, child, onValue} from "firebase/database";
import { useRoute } from "@react-navigation/native";
import { db } from "../config";



export default function MaintScreen({navigation}) {

    const auth = getAuth();

    const route = useRoute();
    const [ad, setAd] = useState([]);

    const reference = ref(db, 'OrderInfo/');
    


    useEffect(() => {
        onValue(reference, (snapshot) => {
                setAd([]);
                snapshot.forEach((element) => {
                    const readObj = {
                        description: element.val().description,
                        id: element.val().id,
                        userCity: element.val().userCity,
                        userCode: element.val().userCode,
                        userHouse: element.val().userHouse,
                        userStreet:element.val().userStreet,
                        user:element.val().user,
                        driverID:element.val().driverID
                    };
                    setAd(emptyArray => [...emptyArray, readObj]);
                })
                console.log(JSON.stringify(ad));
            })
    }, []);

    return(
        <SafeAreaView style={styles.ViewStyle}>
                 <MaskedView maskElement={<Text style={[styles.LogInText,{backgroundColor:'transparent'}]}>
                     All orders that don't have drivers asighned
                 </Text>}>
              <LinearGradient
                start={{x:0,y:0}}
                end={{x:1,y:1}}
                colors={['#FF4B25','#FFFB01']}>
                 <Text style={[styles.LogInText,{opacity:0}]}>
                 All orders that don't have drivers asighned
                 </Text>
              </LinearGradient>
            </MaskedView>

            <FlatList
                keyExtractor={(item) => item.id}
                data={ad}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={()=>navigation.navigate('Order',item)}>
                    <View >
                    <Text style={{color:'#FF4B25'}}>_______________________________________</Text>
                            <Text>id= {item.id}</Text>
                           
                            <Text>City= {item.userCity}</Text>
                            <Text>Postal code= {item.userCode} </Text>
                            <Text>House code= {item.userHouse}</Text>
                            <Text>Street= {item.userStreet}</Text>
                            <Text>User= {item.user}</Text>
                            <Text>Driver= {item.driverID}</Text>
                            <Text style={{color:'#FF4B25'}}>_______________________________________</Text>
                    </View>
                    </TouchableOpacity>
  


                )}/>

        </SafeAreaView >
    )


};
const styles = StyleSheet.create({
    ViewStyle:{
        flex: 1,
        backgroundColor: '#fff',
        alignContent:'center',
        alignItems:'center'
    },
    text: {
        color: 'blue',
        fontSize: 20,
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
    button: {
        backgroundColor: 'blue',
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    listStyle: {
        height:'90%',
        width: 300,
        borderWidth:5,
        borderColor:'#FF4B25',
        backgroundColor: '#ffffff',    
        margin:12
        },
        LogInText:{
            fontSize:20,
            marginTop:5,
            marginLeft:5,
            fontWeight: 'bold'
        },
    

 });