import React, { Component } from 'react';
import {TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { List, ListItem, Text, Card, Button } from 'react-native-elements';
import firebase from '../firebase';
// consulta un solo libro?
class BoardDetailScreen extends Component {
  
  constructor() {
    super();
    this.ref = firebase.firestore().collection('boards');
    this.state = {
      isLoading: true,
      board: {},
      key: '',
    };
  }
  
  componentDidMount() {
    const { route, navigation } = this.props;
    var x= route.params.boardkey
     var doci= this.ref.doc(route.params.key);
     
    doci.get().then((doc)=>{
      if(doc.exists){
        this.setState({
          board: doc.data(),
          key: doc.id,
          isLoading: false
        });
      }else{
        console.log("No hay documento");
      }
    }).catch(function(error){
      console.log("Error consiguiento documento",error);
    });

    
    // obtener el documento utilizando route.params.boardkey
    
    
  }
  
  deleteBoard(key) {
    const { navigation } = this.props;
    this.setState({
      isLoading: true
    });

    firebase.firestore().collection('boards').doc(key).delete().then(function() {
      console.log("Document successfully deleted!");
      navigation.navigate('Board');
  })
  .catch((error) => {
    console.error("Error removing document: ", error);
   
  });
  this.setState({
    isLoading: false
  });
   
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    return (
      <ScrollView style={styles.body}>
        <Card style={styles.container}>
          <View style={styles.subContainer}>
            <View>
              <Text style={styles.instructions} h3>{this.state.board.title}</Text>
            </View>
            
            <View>
              <Text style={styles.autor} h4>{this.state.board.author}</Text>
            </View>

            <View>
              <Text style={styles.instructions} h5>{this.state.board.description}</Text>
            </View>
          </View>
          <View style={styles.detailButton}>
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('EditBoard', {
                  boardkey: `${JSON.stringify(this.state.key)}`,key:this.state.key
                });
              }} style={styles.button}>
            <Text style={styles.buttonText}> Editar </Text>
          
            </TouchableOpacity>

           
          </View>
          <View style={styles.detailButton}>
            <TouchableOpacity onPress={() => this.deleteBoard(this.state.key)} style={styles.button}>
            <Text style={styles.buttonText}> Eliminar </Text>
          
            </TouchableOpacity>
          </View>
        </Card>
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
    backgroundColor: '#ffc727',

  },
  subContainer: {
    flex: 1,
    paddingBottom: 20,
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
  detailButton: {
    marginTop: 10
  },
  
  button: {
    backgroundColor: "#fa1938",
    padding: 8,
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
    fontSize: 22,
    marginHorizontal: 10,
    marginBottom: 10,
    marginLeft:"auto",
    marginRight:"auto",
    
    textAlign:"center"
  },
  autor: {
    color: '#ffc727',
    marginBottom: 10,
    marginLeft:"auto",
    marginRight:"auto",
  },

})


export default BoardDetailScreen;