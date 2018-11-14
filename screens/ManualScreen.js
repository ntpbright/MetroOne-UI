import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert
} from 'react-native'

import { Appbar } from 'react-native-paper';

export default class ManualScreen extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

  constructor(){
    super()
    this.state = {
      modalVisible: false,
    };
  }

  render() {
    const CannotDetectWifiAlert = () => {
      Alert.alert(
        'Cannot detech Wifi',
        'Please check your Wifi connection or you can request for manual clock in approval',
        [
          {text: 'Try agian', onPress: () => console.log('Cancel Pressed'),},
          {text: 'Create requests', onPress: () => this.props.navigation.navigate('MakeRequest')},
        ],
        { cancelable: false }
      )
    }
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress= {() => this.props.navigation.navigate('Home')}/>
          <Appbar.Content
            title="Manual clock in"
            titleStyle={{alignItems:'center'}}
          />
        </Appbar.Header>
        <View style={styles.container}>
          <Text style={styles.textHead}>
            Cannot detect at-office
          </Text>
          <Text style={styles.textDes}>
            Please connect Metromerce Wifi instead
          </Text>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              onPress= {CannotDetectWifiAlert}
              style={styles.btn}
            >
              <Image style={styles.btnSize}
                source={require('../assets/icons/btn_clock_in_wifi.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress= {() => this.props.navigation.navigate('Remote')}
              style={styles.btn}
            >
              <Image style={styles.btnSize}
                source={require('../assets/icons/btn_clock_in_remote.png')}
              />
            </TouchableOpacity>
          </View>
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
  textHead: {
    color: '#AD0202',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 15,
  },
  textDes: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 2,
  },
  btn: {
    alignItems: 'center',
    marginTop: 15,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'space-around'
  },
  btnSize: {
    width: 200,
    height: 200
  }
})