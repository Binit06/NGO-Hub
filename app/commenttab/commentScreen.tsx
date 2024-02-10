import { View, Text, ScrollView, TextInput, Image, Pressable } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import PromotionPost from '../../components/Posts/PromotionPost/PromotionPost';
import { useLocalSearchParams } from 'expo-router';
import COMMENTDATA from '../../datasets/CommentData';
import getUser, { UserData } from '../../hooks/getUser';
import PostType from '../posttab/postType';

const CommentScreen = () => {
  const params = useLocalSearchParams();
  const { postId, userId, imgUrl, postContent, type } = params;
  const formattedPostId = Array.isArray(postId) ? postId[0] : postId; // Handle the case when postId is an array

  console.log(formattedPostId);
  const [post, setPost] = useState('');
  const [user, setUser] = useState<UserData | undefined>(undefined);
  const [imageURL, setImageURL] = useState<string[]>([]);

  useEffect(() => {
    if (imgUrl.length !== 0) {
      setImageURL(Array.isArray(imgUrl) ? imgUrl : [imgUrl]);
    } else {
      setImageURL([]);
    }

    const fetchUser = async () => {
      const userData = await getUser("RgF5R4");
      setUser(userData ?? undefined);
      console.log("User Data is ", imgUrl);
    };

    fetchUser();
  }, [imgUrl]);

  const commentData = COMMENTDATA.filter((data) => data.post_id === postId);

  if (commentData.length === 0) {
    return null;
  }

  console.log("The Image URL Is for comment Screen", imgUrl);

  return (
    <>
      <ScrollView contentContainerStyle={{ paddingBottom: 0, flexDirection: 'column', gap: 0 }}>
        <PromotionPost
          postId={formattedPostId}
          userId={userId.toString()}
          imgURL={imageURL}
          Post={postContent.toString()}
          showText={true}
          type={PostType.toString()}
          title=''
        />
      </ScrollView>
      <View style={{ position: 'fixed', bottom: 0, width: '100%', height: 55, backgroundColor: 'white', paddingVertical: 0, paddingHorizontal: 5, flexDirection: 'column', alignItems: 'center', borderTopColor: '#DCDCDC', borderTopWidth: 3 }}>
        <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center', height: '100%', paddingHorizontal: 10 }}>
          <View style={{ borderColor: '#D8D8D8', borderWidth: 1, borderRadius: 50, backgroundColor: '#D8D8D8' }}>
            <Image source={{ uri: user?.user_image }} style={{ height: 28, width: 28, borderRadius: 28 }} />
          </View>
          <Pressable style={{ flex: 1, borderRadius: 10 }} onPressIn={() => { }}>
            <TextInput placeholder="Write your thoughts here" value={post} style={{ paddingVertical: 7, paddingHorizontal: 7 }} onChangeText={(text) => setPost(text)} />
          </Pressable>
          <View>
            <Text style={{ fontSize: 17, fontWeight: '700', color: post !== '' ? '#0066ff' : '#989898' }}>Post</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default CommentScreen;
