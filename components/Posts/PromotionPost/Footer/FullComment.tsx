import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useMemo, useRef } from 'react'
import COMMENTDATA from '../../../../datasets/CommentData';
import USERDATA from '../../../../datasets/userdata';
import MainComment from './MainComment';
import Replies from './Replies';
import BottomSheet from '@gorhom/bottom-sheet';
import { Entypo } from '@expo/vector-icons';

interface FullCommentProps {
    postId: string;
}
const FullComment: React.FC<FullCommentProps> = ({postId}) => {
    const commentData = COMMENTDATA.filter((data) => data.post_id === postId)

    if(commentData.length === 0){
    return null;
    }
    const userData = commentData.map((comment) =>
        USERDATA.find((user) => user?.user_id === comment.user_id)
    );

    console.log(userData.length)

  return (
    <View style={{ paddingVertical: 0, marginTop: 15, paddingHorizontal: 4, width: '100%' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 2, gap: 10 }}>
        <View style={{ flex: 1, borderRadius: 5, paddingHorizontal: 7, paddingVertical: 10, flexDirection: 'column', gap: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Comments {commentData.length}</Text>
          {userData.map((user, index) => (
            user ? (
            <>
            <MainComment user={user} index={index} postId={postId}/>
            <View style={{ marginLeft: 40, flexDirection: 'column-reverse', gap: 5}}>
                <Replies postId={postId} index={index} bool={false}/>
            </View>
            </>
            ): (
                null
            )
          ))}
        </View>
      </View>
    </View>
  )
}

export default FullComment