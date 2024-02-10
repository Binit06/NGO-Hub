import { View, Text, Pressable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import currentUser from '../../datasets/currentUser';
import { Link } from 'expo-router';

export interface CommunityRoomData {
  chat_room_creator_id: string;
  chat_room_id: string;
  chat_room_members: {designation: string, user_id: string}[];
  chat_room_name: string;
  chat_room_password: string;
}

const Community = () => {

  const [community, setCommunity] = useState<CommunityRoomData[] | null>([])
  const [currentState, setCurrentState] = useState(true)

  useEffect(() => {
    const handlefetch = async () => {
      try {
        const response = await fetch(`https://ngo-api.vercel.app/api/getCommunity/${currentUser}`, {
          method: 'GET'
        })
        if(!response.ok){
          return console.log("Connection Error")
        }
        const data = await response.json()
        setCommunity(data.community)
        return
      } catch (e) {
        return console.log("Something Went Wrong")
      }
    }

    handlefetch()
  }, [community])
  return (
    <>
    <View style={{width: '100%', backgroundColor: 'white', flexDirection: 'row', gap: 7}}>
      <Pressable style={{flex: 1}} onPress={() => {setCurrentState(true)}}>
        <Text style={{fontWeight: '600', color: '#0085F4', textAlign: 'center', borderBottomWidth: currentState ? 4 : 0, borderColor: "#0085F4", paddingBottom: 10}}>Created</Text>
      </Pressable>
      <Pressable style={{flex: 1}}  onPress={() => {setCurrentState(false)}}>
        <Text style={{fontWeight: '600', color: '#0085F4', textAlign: 'center', borderBottomWidth: !currentState ? 4 : 0, borderColor: "#0085F4", paddingBottom: 10}}>Joined</Text>
      </Pressable>
    </View>
    {currentState ? (
      <View>
        {community?.map((value, index) => (
          <Link href={{pathname: '/communitychat/CommunityChat', params: {key: value.chat_room_id}}} asChild>
            <Pressable key={index} style={{paddingHorizontal: 3, paddingVertical: 10}}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 15, backgroundColor: 'white', paddingHorizontal: 3, paddingVertical: 7, borderRadius: 12}}>
                <View><Image source={require('../../assets/images/Fundraiser.png')}/></View>
                <View style={{flexDirection: 'column', gap: 3}}>
                  <Text style={{fontSize: 20, fontWeight: '700'}}>{value.chat_room_name}</Text>
                  <Text>Tap on this to start chatting</Text>
                </View>
              </View>
            </Pressable>
          </Link>
        ))}
      </View>
    ) : (
      null
    )}
    </>
  )
}

export default Community