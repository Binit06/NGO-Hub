import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import currentUser from '../../../../datasets/currentUser';
import { Link } from 'expo-router';

interface PromotionHeaderProps {
    imgURL: string,
    userName: string,
    userId: string,
    follow: boolean;
}

const PromotionHeader : React.FC<PromotionHeaderProps> = ({
    imgURL,
    userName,
    userId,
    follow
}) => {

  const [isfollowing, setIsFollowing] = useState(follow)

  const handleFollow = async () => {
    try {
      setIsFollowing(true)
      const response = await fetch(`https://ngo-api.vercel.app/api/follow/${userId}/${currentUser}`, {
        method: 'GET'
      })
  
      if (!response.ok) {
        console.log("Something Wrong Occurred");
        setIsFollowing(false); // Update state to indicate the follow operation was not successful
        return;
      }
  
      console.log("Follow Successful");
      setIsFollowing(true); // Update state to indicate the follow operation was successful
    } catch (e) {
      console.log("Something wrong occurred");
      setIsFollowing(false); // Update state to indicate the follow operation was not successful
    }
  };

  const handleUnfollow = async () => {
    try {
      setIsFollowing(false)
      const response = await fetch(`https://ngo-api.vercel.app/api/unfollow/${userId}/${currentUser}`, {
        method: 'GET'
      })
  
      if (!response.ok) {
        console.log("Something Wrong Occurred");
        setIsFollowing(true); // Update state to indicate the follow operation was not successful
        return;
      }
  
      console.log("UnFollow Successful");
      setIsFollowing(false); // Update state to indicate the follow operation was successful
    } catch (e) {
      console.log("Something wrong occurred");
      setIsFollowing(true); // Update state to indicate the follow operation was not successful
    }
  };
  
  return (
    <Link href={{pathname: '/profiletab/ProfileScreen', params: {user_id: userId}}} asChild>
    <Pressable style={styles.container}>
      <View style={styles.profileHeader}>
        {imgURL ? (
          <Image source={{uri: imgURL}} style={styles.imageContainer}/>
        ): (
          <Image source={{uri: "https://links.papareact.com/gn7"}} style={styles.imageContainer}/>
        )}
        <Text>{userName}</Text>
      </View>
      
        {isfollowing ? (
          <TouchableOpacity onPress={handleUnfollow}>
            <Text style={styles.FollowText}>Following</Text>
          </TouchableOpacity>
        ): (
          <TouchableOpacity onPress={handleFollow}>
            <Text style={styles.FollowText}>+ Follow</Text>
          </TouchableOpacity>
        )}
    </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 7,
        paddingLeft: 3,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    profileHeader: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    imageContainer: {
        height: 28,
        width: 28,
        borderRadius: 28,
        backgroundColor: 'white',
        padding: 10,
        resizeMode: 'contain'
    },
    FollowText: {
        color: '#635bff',
        fontWeight: '500'
    }
})

export default PromotionHeader