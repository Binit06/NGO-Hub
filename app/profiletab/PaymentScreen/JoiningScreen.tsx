import { View, Text, TextInput, Pressable, Button } from 'react-native'
import React, { useState } from 'react'
import currentUser from '../../../datasets/currentUser'
import { router } from 'expo-router'
import email from 'react-native-email'

const PaymentScreen = () => {
    const [roomName, setRoomName] = useState('')
    const [roomId, setRoomId] = useState('')

    const handleJoin = async () => {
        try {
            const response = await fetch(`https://ngo-api.vercel.app/api/join_chat_room/${roomId}/${currentUser}`, {
                method: 'GET'
            })
            if(!response.ok){
                return console.log("Group Joined False")
            }
            router.push('/(tabs)/community')
            router.canGoBack()
            return console.log("Join Succeeded")
        } catch (e) {
            return console.log("Error joining community")
        }
    }

    const handleEmail = () => {
        const to  = ["binitlenka@gmail.com"]
        email(to, {
            subject: 'Community Joining',
            body: 'This is the trial email',
            checkCanOpen: false
        }).catch(console.error)
    }
    return (
        <>
        <View>
            <View>
                <TextInput placeholder='Enter Room Name' onChangeText={(e) => setRoomName(e)} style={{width: '100%', paddingVertical: 10, paddingHorizontal: 4, borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'black'}}/>
                <TextInput placeholder='Enter Room Id' onChangeText={(e) => setRoomId(e)} style={{width: '100%', paddingVertical: 10, paddingHorizontal: 4, borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'black'}}/>
            </View>
        </View>
        <View style={{position: 'absolute', bottom: 0, right: 0, width: '100%', paddingVertical: 20, paddingHorizontal: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Pressable onPress={handleJoin}>
                <Text style={{fontWeight: '800'}}>JOIN COMMUNITY</Text>
            </Pressable>
        </View>
        </>
    )
}

export default PaymentScreen