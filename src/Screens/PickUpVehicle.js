import React, { Component } from "react";
import {SafeAreaView, ScrollView,
   Text, View, Image, TouchableOpacity, 
   StyleSheet, Dimensions, Platform, FlatList, ImageBackground } from 'react-native';
import { black, blue, grey, lightGray, sky_blue, white } from "../constant/img/Colors/color";
import { RFValue } from "react-native-responsive-fontsize";
import { Icon } from "react-native-elements";
import { bike1, footerView } from "../Config.js/Constants";


//global styleSheet
const style = require("../StyleSheet/Styles");


class PickUpVehicle extends Component{

   constructor(props){
      super(props);
      this.state = {
       
      }
   }

   handleBackButtonClick= () => {
      this.props.navigation.goBack(null);
   }

  
   renderItem=({item})=>(
      <View>
         <View style={styles.viewBox}>
            <View style={{width:Platform.OS == "ios" ? "15%" : "15%",justifyContent:"center",alignItems:"center"}}>
               <Image source={bike1} style={styles.image}/>
            </View>

            <View style={{width:Platform.OS == "ios" ? "55%" : "60%",justifyContent:"center",marginLeft:15}}>
              <Text style={styles.smallText}>BluWheelz Vehicle</Text>
              <Text style={styles.text}>Type : Petrol</Text>
            </View>

            <View style={{width:Platform.OS == "ios" ? "30%" : "25%",justifyContent:"center"}}>
              <Text style={styles.getVehicleText} onPress={()=>this.props.navigation.navigate("GetPickupVehicle")}>Get Vehicle</Text>
            </View>
         </View>


         <View style={styles.viewBox}>
            <View style={{width:Platform.OS == "ios" ? "15%" : "15%",justifyContent:"center",alignItems:"center"}}>
               <Image source={bike1} style={styles.image}/>
            </View>

            <View style={{width:Platform.OS == "ios" ? "55%" : "60%",justifyContent:"center",marginLeft:15}}>
              <Text style={styles.smallText}>BluWheelz Vehicle</Text>
              <Text style={styles.text}>Type : Petrol</Text>
            </View>

            <View style={{width:Platform.OS == "ios" ? "30%" : "25%",justifyContent:"center"}}>
              <Text style={styles.getVehicleText} onPress={()=>this.props.navigation.navigate("GetPickupVehicle")}>Get Vehicle</Text>
            </View>
         </View>


         <View style={styles.viewBox}>
            <View style={{width:Platform.OS == "ios" ? "15%" : "15%",justifyContent:"center",alignItems:"center"}}>
               <Image source={bike1} style={styles.image}/>
            </View>

            <View style={{width:Platform.OS == "ios" ? "55%" : "60%",justifyContent:"center",marginLeft:15}}>
              <Text style={styles.smallText}>BluWheelz Vehicle</Text>
              <Text style={styles.text}>Type : Petrol</Text>
            </View>

            <View style={{width:Platform.OS == "ios" ? "30%" : "25%",justifyContent:"center"}}>
              <Text style={styles.getVehicleText} onPress={()=>this.props.navigation.navigate("GetPickupVehicle")}>Get Vehicle</Text>
            </View>
         </View>

         <View style={styles.viewBox}>
            <View style={{width:Platform.OS == "ios" ? "15%" : "15%",justifyContent:"center",alignItems:"center"}}>
               <Image source={bike1} style={styles.image}/>
            </View>

            <View style={{width:Platform.OS == "ios" ? "55%" : "60%",justifyContent:"center",marginLeft:15}}>
              <Text style={styles.smallText}>BluWheelz Vehicle</Text>
              <Text style={styles.text}>Type : Petrol</Text>
            </View>

            <View style={{width:Platform.OS == "ios" ? "30%" : "25%",justifyContent:"center"}}>
              <Text style={styles.getVehicleText} onPress={()=>this.props.navigation.navigate("GetPickupVehicle")}>Get Vehicle</Text>
            </View>
         </View>

         <View style={styles.viewBox}>
            <View style={{width:Platform.OS == "ios" ? "15%" : "15%",justifyContent:"center",alignItems:"center"}}>
               <Image source={bike1} style={styles.image}/>
            </View>

            <View style={{width:Platform.OS == "ios" ? "55%" : "60%",justifyContent:"center",marginLeft:15}}>
              <Text style={styles.smallText}>BluWheelz Vehicle</Text>
              <Text style={styles.text}>Type : Petrol</Text>
            </View>

            <View style={{width:Platform.OS == "ios" ? "30%" : "25%",justifyContent:"center"}}>
              <Text style={styles.getVehicleText} onPress={()=>this.props.navigation.navigate("GetPickupVehicle")}>Get Vehicle</Text>
            </View>
         </View>


         <View style={styles.viewBox}>
            <View style={{width:Platform.OS == "ios" ? "15%" : "15%",justifyContent:"center",alignItems:"center"}}>
               <Image source={bike1} style={styles.image}/>
            </View>

            <View style={{width:Platform.OS == "ios" ? "55%" : "60%",justifyContent:"center",marginLeft:15}}>
              <Text style={styles.smallText}>BluWheelz Vehicle</Text>
              <Text style={styles.text}>Type : Petrol</Text>
            </View>

            <View style={{width:Platform.OS == "ios" ? "30%" : "25%",justifyContent:"center"}}>
              <Text style={styles.getVehicleText} onPress={()=>this.props.navigation.navigate("GetPickupVehicle")}>Get Vehicle</Text>
            </View>
         </View>

         <View style={styles.viewBox}>
            <View style={{width:Platform.OS == "ios" ? "15%" : "15%",justifyContent:"center",alignItems:"center"}}>
               <Image source={bike1} style={styles.image}/>
            </View>

            <View style={{width:Platform.OS == "ios" ? "55%" : "60%",justifyContent:"center",marginLeft:15}}>
              <Text style={styles.smallText}>BluWheelz Vehicle</Text>
              <Text style={styles.text}>Type : Petrol</Text>
            </View>

            <View style={{width:Platform.OS == "ios" ? "30%" : "25%",justifyContent:"center"}}>
              <Text style={styles.getVehicleText} onPress={()=>this.props.navigation.navigate("GetPickupVehicle")}>Get Vehicle</Text>
            </View>
         </View>

         

         
      </View>
   )


