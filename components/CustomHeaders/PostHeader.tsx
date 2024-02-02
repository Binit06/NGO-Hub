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
        <View style={{width: '100%'}}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 7, paddingBottom: 5}}>
                <View style={{position: 'absolute', top: 10, left: 15}}>
                    <AntDesign name="closecircleo" size={26} color="black" onPress={() => {router.back()}}/>
                </View>
                <View>
                    <Text style={{fontWeight: '700', fontSize: 20}}>Add a Post</Text>
                </View>
            </View>
        </View> 
    </SafeAreaView>
  )
}

export default PostHeader