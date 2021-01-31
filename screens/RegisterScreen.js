import React, { useLayoutEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { Button } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { StyleSheet, View, Text } from 'react-native'
import { Input } from 'react-native-elements'
import { Auth } from '../firebase'


const RegisterScreen = ({ navigation }) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [imageUrl, setImageUrl] = useState("")

    const register = () => {
        Auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL: imageUrl || "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vectorstock.com%2Froyalty-free-vector%2Fdefault-avatar-photo-placeholder-profile-icon-vector-21666259&psig=AOvVaw3tj1DLBfffwjRoRnp4ADGC&ust=1611899171593000&source=images&cd=vfe&ved=0CA0QjhxqFwoTCOCV7L72ve4CFQAAAAAdAAAAABAD"
                })
            })
            .catch((error)=>alert(error.message));

    };

    useLayoutEffect(() => {

        navigation.setOptions({
            headerBackTitle: "Back to Login"
        })
    }, [navigation]);

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Text h3 style={{ marginBottom: 50 }}>
                Create a Signal account
            </Text>
            <View style={styles.inputContainer}>
                <Input placeholder="Full Name" autoFocus type="text" value={name} onChangeText={(text) => setName(text)} />
                <Input placeholder="Email"  value={email} onChangeText={(text) => setEmail(text)} />
                <Input placeholder="Password"  type="password" secureTextEntry value={password} onChangeText={(text) => setPassword(text)} />
                <Input placeholder="Profile picture url"  type="text" value={imageUrl} onChangeText={(text) => setImageUrl(text)} onSubmitEditing={register} />

                <Button raised onPress={register} title="register" />
                <View style={{ height: 100 }} />
            </View>

        </KeyboardAvoidingView>

    )
}

export default RegisterScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: "10",
        backgroundColor: "white"
    },
    button: {
        width: 200,
        marginTop: 10
    },
    inputContainer: {
        width: 300
    }
})