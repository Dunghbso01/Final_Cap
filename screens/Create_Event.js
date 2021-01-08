import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native'
import Fire from "../Fire";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

class Creat_Event extends Component {
   state = {
      EventText: '',
      EventLocation: '',
      image : null,
      EventStartDay: '',
      EventEndDay: '',
      EventUid: '',
   }

    handleEvent = () => {
        Fire.shared
          .addEvent({ EventText: this.state.EventText.trim(), EventLocation: this.state.EventLocation.trim(),EventStartDay: this.state.EventStartDay.trim(),
            EventEndDay: this.state.EventEndDay.trim(), localUri: this.state.EventImage
         })
          .then((ref) => {
            this.setState({ EventText: "", EventLocation : "" , EventStartDay: "", EventEndDay: "",  EventImage : null});
             this.props.navigation.goBack();
          })
          .catch((error) => {
            alert(error);
          });
      };
      pickImage = async () => {
         let result = await ImagePicker.launchImageLibraryAsync({
           mediaTypes: ImagePicker.MediaTypeOptions.Images,
           allowsEditing: true,
           aspect: [4, 3],
         });
     
         if (!result.cancelled) {
           this.setState({ image: result.uri });
         }
       };
     
 
   render() {
      return (
         <View style = {styles.container}>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Mô tả sự kiện"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleName}/>

              
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Địa Điểm"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleAddress}/>               
             
                
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Thời gian bắt đầu"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleAddress}/>      
                
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Thời gian kết thúc"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleAddress}/>   

         <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
          <Ionicons name="md-camera" size={32} color="#2F4F4F"></Ionicons>
        </TouchableOpacity>
        <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
          <Image
            source={{ uri: this.state.image }}
            style={{ width: "100%", height: "100%" }}
          ></Image>
        </View>
                
      

            <TouchableOpacity
               style = {styles.submitButton}
               onPress={this.handleEvent}
               >
               <Text style = {styles.submitButtonText}> Tạo Event  </Text>
            </TouchableOpacity>
         </View>
         
      )
   }
}
export default Creat_Event

const styles = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   },
   photo: {
      alignItems: "flex-end",
      marginHorizontal: 20,
    },
})