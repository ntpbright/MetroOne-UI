import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native'

import { Appbar } from 'react-native-paper';

export default class ConfirmClockout extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false
  };

  constructor(){
    super()
    this.state = {
      selectedIndex: 0,
      customStyleIndex: 0,
      text: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress= {() => this.props.navigation.goBack()}/>
          <Appbar.Content
            title="Confirm clock out"
            titleStyle={{alignItems:'center'}}
          />
        </Appbar.Header>
        <View style={styles.timeContainer}>
          <Text style={styles.dctText}>
            Clock in time
          </Text>
          <Text style={styles.timeText}>
            09:52
          </Text>
          <Text style={styles.dctText}>
            Clock out time
          </Text>
          <Text style={styles.timeText}>
            19:52
          </Text>
          <Text style={styles.summaryText}>
            Total 9.15 hrs
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress= {() => this.props.navigation.navigate('Manual')}
            style={styles.btn}
          >
            <Image style={styles.btnImage}
              source={require('../assets/icons/btn_cancel.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress= {() => this.props.navigation.navigate('Manual')}
            style={styles.btn}
          >
            <Image style={styles.btnImage}
              source={require('../assets/icons/btn_ok.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1
  },
  timeContainer: {
    padding: 30,
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4E4E4E',

  },
  btnContainer: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center'
  },
  btn:{
    marginLeft:20,
    marginRight:20,
    marginTop:10,
    marginBottom:10,
    height: 50,
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 60,
    color: 'white',
    marginTop: 0,
    marginBottom: 20
  },
  dctText: {
    fontSize: 20,
    color: '#D6D6D6',
    marginBottom: 0,
  },
  summaryText: {
    fontSize: 45,
    fontWeight: 'bold',
    color: 'white'
  },
  btn: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:100,
    backgroundColor:'#fff',
    borderRadius:200,
  },
  btnImage: {
    width:100,
    height:100,
  },
})