import { Alert, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Animated } from "react-native";
import { useEffect, useState,useRef } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from "react";
import MaskedView from '@react-native-masked-view/masked-view';
import {auth} from '../config';

import {signInWithEmailAndPassword} from "firebase/auth";



export default function LoginScreen({navigation}) {


    const [AdminEmail, setAdminEmail] = useState('')
    const [AdminPassword, setAdminPassword] = useState('')

    const[inpBackColor, setInpBackcolor]=useState('#ffffff')
    const[inpBackColorPass, setInpBackcolorPass]=useState('#ffffff')

    const onFocusChange=()=> {
                 setInpBackcolor('#FEECAA')
                    }

    const onBlurChange=()=> {
                 setInpBackcolor('#ffffff')
                    }
    const onFocusChangePass=()=> {
                        setInpBackcolorPass('#FEECAA')
                           }
       
    const onBlurChangePass=()=> {
                        setInpBackcolorPass('#ffffff')
                           }

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

      useEffect(() => {
        const subscriber = auth.onAuthStateChanged(user => {
            if (user!=null) {
                navigation.navigate("TabScreens")
            }
        })
        return subscriber
    }, [])

      const LoginCheck = () => {
        signInWithEmailAndPassword(auth, AdminEmail, AdminPassword)
            .then(() => {
                navigation.navigate("TabScreens");
        })
        .catch(e => alert(e))
    }
    
    return(
    <SafeAreaView style={styles.ViewStyle}>
            <MaskedView maskElement={<Text style={[styles.LogInText,{backgroundColor:'transparent'}]}>
                     LOG IN
                 </Text>}>
              <LinearGradient
                start={{x:0,y:0}}
                end={{x:1,y:1}}
                colors={['#FF4B25','#FFFB01']}>
                 <Text style={[styles.LogInText,{opacity:0}]}>
                     LOG IN
                 </Text>
              </LinearGradient>
            </MaskedView>

            <View style={styles.InputStileView}>
            <View style={{marginLeft:'35%'}}>
                <Text style={{fontSize:15, color:'#FF4B25'}}>
                    Admin
                </Text>
            </View>
             <View style={[styles.InputStyle,{backgroundColor: inpBackColor,}]}>
            <TextInput
                    placeholder="Email"
                    value={AdminEmail}
                    onChangeText={text=>setAdminEmail(text)}
                    onFocus={()=> onFocusChange()}
                    onBlur={()=> onBlurChange()}
                />
            </View >
            <View style={[styles.InputStyle,{backgroundColor: inpBackColorPass,}]}>
            <TextInput 
                    placeholder="Password"
                    value={AdminPassword}
                    onChangeText={text=>setAdminPassword(text)}
                    onFocus={()=> onFocusChangePass()}
                    onBlur={()=> onBlurChangePass()}
                    secureTextEntry
                />
            </View>
            </View>

        <TouchableOpacity style={styles.ButtonStyle} onPress={()=>[SpringAnimation(animationStart), LoginCheck()]}>
         <Animated.View style={{transform:[{scale:animationStart}]}}>
            <MaskedView  maskElement={<Text style={[{backgroundColor:'transparent', marginLeft:'25%',fontSize:20}]}>
                     LOG IN
                 </Text>}>
              <LinearGradient
                start={{x:0,y:0}}
                end={{x:1,y:1}}
                colors={['#FF4B25','#FFFB01']}>
                 <Text style={[{opacity:0, marginBottom:10 }]}>
                     LOG IN
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