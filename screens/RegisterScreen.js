import * as ImagePicker from 'expo-image-picker'

import { Image, ImageBackground, LayoutAnimation, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';

// import DropDownPicker from 'react-native-dropdown-picker';
import Fire from '../Fire'
import Icon from 'react-native-vector-icons/Feather';
import {Ionicons} from '@expo/vector-icons'
import UserPermissions from '../utilities/UserPermissions';

;

export default class RegisterScreen extends Component {

    static navigationOptions={
        headerShown:false
    }

    

    state = {
        user: {
          name: '',
          email: '',
          password: '',
          avatar: null
        },
        errorMessage: null
      };
    

    handleSignup=()=>{
       Fire.shared.createUSer(this.state.user)

    }

    handlePickAvatar=async()=>{
       // UserPermissions.getPhotoPermissions()
        let result=await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[4,3]
        })
        if(!result.cancelled){
            console.log(result.uri)
            this.setState({ user: { ...this.state.user, avatar: result.uri } });
        }
    }

                                                                                                                                                                                                                                                                                                                                                                                                                                            

  render() {
    LayoutAnimation.easeInEaseOut()

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>     
        <ImageBackground
          source={require('../assets/images/background.jpg')}
          style={{flex: 1,
            width: null,
            height: null,
            justifyContent:'center'}}>
        <TouchableOpacity style={styles.back} onPress={()=>this.props.navigation.navigate('Login')}>
            <Ionicons name='ios-arrow-round-back' size={32} color="#FFF"></Ionicons>
        </TouchableOpacity>
        <View>
        <View style={{position:'absolute',alignItems:'center',width:'100%'}}>
        <Text style={styles.greeting}> {`Đăng ký`} </Text>
            <TouchableOpacity style={styles.avatarPlaceholder}onPress={this.handlePickAvatar}>
                <Image source={{uri:this.state.user.avatar}} style={styles.avatar}/>
                <Ionicons name="ios-add" size={25} color="#FFF" >

                </Ionicons>
            </TouchableOpacity>
            {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}

        </View>

       
     
      <View style={styles.form}>
      <View>
            <Text style={styles.inputTitle}>Tên</Text>
            <TextInput style={styles.input} autoCapitalize="none"
            onChangeText={name=> this.setState({ user: { ...this.state.user, name } })}
            value={this.state.user.name}></TextInput>
        </View>
        <View  style={{marginTop:16}}>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput style={styles.input} autoCapitalize="none"
            onChangeText={email=>this.setState({ user: { ...this.state.user, email } })
        }
            value={this.state.user.email}></TextInput>
        </View>
        <View style={{marginTop:16}}>
            <Text style={styles.inputTitle}>Mật khẩu</Text>
            <TextInput style={styles.input} autoCapitalize="none" secureTextEntry
            value={this.state.user.password}
            onChangeText={password=>this.setState({ user:{...this.state.user,password }})}></TextInput>
        </View>
        
      </View>
      <TouchableOpacity style={styles.button} onPress={this.handleSignup}>
          <Text style={{color:'#FFF',fontWeight:'500'}}>Đăng ký</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      style={{alignSelf:'center',marginTop:32}}
      onPress={()=>this.props.navigation.navigate('Login')}>
        
        <Text style={{color:'#FFF',fontSize:12}}>
           Đã có tài khoản? <Text style={{fontWeight:'500',color:'#8A89FE'}}>
                Đăng nhập
            </Text>
        </Text>

      </TouchableOpacity>
      
      </View>
      </ImageBackground>
      </View>
      
    );
  }
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#FFF'
  },
  greeting:{
      fontSize:25,
      fontWeight:'400',
      textAlign:'center',
      color: '#FFF'
  },
  errorMessage:{
      marginTop:6,
      alignItems:'center',
      justifyContent:'center',
      marginHorizontal:30
  },
  form:{
    marginTop:200,
    marginHorizontal:30
  },
  inputTitle:{
      color:'#8A89FE',
      fontSize:10,
      textTransform:'uppercase'
  },
  input:{
      borderBottomColor:'#8A8F9E',
      borderBottomWidth:StyleSheet.hairlineWidth,
      height:40,
      fontSize:15,
      color:"#FFF"
  },
  button:{
      marginHorizontal:30,
      backgroundColor:"#E9446A",
      borderRadius:4,
      height:52,
      alignItems:'center',
      justifyContent:'center',
      marginTop:16

  },
  error:{
      color:'#E9446A',
      fontSize:13,
      fontWeight:'600',
      textAlign:'center',
      marginTop:16

  },
  back:{
      position: 'absolute',
      top:16,
      left:16,
      width:32,
      height:32,
      borderRadius:16,
      backgroundColor:'rgba(21,22,48,0.1)',
      alignItems:'center',
      justifyContent:'center'
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#696969',
    borderRadius: 50,
    marginTop: 48,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 50
  }

})