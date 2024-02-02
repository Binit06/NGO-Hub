import { Pressable, StyleSheet } from 'react-native';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import usePostModelStore from '../../hooks/usePostModal';
import { memo, useEffect } from 'react';

const TabTwoScreen = () => {
  return (
    <Pressable
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      onPress={() => {}}
    >
      <Text>Hi</Text>
    </Pressable>
  );
}

export default TabTwoScreen
