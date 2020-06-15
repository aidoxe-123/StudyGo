import React, { useState } from 'react'
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import { LoginStyles } from '../../../style/LoginStyles.js'

export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emptyEmail, setEmptyEmail] = useState(false)
  const [emptyPassword, setEmptyPassword] = useState(false)
  const [isValid, setIsValid] = useState(true)
  const [loading, setLoading] = useState(false)

  function handleInputEmail(text) {
    setEmail(text)
    setIsValid(true)
    setEmptyEmail(false)
  }

  function handleInputPassword(text) {
    setPassword(text)
    setIsValid(true)
    setEmptyPassword(false)
  }

  function moveToRegister() {
    navigation.push('Register')
  }

  function handleApiResponse({ StatusCode, userId }) {
    if (StatusCode !== 200) {
      setIsValid(false)
    } else {
      setEmail('')
      setPassword('')
      navigation.navigate('MainDrawer', { userId: userId })
    }
  }

  function handleLogin() {
    let valid = true
    if (email === '') {
      setEmptyEmail(true)
      valid = false
    }
    if (password === '') {
      setEmptyPassword(true)
      valid = false
    }
    if (valid) { // if both the email and password are not empty
      // send a post request to the api to check for email and password
      let requestOption = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: email,
          password: password
        })
      }
      setLoading(true)
      fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/login', requestOption)
        .then(res => res.json())
        .then(data => {
          setLoading(false)
          handleApiResponse(data)
        })
        .catch(error => console.log(error))
    }
  }

  return (
    // still not able to put them in scroll view yet
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={LoginStyles.container}>
        <Spinner
          visible={loading}
          textContent='Loading...'
          textStyle={LoginStyles.spinner}
        />
        <View style={LoginStyles.whitePanel}>
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
          { 
            emptyEmail &&
            <Text style={LoginStyles.wrongInputAlert}>
              Please enter email
            </Text>
          }
          <TextInput 
            secureTextEntry={true} 
            style={LoginStyles.input} 
            placeholder='Password'
            value={password}
            onChangeText={handleInputPassword}
          />
          { 
            emptyPassword &&
            <Text style={LoginStyles.wrongInputAlert}>
              Please enter password
            </Text>
          }
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
    </TouchableWithoutFeedback>
  )
}