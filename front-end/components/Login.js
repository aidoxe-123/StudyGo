import React, { useState } from 'react'
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from 'react-native'
import { LoginStyles } from '../style/LoginStyles.js'

export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isValid, setIsValid] = useState(true)

  function handleInputEmail(text) {
    setEmail(text)
    setTimeout(() => setIsValid(true), 1000)
  }

  function handleInputPassword(text) {
    setPassword(text)
    setTimeout(() => setIsValid(true), 1000)
  }

  function moveToRegister() {
    navigation.push('Register')
  }

  function handleApiResponse({ accExist, passwordCorrect, userId }) {
    if (!accExist || !passwordCorrect) {
      setIsValid(false)
    } else {
      navigation.navigate('MainDrawer', { userId: userId })
    }
  }

  function handleLogin() {
    // send a post request to the api to check for email and password
    let requestOption = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password
      })
    }
    fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/login', requestOption)
      .then(res => res.json())
      .then(data => handleApiResponse(data))
      .catch(error => console.log(error))
  }

  return (
    // still not able to put them in scroll view yet
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={LoginStyles.container}>
        <View style={LoginStyles.whitePanel}>
          <View style={LoginStyles.loginShow}>
            <Text h2 style={LoginStyles.heading}>LOGIN</Text>
              {
                !isValid &&
                <Text style={LoginStyles.invalidLogin}>Email or password was incorrect, please try again</Text>
              } 
              <TextInput 
                style={LoginStyles.input} 
                placeholder='Email'
                value={email}
                onChangeText={handleInputEmail}
              />
              <TextInput 
                secureTextEntry={true} 
                style={LoginStyles.input} 
                placeholder='Password'
                value={password}
                onChangeText={handleInputPassword}
              />
              <View style={LoginStyles.bottomRow}>
                <TouchableOpacity onPress={moveToRegister}>
                  <Text style={LoginStyles.link}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={LoginStyles.button} onPress={handleLogin}>
                  <Text style={LoginStyles.buttonText}>Login</Text>
                </TouchableOpacity>
              </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}