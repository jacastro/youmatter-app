import React from 'react';
import { ScrollView, Switch, StyleSheet, AsyncStorage } from 'react-native';
import { Cell, TableView, Section } from 'react-native-tableview-simple';
import {View, TextInput, Text, Button, ListItem, LoaderScreen, Colors, Card, Avatar, Picker, TagsInput, TextArea} from 'react-native-ui-lib';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { join, login, getPublicationTags } from './../services';

export class JoinScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      tags: [],
      availableTags: [],
      pickertags: [],
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

  componentWillMount = () => {
    getPublicationTags().then((availableTags) => this.setState({ availableTags }))
  };

  render() {
    return (
      <ScrollView>
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
          onChangeText={lastName => this.setState({ lastName })}
          floatOnFocus
          value={this.state.lastName}
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

        <Picker
          title="Intereses"
          placeholder="Intereses"
          value={this.state.pickertags}
          onChange={tags => this.setState({
            pickertags: tags, 
            tags: tags.map(tag => tag.value),
          })}
          mode={Picker.modes.MULTI}
          containerStyle={{marginBottom: 20}}
        >
          {this.state.availableTags.map((tag) => <Picker.Item key={tag} value={tag} label={tag}/>)}
        </Picker>

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
      </ScrollView>
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