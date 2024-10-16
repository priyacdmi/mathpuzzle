import React, { useEffect, useState } from "react";
import { Alert, Image, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { create } from "react-test-renderer";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Frontpage = ({ route, navigation }) => {
    //  const { levelNo } = route.params
    const [levelNo, setlevelNo] = useState(1);
    const [skipArr, setskipArr] = useState([]);
    const [isSkipped, setSkipped] = useState(false);
    const [maxlevel, setmaxlevel] = useState(0)
    const [isremove, setremove] = useState(false);


    const getstorelevelno = async () => {
        try {
            const value = await AsyncStorage.getItem('levelNo');
            if (value !== null) {
                setlevelNo(parseInt(value))

            }
        } catch (e) {
            // error reading value
        }
    };
    const storemaxlevelno = async (value) => {
        try {
            await AsyncStorage.setItem('maxlevel', value.toString());

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

    

    const image = [
        require("./img/p1.png"),
        require("./img/p2.png"),
        require("./img/p3.png"),
        require("./img/p4.png"),
        require("./img/p5.png"),
        require("./img/p6.png"),
        require("./img/p7.png"),
        require("./img/p8.png"),
        require("./img/p9.png"),
        require("./img/p10.png"),
        require("./img/p11.png"),
        require("./img/p12.png"),
        require("./img/p13.png"),
        require("./img/p14.png"),
        require("./img/p15.png"),
        require("./img/p16.png"),
        require("./img/p17.png"),
        require("./img/p18.png"),
        require("./img/p19.png"),
        require("./img/p20.png"),
        require("./img/p21.png"),
        require("./img/p22.png"),
        require("./img/p23.png"),
        require("./img/p24.png")
    ]
    // const ans = [10, 25, 6, 14, 128, 7, 50, 1025, 100, 3, 212, 3011, 14,16]
    const ans = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170]
    const hint = ['hint11', 'hint22', 'hint33', 'hint44', 'hint55', 'hint66', 'hint77', 'hint88', 'hint99', 'hint111']

    const btnnum = (item) => {
        setval(val + item);

    }
    const del = () => {
        const value = String(val)
        setval(value.substring(0, value.length - 1))

    }

    const [val, setval] = useState('')
    const [score, setscore] = useState(0)
    const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

    const submitBtn = () => {

        if (val == ans[levelNo - 1]) {
            setval('')
            set_score(score + 10);

            removeskip(levelNo);
            setremove(true);

            if (levelNo >= maxlevel) {

                storemaxlevelno(levelNo)
            }
            navigation.navigate("trophypage", { "levelNo": levelNo })
        } else {
            setval('')
        }

    }
    const removeskip = (lvl) => {

        var index = skipArr.indexOf(lvl);
        if (index !== -1) {
            skipArr.splice(index, 1)
            setskipArr(skipArr)
            storeSkipLevelsArr(skipArr)
        }
        
    }

    const hintbtn = (value) => {

        if (score > 0 && score != 10) {
            setscore(score - 20)
            set_score(score - 20);
            Alert.alert("Hint", hint[value - 1])
            // console.log("hint",hint[value-1])
        }

    }


    const skipbtn = () => {

        setskipArr([...skipArr, levelNo])
        setSkipped(true)

    }

    useEffect(() => {

        if (isSkipped) {
            storeSkipLevelsArr(skipArr);
            storelevelno((levelNo + 1).toString())
            navigation.push("puzzlepage");
            console.log("skipparr", skipArr)
        }
        if (isremove) {
            removeskip();
        }

    }, [skipArr])


    const storeSkipLevelsArr = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('skipValues', jsonValue);
            //
        } catch (e) {
            // saving error
        }
    };

    const getSkipLevelsArr = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('skipValues');
            var test = jsonValue != null ? JSON.parse(jsonValue) : [];
            setskipArr((test))

        } catch (e) {
            // error reading value
        }
    };

    const storelevelno = async (value) => {
        try {
            await AsyncStorage.setItem('levelNo', value);
            //setlevelNo(levelNo+1)
        } catch (e) {
            // saving error
        }
    };


    const homelevelNo = async (value) => {
        try {
            await AsyncStorage.setItem('levelNo', value);
            navigation.navigate('home')

        } catch (e) {
            // saving error
        }
    };



    const getscore = async () => {
        try {
            const value = await AsyncStorage.getItem('score');
            if (value !== null) {
                setscore(parseInt(value))
            }
        } catch (e) {
            // error reading value
        }
    };
    const set_score = async (val) => {
        try {

            await AsyncStorage.setItem('score', val.toString());

        } catch (e) {
            // saving error
        }
    };




    useEffect(() => {

        getSkipLevelsArr();
        navigation.addListener('focus', () => {
            getstorelevelno();
            getscore();
            getstoremaxlevelno();
        })
    }, [])


    return (
        <>
            <View style={{ flex: 5 }} >
                <ImageBackground style={{ height: '100%' }} source={require('./img/gameplaybackground.jpg')}>

                    <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Pressable onPress={skipbtn} style={{ zIndex: 1 }}>
                            <Image style={{ height: 50, width: 50, marginTop: 20, left: 10 }} source={require("./img/skip.png")}></Image>
                        </Pressable>
                        <View style={{ position: 'relative', justifyContent: 'center', alignItems: 'center', top: 80, flexDirection: "row" }}>
                            <Image style={{ width: 240, height: 70 }} source={require('./img/level_board.png')} />
                            <View style={{ position: 'absolute' }}>
                                <Text style={{ fontSize: 25, color: 'black' }}>Puzzle {levelNo}</Text>
                            </View>
                        </View>
                        <Pressable onPress={() => { hintbtn((levelNo).toString()) }} style={{ zIndex: 1 }}>
                            <Image style={{ height: 50, width: 50, marginTop: 20, right: 10 }} source={require("./img/hint.png")}></Image>
                        </Pressable>
                    </View>

                    <View >

                        <Image style={{ width: '100%', marginTop: 20 }} resizeMode="contain" source={image[levelNo - 1]}></Image>
                        <View style={{ position: 'absolute', height: '77%', justifyContent: 'flex-end' }}>
                            < Pressable onPress={() => { homelevelNo((levelNo).toString()) }}>
                                <Image style={{ height: 50, width: 50, left: 10 }} source={require("./img/home.png")}></Image>
                            </Pressable>
                        </View>
                        <View style={{ position: 'absolute', height: '79%', width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                            <View style={style.scorebox}>
                                <Text>score</Text>
                                <Text>{score}</Text>
                            </View>
                        </View>

                    </View>


                </ImageBackground>

            </View>
            <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center' }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <View style={style.inputtxt}>
                        <Text>{val}</Text>
                    </View>

                    <View style={{ marginTop: 10, marginBottom: 10 }}>
                        <Pressable onPress={del}>
                            <Image style={{ height: 40, width: 50 }} source={require('./img/delete.png')}></Image>
                        </Pressable>
                    </View>

                    <Pressable onPress={submitBtn}>
                        <View >
                            <Text style={{ color: 'white' }}>submit</Text>
                        </View>
                    </Pressable>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    {
                        num.map((item) => {
                            return (
                                <Pressable onPress={() => { btnnum(item) }}>
                                    <View style={style.numbox}>
                                        <Text style={{ color: 'white' }}>{item}</Text>
                                    </View>
                                </Pressable>
                            )
                        })
                    }
                </View>
            </View>
        </>
    )
}
export default Frontpage;

const style = StyleSheet.create({
    inputtxt: {
        justifyContent: 'center',
        fontSize: 40,
        backgroundColor: 'gray',
        textAlign: 'right',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 2,
        width: 230,
        height: 40,
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 10
    },
    numbox: {
        justifyContent: 'center',
        height: 40,
        width: 40,
        borderWidth: 2,
        borderColor: 'white',
        margin: 2,
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    scorebox: {
        justifyContent: 'center',
        fontSize: 50,
        backgroundColor: '#023e8a',
        textAlign: 'right',
        alignItems: 'center',
        borderColor: '#03045e',
        borderWidth: 2,
        width: 140,
        height: 80,
        borderRadius: 15,

    }

}
)