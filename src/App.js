import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  // Lifecycle method. If defines it will automagically get called
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAYQry6FU8ZVhV8nbAkSOnl5zASz2ZtQdw',
      authDomain: 'authentication-5c216.firebaseapp.com',
      databaseURL: 'https://authentication-5c216.firebaseio.com',
      projectId: 'authentication-5c216',
      storageBucket: 'authentication-5c216.appspot.com',
      messagingSenderId: '294992983562'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
          this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false});
      }
    });
  }

  renderContent(){

    switch(this.state.loggedIn) {
      case true:
        return(
          <CardSection>
            <Button
              onPress={() => firebase.auth().signOut()}
            >
              Log Out
            </Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return(
      <View>
        <Header headerText="Authentication"/>
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
