import { View, Text, Image, TouchableOpacity, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Activity from './Activity'
import Button from './Button'
import { Post } from '../(tabs)'
import currentUser from '../../datasets/currentUser'
import { Users } from '../../types'
import getUser, { UserData } from '../../hooks/getUser'
import { useLocalSearchParams } from 'expo-router'
import { AntDesign, Feather, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

const ProfileScreen = () => {
  const params = useLocalSearchParams();
  const {user_id} = params
  const [showFullText, setShowFullText] = useState<number | undefined>(3)
  const [posts, setPosts] = useState<Post[]>([])
  const [userData, setUserData] = useState<UserData | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Reached")
        const response = await fetch(`https://ngo-api.vercel.app/api/getpost/${user_id.toString()}`);
        const data = await response.json();
        setPosts(data.posts);
        console.log(data.posts)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUser(user_id.toString());
      setUserData(userData);
    };

    fetchUserData();
}, []);
  const [current, setCurrent] = useState(true)
  const [isConnected, setIsConnected] = useState<boolean | null>(false)

  const handleConnect = async () => {
    try{
      setIsConnected(null)
      const response = await fetch(`https://ngo-api.vercel.app/api/connect/${user_id}/${currentUser}`, {
        method: 'GET'
      })
      if(!response.ok){
        setIsConnected(false)
        console.log("Responses not correct")
        return 
      }

      setIsConnected(null)
      return console.log("Connect Request Sent")

    } catch (e) {
      setIsConnected(false)
      console.log("Request Failed")
    }
  }
  const [user, setUser] = useState<UserData | null>()
  useEffect(() => {
    const handleUser = async () => {
      try {
        const userData = await getUser(user_id.toString());
        setUser(userData);
        
        const isConnected = userData?.user_connections.some(connection => connection.user_id === user_id) || false;
        setIsConnected(isConnected);
  
        const pendingRequest = userData?.connect_requests.find(request => request.user_id === currentUser && request.request === "received");
        console.log(userData?.connect_requests)
        if (pendingRequest) {
          setIsConnected(null);
        }
        const acceptance = userData?.connect_requests.find(request => request.user_id === currentUser && request.request === "sent")
        if(acceptance){
          setIsConnected(null)
        }
      } catch (e) {
        console.log("failed to fetch user data:", e);
      }
    };
  
    handleUser();
  }, [user_id]);
  console.log(currentUser)
  return (
    <View style={{backgroundColor: 'black'}}>
      <View style={{width: '100%', height: 170, borderColor: 'black', borderWidth: 1}}>
        <Image source={{uri: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}} style={{flex:1, opacity: 0.9}}/>
        <View style={{position: 'absolute', bottom: -50, right: 10, borderColor: 'black', borderWidth: 2, borderRadius: 15, paddingHorizontal: 2, paddingVertical: 2, backgroundColor: 'black'}}>
          <Image source={{uri: user?.user_image}} style={{width: 120, height: 120, borderRadius: 15}}/>
        </View>
      </View>
      <View style={{paddingHorizontal: 20, paddingVertical: 15, flexDirection: 'column', justifyContent: 'space-between', width: '100%'}}>
          <Text style={{fontSize: 30, fontWeight: 'bold', color: 'rgba(255,255,255,0.9)'}}>{user?.user_name}</Text>
          <Text style={{color: 'rgba(255,255,255,0.6)'}}>This is the comapny's url</Text>
      </View>
      <View style={{paddingLeft: 20, paddingRight: 45, flexDirection: 'column'}}>
        <View>
          <Text style={{fontSize: 15, color: 'rgba(255,255,255,0.7)'}} numberOfLines={showFullText !== undefined ? showFullText : undefined}>A brand for the metaverse. Built by community. Azui Starts with collection of 10000 avatars in the realm of multiverse. Our story begins s a legend empire that once stood against the multiple various of the lives that had faced</Text>
        </View>
        <TouchableOpacity style={{width: 80, borderRadius: 17, backgroundColor: 'rgba(0,170,0,0.2)', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 7, marginTop: 7, gap: 10, display: showFullText === undefined ? "none": "flex"}} onPress={() => {setShowFullText(undefined)}}><Text style={{color: 'rgba(0,190,0,0.5)', fontWeight: 'bold'}}>More</Text></TouchableOpacity>
      </View>
      {currentUser !== user_id ? (
        <View style={{width: '100%', flexDirection: 'row', paddingLeft: 20, paddingRight: 50, gap: 10, marginVertical: 10}}>
          <Pressable style={{flex: 1, paddingHorizontal: 0, paddingVertical: 10, borderColor: 'rgba(0,0,0, 0.95)', borderWidth: 3, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(100,100,100,0.4)'}} onPress={handleConnect}>
          {userData?.connect_requests.find(request => request.user_id === currentUser && request.request === "sent") ? (
            <Text style={{color: 'rgba(255,255,255,0.8)', fontWeight: 'bold'}}>Accept</Text>
          ):(
            <Text style={{color: 'rgba(255,255,255,0.8)', fontWeight: 'bold'}}> {isConnected === null ? "Request Sent" : isConnected === true ? "Connected" : "+ Connect"}</Text>
          )}
          </Pressable>
          <View style={{flex: 1, paddingHorizontal: 15, paddingVertical: 10, borderColor: 'rgba(0,0,0, 0.95)', borderWidth: 3, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(100,100,100,0.4)'}}>
            <Text style={{color: 'rgba(255,255,255,0.8)', fontWeight: 'bold'}}> Join Community</Text>
          </View>
        </View>
      ): (
        null
      )}
      <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
        <View style={{flexDirection: 'row', gap: 7, alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 10}}>
          <Feather name="activity" size={24} color="black" />
          <Text>Activity <Text style={{fontSize: 17, color: 'rgba(0,0,0,0.6)'}}>{"(in last 7 weeks)"}</Text></Text>
        </View>
        <View style={{backgroundColor: 'black', width: '100%'}}>
          <View style={{gap: 7, flexDirection: 'row', backgroundColor: 'blue'}}>
            <View style={{flex: 1}}>
              <View>
                <View>
                  <MaterialCommunityIcons name="post" size={24} color="black" />
                </View>
                <View>
                  <Text>Posts</Text>
                </View>
              </View>
              <View>
                <Text>20</Text>
              </View>
            </View>
            <View style={{flex: 1}}>
              <View>
                <View>
                  <Ionicons name="people" size={24} color="black" />
                </View>
                <View>
                  <Text>Connections</Text>
                </View>
              </View>
              <View>
                <Text>100</Text>
              </View>
            </View>
          </View>
          <View style={{gap: 7, flexDirection: 'row', backgroundColor: 'red'}}>
            <View style={{flex: 1}}>
              <View>
                <View>
                  <AntDesign name="addusergroup" size={24} color="black" />
                </View>
                <View>
                  <Text>Following</Text>
                </View>
              </View>
              <View>
                <Text>350</Text>
              </View>
            </View>
            <View style={{flex: 1}}>
              <View>
                <View>
                  <FontAwesome5 name="donate" size={24} color="black" />
                </View>
                <View>
                  <Text>Donations</Text>
                </View>
              </View>
              <View>
                <Text>100K</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10}}>
        <View style={{gap: 7, flexDirection: 'row'}}>
            <View style={{flex: 1, flexDirection: 'column', gap: 7}}>
              <View style={{flexDirection: 'row', gap: 10, alignItems: 'center', paddingVertical: 5, paddingHorizontal: 15}}>
                <View>
                  <FontAwesome5 name="layer-group" size={24} color="white" />
                </View>
                <View>
                  <Text style={{color: 'white', fontSize: 17}}>Assosiated With</Text>
                </View>
              </View>
              <View style={{paddingHorizontal: 15}}>
                <View style={{width: '100%', flexDirection: 'row', gap: 7, backgroundColor: 'rgb(100,100,100)', paddingHorizontal: 7, paddingVertical: 9, borderRadius: 10}}>
                  <View style={{width: 40, height: 40, padding: 3}}>
                    <Image source={{uri: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}} style={{flex:1, opacity: 0.9}}/>                    
                  </View>
                  <View style={{flexDirection: 'column'}}>
                    <View><Text style={{color: 'white'}}>NGO NAME</Text></View>
                    <View><Text style={{color: 'white'}}>NGO Description</Text></View>
                  </View>
                </View>
              </View>
            </View>
          </View>
      </View>
    </View>
  )
}

export default ProfileScreen