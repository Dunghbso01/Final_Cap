import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import calender from './Create_Event'
import NewFeed from './NewFeed_Event'

  
const SecondRoute = () => (
   <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
 );

const initialLayout = { width: Dimensions.get('window').width };
 
export default function TabViewExample() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'NewFeed' },
    { key: 'second', title: 'joined' },
    { key: 'Thirt', title: 'Create' },
  ]);
 
  const renderScene = SceneMap({
    first : NewFeed,
    second: SecondRoute,
    Thirt : calender,
  });
 
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}
 
const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});