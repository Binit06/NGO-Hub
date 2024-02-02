import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import MainHeader from '../../components/CustomHeaders/MainHeader';
import { View, Text } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarShowLabel: true,
        tabBarStyle: {
          height: '7%',
          paddingBottom: 5,
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          backgroundColor: 'rgba(255,255,255,1)'
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Feed',
          tabBarIcon: ({ focused }) => <MaterialIcons name="home" size={28} color={focused ? "#635bff" : "#bac3cc"}/>,
          header: ({route}) => <MainHeader title={route.name}/>,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Add Post',
          href: {pathname: '/posttab/postScreen'},
          tabBarIcon: ({ focused }) => <AntDesign name="plussquare" size={24} color={focused ? "#635bff" : "#bac3cc"}/>,
          header: ({route}) => <MainHeader title={route.name}/>
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
          tabBarIcon: ({ focused }) => <MaterialIcons name="people-alt" size={24} color={focused ? "#635bff" : "#bac3cc"}/>,
          header: ({route}) => <MainHeader title={route.name}/>
        }}
      />
    </Tabs>
  );
}
