import React, { useState } from 'react'
import { 
  View, Text, TextInput, TouchableWithoutFeedback, 
  Keyboard, TouchableOpacity, Alert, Platform, Image
} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { LoginStyles } from '../../../style/LoginStyles'
import {MaterialIcons, Entypo, FontAwesome, Ionicons} from '@expo/vector-icons'

export default class Register extends React.Component{
  state = {
    username: '',
    email: '', // main property
    password: '', // main property
    repeatPassword: '', // main property
    validUsername: true,
    validEmail: true,
    samePasswords: true,
    validPassword: true, // true if password.length < 6
    validRepeatPassword: true, // true if password.length < 6
    emailUsed: false,
    loading: false,
    secureInput1: true,
    secureInput2: true
  }

  validateEmail = (email) => {
    //reference: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
    this.setState({
      ['valid' + name.charAt(0).toUpperCase() + name.slice(1)]: true
    })
    if (name === 'password' || name === 'repeatPassword') {
      this.setState({ samePasswords: true })
    }
  }

  handleNavigation = () => {
    this.props.navigation.goBack()
  }

  handleApiResponse = ({ StatusCode }) => {
    this.setState({
      password: '',
      repeatPassword: '',
      email: '',
      username: '',
    })
    if (StatusCode === 409) {
      Alert.alert('Error', 'The email has been registered', [
        {text: 'OK', onPress:  () => {}}
      ])
    } else if (StatusCode === 500) {
      Alert.alert('Error', 'Server error', [
        {text: 'OK', onPress: () => {}}
      ])
    } else {
      Alert.alert('Success', 'Successfully registered', [
        {text: 'Go to login', onPress: this.handleNavigation}
      ])
    }
  }
  handleRegister = () => {
    let isValid = true;

    // check for validation before sending request to the api
    if (this.state.username.length < 1) { // check if the user has entered a username
      isValid = false
      this.setState({ validUsername: false })
    }
    if (this.state.password.length < 6) { // check if the user has entered a password
      isValid = false
      this.setState({ validPassword: false })
    }
    if (this.state.repeatPassword.length < 1) { // check if the user has entered a confirm password
      isValid = false
      this.setState({ validRepeatPassword: false })
    }
    if (this.state.repeatPassword !== this.state.password) { // check if passwords are the same
      isValid = false
      this.setState({ samePasswords: false })
    }
    if (!this.validateEmail(this.state.email)) { // check if the email is valid
      isValid = false
      this.setState({ validEmail: false })
    }

    // if email and password are valid, send request to the api
    if (isValid) {
      this.setState({ loading: true })
      let requestOption = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          username: this.state.username
        })
      }
      fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/register', requestOption)
        .then(res => res.json())
        .then(data => {
          this.setState({loading: false})
          this.handleApiResponse(data)
        })
        .catch(error => console.log(error))
    }  
  }

  form = () => (
    <View style={LoginStyles.container2}>
        <KeyboardAwareScrollView enableOnAndroid={true}>
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
          <Text style={{fontFamily: 'sourcesanspro-semibold', fontSize: 30, marginTop: 10}}>Sign up</Text>

          {/* username */}
          <View style={[LoginStyles.input, !this.state.validUsername && {marginBottom: 0}]}>
            <View style={LoginStyles.inpIconContainer}>
              <MaterialIcons name="person" size={24} color="black" />
            </View>
            <TextInput 
              style={LoginStyles.textInput}
              placeholder='Username'
              value={this.state.username}
              onChangeText={(text) => this.handleChange('username', text)}
            />
          </View>
          { 
            !this.state.validUsername &&
            <Text style={LoginStyles.wrongInputAlert}>
              Username cannot be empty
            </Text>
          }

          {/* email */}
          <View style={[LoginStyles.input, !this.state.validEmail && {marginBottom: 0}]}>
            <View style={LoginStyles.inpIconContainer}>
              <Entypo name="mail" size={24} color="black" />
            </View>
            <TextInput 
              style={LoginStyles.textInput}
              placeholder='Email'
              value={this.state.email}
              onChangeText={(text) => this.handleChange('email', text)}
            />
          </View>
          { 
            !this.state.validEmail &&
            <Text style={LoginStyles.wrongInputAlert}>
              Please enter a valid email
            </Text>
          }

          {/* password */}
          <View style={[LoginStyles.input, !this.state.validPassword && {marginBottom: 0}]}>
            <View style={LoginStyles.inpIconContainer}>
              <FontAwesome name="lock" size={24} color="black" />
            </View>
            <TextInput 
              secureTextEntry={this.state.secureInput1} 
              style={LoginStyles.textInput}
              placeholder='Password'
              value={this.state.password}
              onChangeText={(text) => this.handleChange('password', text)}
            />
            <TouchableOpacity style={LoginStyles.eyeContainer} onPress={() => this.setState({secureInput1: !this.state.secureInput1})}>
              {
                this.state.secureInput1
                ? <Ionicons name="ios-eye-off" size={20} color="black" />
                : <Ionicons name="ios-eye" size={20} color="black" />
              }
            </TouchableOpacity>
          </View>
          { 
            !this.state.validPassword &&
            <Text style={LoginStyles.wrongInputAlert}>
              Password must have at least 6 characters
            </Text>
          }

          {/* repeat password */}
          <View style={[LoginStyles.input, !this.state.validRepeatPassword && {marginBottom: 0}]}>
            <View style={LoginStyles.inpIconContainer}>
              <FontAwesome name="lock" size={24} color="black" />
            </View>
            <TextInput 
              secureTextEntry={this.state.secureInput2} 
              style={LoginStyles.textInput}
              placeholder='Repeat password'
              value={this.state.repeatPassword}
              onChangeText={(text) => this.handleChange('repeatPassword', text)}
            />
            <TouchableOpacity style={LoginStyles.eyeContainer} onPress={() => this.setState({secureInput2: !this.state.secureInput2})}>
              {
                this.state.secureInput2
                ? <Ionicons name="ios-eye-off" size={20} color="black" />
                : <Ionicons name="ios-eye" size={20} color="black" />
              }
            </TouchableOpacity>
          </View>
          { 
            !this.state.validRepeatPassword &&
            <Text style={LoginStyles.wrongInputAlert}>
              Please confirm your password
            </Text>
          } 
          { 
            this.state.validPassword && 
            this.state.validRepeatPassword && 
            !this.state.samePasswords &&
            <Text style={LoginStyles.wrongInputAlert}>
              Passwords do not match
            </Text>
          }

          {/* Sign up button */}
          <TouchableOpacity style={LoginStyles.signInBtn} onPress={this.handleRegister}>
            <Text 
              style={{
                fontFamily: 'sourcesanspro-semibold',
                fontSize: 20,
                color: '#fff'
              }}
            >Sign up</Text>
          </TouchableOpacity>
        </View>

        {/* move to sign in */}
        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 20, flexDirection: 'row'}}>
          <Text style={{fontFamily: 'sourcesanspro-regular'}}>{"Already had an account? "}</Text>
          <TouchableOpacity onPress={this.handleNavigation}>
            <Text style={{fontFamily: 'sourcesanspro-regular', textDecorationLine: 'underline'}}>Sign in</Text>
          </TouchableOpacity>
        </View>
        </KeyboardAwareScrollView>
    </View>
  )

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {
          Platform.OS === 'ios'
          ? <KeyboardAwareScrollView 
              style={{backgroundColor: 'coral'}}
              resetScrollToCoords={{x: 0, y: 0}}
              contentContainerStyle={LoginStyles.container}
              scrollEnabled={true}
            >
              <Spinner
                visible={this.state.loading}
                textContent='Loading...'
                textStyle={LoginStyles.spinner}
              />
              {this.form()}
            </KeyboardAwareScrollView>
          : <View style={LoginStyles.container}>
              <Spinner
                visible={this.state.loading}
                textContent='Loading...'
                textStyle={LoginStyles.spinner}
              />
              {this.form()}
            </View>
        }
      </TouchableWithoutFeedback>
    )
  }
}