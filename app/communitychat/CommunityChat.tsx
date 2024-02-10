import { View, Text, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router';

export interface CommunityChatProps{
    chat_room_discussions: {message: string, user_id: string}[];
    chat_room_id: string;
}

const CommunityChat = () => {

  const [mainData, setMainData] = useState<CommunityChatProps[] | null>([])

  const params = useLocalSearchParams();
  const {key} = params


  useEffect(() => {
    const handleFetch = async () => {
        const response = await fetch(`https://ngo-api.vercel.com/api/getChatData/all/9bb0745b-ac8b-4886-ad39-7f32c43c5296`)
    }
  })
  return (
    <>
    <View>
        <Text>CommunityChat</Text>
    </View>
    <View style={{position: 'absolute', bottom: 0, right: 0, width: '100%', flexDirection: 'row', padding: 5, gap: 5}}>
        <View style={{width: '85%', borderWidth: 1, paddingHorizontal: 5, borderRadius: 5}}>
            <TextInput placeholder='Ask Anything' style={{flex: 1}}/>
        </View>
        <View style={{backgroundColor: 'blue', flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 10}}>
            <FontAwesome name="send" size={24} color="white" />
        </View>
    </View>
    </>
  )
}

export default CommunityChat