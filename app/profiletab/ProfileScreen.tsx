import { View, Text, Image, TouchableOpacity, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Activity from './Activity'
import Button from './Button'
import { Post } from '../(tabs)'

const ProfileScreen = () => {
  const [showFullText, setShowFullText] = useState<number | undefined>(3)
  const [posts, setPosts] = useState<Post[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://ngo-api.vercel.app/api/getpost/Grf4R5');
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const [current, setCurrent] = useState(true)
  return (
    <View style={{backgroundColor: 'black'}}>
      <View style={{width: '100%', height: 170, borderColor: 'black', borderWidth: 1}}>
        <Image source={{uri: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}} style={{flex:1, opacity: 0.9}}/>
        <View style={{position: 'absolute', bottom: -50, right: 10, borderColor: 'black', borderWidth: 2, borderRadius: 15, paddingHorizontal: 2, paddingVertical: 2, backgroundColor: 'black'}}>
          <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZO1efTIykvASomNPRoind4RDlg54Mmp7QeEKJyWbKrw&s'}} style={{width: 120, height: 120, borderRadius: 15}}/>
        </View>
      </View>
      <View style={{paddingHorizontal: 20, paddingVertical: 15, flexDirection: 'column', justifyContent: 'space-between', width: '100%'}}>
          <Text style={{fontSize: 30, fontWeight: 'bold', color: 'rgba(255,255,255,0.9)'}}>LUDO INC.</Text>
          <Text style={{color: 'rgba(255,255,255,0.6)'}}>This is the comapny's URL</Text>
      </View>
      <View style={{paddingLeft: 20, paddingRight: 45, flexDirection: 'column'}}>
        <View>
          <Text style={{fontSize: 15, color: 'rgba(255,255,255,0.7)'}} numberOfLines={showFullText !== undefined ? showFullText : undefined}>A brand for the metaverse. Built by community. Azui Starts with collection of 10000 avatars in the realm of multiverse. Our story begins s a legend empire that once stood against the multiple various of the lives that had faced</Text>
        </View>
        <TouchableOpacity style={{width: 80, borderRadius: 17, backgroundColor: 'rgba(0,170,0,0.2)', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 7, marginTop: 7, gap: 10, display: showFullText === undefined ? "none": "flex"}} onPress={() => {setShowFullText(undefined)}}><Text style={{color: 'rgba(0,190,0,0.5)', fontWeight: 'bold'}}>More</Text></TouchableOpacity>
      </View>
      <View style={{width: '100%', flexDirection: 'row', paddingLeft: 20, paddingRight: 50, gap: 10, marginVertical: 10}}>
        <View style={{flex: 1, paddingHorizontal: 0, paddingVertical: 10, borderColor: 'rgba(0,0,0, 0.95)', borderWidth: 3, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(100,100,100,0.4)'}}>
          <Text style={{color: 'rgba(255,255,255,0.8)', fontWeight: 'bold'}}> + Connect</Text>
        </View>
        <View style={{flex: 1, paddingHorizontal: 15, paddingVertical: 10, borderColor: 'rgba(0,0,0, 0.95)', borderWidth: 3, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(100,100,100,0.4)'}}>
          <Text style={{color: 'rgba(255,255,255,0.8)', fontWeight: 'bold'}}> Join Community</Text>
        </View>
      </View>
      <View style={{width: '100%', paddingHorizontal: 15, paddingVertical: 15, backgroundColor: 'black', gap: 10}}>
        <View style={{flexDirection: 'row', gap: 7, width: '100%'}}>
          <Pressable style={{justifyContent: 'center', backgroundColor: 'rgba(25,25,25, 1)', paddingHorizontal: 5, paddingVertical: 10, borderRadius: 10, alignItems: 'center', flex: 1}} onPress={() => setCurrent(true)}>
            <Text style={{color: current ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.2)', fontSize: 20}}>
              Activities
            </Text>          
          </Pressable>
          <Pressable style={{justifyContent: 'center', backgroundColor: 'rgba(25,25,25, 1)', paddingHorizontal: 5, paddingVertical: 10, borderRadius: 10, alignItems: 'center', flex: 1}} onPress={() => setCurrent(false)}>
            <Text style={{color: !current ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.2)', fontSize: 20}}>
              Interactions
            </Text>          
          </Pressable>
        </View>
        <ScrollView style={{ backgroundColor: 'rgba(25,25,25,1)', borderRadius: 15, height: 220 }} contentContainerStyle={{ paddingBottom: 0, height: 220 }}>
          {current ? (
            posts?.map((post) => (
              <Activity key={post.post_id} content={post.post_content} imgUrl={post.post_images}/>
            ))
          ) : (
            null
          )}
          <View style={{ width: '100%', flex: 1, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 3 }}>
            <Button label='Show More' />
          </View>
        </ScrollView>

      </View>
    </View>
  )
}

export default ProfileScreen