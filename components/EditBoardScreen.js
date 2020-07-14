import React, { Component } from 'react';
import { Text,TouchableOpacity,StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from '../firebase';

class EditBoardScreen extends Component {
 
  constructor() {
    super();
    this.ref = firebase.firestore().collection('boards');

    this.state = {
      key: '',
      isLoading: true,
      title: '',
      description: '',
      author: ''
    };
  }
  componentDidMount() {
    const { route, navigation } = this.props;
    
    console.log(route.params.boardkey)
    var docum=this.ref.doc(route.params.key);
 // obtener el documento utilizando route.params.boardkey
    docum.get().then((doc)=>{
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: doc.id,
          title: board.title,
          description: board.description,
          author: board.author,
          isLoading: false
        });      
      } else {
        console.log("No existe el elemento!");
      }

    }).catch(function(error) {
      console.log("Error getting document:", error);  });
    /*  if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: doc.id,
          title: board.title,
          description: board.description,
          author: board.author,
          isLoading: false
        });      
      } else {
        console.log("No existe el elemento!");
      }
    */
  }
  
  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }
  
  updateBoard() {
    this.setState({
      isLoading: true,
    });
    const { navigation } = this.props;
    var docu=this.ref.doc(this.state.key);
    // actualizar el elemento utilizando this.state.key
    
    docu.update({
      title: this.state.title,
      description: this.state.description,
      author: this.state.author,
    }).then((docRef) => {
      this.setState({
        key: '',
        title: '',
        description: '',
        author: '',
        isLoading: false,
      });
      this.props.navigation.navigate('Board');
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      this.setState({
        isLoading: false,
      });
    }); 
    
  }



  render() {
      if(this.state.isLoading){
        return(
          <View style={styles.activity}>
            <ActivityIndicator size="large" color="#0000ff"/>
          </View>
        )
      }
      return (
        <ScrollView style={styles.container}>
          <View style={styles.subContainer}>
            <TextInput
                style={styles.instructions}
                placeholder={'Title'}
                value={this.state.title}
                onChangeText={(text) => this.updateTextInput(text, 'title')}
            />
          </View>
          <View style={styles.subContainer}>
            <TextInput
                style={styles.instructions}
                placeholder={'Author'}
                value={this.state.author}
                onChangeText={(text) => this.updateTextInput(text, 'author')}
            />
          </View>

          
          <View style={styles.subContainer}>
            <TextInput
                style={styles.descrip}
                multiline={true}
                numberOfLines={10}
                placeholder={'Description'}
                value={this.state.description}
                onChangeText={(text) => this.updateTextInput(text, 'description')}
            />
          </View>
          <View style={styles.button}>
          <TouchableOpacity onPress={() =>  this.updateBoard()} style={styles.button}>
          <Text style={styles.buttonText}> Actualizar </Text>
        
          </TouchableOpacity>
         
          </View>
         
        </ScrollView>
      );    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    
  },
  subContainer: {
    flex: 1,
    marginBottom: 20,
    padding: 5,
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
    fontSize: 19,
  },
  descrip: {
    color: '#3c8185',
    fontSize: 19,
    marginLeft:"auto",
    marginRight:"auto",
    textAlign:"center"

  },
})


export default EditBoardScreen;