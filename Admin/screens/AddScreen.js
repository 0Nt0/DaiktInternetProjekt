import { Alert, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Animated } from "react-native";
import { useEffect, useState,useRef } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from "react";
import MaskedView from '@react-native-masked-view/masked-view';
import {ref, set, get, child, onValue} from "firebase/database";
import {auth} from '../config';
import {v4 as uuidv4} from 'uuid';
import { db } from "../config";

import {signInWithEmailAndPassword} from "firebase/auth";



export default function AddScreen({navigation}) {

    const [Name, setName] = useState('')
    const [Price, setPrice] = useState('')
    const [Description, setDescription] = useState('')
    const [ID, setID] = useState('');
    

    const[inpBackColor, setInpBackcolor]=useState('#ffffff')
    const[inpBackColorPrs, setInpBackcolorPrs]=useState('#ffffff')
    const[inpBackColorDec, setInpBackcolorDec]=useState('#ffffff')
    const[inpBackColorId, setInpBackcolorId]=useState('#ffffff')

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




    const onBlurChangDec=()=> {
                            setInpBackcolorDec('#ffffff')
                               }

    const onFocusChangDec=()=> {
                            setInpBackcolorDec('#FEECAA')
                               }
           


   const onBlurChangId=()=> {
                            setInpBackcolorId('#ffffff')
                               }

    const onFocusChangeId=()=> {
                                setInpBackcolorId('#FEECAA')
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
  const sendOrder = () => {
       
                                    set(ref(db, 'TestInfo/'+ID), {
                                        
                                         description:Description,
                                         id:ID,
                                         name:Name,
                                         price:Price
                                     }).then(()=> {
                                         alert("Data is in!")
                                         console.log(ID)
                                     });
                                     
                                     setDescription('');
                                     setName('');
                                     setID('');
                                     setPrice('');
                     }    

    
    return(
    <SafeAreaView style={styles.ViewStyle}>
        
        <View style={styles.InputStileView}>

        <MaskedView maskElement={<Text style={[styles.LogInText,{backgroundColor:'transparent'}]}>
                     Add item
                 </Text>}>
              <LinearGradient
                start={{x:0,y:0}}
                end={{x:1,y:1}}
                colors={['#FF4B25','#FFFB01']}>
                 <Text style={[styles.LogInText,{opacity:0}]}>
                     Add item
                 </Text>
              </LinearGradient>
            </MaskedView>

             <View style={[styles.InputStyle,{backgroundColor: inpBackColor,}]}>
            <TextInput
                    placeholder="Item name"
                    value={Name}
                    onChangeText={text=>setName(text)}
                    onFocus={()=> onFocusChange()}
                    onBlur={()=> onBlurChange()}
                />
            </View >
            <View style={[styles.InputStyle,{backgroundColor: inpBackColorPrs,}]}>
            <TextInput 
                    placeholder="Item price"
                    value={Price}
                    onChangeText={text=>setPrice(text)}
                    onFocus={()=> onFocusChangePrs()}
                    onBlur={()=> onBlurChangePrs()}
                />
            </View>
            <View style={[styles.InputStyle,{backgroundColor: inpBackColorDec,}]}>
            <TextInput 
                    placeholder="Item description"
                    value={Description}
                    onChangeText={text=>setDescription(text)}
                    onFocus={()=> onFocusChangDec()}
                    onBlur={()=> onBlurChangDec()}
                />
            </View>

            <View style={[styles.InputStyle,{backgroundColor: inpBackColorId,}]}>
            <TextInput 
                    placeholder="Item id"
                    value={ID}
                    onChangeText={text=>setID(text)}
                    onFocus={()=> onFocusChangeId()}
                    onBlur={()=> onBlurChangId()}
                />
            </View>

            <TouchableOpacity style={styles.ButtonStyle} onPress={()=>[SpringAnimation(animationStart), sendOrder()]}>
         <Animated.View style={{transform:[{scale:animationStart}]}}>
            <MaskedView  maskElement={<Text style={[{backgroundColor:'transparent', marginLeft:'25%',fontSize:20}]}>
                     ADD
                 </Text>}>
              <LinearGradient
                start={{x:0,y:0}}
                end={{x:1,y:1}}
                colors={['#FF4B25','#FFFB01']}>
                 <Text style={[{opacity:0, marginBottom:10 }]}>
                     ADD
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
        fontSize:50,
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