   render(){
      return(
         <View style={style.container}> 
         <SafeAreaView style={style.safeAreaView}>
            
            {/* custom header */}
            <View style={[style.header, { flexDirection: "row", justifyContent: "space-between" }]}>
               <View style={{ flexDirection: "row", left: 5, justifyContent: "center" }}>
                  <TouchableOpacity style={{ marginTop: 6 }} onPress={() => this.handleBackButtonClick()}>
                      <Icon name="chevron-back-outline" color={black} size={25} type="ionicon" />
                  </TouchableOpacity>
                  <View style={{ justifyContent: "center" }}>
                      <Text style={style.headerText}>Vehicle Pick-Up</Text>
                  </View>
              </View>
            </View>

           
               {/* main body */}
            <View style={{marginBottom:150}}>
               <FlatList 
               data={[{ title: 'Title Text', key: 'item1' }]}
               renderItem={this.renderItem}
               showsVerticalScrollIndicator={false}
               keyExtractor={item => item.id} />
            </View>

            {/* footer tab bars */}
            <View style={{position:"absolute",bottom:0}}>
               <ImageBackground source={footerView} style={{height:150,
               width:Dimensions.get('window').width,justifyContent:"center"}}>
                  <View style={{flexDirection:"row",justifyContent:"space-evenly",marginTop:60}}>
                     <TouchableOpacity onPress={()=>this.props.navigation.navigate("CheckAttendance")}>
                        <Icon name="calendar-outline" type="ionicon" size={35}/>
                     </TouchableOpacity>

                     <TouchableOpacity onPress={()=>this.props.navigation.navigate("Dashboard")}>
                        <Icon name="home-outline" type="ionicon" size={35}/>
                     </TouchableOpacity>

                     <TouchableOpacity onPress={()=>this.props.navigation.navigate("Settings")}>
                        <Icon name="settings-outline" type="ionicon" size={35}/>
                     </TouchableOpacity>
                  </View>
               </ImageBackground>
            </View>

            
      </SafeAreaView>
      </View>
         
                     
     );
   }
}


export default PickUpVehicle;


const styles = StyleSheet.create({
   image:{
      width:60,
      height:60,
      borderRadius:5,
      borderWidth:1,
      borderColor:black
   },
   smallText:{
      fontSize:RFValue(12,580),
      fontFamily:"Poppins-Bold",
   },
   text:{
      fontSize:RFValue(12,580),
      fontFamily:"Poppins-Regular",
      color:grey
   },
   viewBox:{
      width:Dimensions.get('window').width/1.1,
      alignSelf:"center",
      flexDirection:"row",
      backgroundColor:white,
      marginBottom:10,
      marginTop:10,
      paddingHorizontal:10
   },
   getVehicleText:{
      fontSize:RFValue(12,580),
      color:blue,
      fontFamily:"Poppins-Medium",
   }
  

})