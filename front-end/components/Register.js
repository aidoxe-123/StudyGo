import React, { useState } from 'react'
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from 'react-native'
import { LoginStyles } from '../style/LoginStyles'

export default class Register extends React.Component{
  state = {
    email: '', // main property
    password: '', // main property
    repeatPassword: '', // main property
    validEmail: true,
    samePasswords: true,
    emptyPassword: false,
    emptyRepeatPassword: false,
    emailUsed: false,
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
    if (name === 'email') {
      this.setState({
        validEmail: true,
      })
    }
    if (name === 'password' || name === 'repeatPassword') {
      this.setState({
        samePasswords: true,
        ['empty' + name.charAt(0).toUpperCase() + name.slice(1)]: false,
      })
    }
  }

  handleNavigation = () => {
    this.props.navigation.goBack()
  }

  handleApiResponse = ({emailUsed}) => {
    if (emailUsed) {
      this.setState({
        password: '',
        repeatPassword: ''
      })
      Alert.alert('Error', 'The email has been registered', [
        {text: 'OK', onPress:  () => {}}
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
    if (this.state.password.length < 6) { // check if the user has entered a password
      isValid = false
      this.setState({
        emptyPassword: true,
      })
    }
    if (this.state.repeatPassword.length < 6) { // check if the user has entered a confirm password
      isValid = false
      this.setState({
        emptyRepeatPassword: true,
      })
    }
    if (this.state.repeatPassword !== this.state.password) { // check if passwords are the same
      isValid = false
      this.setState({
        samePasswords: false,
      })
    }
    if (!this.validateEmail(this.state.email)) { // check if the email is valid
      isValid = false
      this.setState({
        validEmail: false
      })
    }

    // if email and password are valid, send request to the api
    if (isValid) {
      let requestOption = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      }
      fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/register', requestOption)
        .then(res => res.json())
        .then(data => this.handleApiResponse(data))
        .catch(error => console.log(error))
    }  
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={LoginStyles.container}>
          <View style={LoginStyles.whitePanel}>
            <View style={LoginStyles.loginShow}>
              <Text h2 style={LoginStyles.heading}>Create Account</Text>
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
                value={this.password}
                onChangeText={(text) => this.handleChange('password', text)}
              />
              { 
                this.state.emptyPassword &&
                <Text style={LoginStyles.wrongInputAlert}>
                  Password must have at least 6 characters
                </Text>
              }
              <TextInput 
                secureTextEntry={true} 
                style={LoginStyles.input} 
                placeholder='Repeat Password'
                value={this.repeatPassword}
                onChangeText={(text) => this.handleChange('repeatPassword', text)}
              />
              { 
                !this.state.emptyPassword && 
                !this.state.emptyRepeatPassword && 
                !this.state.samePasswords &&
                <Text style={LoginStyles.wrongInputAlert}>
                  Passwords do not match
                </Text>
              }
              { 
                this.state.emptyRepeatPassword &&
                <Text style={LoginStyles.wrongInputAlert}>
                  Please confirm your password
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
        </View>
      </TouchableWithoutFeedback>
    )
  }
}