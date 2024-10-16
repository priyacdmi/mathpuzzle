import React, { useEffect, useState } from "react";
import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Locksrn = ({ navigation }) => {

    const level = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
    const [skipnum, setskipnum] = useState([])
    // const [levelNo, setlevelNo] = useState(0);
    const [maxlevel,setmaxlevel] = useState(0)
    


    const storelevelno = async (value) => {
        try {
            await AsyncStorage.setItem('levelNo', value);
            navigation.navigate("puzzlepage")
           
           
        } catch (e) {
            // saving error
        }
    };
    const getstoremaxlevelno = async () => {
        try {
            const value = await AsyncStorage.getItem('maxlevel');
            if (value !== null) {

                setmaxlevel(parseInt(value))

            }
        } catch (e) {
            // error reading value
        }
    };
   
    
    const getSkipLevelsArr = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('skipValues');
            var test = jsonValue != null ? JSON.parse(jsonValue) : [];
            setskipnum(test); 

        } catch (e) {
            // error reading value
        }
    };



    useEffect(() => {

        navigation.addListener('focus', () => {
            getSkipLevelsArr();
            // getstorelevelno();
            getstoremaxlevelno();
        })
    }, [])

    useEffect(() => {

        console.log("new skipnum", skipnum)

    }, [skipnum])

    return (
        <>
            <View style={{ flex: 1 }}>
                <ImageBackground style={{ height: '100%' }} source={require('./img/background.jpg')}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', top: 10 }}>
                        <Text style={{ color: 'blue', fontSize: 30, fontFamily: 'Jersey25-Regular' }}>select puzzle</Text>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', top: 30 }}>

                        {
                            level.map((item) => {

                                if (item <= maxlevel) {

                                    if (skipnum.includes(item)) {

                                        return (

                                            <Pressable  onPress={() => { storelevelno(item.toString()) }}>
                                                <View style={style.lockbox}>
                                                    <Text style={{ color: "black", fontSize: 30 }}>{item}</Text>
                                                    {/* <Image style={style.lockimg} source={require('./img/lock.png')}></Image> */}
                                                </View>
                                            </Pressable>
                                        )
                                    }
                                    else {
                                        return (

                                            <Pressable disabled={true} onPress={() => { storelevelno(item.toString()) }}>
                                                <View style={style.lockbox}>
                                                    <ImageBackground style={style.lockimg} source={require('./img/tick.png')}>
                                                        <Text style={{ color: "black", fontSize: 30 }}>{item}</Text>
                                                    </ImageBackground>
                                                </View>
                                            </Pressable>
                                        )
                                    }

                                } else if (item == (maxlevel+1)) {
                                    return (
                                        <Pressable onPress={() => { storelevelno(item.toString()) }}>
                                            <View style={style.lockbox}>
                                                <Text style={{ color: "black", fontSize: 30 }}>{item}</Text>
                                                {/* <Image style={style.lockimg} source={require('./img/lock.png')}></Image> */}
                                            </View>
                                        </Pressable>
                                    )
                                } else {
                                    return (

                                        <Pressable disabled={true} onPress={() => { storelevelno(item.toString()) }}>
                                            <View style={style.lockbox}>
                                                <Image style={style.lockimg} source={require('./img/lock.png')}></Image>
                                            </View>
                                        </Pressable>
                                    )
                                }

                            })
                        }

                    </View>

                    <Pressable onPress={() => { navigation.navigate("home") }}>
                        <View style={{ top: 40, alignItems: 'flex-end', right: 50 }}>
                            <Image style={{ height: 50, width: 60 }} source={require('./img/next.png')}></Image>
                        </View>
                    </Pressable>
                </ImageBackground>
            </View>
        </>
    )
}
export default Locksrn;

const style = StyleSheet.create({
    lockbox: {
        height: 70,
        width: 70,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    lockimg: {
        height: 70,
        width: 70
    }
})