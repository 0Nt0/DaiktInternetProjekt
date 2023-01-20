import { Alert, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Animated } from "react-native";
import { useEffect, useState,useRef } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from "react";
import { getAuth } from "firebase/auth";
import MaskedView from '@react-native-masked-view/masked-view';
import {auth} from '../config';

import {signInWithEmailAndPassword} from "firebase/auth";



export default function ProfileScreen({navigation}) {


    const animationStart=useRef(new Animated.Value(0)).current
    useEffect(()=>{
        animationStart.setValue(1);
          },[]);
          
    const SpringAnimation=(x)=>{
        x.setValue(0.4)
        Animated.spring(x,{
          toValue:1,
          bounciness:24,
          speed:20,
          useNativeDriver:true
        }).start();
      };

    const SignOut = () => {
        auth.signOut()
        .then(() =>{
            navigation.navigate("login")
        })
        .catch(error => alert(error.message))
    }

    
    return(
    <SafeAreaView style={styles.ViewStyle}>
            
            <TouchableOpacity style={styles.ButtonStyle} onPress={()=>[SpringAnimation(animationStart), SignOut()]}>
         <Animated.View style={{transform:[{scale:animationStart}]}}>
            <MaskedView  maskElement={<Text style={[{backgroundColor:'transparent', marginLeft:'20%',fontSize:20}]}>
                     LOG OUT
                 </Text>}>
              <LinearGradient
                start={{x:0,y:0}}
                end={{x:1,y:1}}
                colors={['#FF4B25','#FFFB01']}>
                 <Text style={[{opacity:0, marginBottom:10 }]}>
                     LOG OUT
                 </Text>
              </LinearGradient>
            </MaskedView>
         </Animated.View>
        </TouchableOpacity>
            
    


     </SafeAreaView>
     
           
               


    
    )


};
const styles = StyleSheet.create({
    ViewStyle:{
        flex: 1,
        backgroundColor: '#fff',
    },
    LogInText:{
        fontSize:50,
        marginTop:5,
        marginLeft:5,
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