import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Dimensions, Pressable, Image, TouchableOpacity, ActivityIndicator } from "react-native"
import USERDATA from "../../../datasets/userdata";
import PromotionHeader from "./Header/PromotionHeader";
import AdvertHeader from "./Header/AdvertHeader";
import FundRaiserHeader from "./Header/FundRaiser";
import { ScrollView } from "react-native-gesture-handler";
import renderBlueHashtags from "../../SpecialRenders/renderHastags";
import { AntDesign, FontAwesome5, SimpleLineIcons } from "@expo/vector-icons";
import FullComment from "./Footer/FullComment";
import CommentsPreview from "./Footer/PreviewComment";
import { BarChart, LineChart } from "react-native-chart-kit";
import FUNDSDATA from "../../../datasets/FundsData";
import useDetailsModelStore from "../../../hooks/useDetailsModel";
import Chart from "../../Charts/chart";
import getUser, { UserData } from "../../../hooks/getUser";
import currentUser from "../../../datasets/currentUser";

interface PromotionPostProps {
    postId: string,
    userId: string,
    imgURL: string[],
    Post: string,
    showText: boolean,
    title: string,
    type: string,
}

const PromotionPost: React.FC<PromotionPostProps> = ({
    postId,
    userId,
    imgURL,
    Post,
    showText,
    title,
    type
}) => {

    const [userDATA, setUserDATA] = useState<UserData | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
          const userData = await getUser(userId);
          setUserDATA(userData);
        };
    
        fetchUserData();
    }, [userId]);

    const totalImages = imgURL.length;
    const [imageSize, setImageSize] = useState(true);
    const [showFullText, setShowFullText] = useState(showText);
    const [liked, setLiked] = useState(false);
    useEffect(() => {
        const checklikes = async () => {
            try {
                const responses = await fetch(`https://ngo-api.vercel.app/api/getonepost/${postId}`, {
                    method: 'GET'
                })

                if(!responses.ok){
                    setLiked(false)
                }

                const responseData = await responses.json();
                setLiked(responseData.post.liked_users?.some((post: any) => post.user_id === currentUser))
            } catch (e) {
                setLiked(false)
                console.log(`An Error Occured: ${e}`)
            }
        }

        checklikes()
    }, [])
    const imageWidthPercentage = 100 / totalImages;

    let headerComponent;
    if (userDATA) {
        if (type === "fundraiser") {
          headerComponent = <FundRaiserHeader />;
        } else if (type === "advertise") {
          headerComponent = <AdvertHeader />;
        } else {
          headerComponent = (
            <PromotionHeader
              imgURL={userDATA.user_image || ""}
              userName={userDATA.user_name || ""}
              userId={userDATA.user_id || ""}
              follow={userDATA.user_followers.some((user) => user.user_id === currentUser)}
              user={userDATA || []}
            />
          );
        }
      } else {
        headerComponent = <ActivityIndicator />;
    }

    const handleLike = async () => {
        try{
            if(liked === true){
                return
            }
            setLiked(true)
            const response = await fetch(`https://ngo-api.vercel.app/api/addlikes/${postId}/${currentUser}`, {
                method: 'GET'
            })

            if(!response.ok) {
                setLiked(false)
                return
            }
        } catch (e) {
            setLiked(false)
            console.log(`An error occured: ${e}`)
        }
    }

    const handleDislike = async () => {
        try{
            if(liked === false){
                return
            }
            setLiked(false)
            const response = await fetch(`https://ngo-api.vercel.app/api/removelikes/${postId}/${currentUser}`, {
                method: 'GET'
            })

            if(!response.ok) {
                setLiked(true)
                return
            }
        } catch (e) {
            setLiked(true)
            console.log(`An error occured: ${e}`)
        }
    }
    console.log("Number of Total Images : ", totalImages)
    return (
        <View style={{flex: 1, justifyContent: 'space-between', paddingHorizontal: 0}}>
            <View style={{flex: 1, paddingHorizontal: 7, overflow: 'hidden', paddingTop: 7, marginTop: 5, paddingBottom: 7}}>
                {totalImages !== 0 ? (
                    <ScrollView
                        horizontal
                        contentContainerStyle={{
                            width: `${totalImages * 100}%`,
                            height: 210,
                            borderTopRightRadius: 10,
                            borderTopLeftRadius: 10,
                            flexDirection: 'row',
                        }}
                        snapToInterval={Dimensions.get('window').width - 18}
                        snapToAlignment="center"
                        decelerationRate={'normal'}
                        showsHorizontalScrollIndicator={false}
                        bounces={false}
                        overScrollMode="never"
                    >
                        {imgURL.map((url, index) => (
                            <Pressable key={index} style={{ position: 'relative', width: `${imageWidthPercentage}%`, height: '100%', justifyContent: 'center' }} onPress={() => setImageSize(!imageSize)}>
                                {url.length !== 0 ? (
                                    <View style={{ width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center',borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow: 'hidden' }}>
                                        <Image source={{ uri: url.trim() || 'https://www.happyfacesvadodara.com/wp-content/uploads/2021/04/1.jpg' }} style={{ width: '100%', height: '100%', resizeMode: imageSize ? 'cover' : 'contain' }} />
                                        <Text style={{ position: 'absolute', top: 5, right: 10, color: 'white', zIndex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5 }}>
                                            {index + 1} / {totalImages}
                                        </Text>
                                    </View>
                                ) : null}
                            </Pressable>
                        ))}
                    </ScrollView>
                ) : (
                    <View></View>
                )}
                <View style={{paddingVertical: 10}}>
                {headerComponent}
                </View>
                <View style={{width: '100%', flexDirection: 'row', paddingHorizontal: 5}}>
                    <View style={{ paddingHorizontal: 5, marginTop: 5, flex: 1 }}>
                        <Text numberOfLines={showFullText ? undefined : 4} onPress={() => setShowFullText(!showFullText)} disabled={showText}>
                            {renderBlueHashtags(Post)}
                        </Text>
                        {Post.length > 50 && (
                            <View>
                                <TouchableOpacity onPress={() => setShowFullText(!showFullText)}>
                                    <Text style={{ color: 'blue', fontWeight: 'bold' }}>
                                        {showFullText ? '' : 'Show More'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                    {type === 'fundraiser' ? (
                        <View style={{flex: 1, paddingVertical: 20}}>
                            <View style={{width: '100%', height: 100, backgroundColor: 'rgba(0,133,244, 0.7)'}}>

                            </View>
                        </View>
                    ): (
                        null
                    )}
                </View>
                {type === "fundraiser" ? (
                    <Chart postId={postId}/>
                ): (
                    <>
                    <View style={{ paddingTop: 10, paddingHorizontal: 7 }}>
                        <View style={{ flexDirection: 'row', gap: 7 }}>
                            <View style={{ backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', gap: 7, padding: 7, borderRadius: 15}}>
                                {!liked ? (
                                    <TouchableOpacity onPress={handleLike} style={{flexDirection: 'row', gap: 7, alignItems: 'center'}}>
                                        <AntDesign name="hearto" size={24} color="black" />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={handleDislike} style={{flexDirection: 'row', gap: 7, alignItems: 'center'}}>
                                        <AntDesign name="heart" size={24} color="red" />
                                    </TouchableOpacity>
                                )}
                            </View>
                            <View style={{ backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', gap: 10, padding: 7, borderRadius: 15}}>
                                <FontAwesome5 name="telegram-plane" size={24} color="black" />
                            </View>
                            <View style={{ backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', gap: 10, borderRadius: 15}}>
                                <View style={{flexDirection: 'row', alignItems: 'center', padding: 7, height: '100%', gap: 7}}>
                                    <FontAwesome5 name="hand-holding-heart" size={24} color="black" />
                                </View>
                            </View>
                            <View style={{backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 30, flex: 1, justifyContent: 'center', paddingHorizontal: 20}}>
                                <Text style={{fontSize: 15}}>Enter a Comment</Text>
                            </View>
                            {/* {!showText ? (<CommentsPreview postId={postId} userId={userId} imgUrl={imgURL} postContent={Post} postType={type}/>) : (<FullComment postId={postId} />)} */}
                            {/* <View style={{ backgroundColor: 'rgba(0,0,0,0.05)', flexDirection: 'row', alignItems: 'center', gap: 7, paddingHorizontal: 15, paddingVertical: 7, borderRadius: 15, flex: 1}}>
                                <FontAwesome5 name='bookmark' size={15} color={'black'} />
                                <Text>Save</Text>
                            </View> */}
                        </View>
                    </View>
                    </>
                )}
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0.05)',
        paddingHorizontal: 0
    },
    innerContainer: {
        flex: 1,
        paddingHorizontal: 7,
        borderRadius: 0,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingTop: 7,
        marginTop: 5,
        paddingBottom: 7,
        borderWidth: 1,
    }
})

export default PromotionPost