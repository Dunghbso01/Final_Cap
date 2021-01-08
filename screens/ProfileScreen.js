import * as ImagePicker from 'expo-image-picker';

import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';

import Fire from '../Fire';
import {Ionicons} from '@expo/vector-icons'
import UserPermissions from '../utilities/UserPermissions';

export default class ProfileScreen extends Component {

  state={
    user:{}
  }
   unsubscribe=null

   componentDidMount(){
      const user=this.props.uid || Fire.shared.uid
      this.unsubscribe=Fire.shared.firestore.collection('users').doc(user).onSnapshot(doc=>{
        this.setState({user:doc.data()})
      })


   }

   componentWillUnmount(){
     this.unsubscribe()
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
    return (
      <View style={styles.container}>
       <View style={{marginTop:63,alignItems:'center'}}>
         
    <Text style={styles.name}>{this.state.user.name}</Text>
      <View style={styles.statsContainer}>

      </View>
       </View>
       <TouchableOpacity style={styles.button} onPress={()=>Fire.shared.signOut()}>
         <Text style={{color:'#FFF',fontWeight:'500'}}>Log out</Text>
      </TouchableOpacity>     
       </View>
    );
  }
}

const styles=StyleSheet.create({
    container:{
        flex:1
      },
      avatarContainer:{
        width: 100,
        height: 100,
        backgroundColor: '#e1e2e6',
        borderRadius: 50,
        marginTop: 48,
        justifyContent: 'center',
        alignItems: 'center'
      },
      avatar:{
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50
      },
      name:{
        marginTop:24,
        fontSize:16,
        fontWeight:'700'
      },
      statsContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        margin:32
      },
      stat:{
        alignItems:'center',
        flex:1
      },
      statAmount:{
        color:'#4F566D',
        fontSize:18,
        fontWeight:'300'
      },
      statTitle:{
        color:'#C3C5CD',
        fontSize:12,
        fontWeight:'500',
        marginTop:4

      },
      button:{
        marginHorizontal:30,
        backgroundColor:"#E9446A",
        borderRadius:4,
        height:52,
        alignItems:'center',
        justifyContent:'center'
  
    }
})
