import {Dimensions, Platform, StyleSheet } from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {sky_blue, blue, black, white} from '../constant/img/Colors/color';

module.exports =  StyleSheet.create({

   container: {
      flex:1,
   },
   safeAreaView:{
      flex:1,
      backgroundColor:white
   },
   logo:{
      height:200,
      width:200,
      alignSelf:"center"
   },
   userPlaceHolder:{
      height:100,
      width:100,
      alignSelf:"center"
   },
   button:{
      width:"50%",
      justifyContent:"center",
      height:45,
      borderRadius:10,
      justifyContent:"center",
      alignItems:"center"
   },
   buttonText:{
      fontSize:RFValue(14,580),
      color:blue,
      fontFamily:"Poppins-Regular"
   },
   input:{ 
      alignSelf:"center",
      borderWidth:1,
      borderColor:blue,
      borderRadius:5,
      paddingLeft:10,
      color: "#222222", 
      fontFamily: "Poppins-Regular", 
      fontSize: RFValue(12, 580),
      width:Dimensions.get('window').width/1.15,
   },
   text:{
      color:blue,
      fontFamily:"Poppins-Regular",
      fontSize:RFValue(14,580)
   },
   loginButton:{
      width:Dimensions.get('window').width/1.15,
      backgroundColor:sky_blue,
      alignSelf:"center",
      borderRadius:5,
      padding:5,
      height:50,
      justifyContent:"center",
      borderWidth:1,
      borderColor:blue,
   },
   forgotButton:{
      width:Dimensions.get('window').width/2,
      backgroundColor:sky_blue,
      alignSelf:"center",
      borderRadius:5,
      padding:5,
      height:50,
      justifyContent:"center",
      borderWidth:1,
      borderColor:blue,
   },
   userImg:{
      height:60,
      width:60,
      borderRadius:100 
   },
   nameText:{
      fontSize:RFValue(15,580),
      fontFamily:"Poppins-SemiBold",
      color:black
   },
   headerHeadingText: {
      fontSize: RFValue(13, 580),
      marginLeft: 7,
      color: "#4A4B4D",
      alignSelf: "center",
    },
  
    header: {
      backgroundColor: white,
      flexDirection: "row",
      padding: 10,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5
    },
    headerText:{
      color:black,
      alignSelf:"center",
      fontSize:RFValue(14,580),
      left:10,
      fontWeight:"500",
      marginTop:Platform.OS == "ios" ? 7 : 5,
      fontFamily:"Poppins-SemiBold"
    }
  
  

});

