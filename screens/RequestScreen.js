import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'

import Colors from '../constants/Colors'
import { Appbar, Button } from 'react-native-paper';
import SegmentedControlTab from 'react-native-segmented-control-tab'

//Components
// import Pending from '../components/request/Pending'
// import Approved from '../components/request/Approved';

export default class RequestScreen extends React.Component {
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

  _onAdd = () => console.log('Jump to screen');

  render() {
    return (
      <View style={styles.backgroundColorWhite}>
        <Appbar.Header>
          <Appbar.Content
            title="MetroOne"
            titleStyle={{alignItems:'center'}}
          />
          <Appbar.Action icon="add" onPress= {() => this.props.navigation.navigate('MakeRequest')}/>
        </Appbar.Header>
        <View style={styles.TabContainer}>
          <SegmentedControlTab
              values={['Pending', 'Approved']}
              selectedIndex={this.state.customStyleIndex}
              onTabPress={this.handleCustomIndexSelect}
              tabStyle={styles.tabStyle}
              activeTabStyle={styles.activeTabStyle}
              tabTextStyle={styles.tabTextStyle}
            />
        </View>
        <View style={listOfRequest.container}>
          {this.state.customStyleIndex === 0
            &&
            //This view must move to another class
            <ScrollView style={listOfRequest.container}>
              <TouchableOpacity>
                <View style={listOfRequest.listContainner}>
                  <View style={listOfRequest.flexWidthOne}>
                    <Text style={listOfRequest.timeText}>
                      20:00
                    </Text>
                  </View>
                  <View style={listOfRequest.flexWidthOne}>
                    <Text>
                      Clock out
                    </Text>
                    <Text>
                      Wed 20 oct 18
                    </Text>
                  </View>
                  <View style={listOfRequest.directionRowContainer}>
                    <View style={listOfRequest.ApprovalContainer}>
                      <Image style={listOfRequest.ApprovalImg}
                        source={require('../assets/icons/icon_person.png')}
                      />
                      <Text>AAA</Text>
                    </View>
                    <View style={listOfRequest.ApprovalContainer}>
                      <Image style={listOfRequest.ApprovalImg}
                        source={require('../assets/icons/icon_person.png')}
                      />
                      <Text>AAA</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={listOfRequest.listContainner}>
                  <View style={listOfRequest.hrApprovalPending}>
                    <Image style={listOfRequest.ApprovalImg}
                      source={require('../assets/icons/icon_person.png')}
                    />
                    <View>
                      <Text style={listOfRequest.hrApprovalPendingText}>
                        Nuttapatpromm
                      </Text>
                      <Text style={listOfRequest.hrApprovalPendingText}>
                        Wed 17 Oct 18, OUT 20:00
                      </Text>
                      <Text style={listOfRequest.remote}>
                        Remote
                      </Text>
                    </View>
                  </View>
                  <View style={listOfRequest.flexWidthOne}>
                    <Button mode="contained" onPress={() => console.log('Pressed')} style={listOfRequest.detailBtn}>
                      Details
                    </Button>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={listOfRequest.listContainner}>
                  <View style={listOfRequest.hrApprovalPending}>
                    <Image style={listOfRequest.ApprovalImg}
                      source={require('../assets/icons/icon_person.png')}
                    />
                    <View>
                      <Text style={listOfRequest.hrApprovalPendingText}>
                        Nuttapatpromm
                      </Text>
                      <Text style={listOfRequest.hrApprovalPendingText}>
                        Wed 17 Oct 18, OUT 20:00
                      </Text>
                      <Text style={listOfRequest.remote}>
                        Remote
                      </Text>
                    </View>
                  </View>
                  <View style={listOfRequest.flexWidthOne}>
                    <Text style={listOfRequest.approvedText}>
                      Approved
                    </Text>
                    <Text style={listOfRequest.approvedText}>
                      16 Oct 18
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </ScrollView>
          }
          {this.state.customStyleIndex === 1
            &&
            //This view must move to another class
            <ScrollView style={listOfRequest.container}>
              <View style={listOfRequest.listContainner}>
                <View style={listOfRequest.flexWidthOne}>
                  <Text style={listOfRequest.timeText}>
                    19:00
                  </Text>
                </View>
                <View style={listOfRequest.flexWidthOne}>
                  <Text>
                    Clock in
                  </Text>
                  <Text>
                    Wed 20 oct 18
                  </Text>
                </View>
                <View style={listOfRequest.flexWidthOne}>
                  <View>

                  </View>
                </View>
              </View>
              <View style={listOfRequest.listContainner}>
                <View style={listOfRequest.flexWidthOne}>
                  <Text style={listOfRequest.timeText}>
                    19:00
                  </Text>
                </View>
                <View style={listOfRequest.flexWidthOne}>
                  <Text>
                    Clock in
                  </Text>
                  <Text>
                    Wed 20 oct 18
                  </Text>
                </View>
                <View style={listOfRequest.directionRowContainer}>
                  <View style={listOfRequest.ApprovalContainer}>
                    <Image style={listOfRequest.ApprovalImg}
                      source={require('../assets/icons/icon_person.png')}
                    />
                    <Text>AAA</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundColorWhite: {
    backgroundColor: '#fff',
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  TabContainer:{
    padding: 10
  },
  tabStyle:{
    borderColor: 'gray',
    height: 40,
  },
  tabTextStyle:{
    color: Colors.MainColor
  },
  activeTabStyle:{
    backgroundColor: Colors.MainColor,
  }
});

const listOfRequest = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flexWidthTwo: {
    flex: 2
  },
  flexWidthOne: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  },
  listContainner: {
    flex: 1,
    paddingLeft:10,
    paddingRight:10,
    paddingTop:5,
    paddingBottom:5,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    borderTopColor: 'gray',
    borderTopWidth: 0.5,
    flexDirection: 'row',
    height: 90
  },
  timeText:{
    fontSize: 48,
    fontWeight: 'bold',
    marginRight: 5,
  },
  contentContainer: {
    backgroundColor: '#fff',
    flexGrow: 1
  },
  ApprovalImg:{
    height: 45,
    width: 45
  },
  ApprovalContainer:{
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  directionRowContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  detailBtn: {
  },
  hrApprovalPending: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center'
  },
  hrApprovalPendingText:{
    marginLeft: 5,
    fontSize: 17
  },
  approvedText:{
    color: 'gray',
    textAlign: 'center'
  },
  remote:{
    marginTop: 2,
    marginLeft: 5,
    fontSize: 14,
    color: '#FF8800',
    borderColor: '#FF8800',
    borderWidth: 1,
    borderRadius: 5,
    width: 60,
    textAlign: 'center'
  }
});