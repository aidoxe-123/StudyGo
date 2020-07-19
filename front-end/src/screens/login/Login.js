import React, { useState } from 'react'
import {
  View, Text, TextInput, TouchableWithoutFeedback,
  Keyboard, TouchableOpacity, Platform, Image
} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import { LoginStyles } from '../../../style/LoginStyles.js'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { signInGoogle } from '../../utils/googleSignIn';
import { AntDesign, FontAwesome, Entypo, Ionicons } from '@expo/vector-icons';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emptyEmail, setEmptyEmail] = useState(false)
  const [emptyPassword, setEmptyPassword] = useState(false)
  const [isValid, setIsValid] = useState(true)
  const [loading, setLoading] = useState(false)
  const [secureInput, setSecureInput] = useState(true)

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
        headers: { 'Content-Type': 'application/json' },
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

  function handleGoogleSignIn() {
    signInGoogle()
      .then(res => {
        if (res.success) {
          navigation.navigate('MainDrawer', { userId: res.id });
        }})
      .catch(error => console.log(error))
  }

  function form() {
    return (
      <View style={LoginStyles.container2}>
        {/* Logo */}
        <View style={LoginStyles.logoContainer}></View>
        <View style={LoginStyles.whitePanel}>
          <View style={LoginStyles.logoContainer}>
            <View style={LoginStyles.logo}>
                <Image 
                  source={require('../../../assets/studygo6.png')} 
                  style={{height: 50, width: 50}}
                />
            </View>
          </View>

          {/* Title */}
          <Text style={{fontFamily: 'sourcesanspro-semibold', fontSize: 30, marginTop: 10}}>Sign in</Text>
          {/* Sign in with google button */}
          <TouchableOpacity style={LoginStyles.ggBtn} onPress={handleGoogleSignIn}>
            <AntDesign name="googleplus" size={24} color="#fff" />
            <Text style={LoginStyles.ggBtnTxt}>
              {'Sign in with '}
              <Text style={{fontFamily: 'sourcesanspro-semibold'}}>Google</Text>
            </Text>
          </TouchableOpacity>
          
          {/* or line */}
          <View style={{
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '5%',
            width: '100%'
          }}>
            <View style={{width: '45%', borderBottomWidth: 1, borderColor: '#d3d3d3'}}></View>
            <Text style={{
              fontFamily: 'sourcesanspro-regular',
              fontStyle: 'italic',
              fontSize: 18,
            }}>or</Text>
            <View style={{width: '45%', borderBottomWidth: 1, borderColor: '#d3d3d3'}}></View>
          </View>

          {/* invalid warning */}
          {
            !isValid &&
            <Text style={LoginStyles.wrongInputAlert}>Email or password was incorrect, please try again</Text>
          }

          {/* email input */}
          <View style={[LoginStyles.input, emptyEmail && {marginBottom: 0}]}>
            <View style={LoginStyles.inpIconContainer}>
              <Entypo name="mail" size={24} color="black" />
            </View>
            <TextInput 
              style={LoginStyles.textInput}
              placeholder='Email'
              value={email}
              onChangeText={handleInputEmail}
            />
          </View>
          {
            emptyEmail &&
            <Text style={LoginStyles.wrongInputAlert}>
              Please enter email
            </Text>
          }     

          {/* password input */}
          <View style={[LoginStyles.input, emptyPassword && {marginBottom: 0}]}>
            <View style={LoginStyles.inpIconContainer}>
              <FontAwesome name="lock" size={24} color="black" />
            </View>
            <TextInput 
              secureTextEntry={secureInput} 
              style={[LoginStyles.textInput, {flex: 4}]}
              placeholder='Password'
              value={password}
              onChangeText={handleInputPassword}
            />
            <TouchableOpacity style={LoginStyles.eyeContainer} onPress={() => setSecureInput(prev => !prev)}>
              {
                secureInput
                ? <Ionicons name="ios-eye-off" size={20} color="black" />
                : <Ionicons name="ios-eye" size={20} color="black" />
              }
            </TouchableOpacity>
          </View>
          {
            emptyPassword &&
            <Text style={LoginStyles.wrongInputAlert}>
              Please enter password
            </Text>
          }

          {/* Sign in button */}
          <TouchableOpacity style={LoginStyles.signInBtn} onPress={handleLogin}>
            <Text 
              style={{
                fontFamily: 'sourcesanspro-semibold',
                fontSize: 18,
                color: '#fff'
              }}
            >Sign in</Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 20, flexDirection: 'row'}}>
          <Text style={{fontFamily: 'sourcesanspro-regular'}}>{"Don't have an account? "}</Text>
          <TouchableOpacity onPress={moveToRegister}>
            <Text style={{fontFamily: 'sourcesanspro-regular', textDecorationLine: 'underline'}}>Sign up here!</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {
        Platform.OS === 'ios'
          ? <KeyboardAwareScrollView
            style={{ backgroundColor: '#e76f51' }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={LoginStyles.container}
            scrollEnabled={true}
          >
            <Spinner
              visible={loading}
              textContent='Loading...'
              textStyle={LoginStyles.spinner}
            />
            {form()}
          </KeyboardAwareScrollView>
          : <View style={LoginStyles.container}>
            <Spinner
              visible={loading}
              textContent='Loading...'
              textStyle={LoginStyles.spinner}
            />
            {form()}
          </View>
      }
    </TouchableWithoutFeedback>
  )
}