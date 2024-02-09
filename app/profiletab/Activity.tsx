import { View, Text, Image } from 'react-native'
import React from 'react'
import renderBlueHashtags from '../../components/SpecialRenders/renderHastags';
import { Post } from '../(tabs)';

interface activityProps {
    postData: Post;
}
const Activity: React.FC<activityProps> = ({postData}) => {
  console.log(postData)
  return (
    <View style={{backgroundColor: 'rgba(25,25,25,1)', padding: 10, borderRadius: 15}}>
        <View>
            {postData.post_images.length !== 0 ? (
                <Image source={{uri: postData.post_images[0]}} style={{width: '100%', height: 120}}></Image>
            ): (
                null
            )}
        </View>
        <View style={{backgroundColor: 'rgba(50,50,50,1)', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, padding: 10}}>
            <Text style={{color: 'rgba(255,255,255,0.7)'}} numberOfLines={4}>{renderBlueHashtags(postData.post_content)}</Text>
        </View>
    </View>
  )
}

export default Activity