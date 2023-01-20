import { Alert, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Animated } from "react-native";
import { useEffect, useState,useRef } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from "react";
import MaskedView from '@react-native-masked-view/masked-view';
import {ref, set, get, child, onValue} from "firebase/database";
import {auth} from '../config';
import {v4 as uuidv4} from 'uuid';
import { getAuth,  createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { db } from "../config";
import {firebase} from '../config'

import {signInWithEmailAndPassword} from "firebase/auth";



export default function AddDriversOrAdminsScreen({navigation}) {

    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [ID, setID] = useState(uuidv4());

    const ref= firebase.firestore().collection('admins');
    const ref2= firebase.firestore().collection('drivers');

    const[inpBackColor, setInpBackcolor]=useState('#ffffff')
    const[inpBackColorPrs, setInpBackcolorPrs]=useState('#ffffff')

    const onFocusChange=()=> {
                 setInpBackcolor('#FEECAA')
                    }

    const onBlurChange=()=> {
                 setInpBackcolor('#ffffff')
                    }
    const onFocusChangePrs=()=> {
                        setInpBackcolorPrs('#FEECAA')
                           }
       
    const onBlurChangePrs=()=> {
                        setInpBackcolorPrs('#ffffff')
                           }
     const animationStart=useRef(new Animated.Value(0)).current
     const animationStart2=useRef(new Animated.Value(0)).current
      useEffect(()=>{
                    animationStart.setValue(1);
                    animationStart2.setValue(1);
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
    const AdminAdd = () => {
                    createUserWithEmailAndPassword(auth, Email, Password)
                       .then(() => {
                             const data={
                                email:Email,
                                password:Password,
                                id:ID
                                        };
                            ref.add(data).then(()=> {
                                alert("Data added")
                                }).catch((error)=>{alert(error)})
                                        })
                            .catch(error => alert(error.message))
                                setEmail(''),
                            setID(''),
                        setPassword('')}  
   const DriverAdd = () => {
                                    createUserWithEmailAndPassword(auth, Email, Password)
                                       .then(() => {
                                             const data={
                                                email:Email,
                                                password:Password,
                                                id:ID
                                                        };
                                            ref2.add(data).then(()=> {
                                                alert("Data added")
                                    
                                                }).catch((error)=>{alert(error)})
                                                        })
                                            .catch(error => alert(error.message))
                                            setEmail(''),
                                            setID(''),
                                        setPassword('')}  
    
    return(
    <SafeAreaView style={styles.ViewStyle}>
        
        <View style={styles.InputStileView}>

        <MaskedView maskElement={<Text style={[styles.LogInText,{backgroundColor:'transparent'}]}>
                     Add a driver or an admin
                 </Text>}>
              <LinearGradient
                start={{x:0,y:0}}
                end={{x:1,y:1}}
                colors={['#FF4B25','#FFFB01']}>
                 <Text style={[styles.LogInText,{opacity:0}]}>
                 Add a driver or an admin
                 </Text>
              </LinearGradient>
            </MaskedView>

             <View style={[styles.InputStyle,{backgroundColor: inpBackColor,}]}>
            <TextInput
                    placeholder="Persons email"
                    value={Email}
                    onChangeText={text=>setEmail(text)}
                    onFocus={()=> onFocusChange()}
                    onBlur={()=> onBlurChange()}
                />
            </View >
            <View style={[styles.InputStyle,{backgroundColor: inpBackColorPrs,}]}>
            <TextInput 
                    placeholder="Persons password"
                    value={Password}
                    onChangeText={text=>setPassword(text)}
                    onFocus={()=> onFocusChangePrs()}
                    onBlur={()=> onBlurChangePrs()}
                    secureTextEntry
                />
            </View>
            <TouchableOpacity style={styles.ButtonStyle} onPress={()=>[SpringAnimation(animationStart), AdminAdd()]}>
         <Animated.View style={{transform:[{scale:animationStart}]}}>
            <MaskedView  maskElement={<Text style={[{backgroundColor:'transparent', marginLeft:'25%',fontSize:20}]}>
                     ADD Admin
                 </Text>}>
              <LinearGradient
                start={{x:0,y:0}}
                end={{x:1,y:1}}
                colors={['#FF4B25','#FFFB01']}>
                 <Text style={[{opacity:0, marginBottom:10 }]}>
                     ADD Admin
                 </Text>
              </LinearGradient>
            </MaskedView>
         </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.ButtonStyle,{marginTop:'2%'}]} onPress={()=>[SpringAnimation(animationStart2),DriverAdd() ]}>
         <Animated.View style={{transform:[{scale:animationStart2}]}}>
            <MaskedView  maskElement={<Text style={[{backgroundColor:'transparent', marginLeft:'25%',fontSize:20}]}>
                     ADD Driver
                 </Text>}>
              <LinearGradient
                start={{x:0,y:0}}
                end={{x:1,y:1}}
                colors={['#FF4B25','#FFFB01']}>
                 <Text style={[{opacity:0, marginBottom:10 }]}>
                     ADD Driver
                 </Text>
              </LinearGradient>
            </MaskedView>
         </Animated.View>
        </TouchableOpacity>

            </View>

        
    


     </SafeAreaView>
     
           
               


    
    )


};
const styles = StyleSheet.create({
    ViewStyle:{
        flex: 1,
        backgroundColor: '#fff',
    },
    LogInText:{
        fontSize:30,
        marginTop:5,
        marginLeft:25,
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
    height:'30%',
    width:'80%',
    borderWidth:5,
    backgroundColor: '#ffffff',
    borderColor:'#FF4B25',
    borderRadius:30,
    alignContent:'center',
    textAlign:'center',
    justifyContent: 'center',
    marginLeft:'10%'
    }
   
    

 });