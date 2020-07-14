import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import { List, ListItem, Button, Icon } from 'react-native-elements';
import firebase from '../firebase';


class BoardScreen extends Component {
  
  constructor() {
    super();
    console.ignoredYellowBox = ['Setting a timer'];
    this.ref = firebase.firestore().collection('boards');
    
    this.state = {
      isLoading: true,
      boards: []
    };
  }

   onCollectionUpdate = dataSnapshot => {
    const  boards = [];
    dataSnapshot.forEach(doc => {
      const { title, description, author } = doc.data();
      boards.push({
        key: doc.id,
        //doc, // DocumentSnapshot
        title,
        description,
        author
      });
    });
 
    this.setState({
      boards,
      isLoading: false,
    });
  };
 
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);    
  }
  

  componentWillUnmount() {
    this.unsubscribe();
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
          {
            this.state.boards.map((item, i) => (
              <ListItem
                style

                
                linearGradientProps={{
                  colors: ['#ffc727', '#edd190'],
                  start: [1, 0],
                  end: [0.2, 0],
                }}
                bottomDivider={{height:30}}
                subtitle={item.author}
                chevron={{color:"white",size:30}}

                key={i}
                title={item.title}                
                titleStyle={{ color: '#5a0e0e', fontWeight: 'bold',fontSize:20 }}
                subtitleStyle={{ color: '#604d20',fontSize:16 }}
                
                leftIcon={{name: 'book', type: 'font-awesome'}}
                onPress={() => {
                  this.props.navigation.navigate('BoardDetails', {
                    boardkey: `${JSON.stringify(item.key)}`,key:item.key
                  });
                }}
              />
            ))
          }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22
  },
  elementos: {

    fontSize: 18,
    height: 44,
    backgroundColor:"#ffc727"
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
  
  instructions: {
    color: '#3c8185',
    fontSize: 40,
    backgroundColor:"#000000"
  },
})

export default BoardScreen;