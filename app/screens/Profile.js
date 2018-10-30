import React from 'react';
import { ScrollView, Switch, StyleSheet } from 'react-native';
import { Cell, TableView, Section } from 'react-native-tableview-simple';
import {View, TextInput, Text, Button, ListItem, LoaderScreen, Colors, Card, Avatar, Picker} from 'react-native-ui-lib';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { logout, getMyTags, getProfile } from './../services';

export class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interests: [],
      tags: [],
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Perfil',
      tabBarLabel: 'Perfil',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={'ios-person'}
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

  logout = () => {
    logout().then(this.props.navigation.navigate('Auth'))
  }

  componentWillMount = () => {
    getMyTags().then(({tags, interests}) => this.setState({ tags, interests }))
    getProfile().then((data) => this.setState({ ...data }))
  };

  render() {
    return (
      <ScrollView>
      <View useSafeArea margin-20>
        <View style={styles.buttons} flexGrow column>
          <Avatar 
            containerStyle={{marginVertical: 5}}
            size={100}
            imageSource={{uri: 'https://lh3.googleusercontent.com/-CMM0GmT5tiI/AAAAAAAAAAI/AAAAAAAAAAA/-o9gKbC6FVo/s181-c/111308920004613908895.jpg'}}
          />        
          <TextInput
            text50
            containerStyle={{marginBottom: 10}}
            floatingPlaceholder
            onChangeText={this.onChangeText}
            floatOnFocus
            value={this.state.name}
            placeholder="Nombre"
          />

          <Picker
            title="Intereses"
            placeholder="Intereses"
            value={this.state.interests}
            onChange={interests => this.setState({interests})}
            mode={Picker.modes.MULTI}
            containerStyle={{marginBottom: 20}}
          >
            {this.state.tags.map((tag) => <Picker.Item key={tag} value={tag} label={tag}/>)}
          </Picker>
        </View>
        

        <View row flexGrow marginB-30>
          <View column flexGrow>
            <View style={styles.buttons} centerH>
              <Text text10>50</Text>
              <Text text50>Publicaciones</Text>
            </View>
            <View style={styles.buttons} centerH>
              <Text text10>43</Text>
              <Text text50>Reseñas</Text>
            </View>
          </View>
          <View column flexGrow>
            <View style={styles.buttons} centerH>
              <Text text10>23</Text>
              <Text text50>Intereses</Text>
            </View>
            <View style={styles.buttons} centerH>
              <Text text10>15</Text>
              <Text text50>Seguidos</Text>
            </View>
          </View>
        </View>

        <Button
          backgroundColor={Colors.red40}
          label="Cerrar Sesión"
          enableShadow
          onPress={this.logout}
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