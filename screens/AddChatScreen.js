import React, { useLayoutEffect, useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { Icon, Input } from 'react-native-elements';
import { db } from '../firebase';

const AddChatScreen = ({ navigation }) => {

    const [input, setInput] = useState("")
    useLayoutEffect(() => {

        navigation.setOptions({
            title: "Add new chat",
            headerBackTitle: "Chats"
        })
    }, [navigation]);

    const createChat = async () => {
        await db.collection("chats").add({
            chatName: input,
        })
            .then(() => {
                navigation.goBack();
            })
            .catch((error) => alert(error.message))
    }

    return (
        <View style={styles.container}>
            <Input placeholder="Enter a ,chat name" value={input} onSubmitEditing={createChat} onChangeText={(Text) => setInput(Text)} leftIcon={
                <Icon name="wechat" type="antdesign" color="black" />
            } />

            <Button onPress={createChat} title="Create new Chat" />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({

})