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
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: isSelected ? 'blue' : 'rgba(0, 0, 0, 0.50)', // Change color when pressed
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: isSelected ? 'rgba(0,0,255,0.08)' : 'white'
      }}
    >
      <View>
        <Image source={{ uri: imgURL }} style={{ width: 70, height: 70 }} />
      </View>
      <Text style={{fontSize: 13, marginTop: 5}}>{title}</Text>
    </Pressable>
  );
};

export default PostType;
