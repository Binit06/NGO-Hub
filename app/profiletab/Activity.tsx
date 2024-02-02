import { View, Text, Image } from 'react-native'
import React from 'react'
import renderBlueHashtags from '../../components/SpecialRenders/renderHastags';

interface activityProps {
    imgUrl: string[];
    content: string;
}

const Activity: React.FC<activityProps> = ({imgUrl, content}) => {
  return (
    <View style={{backgroundColor: 'rgba(25,25,25,1)', padding: 10, borderRadius: 15}}>
        <View>
            <Image source={{uri: imgUrl[0]}} style={{width: '100%', height: 120}}></Image>
        </View>
        <View style={{backgroundColor: 'rgba(50,50,50,1)', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, padding: 10}}>
            <Text style={{color: 'rgba(255,255,255,0.7)'}} numberOfLines={4}>{renderBlueHashtags(content)}</Text>
        </View>
    </View>
  )
}

export default Activity