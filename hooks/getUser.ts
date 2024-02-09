import { useEffect, useState } from "react";

export interface UserData {
  user_email: string;
  user_id: string;
  user_name: string;
  user_image: string;
  user_connection_count: number;
  user_following_count: number;
  user_following: string[];
  user_follower_count: number;
  user_followers: { user_id: string }[];
  connect_requests: {request: string, user_id: string}[];
  user_connections: { user_id: string }[];
}

const getUser = async (userId: string): Promise<UserData | null> => {
  try {
    const response = await fetch(`https://ngo-api.vercel.app/api/getusers/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      console.error('Error fetching user data');
      return null;
    }

    const responseData = await response.json();
    return responseData.users;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

export default getUser;
