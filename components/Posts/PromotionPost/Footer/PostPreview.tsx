import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'
import { Users } from '../../../../types'
import COMMENTDATA from '../../../../datasets/CommentData';
import renderBlueHashtags from '../../../SpecialRenders/renderHastags';

interface PostPreviewProps{
    user: Users;
    index: number;
    postId: string;
}

const PostPreview: React.FC<PostPreviewProps> = ({user, index, postId}) => {
    const commentData = COMMENTDATA.filter((data) => data.post_id === postId)

    console.log(commentData.length)
  return (
    commentData.length !== 0 ? (
        <View style={{ flexDirection: 'row', justifyContent: 'center' }} key={index}>
            <View style={{ width: '100%', flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
            <Image
                source={{ uri: user.user_image }}
                style={{ height: 34, width: 34, borderRadius: 34, backgroundColor: 'white', padding: 10, resizeMode: 'contain' }}
            />
            <View
                style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                paddingBottom: 15,
                paddingTop: 3,
                borderRadius: 5,
                paddingHorizontal: 10,
                }}
            >
                <View style={{ paddingBottom: 10, paddingTop: 3, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{user.user_name}</Text>
                </View>
                <Text numberOfLines={3}>{renderBlueHashtags(commentData[index].text)}</Text>
            </View>
            </View>
        </View>
    ) : (
        null
    )
  )
}

export default PostPreview