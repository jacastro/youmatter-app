import React from 'react';
import { ScrollView, Switch, StyleSheet } from 'react-native';
import { Cell, TableView, Section } from 'react-native-tableview-simple';
import { NavigationEvents } from "react-navigation";
import {View, Badge, Text, Button, ListItem, LoaderScreen, Colors, Card, Avatar, Toast} from 'react-native-ui-lib';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { logout, getMyTags, getProfile, getMyPosts } from './../services';

export class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interests: [],
      tags: [],
      posts: [],
      showToast: false,
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
    getMyTags().then(({tags, interests}) => this.setState({ tags, interests, showToast: false })).catch(() => this.setState({ showToast: true}))
    getProfile().then((data) => this.setState({ ...data, showToast: false })).catch(() => this.setState({ showToast: true}))
    getMyPosts().then((data) => this.setState({ posts: data, showToast: false })).catch(() => this.setState({ showToast: true}))
  };

  render() {
    return (
      <ScrollView>
        <NavigationEvents
          onWillFocus={payload => {
            this.componentWillMount();
          }}
        />
        <Toast
          visible={this.state.showToast}
          position="relative"
          message="Ocurrió un error al contactarse con el servidor"
          backgroundColor={Colors.red20}
          color={Colors.white}
          allowDismiss
          onDismiss={() => this.setState({showToast: false})}
        />
        <View useSafeArea padding-20 flex style={{backgroundColor: "#fff"}}>
          <Card.Section body>
            <Card.Section>
              <Text text40 color={Colors.dark10}>
                {this.state.name} {this.state.lastName}
              </Text>
              <Button
                backgroundColor={Colors.red40}
                label="Cerrar Sesión"
                enableShadow
                onPress={this.logout}
              />
            </Card.Section>
            <Card.Section>
              <Text text40 color={Colors.dark10}>
                {this.state.interests.map(interest => <View key={interest.label} style={styles.interest}>
                  <Text style={styles.interestText}>{interest.label}</Text>
                </View>)}
              </Text>
              
            </Card.Section>
          </Card.Section>
        </View>
        <View useSafeArea margin-20>
        

        {/*<View row flexGrow marginB-30>
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
        </View>*/} 

        <Text text50 marginB-10>Mis Publicaciones <Text color={Colors.dark40}>@{this.state.username}</Text></Text>

        {this.state.posts.map((post,i) => 
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
                    {post.type}
                  </Text>
                </Card.Item>
              </Card.Section>
              <Card.Section>
                <Text text70 color={Colors.dark10}>
                  {post.body}
                </Text>
              </Card.Section>
            </Card.Section>
          </Card>
        )}

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
  },
  interest: {
    borderRadius: 50,
    backgroundColor: Colors.blue10,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
  },
  interestText: {
    color: "#fff"
  }
});