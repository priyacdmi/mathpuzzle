import React, { useEffect } from "react";
import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Mainpage = ({ navigation }) => {


  


    return (
        <>
            <View style={{ flex: 1 }}>
                <ImageBackground style={{ height: '100%' }} source={require('./img/background.jpg')}>
                    <View style={{ flex: 2, alignItems: 'center', top: 60 }}>
                        <Text style={{ fontSize: 30, fontFamily: 'Segoe Print', color: 'blue' }}>Math puzzles</Text>
                    </View>
                    <View style={{ flex: 6 }}>
                        <View style={{ position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={style.mainimg} source={require('./img/blackboard_main_menu.png')} />
                            <View style={{ position: 'absolute', alignItems: 'center' }}>
                                <View style={style.intxt}>
                                    <Pressable onPress={() => { navigation.navigate("puzzlepage",{"levelNo":1}) }}>
                                        <Text style={{ fontSize: 20,color:'white' }}>continue</Text>
                                    </Pressable>
                                </View>

                                <View style={style.intxt}>
                                    <Pressable onPress={() => { navigation.navigate("level",{"levelNo":0}) }}>
                                        <Text style={{ fontSize: 20,color:'white' }}>puzzles</Text>
                                    </Pressable>
                                </View>

                                <View style={style.intxt}>
                                    <Pressable onPress={() => { navigation.navigate("level",{"levelNo":0}) }}>
                                        <Text style={{ fontSize: 20 ,color:'white'}}>Restart</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ flex: 2, justifyContent: 'flex-end', alignItems: 'flex-end', right: 20, bottom: 30 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={style.share} source={require('./img/shareus.png')}></Image>
                            <Image style={style.share} source={require('./img/emailus.png')}></Image>
                        </View>
                        <View>
                            <Text style={{ color: 'black', borderWidth: 2, width: 120, fontSize: 10, padding: 2, textAlign: 'center' }}>Privacy Pollicy</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </>
    )
}
export default Mainpage;

const style = StyleSheet.create({
    mainimg: {

        width: '90%',
        height: 480,
        resizeMode: 'stretch'

    },
    intxt: {
        height: 50,
        marginBottom: 20
    },
    share: {
        height: 40,
        width: 40,
        margin: 10
    }
})