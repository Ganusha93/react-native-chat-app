import React, { useLayoutEffect, useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'
import { Auth, db } from '../firebase'
import CustomListItem from './components/CustomListItem'
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"

const HomeScreen = ({ navigation }) => {

    const [chats, setChats] = useState([])

    const signOutUSer = () => {
        Auth.signOut().then(() => {
            navigation.replace("Login");
        })
    }

    useEffect(() => {
        const unsubscribe = db.collection("chats").onSnapshot((snapshot) => {
            setChats(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            })));
        })

        return unsubscribe;
    }, []);

    const enterChat = (id, chatName) => {
        navigation.navigate("Chats", {
            id,
            chatName,
        })
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity onPress={signOutUSer} activeOpacity={0.5}>
                        <Avatar rounded source={{ uri: Auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{ marginRight: 20, flexDirection: "row", justifyContent: "space-between", width: 80 }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5}>
                        <SimpleLineIcons onPress={() => navigation.navigate("AddChat")} name="pencil" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({ id, data: { chatName } }) => (
                    <CustomListItem key={id} id={id} chatName={chatName}  enterChat={enterChat}/>
                )
                )}

            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({

    container: {
        height: "100%"
    }
});