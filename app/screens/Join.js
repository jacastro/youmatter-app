import React from 'react';
import { ScrollView, Switch, StyleSheet, AsyncStorage } from 'react-native';
import { Cell, TableView, Section } from 'react-native-tableview-simple';
import {View, TextInput, Text, Button, ListItem, LoaderScreen, Colors, Card, Avatar, Picker, TagsInput, TextArea} from 'react-native-ui-lib';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { join, login } from './../services';

export class JoinScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    }
  }

  onJoin = () => {
    join(this.state).then(() => {
      this.props.navigation.navigate('App')
    })
  }

  toLogin = () => {
    this.props.navigation.navigate('LogIn')
  }

  render() {
    return (
      <View useSafeArea margin-20>   
        <Text text20>Registrarme</Text>
        <TextInput
          floatingPlaceholder
          onChangeText={username => this.setState({ username })}
          floatOnFocus
          value={this.state.username}
          placeholder='Nombre de usuario'
        />

        <TextInput
          floatingPlaceholder
          onChangeText={name => this.setState({ name })}
          floatOnFocus
          value={this.state.name}
          placeholder='Nombre'
        />

        <TextInput
          floatingPlaceholder
          onChangeText={surname => this.setState({ surname })}
          floatOnFocus
          value={this.state.surname}
          placeholder='Apellido'
        />

        <TextInput
          floatingPlaceholder
          onChangeText={email => this.setState({ email })}
          floatOnFocus
          value={this.state.email}
          placeholder='Email'
        />

        <TextInput
          floatingPlaceholder
          onChangeText={password => this.setState({ password })}
          floatOnFocus
          value={this.state.password}
          placeholder='Password'
        />

        <Button
          backgroundColor={Colors.green40}
          label="Registrarme"
          enableShadow
          onPress={this.onJoin}
          style={{marginBottom: 20}}
        />

        <Button
          backgroundColor={Colors.blue40}
          label="Iniciar Sesión"
          onPress={this.toLogin}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttons: {
    borderRadius: 10,
    margin: 8,
    backgroundColor: '#F6F6F6',
    shadowOpacity: 0.75,
    shadowRadius: 10,
    shadowColor: '#999',
    borderRadius: 10,
    shadowOffset: { height: 10, width: 0 },
    padding: 15
  },
  icon: {
    margin: 'auto',
  }
});