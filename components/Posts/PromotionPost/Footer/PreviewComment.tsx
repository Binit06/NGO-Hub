import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import COMMENTDATA from '../../../../datasets/CommentData'
import renderBlueHashtags from '../../../SpecialRenders/renderHastags'

interface CommentsPreviewProps {
    postId: string,
    userId: string,
    imgUrl: string[],
    postContent: string,
    postType: string
}
const CommentsPreview: React.FC<CommentsPreviewProps> = ({postId, userId, imgUrl, postContent, postType}) => {
  console.log(postId)
  const commentData = COMMENTDATA.filter((data) => data.post_id === postId)
  const imgurl = imgUrl
  console.log(imgurl)
  if(commentData.length !== 0){
    console.log("This is the image URL in the first block", imgurl)
    return (
        <Link href={{pathname: '/commenttab/commentScreen', params: {postId: postId, userId: userId, imgUrl: imgurl, postContent: postContent, type: postType}}} asChild>
          <Pressable style={{ paddingVertical: 0, marginTop: 15, paddingHorizontal: 4, width: '100%', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 10}}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 2, gap: 10}}>
                <View style={{flex: 1, borderRadius: 5, paddingHorizontal: 7, paddingVertical: 10, flexDirection: 'column', gap: 10}}>
                  <Text style={{fontSize: 17, fontWeight: 'bold'}}>Comments {commentData.length}</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                      <View style={{width: '100%', flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center'}}>
                          <Image source={{uri: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"}} style={{height: 28, width: 28, borderRadius: 28, backgroundColor: 'white', padding: 10, resizeMode: 'contain'}}/>
                          <Text style={{flex: 1}} numberOfLines={3}>{renderBlueHashtags(commentData[0].text)}</Text>
                      </View>
                  </View>
                </View>
              </View>
          </Pressable>
        </Link>
    );
  } else {
  console.log("This is the image URL in the second block", imgurl)
  return (
    <Pressable style={{ paddingVertical: 0, marginTop: 15, paddingHorizontal: 4, width: '100%', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 10}} onPress={() => {}}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 2, gap: 10}}>
        <View style={{flex: 1, borderRadius: 10, paddingHorizontal: 7, paddingVertical: 10, flexDirection: 'column', gap: 10}}>
            <Text style={{fontSize: 17, fontWeight: 'bold'}}>Comments {commentData.length === 0 ? " ": commentData.length}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <View style={{width: '100%', flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{flex: 1}} numberOfLines={3}>Be the first to add a comment and spread your word in the society</Text>
                </View>
            </View>
        </View>
        </View>
    </Pressable>
  )
  }
}

export default CommentsPreview
