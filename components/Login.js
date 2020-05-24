import React, { useState } from 'react'
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native'
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

  function handleNavigate() {
    navigation.push('Register')
  }

  function handleLogin() {
    // send a post request to the api to check for email and password
    setIsValid(false) // this line is just temporary
  }

  return (
    // still not able to put them in scroll view yet
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={LoginStyles.container}>
        <View style={LoginStyles.whitePanel}>
          <View style={LoginStyles.loginShow}>
            <Text h2 style={LoginStyles.heading}>LOGIN</Text>
              <Text style={[isValid && {display: 'none'}, LoginStyles.invalidLogin]}>Email or password was incorrect, please try again</Text>
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
                <TouchableOpacity onPress={handleNavigate}>
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