import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import COMMENTDATA from '../../../../datasets/CommentData';
import getUser, { UserData } from '../../../../hooks/getUser';

interface ReplyProps {
  postId: string;
  index: number;
  bool: boolean;
}

const Replies: React.FC<ReplyProps> = ({ postId, index, bool }) => {
  const commentData = COMMENTDATA.filter((data) => data.post_id === postId).sort(
    (a, b) => Number(b.timestamp) - Number(a.timestamp)
  );

  const [showState, setShowState] = useState(bool);
  const [userData, setUserData] = useState<UserData | undefined>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDatas = await getUser(commentData[index]?.user_id);
        console.log(commentData[index]?.user_id, ' te details are ', userDatas)
        setUserData(userDatas ?? undefined);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [index]);

  return (
    showState ? (
      <View>
        {commentData[index]?.replies.length !== 0 ? (
          <>
            {commentData[index]?.replies.slice().reverse().map((reply, replyIndex) => (
              <View key={replyIndex} style={{ width: '100%', flexDirection: 'row', gap: 10, marginBottom: 10 }}>
                <Image source={{ uri: userData?.user_image ?? 'https://links.papareact.com/gn7' }} style={{ height: 25, width: 25, borderRadius: 25 }} />
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.05)', paddingHorizontal: 7, paddingVertical: 5 }}>
                  <Text style={{ fontSize: 14, fontWeight: '600' }}>{userData?.user_name}</Text>
                  <Text>{reply.text}</Text>
                </View>
              </View>
            ))}
            <TouchableOpacity style={{ marginBottom: 5, paddingHorizontal: 5 }} onPress={() => setShowState(!showState)}>
              <Text style={{ color: 'rgba(0,0,0,0.5)', fontWeight: '600' }}>Hide Previous Replies</Text>
            </TouchableOpacity>
          </>
        ) : null}
      </View>
    ) : (
      <View>
        {commentData[index]?.replies.length !== 0 ? (
          <>
            {commentData[index]?.replies.length !== 1 ? (
              <TouchableOpacity style={{ marginBottom: 5, paddingHorizontal: 5 }} onPress={() => setShowState(!showState)}>
                <Text style={{ color: 'rgba(0,0,0,0.5)', fontWeight: '600' }}>Show Previous Replies</Text>
              </TouchableOpacity>
            ) : null}
            {commentData[index]?.replies.slice(-1).reverse().map((reply, replyIndex) => (
              <View key={replyIndex} style={{ width: '100%', flexDirection: 'row', gap: 10, marginBottom: 10 }}>
                <Image source={{ uri: userData?.user_image ?? 'https://links.papareact.com/gn7' }} style={{ height: 25, width: 25, borderRadius: 25 }} />
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.05)', paddingHorizontal: 7, paddingVertical: 5 }}>
                  <Text style={{ fontSize: 14, fontWeight: '600' }}>{userData?.user_name}</Text>
                  <Text>{reply.text}</Text>
                </View>
              </View>
            ))}
          </>
        ) : null}
      </View>
    )
  );
};

export default Replies;
