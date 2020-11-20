import 'firebase/auth';

import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';

import Fire from '../Fire'
import firebase from 'firebase/app';

export default class LoadingScreen extends Component {
                   
  componentDidMount(){

    firebase.auth().onAuthStateChanged(user=>{
      this.props.navigation.navigate(user?"App":"Auth")
    })

    
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> LoadingScreen </Text>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );
  }
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
  }

})
