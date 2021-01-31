import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { StyleSheet, View, Text } from 'react-native'
import { Button, Input, Image } from "react-native-elements"
import { Auth } from '../firebase'


const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = Auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace("Home");
            }
        })

        return unsubscribe;
    }, [])

    const signIn = () => {
        Auth.signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error));
    }

    return (
        <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
            <StatusBar style="light" />
            <Image source={{
                uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
            }}
                style={{ width: 200, height: 200 }}
            />

            <View style={styles.inputContainer}>
                <Input placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />
                <Input placeholder="Password" secureTextEntry type="password" value={password} onChangeText={(text) => setPassword(text)} />
            </View>

            <Button title="Login" containerStyle={styles.button} onPress={signIn} />
            <Button title="Register" containerStyle={styles.button} type="outline" onPress={() => navigation.navigate("Register")} />
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: "10",
        backgroundColor: "white"
    },
    inputContainer: {
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10
    }
});
