
import React, { Component } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import * as AppAuth from 'expo-app-auth'
import * as Google from "expo-google-app-auth";
import * as GoogleSignIn from "expo-google-sign-in"
import Constants from "expo-constants";
import { logMsg } from '../utils/logMsg';

const IOS_CLIENT_ID =
    "1046116434295-7suaev7unf6pel9qmmua6lm9kq93vs4q.apps.googleusercontent.com";
const ANDROID_CLIENT_ID =
    "1046116434295-hccicqe5j8mro3flgu05g6hrqlfip3t0.apps.googleusercontent.com";
const ANDROID_STANDALONE_CLIENT_ID =
    "1046116434295-rukia5e839aegnsag4ohcr7dbk7k4eba.apps.googleusercontent.com";

// https://medium.com/@inaguirre/react-native-login-with-google-quick-guide-fe351e464752

export const signInGoogle = async () => {
    try {
        let result, email, name, id;
        if (Constants.appOwnership === 'expo') {
            result = await Google.logInAsync({
                iosClientId: IOS_CLIENT_ID,
                androidClientId: ANDROID_CLIENT_ID,
                androidStandaloneAppClientId: ANDROID_STANDALONE_CLIENT_ID,
                scopes: ["profile", "email"],
                redirectUrl: `${AppAuth.OAuthRedirect}:/oauth2redirect/google`
            });
            email = result.user.email;
            name = result.user.name;
            id = result.user.id;
        } else if (Constants.appOwnership === "standalone") {
            await GoogleSignIn.initAsync();
            result = await GoogleSignIn.signInAsync();
            email = result.user.email;
            name = result.user.displayName;
            id = result.user.uid;
        }

        if (result.type === "success") {
            let res = {};

            let requestOption = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    password: Math.random().toString() + Math.random().toString(),
                    username: name,
                    googleId: id
                })
            }
            await fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/register', requestOption);

            return { success: true, id: id };
        } else {

            return { cancelled: true };
        }
    } catch (e) {
        console.log('LoginScreen.js.js 30 | Error with login', e);
        return { error: true };
    }
};
