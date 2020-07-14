import React, { Component } from 'react';
import {TouchableOpacity, Text, StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from '../firebase';

class AddBoardScreen extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('boards');
    this.state = {
      title: '',
      description: '',
      author: '',
      isLoading: false,
    };
  }

  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }
  
  saveBoard() {
    this.setState({
      isLoading: true,
    });

    //agregar el documento a la base de datos
    
     this.ref.add({
      title: this.state.title,
      description: this.state.description,
      author: this.state.author,
    }).then((docRef) => {
      this.setState({
        title: '',
        description: '',
        author: '',
        isLoading: false,
      });
      this.props.navigation.goBack();
    })
    .catch((error) => {
      alert("Error al agregar: ", error);
      this.setState({
        isLoading: false,
      });
    }); 
  }
  render() {
      if(this.state.isLoading){
        return(
          <View style={styles.activity}>
            <ActivityIndicator size="large" color="#ffc727"/>
          </View>
        )
      }
      return (
        <ScrollView style={styles.container}>

         

          <View style={styles.subContainer}>
            <TextInput
                style={styles.instructions}
                placeholder={'Titulo'}
                value={this.state.title}
                onChangeText={(text) => this.updateTextInput(text, 'title')}
            />
          </View>

          <View style={styles.subContainer}>
            <TextInput
                style={styles.instructions}
                placeholder={'Autor'}
                value={this.state.author}
                onChangeText={(text) => this.updateTextInput(text, 'author')}
            />
          </View>
          <View style={styles.subContainer}>
            <TextInput
                style={styles.instructions}
                multiline={true}
                numberOfLines={4}
                placeholder={'Descripción'}
                value={this.state.description}
                onChangeText={(text) => this.updateTextInput(text, 'description')}
            />
          </View>
          <View style={styles.button}>
          <TouchableOpacity onPress={() => this.saveBoard()} style={styles.button}>
        <Text style={styles.buttonText}> Guardar </Text>
       
        </TouchableOpacity>
          </View>
         
        </ScrollView>
      );        
  }
}

const styles = StyleSheet.create({
  body:{
    
    backgroundColor: '#a0c1b8',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  subContainer: {
    flex: 1,
    marginBottom: 20,
    padding: 5,
    color:"#ffc727",
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: "#fa1938",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    marginLeft:"auto",
    marginRight:"auto",
  },
  abajo: {
    color: '#ffc727',
    fontSize: 30,
    marginHorizontal: 15,
    marginBottom: 10,
    marginLeft:"auto",
    marginRight:"auto",
  },
  
  instructions: {
    color: '#3c8185',
    fontSize: 20,
  },
})


export default AddBoardScreen;