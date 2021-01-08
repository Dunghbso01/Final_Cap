import { FlatList, Image, LayoutAnimation, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';

import Fire from '../Fire'
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment'

export default class NewFeed_Event extends Component {
                                                                                                                                                                                                                                                                                                                                                                                                                                            
constructor(props){
  super(props)
  this.ref =  Fire.shared.firestore.collection('events')
  this.useref=
  this.state={
    dataSource : []
  }

}
componentDidMount(){
  this.unsubscribe = this.ref.onSnapshot(this.feedEvent);
}

feedEvent = (postSnapShot) =>{
  const Event = [];
  postSnapShot.forEach((doc) => {
  const {uid,EventText,EventLocation,EventStartDay,EventEndDay,timestamp} = doc.data();
  const data=Fire.shared.firestore
  .collection('users')
  .doc(uid)
  .get()
  .then(doc=>{
    Event.push({
      avatar:doc.data().avatar
      ,name:doc.data().name,
      uid,
      EventText,
      EventLocation,
      EventStartDay,
      EventEndDay,
      timestamp
    })
    this.setState({
      dataSource : Event,
    });
  })
  
  }); 
}
 
renderEvent=Event=>{
  return(
    <View style={styles.feedItem}>
      <Image source={Event.avatar?{uri:Event.avatar}:require('../assets/images/avatar.png')} style={styles.avatar}/>
      <View style={{flex:1}}>
      <View style={{flexDirection:'row',justifyContent:'space-between'
    ,alignItems:'center'}}>
      <View>
  <Text style={styles.name}>{Event.name?Event.name:'yo'}</Text>
  <Text style={styles.timestamp}>{moment(Event.timestamp).fromNow()}</Text>
      </View>
      <Ionicons name='ios-more' size={24} color='#73788B'/>
      </View>
  <Text style={styles.post}>{Event.EventName}</Text>
  <Text style={styles.post}>{Event.Address}</Text>
  {/* <Image source={{uri:post.image}} style={styles.postImage} resizeMode='cover'/> */}
  <View style={{flexDirection:'row'}}>
    <Ionicons name='ios-heart-empty' size={24} color="#737888"
    style={{marginRight:16}}/>
    <Ionicons
    name='ios-chatboxes'
    size={24}
    color="#73788B"/>

  </View>
      </View>
    </View>
  )

}

  render() {
    LayoutAnimation.easeInEaseOut()
    return (
      <View style={styles.container}>
       <View style={styles.header}>
         <Text style={styles.headerTitle}>
            NewFeed
         </Text>

       </View>
       <FlatList style={styles.feed}
       data={this.state.dataSource}
       renderItem={({item})=>this.renderPost(item)}
       keyExtractor={item=>item.uid}
       showsVerticalScrollIndicator={false}
       />
      </View>
    );
  }
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#EFECF4'
  },
  header:{
    paddingTop:48,
    paddingBottom:16,
    backgroundColor:'#FFF',
    alignItems:'center',
    borderBottomWidth:1,
    justifyContent:'center',
    borderBottomColor:'#EBECF4',
    shadowColor:'#454D65',
    shadowOffset:{height:5},
    shadowRadius:15,
    shadowOpacity:0.2,
    zIndex:10
  },
  headerTitle:{
    fontSize:20,
    fontWeight:'500'
  },
  feed:{
    marginHorizontal:16
  },
  feedItem:{
    backgroundColor:'#FFF',
    borderRadius:5,
    padding:8,
    flexDirection:'row',
    marginVertical:8
  },
  avatar:{
    width:36,
    height:36,
    borderRadius:18,
    marginRight:16
  },
  name:{
    fontSize:15,
    fontWeight:'500',
    color:'#454D65'
  },
  timestamp:{
    fontSize:11,
    color:'#C4C6CE',
    marginTop:4
  },
  post:{
    marginTop:16,
    fontSize:14,
    color:'#838899'
  },
  postImage:{
    width:undefined,
    height:150,
    borderRadius:5,
    marginVertical:16
  }

})
