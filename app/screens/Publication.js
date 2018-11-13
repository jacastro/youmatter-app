import React from 'react';
import { ScrollView, Switch, StyleSheet, AlertIOS } from 'react-native';
import { Cell, TableView, Section } from 'react-native-tableview-simple';
import {View, TextInput, Text, Button, ListItem, LoaderScreen, Colors, Card, Avatar, Picker, TagsInput, TextArea} from 'react-native-ui-lib';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getPublicationRates, getPublicationRate, rate } from './../services';
import { Stars } from './../components/Stars';

export class PublicationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: props.navigation.getParam('post', {}),
      myRate: 0,
      loading: false,
      rates: [],
      rating: 0
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Publicación'
    }
  };

  componentWillMount = () => this.loadRate();

  loadRate = () => {
    getPublicationRates(this.state.post.id).then((rates) => {
      let sum = 0;
      let cant = 0;
      rates.forEach(rate => {
        cant = rate.value ? cant + 1 : cant;
        sum = rate.value ? sum + rate.value : sum;
      });
      this.setState({ rates, rating: sum / cant });
      console.log(rates, sum / cant )
    })
  }

  onRate = (myRate) => {
    const previousRate = this.state.myRate;
    this.setState({ myRate });
    AlertIOS.prompt(
      'Evaluar publicación', 
      `${myRate} estrella${myRate == 1 ? '' : 's'}`,
      [
        {
          text: 'Cancelar',
          onPress: () => {
            this.setState({ myRate: previousRate })
          },
          style: 'cancel',
        },
        {
          text: 'Evaluar',
          onPress: text => {
            this.setState({ loading: true })
            rate({
              id: this.state.post.id,
              value: myRate,
              message: text,
            }).then((tags) => {
              this.setState({ myRate, loading: false }); 
              this.loadRate();
            })
          }
        },
      ],
    );    
  }

  render() {
    const { post, myRate, loading, rates, rating } = this.state;


    console.log(rating)
    return (
      <View useSafeArea padding-20 flex style={{backgroundColor: "#fff"}}>
        {loading && <LoaderScreen
          overlay
          backgroundColor={Colors.rgba(Colors.dark80, 0.85)}
        />}
        <ScrollView>
          <Card.Section body>
            <Card.Section>
              <Text text40 color={Colors.dark10}>
                {post.title}
              </Text>
              <Stars
                containerStyle={{marginLeft: "auto",}}
                starSize={25}
                fullStarColor={Colors.yellow20}
                disabled={false}
                maxStars={5}
                rating={rating}
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                iconSet={'Ionicons'}
                selectedStar={(myRate) => this.onRate(myRate)}
              />
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
                {post.body}
              </Text>
            </Card.Section>
          </Card.Section>
          <View style={styles.starsView}>
            <Text text70 color={Colors.dark10} marginB-15>¿Te gustó esta Publicación?</Text>
            <Stars
              disabled={false}
              maxStars={5}
              rating={myRate}
              emptyStar={'ios-star-outline'}
              fullStar={'ios-star'}
              halfStar={'ios-star-half'}
              iconSet={'Ionicons'}
              selectedStar={(myRate) => this.onRate(myRate)}
            />
          </View>
          <View style={styles.ratesView}>
            <Text text70 color={Colors.dark10} marginB-15>{rates.length > 0 ? "Comentarios" : "¡Carga el primer comentario!"}</Text>
            {rates.map(rate => <Card key={rate.message} style={styles.ratesViewCard}>
              <View >
                <Text text60>{rate.message}</Text>
              </View>
              <Card.Section>
                <Card.Item>
                  <Text text90 color={Colors.blue30}>{rate.user}</Text>
                  <Stars
                    containerStyle={{marginLeft: "auto"}}
                    starSize={16}
                    fullStarColor={Colors.yellow20}
                    disabled={false}
                    maxStars={5}
                    rating={rate.value}
                    emptyStar={'ios-star-outline'}
                    fullStar={'ios-star'}
                    halfStar={'ios-star-half'}
                    iconSet={'Ionicons'}
                  />
                </Card.Item>
              </Card.Section>
            </Card>)}
          </View>
        </ScrollView>
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
  },
  starsView: {
    paddingLeft: 20,
    paddingRight: 20, 
    borderTopColor: Colors.dark70,
    paddingTop: 30,
    borderTopWidth: 1,
  },
  ratesView: {
    padding: 20,
    marginTop: 20, 
    borderTopColor: Colors.dark70,
    borderTopWidth: 1,
  },
  ratesViewCard: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 15,
    marginBottom: 15,
  }
});