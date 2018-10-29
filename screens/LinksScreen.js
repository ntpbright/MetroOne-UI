import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { WebBrowser } from 'expo'
import { ExpoLinksView } from '@expo/samples';

import Colors from '../constants/Colors'
import { Appbar, Button } from 'react-native-paper';
import SegmentedControlTab from 'react-native-segmented-control-tab'

export default class LinksScreen extends React.Component {
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

  render() {
    return (
      <View>
        <Appbar.Header style={{backgroundColor:Colors.navBarColor}}>
          <Appbar.Content
            title="MetroOne"
            titleStyle={{textAlign:'center'}}
          />
        </Appbar.Header>
        <View>
        <SegmentedControlTab
            values={['one', 'two']}
            selectedIndex={this.state.customStyleIndex}
            onTabPress={this.handleCustomIndexSelect}
          />
          {this.state.customStyleIndex === 0
            &&
            <Text style={styles.tabContent}> Tab one</Text>
          }
          {this.state.customStyleIndex === 1
                    && <Text style={styles.tabContent}> Tab two</Text>}

        </View>
        <ScrollView style={styles.container}>
          <ExpoLinksView />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
