import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const AdvertHeader = () => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name='lightbulb-on-outline' size={17} color={'black'} />
      <Text>Sponsored</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 7,
        paddingLeft: 5,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        opacity: 0.6
    }
})

export default AdvertHeader