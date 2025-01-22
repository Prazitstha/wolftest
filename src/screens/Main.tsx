import React from 'react';
import {View, StyleSheet} from 'react-native';
import {MyComponent} from '../components';

export interface Item {
  id: string;
  name: string;
}

export default function Main() {
  const data: Item[] = [
    {id: '1', name: 'Apple'},
    {id: '2', name: 'Banana'},
    {id: '3', name: 'Cherry'},
    {id: '4', name: 'Date'},
    {id: '5', name: 'Elderberry'},
    {id: '6', name: 'Fig'},
    {id: '7', name: 'Grape'},
  ];

  return (
    <View style={styles.container}>
      <MyComponent data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
