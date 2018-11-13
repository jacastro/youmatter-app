import React from 'react';
import { ScrollView, Switch, StyleSheet, ActivityIndicator,TouchableHighlight } from 'react-native';
import { NavigationEvents } from "react-navigation";
import { Cell, TableView, Section } from 'react-native-tableview-simple';
import {View, TextInput, Text, Button, ListItem, LoaderScreen, Colors, Card} from 'react-native-ui-lib';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Stars } from './../components/Stars';
import { getRelatedPosts, getSearchPosts } from './../services';

function debounce(a,b,c){var d,e;return function(){function h(){d=null,c||(e=a.apply(f,g))}var f=this,g=arguments;return clearTimeout(d),d=setTimeout(h,b),c&&!d&&(e=a.apply(f,g)),e}}

export class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      half: true,
      students: [],
      posts: [],
      search: '',
      loading: true,
      tag: props.navigation.getParam('tag', null),
      tags: [
        {
          title: "Recetas",
          icon: "ios-bookmarks",
          tag: "Receta"
        },
        {
          title: "Restaurantes",
          icon: "ios-restaurant",
          tag: "Restaurante"
        },
        {
          title: "Profesionales",
          icon: "md-medkit",
          tag: "Profesional"
        },
        {
          title: "Consejos",
          icon: "ios-contacts",
          tag: "Consejo"
        },
      ]
    }
  }

  static navigationOptions = ({ navigation }) => {
    const tag = navigation.getParam('title', null);
    return {
      title: tag ? tag : "Buscar",
      tabBarLabel: 'Buscar',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={'ios-search'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    }
  };

  componentDidMount = () => {
    this.getPosts();
  };

  onSearch = (search) => {
    this.setState({ search, posts: [], loading: true }, debounce(() => this.getPosts(), 500))
  };

  getPosts = () => {
    if (this.state.search === '') getRelatedPosts(this.state.tag).then((data) => this.setState({ posts: data, loading: false }))
    else getSearchPosts(this.state.search, this.state.tag).then((data) => this.setState({ posts: data, loading: false }))
  }

  render() {
    const navigation = this.props.navigation;
    const { posts, loading, search, tags, tag } = this.state;

    return (
      <ScrollView>
      <View useSafeArea margin-20>
        <NavigationEvents
          onWillFocus={payload => {
            this.componentDidMount();
          }}
        />
        <TextInput
          text40
          containerStyle={{marginBottom: 10}}
          floatingPlaceholder
          placeholder={tag ? `¿Qué ${tag} buscás?` : "¿Qué buscás?"}
          onChangeText={this.onSearch}
          floatOnFocus
        />
        { search === '' && !tag && <View row flexGrow marginB-30>
          <View column flexGrow>
            { tags.slice(0, 2).map(({ title, icon, tag }) => <TouchableHighlight key={tag} underlayColor="transparent" onPress={() => navigation.push('SearchByTag', { title, tag })}>
              <View style={styles.buttons} centerH >
                <Ionicons name={icon} size={50} style={styles.icon} />
                <Text text50>{title}</Text>
              </View>
            </TouchableHighlight>)}
          </View>
          <View column flexGrow>
            { tags.slice(2, 4).map(({ title, icon, tag }) => <TouchableHighlight key={tag} underlayColor="transparent" onPress={() => navigation.push('SearchByTag', { title, tag })}>
              <View style={styles.buttons} centerH >
                <Ionicons name={icon} size={50} style={styles.icon} />
                <Text text50>{title}</Text>
              </View>
            </TouchableHighlight>)}
          </View>
        </View>}
        <Text text50 marginB-10>{search === '' ? "Podría interesarte..." : "Resultados de la búsqueda"}</Text>
        { loading ? <ActivityIndicator size="large" /> : posts.map((post,i) => 
          <Card key={i} style={{marginBottom: 15}} onPress={() => navigation.push('PublicationScreen', { post })}>
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
                  <Text text90 color={Colors.blue30}> | {post.tags} </Text>
                </Card.Item>
              </Card.Section>
              <Card.Section>
                <Text text70 color={Colors.dark10}>
                  {post.body.substring(0,80)}
                  {post.body.length > 80 && "..."}
                  {post.body.length > 80 && <Text text80 color={Colors.dark50}>[Ver&nbsp;más]</Text>}
                </Text>
              </Card.Section>
            </Card.Section>
          </Card>
        )}
        { !loading && posts.length == 0 &&  <Text text50 style={styles.error}>Nada por aquí</Text>}
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
    padding: 15,
  },
  icon: {
    margin: 'auto',
  },
  error: {
    color: Colors.dark40,
    textAlign: "center",
    marginTop: 40,
  }
});