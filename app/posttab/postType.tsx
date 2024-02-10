import { View, Text, Image, Pressable } from 'react-native';
import React, { useState } from 'react';

interface PostTypeProps {
  title: string;
  imgURL: string;
  isSelected: boolean;
  onPress: () => void;
}

const PostType: React.FC<PostTypeProps> = ({ title, imgURL, isSelected, onPress }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(!isPressed);
  };

  return (
    <View style={{flex: 1, paddingHorizontal: 10}}>
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: isSelected ? 'blue' : '#CDD5D7', // Change color when pressed
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: isSelected ? 'rgba(0,0,255,0.08)' : 'white'
      }}
    >
      <View>
        {title === "Fundraiser" ? (
          <Image source={require('../../assets/images/Fundraiser.png')} style={{ width: 70, height: 70 }} />
        ): title === "Promotion" ? (
          <Image source={require('../../assets/images/Promotion.png')} style={{ width: 70, height: 70 }} />
        ): title === "Advertisement" ? (
          <Image source={require('../../assets/images/Advertisement.png')} style={{ width: 70, height: 70 }} />
        ): (
          null
        )}
      </View>
    </Pressable>
    <Text style={{fontSize: 14, marginTop: 5, textAlign: 'center', fontWeight: 'bold'}}>{title}</Text>
    </View>
  );
};

export default PostType;
