
import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

import * as Google from "expo-google-app-auth";

const IOS_CLIENT_ID =
    "1046116434295-7suaev7unf6pel9qmmua6lm9kq93vs4q.apps.googleusercontent.com";
const ANDROID_CLIENT_ID =
    "1046116434295-hccicqe5j8mro3flgu05g6hrqlfip3t0.apps.googleusercontent.com";
const ANDROID_STANDALONE_CLIENT_ID =
    "1046116434295-rukia5e839aegnsag4ohcr7dbk7k4eba.apps.googleusercontent.com";

// https://medium.com/@inaguirre/react-native-login-with-google-quick-guide-fe351e464752

export const signInGoogle = async () => {
    try {
        const result = await Google.logInAsync({
            iosClientId: IOS_CLIENT_ID,
            androidClientId: ANDROID_CLIENT_ID,
            androidStandaloneAppClientId: ANDROID_STANDALONE_CLIENT_ID,
            scopes: ["profile", "email"]
        });

        if (result.type === "success") {
            let res = {};

            const { email, name, id } = result.user;

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
