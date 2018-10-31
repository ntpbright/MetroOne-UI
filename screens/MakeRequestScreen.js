import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView
} from 'react-native'

import Colors from '../constants/Colors'
import { Appbar, TextInput, Button } from 'react-native-paper';
import SegmentedControlTab from 'react-native-segmented-control-tab'

//Components
// import Pending from '../components/request/Pending'
// import Approved from '../components/request/Approved';

export default class MakeRequestScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  // componentDidMount() {
  //   console.log('linksscreen', this.props)
  // }

  constructor(){
    super()
    this.state = {
      selectedIndex: 0,
      customStyleIndex: 0,
      text: ''
    };
  }

  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });
  }

  handleCustomIndexSelect = (index: number) => {
    this.setState(prevState => ({ ...prevState, customStyleIndex: index }))
  }

  render() {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress= {() => this.props.navigation.navigate('Request')}/>
          <Appbar.Content
            title="Create Request"
            titleStyle={{alignItems:'center'}}
          />
        </Appbar.Header>
        <View style={{ flex: 1}}>
          <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer} >
            <View style={styles.ContentContainer}>
              <View style={dateTimeField.container}>
                <Image style={dateTimeField.img}
                  source={require('../assets/icons/icon_date.png')}
                />
                <View style={dateTimeField.textContainer}>
                  <Text style={dateTimeField.text}>
                    Wed 18 Oct 18
                  </Text>
                </View>
              </View>
              <View style={dateTimeField.container}>
                <Image style={dateTimeField.img}
                  source={require('../assets/icons/icon_time.png')}
                />
                <View style={dateTimeField.textContainer}>
                  <Text style={dateTimeField.text}>
                    09:52
                  </Text>
                </View>
              </View>
              <SegmentedControlTab
                  values={['Clock in', 'Clock out']}
                  selectedIndex={this.state.customStyleIndex}
                  onTabPress={this.handleCustomIndexSelect}
                  tabStyle={segmentedControl.tabStyle}
                  activeTabStyle={segmentedControl.activeTabStyle}
                  tabTextStyle={segmentedControl.tabTextStyle}
                />
              <TextInput
                label='Reason'
                value={this.state.text}
                onChangeText={text => this.setState({ text })}
                mode='outlined'
                multiline= {true}
                style={textInputStyle.container}
              />
              <View style={approval.container}>
                <Text style={approval.text}>
                  This request need approval from
                </Text>
                <View style={approval.approvalContainer}>
                  <View style={approval.column}>
                    <Image style={approval.img}
                      source={require('../assets/icons/icon_person.png')}
                    />
                    <Text style={approval.textName}>
                      AAA
                    </Text>
                  </View>
                  <View style={approval.column}>
                    <Image style={approval.img}
                      source={require('../assets/icons/icon_person.png')}
                    />
                    <Text style={approval.textName}>
                      AAA
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <Button mode="contained" onPress={() => console.log('Pressed')} style={styles.btn}>
            Send request
          </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1
  },
  ContentContainer: {
    padding: 30,
    flex: 1
  },
  scrollContainer: {
    backgroundColor: '#fff',
    flexGrow: 1
  },
  btn:{
    marginLeft:20,
    marginRight:20,
    marginTop:10,
    marginBottom:10,
    height: 50,
    justifyContent: 'center',
  }
})

const segmentedControl = StyleSheet.create({
  tabStyle:{
    borderColor: 'gray',
    height: 40,
    marginBottom: 15,
  },
  activeTabStyle:{
    backgroundColor: Colors.MainColor,
  },
  tabTextStyle:{
    color: Colors.MainColor
  }
})

const textInputStyle = StyleSheet.create({
  container: {
    marginBottom: 15
  }
})

const dateTimeField = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  img:{
    width: 40,
    height: 40,
  },
  textContainer: {
    flex: 1,
    marginLeft: 5,
    marginBottom: 15
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    borderBottomColor: 'gray',
    borderBottomWidth: 1
  }
})

const approval = StyleSheet.create({
  container: {
    flex: 1,
  },
  approvalContainer: {
    marginTop: 5,
    flexDirection: 'row',
  },
  column: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: 10,
  },
  textName: {
    textAlign: 'center',
    fontSize: 15
  },
  img: {
    width: 65,
    height: 65,
  },
  text: {
    fontSize: 20
  }
})