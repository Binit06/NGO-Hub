type UserType = {
    user_id: string;
    user_name: string;
    user_image: string;
    user_description: string | null;
    preferred_tags: any;
    type: string;
    user_tag: string;
    user_followers: number;
    user_creation_date? : Date;
    followers? : any;   
    memeber? : any;
    connections? : any;

  };
  
  const USERDATA: (UserType | undefined)[] = [
    {
      user_id: "Grf4R5",
      user_name: "Healthy Home Foundation",
      user_image: "https://links.papareact.com/gn7",
      user_description: null,
      preferred_tags: [
        {
            tag_name: "funding",
            tag_rating: 0.1
        },
        {
            tag_name: "books",
            tag_rating: 0.5
        },
        {
            tag_name: "childcare",
            tag_rating: 0.4
        }
      ],
      type: "ngo",
      user_tag: "healthy_home_foundation",
      user_followers: 230
    },
    {
      user_id: "RgF5R4",
      user_name: "Binit Lenka",
      user_image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
      user_description: null,
      preferred_tags: ["Food", "Health", "Donation"],
      type: "person",
      user_tag: "binit_lenka",
      user_followers: 560
    },
    {
      user_id: "Tfrd54",
      user_name: "Rishab Mohapatra",
      user_image: "https://links.papareact.com/wru",
      user_description: null,
      preferred_tags: ["Food", "Health", "Donation"],
      type: "person",
      user_tag: "rishab_mohapatra",
      user_followers: 100
    },
  ];
  
  export default USERDATA;
  