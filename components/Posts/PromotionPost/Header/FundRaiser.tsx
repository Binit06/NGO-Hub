import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'

const FundRaiserHeader = () => {
  return (
    <View style={styles.container}>
      <FontAwesome name='handshake-o' size={17} color={'black'} />
      <Text>Fund Raiser</Text>
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

export default FundRaiserHeader