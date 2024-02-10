import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { View } from '../../components/Themed';
import PromotionPost from '../../components/Posts/PromotionPost/PromotionPost';
import { AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';
import currentUser from '../../datasets/currentUser';

export interface Post {
  post_content: string;
  post_id: string;
  hashtags: string[];
  post_images: string[] | [];
  user_id: string;
  post_type: string;
  liked_users: { user_id: string }[];
  likes: number;
  post_title: string;
  timestamp: { _seconds: number; _nanoseconds: number };
}

export default function TabOneScreen() {
  const [postData, setPostData] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [contentLoading, setIsContentLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [maxPostReached, setMaxPostReached] = useState(false)

  const fetchData = async () => {
    try {
      if (page === 1) {
        setIsLoading(true);
      } else {
        setIsContentLoading(true);
      }
      const response = await fetch(
        `https://ngo-api.vercel.app/api/getpost/all?page=${page}`
      );
      const data = await response.json();

      // Assuming 'posts' is an array within the fetched data
      const posts = data.posts || [];
      if(posts.length === 0){
        setMaxPostReached(true)
        return
      }

      // Map and transform the data as needed
      const formattedPosts: Post[] = posts.map((post: any) => ({
        post_content: post.post_content,
        post_id: post.post_id,
        hashtags: post.hashtags || [],
        post_images: post.post_images || [],
        user_id: post.user_id,
        post_type: post.post_type,
        liked_users: post.liked_users || [],
        likes: post.likes || 0,
        timestamp: post.timestamp || { _seconds: 0, _nanoseconds: 0 },
      }));

      const filteredPosts = formattedPosts.filter((user) => user.user_id !== currentUser)

      if(filteredPosts.length !== 0){
        setPostData((prevData) => [...prevData, ...filteredPosts]);
      } else {
        return 
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
      setIsContentLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleRefresh = () => {
    setRefreshing(true);
    setMaxPostReached(false);
    setPage(1)
    setPostData([])
    fetchData();
    setRefreshing(false);
  };

  const handleEndReached = () => {
    if(!maxPostReached){
      setPage(page + 1);
    }
  };

  return (
    <>
      {isLoading === false ? (
        <View style={{}}>
          <FlatList
            data={postData}
            keyExtractor={(item) => item.post_id}
            renderItem={({ item }) => (
              <PromotionPost
                Post={item.post_content}
                imgURL={item.post_images}
                postId={item.post_id}
                userId={item.user_id}
                key={item.post_id}
                type={item.post_type}
                title={item.post_title}
                showText={false}
              />
            )}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.1}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            style={{backgroundColor: 'rgba(0,0,0,0)'}}
          ListFooterComponent={
            contentLoading ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ActivityIndicator size={'large'} color={'#635bff'} />
            </View>
          ) : null
          }
          />
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              borderRadius: 40,
            }}
          >
            <Link href={'/posttab/postScreen'} asChild>
              <AntDesign name="pluscircle" size={55} color="black" />
            </Link>
          </View>
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={'large'} color={'#635bff'} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 5,
    flexDirection: 'column',
    gap: 20,
  },
});
