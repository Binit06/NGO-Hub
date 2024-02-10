import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { NotificationData } from './NotificationScreen'
import { Link } from 'expo-router';
import currentUser from '../../datasets/currentUser';

interface NotificationActivityProps {
    data: NotificationData;
}

const NotificationActivity: React.FC<NotificationActivityProps> = ({data}) => {

    const [read, setRead] = useState(data.notification_status === "read" ? true : false)

    const handlePress = async () => {
        try{
            setRead(true)
            const response = await fetch(`https://ngo-api.vercel.app/api/markRead/${data.notification_id}`, {
                method: 'GET'
            })
            if(!response.ok){
                setRead(false)
                return console.log("Something Went Wrong")
            }
            setRead(true)
            return console.log("Marked as Read")
        } catch (e) {
            setRead(false)
            return console.log("Message Unmarked")
        }
    }
    return (
        <Link href={{pathname: '/profiletab/ProfileScreen', params: {user_id: data.user_id_from || currentUser}}} asChild>
            <Pressable style={{width: '100%', paddingHorizontal: 10, paddingVertical: 10, flexDirection: 'column', gap: 7, backgroundColor: !read? 'rgba(0,0,255,0.1)': 'white', borderRadius: 7}} onPress={handlePress}>
                <View>
                    <Text style={{fontSize: 17, fontWeight: 'bold'}}>{data.notification_title}</Text>
                </View>
                <View>
                    <Text style={{fontSize: 14}}>{data.notification_content}</Text>
                </View>
            </Pressable>
        </Link>
    )
}

export default NotificationActivity