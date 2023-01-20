import { Alert, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Animated, FlatList } from "react-native";
import { useEffect, useState,useRef } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from "react";
import {ref, set, get, child, onValue, remove, update} from "firebase/database";
import MaskedView from '@react-native-masked-view/masked-view';
import {auth} from '../config';
import { NavigationContainer, useLinkProps, useRoute } from '@react-navigation/native';
import {firebase} from '../config'
import { db } from "../config";
import {v4 as uuidv4} from 'uuid';

import {signInWithEmailAndPassword} from "firebase/auth";



export default function AddDriverToOrderScreen({navigation}) {

    const [Driverlist, setDriverList]= useState([]);
    const [OrderID, setOrderID] = useState(uuidv4());

    const route= useRoute();
    const refer= firebase.firestore().collection('drivers');
    

    useEffect(()=>{
            refer.onSnapshot(
                querySnapshot=>{
                    const Driverlist=[]
                    querySnapshot.forEach((doc)=>{
                        const {email}=doc.data()
                        Driverlist.push({
                            id:doc.id,
                            email
                        })
                    })
                    setDriverList(Driverlist)
                }
            )

    },[]);

    const AddDriver=(x)=>{
        set(ref(db,'DriversOrders/'+OrderID),
        {
            id:OrderID,
            usersOrderId: route.params.id,
            driver: x
        }).then(()=> {alert("Added driver")
        navigation.navigate('main')
    });
    }
    // const DeleteOrder=()=>{
    //     remove(ref(db,'OrderInfo/'+route.params.id)).then(()=>alert("Removed order from no driver having order list"));

    // }
    const UpdateOrderInfo=(x)=>
    {
        update(ref(db,'OrderInfo/'+route.params.id),
        {
          /* id: route.params.id,
           itemID: route.params.itemID,
           user: route.params.user,
           userCity: route.params.userCity,
           userCode: route.params.userCode,
           userHouse: route.params.userHouse,
           userStreet: route.params.userStreet,*/
           driverID: x

        }).then(() => {
            alertUser('Updated!')});

    }


    
    return(
    <SafeAreaView style={styles.ViewStyle}>
         <MaskedView maskElement={<Text style={[styles.LogInText,{backgroundColor:'transparent'}]}>
                     Add driver to order {route.params.id}
                 </Text>}>
              <LinearGradient
                start={{x:0,y:0}}
                end={{x:1,y:1}}
                colors={['#FF4B25','#FFFB01']}>
                 <Text style={[styles.LogInText,{opacity:0}]}>
                 Add driver to order {route.params.id}
                 </Text>
              </LinearGradient>
            </MaskedView>


            <FlatList data={Driverlist}
                     renderItem={({item})=>(
                        <View>
                            <TouchableOpacity onPress={()=>[AddDriver(item.email),UpdateOrderInfo(item.email)]}>
                            <Text style={{color:'#FF4B25'}}>_______________________________________</Text>
                            <Text>Drivers email= {item.email}</Text>
                            <Text style={{color:'#FF4B25'}}>_______________________________________</Text>
                            </TouchableOpacity>
                        </View>
                     )
                     
                     }/>

            
    


     </SafeAreaView>
     
           
               


    
    )


};
const styles = StyleSheet.create({
    ViewStyle:{
        flex: 1,
        backgroundColor: '#fff',
    },
    LogInText:{
        fontSize:15,
        marginTop:5,
        marginLeft:10,
        fontWeight: 'bold'
    },
    InputStileView:{
        height:'30%',
        width:'90%',
        marginTop:'30%',
        marginLeft:'10%'
    },
    InputStyle:{
        height:'30%',
        width:'90%',
        borderWidth:5,
        borderColor:'#CACACA',
        borderRadius:30,
        margin:5,
        alignContent:'center',
        textAlign:'center',
        justifyContent: 'center',
    },
    ButtonStyle:{
    height:'9%',
    width:'40%',
    borderWidth:5,
    backgroundColor: '#ffffff',
    borderColor:'#FF4B25',
    borderRadius:30,
    alignContent:'center',
    textAlign:'center',
    justifyContent: 'center',
    marginLeft:'30%'
    }
   
    

 });