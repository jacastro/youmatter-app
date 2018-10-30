import React from 'react';
import { ScrollView, Switch, StyleSheet } from 'react-native';
import { Cell, TableView, Section } from 'react-native-tableview-simple';
import {View, TextInput, Text, Button, ListItem, LoaderScreen, Colors, Card, Avatar, Picker, TagsInput, TextArea} from 'react-native-ui-lib';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getPublicationTypes, getPublicationTags, publish } from './../services';

export class PublishScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      types: [],
      tags: [],
      selectedTags: [],
      selectedType: {},
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Publicar',
      tabBarLabel: 'Publicar',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-add-circle' : 'ios-add-circle-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
      headerRight: (
        <Button
          //onPress={() => navigation.getParam('saveAttendance')(navigation)}
          title="Guardar"
        />
      ),
    }
  };

  componentWillMount = () => {
    getPublicationTypes().then((types) => this.setState({ types, selectedType: { value:types[0], label:types[0]} }))
    getPublicationTags().then((tags) => this.setState({ tags }))
  };

  onPublish = () => {
    publish(this.state).then(() => {
      this.setState({selectedType: this.state.types[0], title: '', body: ''})
      this.props.navigation.navigate('Search')
    })
  }

  render() {
    return (
      <View useSafeArea margin-20>
        <View style={styles.buttons} flexGrow column>   
          <Picker
            title="Tipo"
            value={this.state.selectedType}
            onChange={value => this.setState({selectedType: value})}
            containerStyle={{marginBottom: 20}}
          >
            {this.state.types.map(type => <Picker.Item key={type} value={type} label={type} />)}
          </Picker>

          <Picker
            title="Categoría"
            placeholder="Categoría"
            value={this.state.selectedTags}
            onChange={tags => this.setState({selectedTags: tags})}
            mode={Picker.modes.MULTI}
            containerStyle={{marginBottom: 20}}
          >
            {this.state.tags.map((tag) => <Picker.Item key={tag} value={tag} label={tag}/>)}
          </Picker>

          <TextInput
            floatingPlaceholder
            onChangeText={title => this.setState({ title })}
            floatOnFocus
            value={this.state.title}
            placeholder='Título'
          />

          <View
            style={{
              height: 150,
              borderWidth: 1,
              padding: 10,
              borderColor: Colors.dark60,
            }}
          >
            <TextArea 
              placeholder="Contenido"
              onChangeText={body => this.setState({ body })}
            />
          </View>

          
        </View>

        <Button
          backgroundColor={Colors.green40}
          label="Guardar"
          enableShadow
          onPress={this.onPublish}
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