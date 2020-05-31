import React, { useState } from 'react'
import { 
  View, Text, TextInput, TouchableWithoutFeedback, 
  Keyboard, TouchableOpacity, Alert, Platform
} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { LoginStyles } from '../style/LoginStyles'

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
    loading: false
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
    <View style={LoginStyles.whitePanel}>
      <View style={LoginStyles.loginShow}>
        <Text h2 style={LoginStyles.heading}>Create Account</Text>
        <TextInput
          style={LoginStyles.input} 
          placeholder='Username'
          value={this.state.username}
          onChangeText={(text) => this.handleChange('username', text)}
        />
        { 
          !this.state.validUsername &&
          <Text style={LoginStyles.wrongInputAlert}>
            Username cannot be empty
          </Text>
        }
        <TextInput
          style={LoginStyles.input} 
          placeholder='Email'
          value={this.state.email}
          onChangeText={(text) => this.handleChange('email', text)}
        />
        { 
          !this.state.validEmail &&
          <Text style={LoginStyles.wrongInputAlert}>
            Please enter a valid email
          </Text>
        }
        <TextInput 
          secureTextEntry={true} 
          style={LoginStyles.input} 
          placeholder='Password'
          value={this.state.password}
          onChangeText={(text) => this.handleChange('password', text)}
        />
        { 
          !this.state.validPassword &&
          <Text style={LoginStyles.wrongInputAlert}>
            Password must have at least 6 characters
          </Text>
        }
        <TextInput 
          secureTextEntry={true} 
          style={LoginStyles.input} 
          placeholder='Repeat Password'
          value={this.state.repeatPassword}
          onChangeText={(text) => this.handleChange('repeatPassword', text)}
        />
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
        <View style={LoginStyles.bottomRow}>
          <TouchableOpacity onPress={this.handleNavigation}>
            <Text style={LoginStyles.link}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={LoginStyles.button} onPress={this.handleRegister}>
            <Text style={LoginStyles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/* <View style={LoginStyles.container}>
          {this.form()}
        </View> */}
        {
          Platform.OS === 'ios'
          ? <KeyboardAwareScrollView 
              style={{backgroundColor: 'coral'}}
              resetScrollToCoords={{x: 0, y: 0}}
              contentContainerStyle={LoginStyles.container}
              scrollEnabled={false}
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