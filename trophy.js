import React, { useEffect } from "react";
import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { create } from "react-test-renderer";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Trophy = ({ navigation, route }) => {
    const { levelNo } = route.params;

  
    const storelevelno = async (value) => {
        try {
          await AsyncStorage.setItem('levelNo',value);
          navigation.navigate("puzzlepage")

        } catch (e) {
          // saving error
        }
      };
     
    
   

    return (
        <>
            <View style={{ flex: 1 }}>
                <ImageBackground style={{ height: '100%' }} source={require('./img/background.jpg')}>
                    <View style={{ justifyContent: 'center', height: '100%', alignItems: 'center' }}>
                        <View >
                            <Text style={{ color: '#78290f',marginBottom:30 }}>PUZZLE {levelNo} COMPLETED</Text>
                        </View>
                        <View>
                            <Image source={require('./img/trophy.png')}></Image>
                        </View>
                        <Pressable onPress={() => {storelevelno((levelNo+1).toString())}}>
                            <View style={style.btn}>
                                <Text>CONTINUE</Text>
                            </View>
                        </Pressable>
                        <Pressable onPress={()=>{navigation.navigate("home")}}>
                            <View style={style.btn}>
                                <Text>MAIN MENU</Text>
                            </View>
                        </Pressable>
                        <View style={style.btn}>
                            <Text>BUY PRO</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </>
    )
}
export default Trophy;

const style = StyleSheet.create({
    btn: {
        borderRadius: 8,
        borderWidth: 2,
        width: 200,
        margin: 15,
        padding: 5,
        backgroundColor: '#78290f',
        alignItems: 'center'
    }

})