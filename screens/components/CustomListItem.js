import React, { useState, useEffect } from 'react'
import { Alert,TouchableOpacity } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import { db } from '../../firebase';
import { AntDesign } from "@expo/vector-icons"

const CustomListItem = ({ id, chatName, enterChat }) => {

    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection("chats").doc(id).collection("messages").orderBy("timestamp", "desc").onSnapshot((snapshot) =>
            setChatMessages(snapshot.docs.map((doc) => doc.data())))

        return unsubscribe;
    }, [])

    // const deleteChat = (key) => {
    //     const dbRef = db.collection('chats').doc(key)
    //     dbRef.delete().then((res) => {
    //         console.log('Item removed from database')
    //         this.props.navigation.navigate('chats');
    //     })
    // }

    // const openTwoButtonAlert=(key)=>{
    //     console.log("call the funcition")
    //     Alert.alert(
    //       'Delete User',
    //       'Are you sure?',
    //       [
    //         {text: 'Yes', onPress: () => deleteChat(key)},
    //         {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'},
    //       ],
    //       { 
    //         cancelable: true 
    //       }
    //     );
    //   }

    return (

        <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
            <Avatar rounded source={{
                uri: chatMessages?.[0]?.photoURL || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
            }} />

            <ListItem.Content  >
                <ListItem.Title>
                    {chatName}
                </ListItem.Title >

                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {chatMessages?.[0]?.displayName}:{chatMessages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>

            <TouchableOpacity>
                <AntDesign name="delete" size={24} color="black"  />
            </TouchableOpacity>

        </ListItem>
    )
}

export default CustomListItem
