import React from 'react';
import { ScrollView, Switch, StyleSheet } from 'react-native';
import { Cell, TableView, Section } from 'react-native-tableview-simple';
import {View, TextInput, Text, Button, ListItem, LoaderScreen, Colors, Card} from 'react-native-ui-lib';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
//import { getStudents, saveAttendance } from '../../services/preceptor';

const posts = [
  {
    //coverImage: localImageSource,
    title: 'Amazing Desert',
    status: 'Published',
    timestamp: '31 August 2016',
    description: 'Reference this table when designing your app’s interface, and make sure',
    likes: 345,
  },
  {
    title: 'New Post',
    status: 'Draft',
    timestamp: '07 March 2017',
    description: 'This is the beginning of a new post',
    likes: 0,
  },
];

export class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      half: true,
      students: [],
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Buscar',
      tabBarLabel: 'Buscar',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={'ios-search'}
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

  saveAttendance = (navigation) => {
    saveAttendance(this.state.students).then(navigation.goBack())
  }

  render() {
    return (
      <View useSafeArea margin-20>
        <TextInput
          text40
          containerStyle={{marginBottom: 10}}
          floatingPlaceholder
          placeholder="¿Qué buscás?"
          onChangeText={this.onChangeText}
          floatOnFocus
        />
        <View row flexGrow marginB-30>
          <View column flexGrow>
            <View style={styles.buttons} centerH>
              <Ionicons
                name='ios-bookmarks'
                size={50}
                style={styles.icon}
              />
              <Text text50>Recetas</Text>
            </View>
            <View style={styles.buttons} centerH>
              <Ionicons
                name='ios-restaurant'
                size={50}
                style={styles.icon}
              />
              <Text text50>Restaurantes</Text>
            </View>
          </View>
          <View column flexGrow>
            <View style={styles.buttons} centerH>
              <Ionicons
                name='md-medkit'
                size={50}
                style={styles.icon}
              />
              <Text text50>Profesionales</Text>
            </View>
            <View style={styles.buttons} centerH>
              <Ionicons 
                name='ios-contacts'
                size={50}
                style={styles.icon}
              />
              <Text text50>Personas</Text>
            </View>
          </View>
        </View>

        {posts.map((post,i) => 
          <Card key={i} style={{marginBottom: 15}} onPress={() => console.log('press on a card')}>
            <Card.Image height={160} imageSource={post.coverImage} />
            <Card.Section body>
              <Card.Section>
                <Text text40 color={Colors.dark10}>
                  {post.title}
                </Text>
              </Card.Section>
              <Card.Section>
                <Card.Item>
                  <Text text90 color={Colors.green30}>
                    {post.status}
                  </Text>
                  <Text text90> | {post.timestamp}</Text>
                </Card.Item>
              </Card.Section>
              <Card.Section>
                <Text text70 color={Colors.dark10}>
                  {post.description}
                </Text>
              </Card.Section>
              <Card.Section footer>
                <Text text90 color={Colors.dark50}>
                  {post.likes} Likes
                </Text>
              </Card.Section>
            </Card.Section>
          </Card>
        )}
        
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