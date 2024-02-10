import { View, Text, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import getUser, { UserData } from '../../hooks/getUser';

export interface CommunityChatProps {
  chat_room_discussions: { message: string; user_id: string }[];
  chat_room_id: string;
}

const CommunityChat = () => {
  const params = useLocalSearchParams();
  const { key } = params;

  const [mainData, setMainData] = useState<CommunityChatProps | null>();
  const [userList, setUserList] = useState<UserData[]>([]);

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await fetch(`https://ngo-api.vercel.app/api/getChatData/all/${key}`, {
          method: 'GET',
        });

        if (!response.ok) {
          console.log('Fetch Failed');
          return;
        }

        const data = await response.json();
        setMainData(data.data);
        console.log("Succeeded");
      } catch (error) {
        console.log("Error:", error);
      }
    };

    handleFetch();
  }, [key, setMainData]);

  useEffect(() => {
    if (mainData) {
      Promise.all(mainData.chat_room_discussions.map(async (values) => {
        const userData = await getUser(values.user_id);
        if (userData) {
          setUserList(prev => [...prev, userData]);
        }
      }));
    }
  }, [mainData]);

  return (
    <>
      <View>
        {userList.map((user, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>{user.user_name}: </Text>
            {mainData?.chat_room_discussions[index] && (
              <Text>{mainData.chat_room_discussions[index].message}</Text>
            )}
          </View>
        ))}
      </View>
      <View style={{ position: 'absolute', bottom: 0, right: 0, width: '100%', flexDirection: 'row', padding: 5, gap: 5 }}>
        <View style={{ width: '85%', borderWidth: 1, paddingHorizontal: 5, borderRadius: 5 }}>
          <TextInput placeholder='Ask Anything' style={{ flex: 1 }} />
        </View>
        <View style={{ backgroundColor: 'blue', flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 10 }}>
          <FontAwesome name="send" size={24} color="white" />
        </View>
      </View>
    </>
  );
}

export default CommunityChat;
