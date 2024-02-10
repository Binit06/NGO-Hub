import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native-gesture-handler'

const PostHeader = () => {
    const router = useRouter()
  return (
    <SafeAreaView>
        <View style={{width: '100%', backgroundColor: 'white', paddingVertical: 10}}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 7, paddingBottom: 5}}>
                <View style={{position: 'absolute', top: 10, left: 15, flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                    <View style={{padding: 7, backgroundColor: "#F6F8F9", borderRadius: 7}}>
                        <AntDesign name="left" size={24} color="black" onPress={() => {router.back()}}/>
                    </View>
                </View>
                <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontWeight: '700', fontSize: 20}}>Add a Post</Text>
                    <Text style={{fontWeight: '200', fontSize: 13}}>Write your thoughts here</Text>
                </View>
            </View>
        </View> 
    </SafeAreaView>
  )
}

export default PostHeader