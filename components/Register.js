import React, { useState } from 'react'
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native'
import { LoginStyles } from '../style/LoginStyles'

export default class Register extends React.Component{
  state = {
    email: '',
    password: '',
    repeatPassword: '',
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  handleNavigation = () => {
    this.props.navigation.goBack()
  }
  handleRegister = () => {
    
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
              <TextInput 
                secureTextEntry={true} 
                style={LoginStyles.input} 
                placeholder='Password'
                value={this.password}
                onChangeText={(text) => this.handleChange('password', text)}
              />
              <TextInput 
                secureTextEntry={true} 
                style={LoginStyles.input} 
                placeholder='Repeat Password'
                value={this.repeatPassword}
                onChangeText={(text) => this.handleChange('repeatPassword', text)}
              />
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