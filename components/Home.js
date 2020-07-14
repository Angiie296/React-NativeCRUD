import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { List, ListItem, Button, Icon } from 'react-native-elements';
import {TouchableOpacity,Image, StyleSheet,ScrollView, Text, View } from 'react-native';


class Home extends Component{

    constructor() {
        super();}

  render() {
       return(
        <ScrollView style={styles.container}>
         
         <Text style={styles.instructions}> Bienvenida(o) </Text> 
       
        <Image source={ { uri: "https://images.vexels.com/media/users/3/205935/isolated/preview/5e0a8b81a9beeefb5d30be7ebed75414-libros-en-estante-plano-by-vexels.png" } } style={styles.logo} />
       
        
        <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Board')} style={styles.button}>
        <Text style={styles.buttonText}> Siguiente </Text>
       
        </TouchableOpacity>
        
      </ScrollView>

       );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:20,
    width: "100%",
    height: "100%",
    
  },
  logo: {
    width: 300,
    height: 300,
    marginLeft:"auto",
    marginRight:"auto",
    marginBottom: 20,
  },
  Image:{
    width: "100%",
    height: "50%",

  },
  button: {
    backgroundColor: "#fa1938",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    
    marginLeft:"auto",
    marginRight:"auto",
  },
  instructions: {
    color: '#3c8185',
    fontSize: 30,
    marginHorizontal: 15,
    marginBottom: 10,
    marginLeft:"auto",
    marginRight:"auto",
  },
  
});

export default Home;