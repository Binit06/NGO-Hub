import { View, Text, Image, Pressable, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Entypo } from '@expo/vector-icons';
import getUser from '../../hooks/getUser';
import { TextInput } from 'react-native-gesture-handler';
import PostType from './postType';
import PostHeader from '../../components/CustomHeaders/PostHeader';
import currentUser from '../../datasets/currentUser';

const PostScreen = () => {

  const handleGoBack = () => {
    
    router.replace('/(tabs)')
  };

  const [postType, setPostType] = useState('')
  const types = [
    {
      title: 'Fundraiser',
      imgURL: '../../assets/images/Fundraiser.png'
    },
    {
      title: 'Promotion',
      imgURL: '../../assets/images/Promotion.png'
    },
    {
      title: 'Advertisement',
      imgURL: '../../assets/images/Advertisement.png'
    }
  ]
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const handleTypeSelection = (title: string) => {
    setSelectedType(title === selectedType ? null : title);
  };

  const [postContent, setPostContent] = useState<string | null>(null)

  const PostContentData = {
    postContent: postContent || '',
    postId: 'FFRE4H',
    postType: selectedType || '',
    userId: currentUser
  }

  const [submit, setSubmit] = useState(false)
  const onSubmit = async () => {
    try {
      if(postContent !== null && selectedType !== null){
        setSubmit(true)
        const queryParams = new URLSearchParams(PostContentData)
        const response = await fetch(`https://ngo-api.vercel.app/api/post?${queryParams}`, {
          method: 'POST'
        })

        if(!response.ok){
          console.log("Post Failed")
          setSubmit(false)
          return
        }

        console.log("POST SUCCESFULL")
        setSubmit(false)
      }
    } catch (e) {
      console.log("Internet Down")
      setSubmit(false)
    } finally {
      setSubmit(false)
    }
  }

  const handleKeyPress = (e : any) => {
    // Check if the pressed key is the "Enter" key (keyCode 13)
    if (e.nativeEvent.key === 'Enter') {
      // Append a newline character to the existing text
      setPostContent((prevContent) => prevContent + '\n' + ' ');
    }
  };
  return (
    <>
    <KeyboardAvoidingView>
      <ScrollView contentContainerStyle={{paddingBottom: 140}}>
      <View style={{width: '100%', flexDirection: 'column', gap: 15, justifyContent: 'center', alignItems: 'center', marginTop: 15, paddingHorizontal: 15}}>
      <View style={{borderRadius: 10, width: '100%', paddingVertical: 7, flexDirection: 'column', gap: 7}}>
        {/* <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5}}>
          <Text style={{fontSize: 15, fontWeight: '600'}}>POST TYPE</Text>
        </View> */}
        <View style={{flexDirection: 'row', gap: 3, paddingHorizontal: 0, marginTop: 0}}>
          {types.map((type) => (
            <PostType {...type} key={type.title} isSelected={type.title === selectedType} onPress={() => handleTypeSelection(type.title)}/>
          ))}
        </View>
      </View>
      <View style={{width: '100%', paddingVertical: 10, flexDirection: 'column', gap: 10}}>
        <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, flex: 1, justifyContent: 'center'}}>
          <Text style={{fontSize: 22, fontWeight: '700', textAlign: 'center', letterSpacing: 3}}>Post</Text>
        </View>
        <View style={{paddingBottom: 0, paddingHorizontal: 10, paddingTop: 5, backgroundColor: 'white', borderRadius: 25, borderWidth: 1, borderStyle: 'dashed', borderColor: '#A3B4C1'}}>
          <TextInput placeholder='Write about your post' multiline maxLength={1000} onChangeText={(e) => {setPostContent(e)}} onKeyPress={handleKeyPress} style={{paddingBottom: 170, fontSize: 17, paddingTop: 10, paddingHorizontal: 10}}/>
        </View>
      </View>
      <View style={{width: '100%', paddingVertical: 10, flexDirection: 'column', gap: 10}}>
        <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, justifyContent: 'center'}}>
          <Text style={{fontSize: 22, fontWeight: '700', letterSpacing: 3}}>Upload Images</Text>
        </View>
        <View style={{width: '100%', paddingVertical: 0, borderRadius: 5}}>
          <View style={{flexDirection: 'row', gap: 5, paddingHorizontal: 0, marginTop: 10, width: '100%', borderStyle: 'dashed', borderColor: '#A3B4C1', borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 25, paddingVertical: 85, backgroundColor: 'white'}}>
            <Text style={{color: 'rgba(0,0,0,0.7)', fontSize: 20}}>+ Add Images</Text>
          </View>
        </View>
      </View>
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
      <View style={{position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'white', paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 17, alignItems: 'center'}}>
        <View>
          <Text>Discard Post</Text>
        </View>
        <View>
          <TouchableOpacity style={{paddingHorizontal: 15, paddingVertical: 9, borderRadius: 7, backgroundColor: 'rgba(0,0,255,0.2)'}} onPress={onSubmit} disabled={submit}>
            <Text>{submit ? 'POSTING' : 'POST'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

PostScreen.navigationOptions = {
  // Disable the back gesture
  gestureEnabled: false,
};

export default PostScreen;
