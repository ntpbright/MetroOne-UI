import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert
} from 'react-native'

import Colors from '../constants/Colors'
import { Appbar, TextInput, Button } from 'react-native-paper';
import SegmentedControlTab from 'react-native-segmented-control-tab'

//Components
// import Pending from '../components/request/Pending'
// import Approved from '../components/request/Approved';

const CannotDetectWifiAlert = () => {
  Alert.alert(
    'Cannot detech Wifi',
    'Please check your Wifi connection or you can request for manual clock in approval',
    [
      {text: 'Try agian', onPress: () => console.log('Cancel Pressed'),},
      {text: 'Create requests', onPress: () => console.log('OK Pressed')},
    ],
    { cancelable: false }
  )
}

export default class ManualScreen extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

  // componentDidMount() {
  //   console.log('linksscreen', this.props)
  // }

  constructor(){
    super()
    this.state = {
      selectedIndex: 0,
      customStyleIndex: 0,
      text: '',
      modalVisible: false,
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
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
          <TouchableOpacity
            onPress= {CannotDetectWifiAlert}
            style={styles.btn}
          >
            <Image style={styles.btnSize}
              source={require('../assets/icons/btn_clock_in_wifi.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress= {() => this.props.navigation.navigate('Home')}
            style={styles.btn}
          >
            <Image style={styles.btnSize}
              source={require('../assets/icons/btn_clock_in_remote.png')}
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
  btnSize: {
    width: 200,
    height: 200
  }
})