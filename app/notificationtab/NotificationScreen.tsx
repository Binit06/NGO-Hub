import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import currentUser from '../../datasets/currentUser';
import NotificationActivity from './NotificationActivity';

export interface NotificationData {
    notification_content: string;
    notification_id: string;
    notification_status: string;
    notification_type: string;
    notification_title: string;
    user_id_to: string;
    user_id_from: string | undefined;
}

const NotificationScreen = () => {
    const [notificationData, setNotificationData] = useState<NotificationData[] | null>([])
    useEffect(() => {
        const handleNotifications = async () => {
            try {
                const response = await fetch(`https://ngo-api.vercel.app/api/getNotifications/${currentUser}`, {
                    method: 'GET'
                })
    
                if (!response.ok) {
                    console.log("fetch Notifications Failed");
                    return;
                }
    
                const notificationData = await response.json();
                setNotificationData(notificationData.data);
                console.log("Notification Fetch Successful");
            } catch (e) {
                console.log("Something Went Wrong");
            }
        }
    
        handleNotifications();
    }, []);
    
    return (
        <View style={{width: '100%', paddingVertical: 10, paddingHorizontal: 5}}>
            <View style={{flexDirection: 'column', gap: 7}}>
                {notificationData?.map((data, index) => (
                    <NotificationActivity key={index} data={data}/>
                ))}
            </View>
        </View>
    )
}

export default NotificationScreen