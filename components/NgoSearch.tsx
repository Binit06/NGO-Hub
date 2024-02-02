import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Entypo, EvilIcons, Octicons } from '@expo/vector-icons';

interface NgoSearchProps {
    id: number;
    imgURL: string;
    Title: string;
    Category: string;
    Category2: string;
    Location: string;
    open: boolean;
}
const NgoSearch : React.FC<NgoSearchProps> = ({id, imgURL, Title, Category, Category2, Location, open }) => {
  return (
    <View style={{ paddingHorizontal: 8 }}>
      <View style={{ flexDirection: 'row', gap: 5, marginTop: 13, borderRadius: 10, overflow: 'hidden', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white'}}>
        <View style={{flexDirection: 'row'}}>
            <View>
                <Octicons name='dot-fill' size={20} color={open ? '#4AAAC7' : 'red'} style={{position: 'absolute', zIndex: 5, top: 5, left: 5}}/>
                <Image source={{ uri: imgURL }} style={{ height: 90, width: 90 }} />
            </View>
            <View style={{ flexDirection: 'column', marginLeft: 10, justifyContent: 'center', gap: 3}}>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: '600' }}>{Title.length > 14 ? `${Title.substring(0, 14)}...` : Title}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, backgroundColor: 'rgba(151,225,220, 0.4)', paddingVertical: 3, paddingHorizontal: 8, borderRadius: 3, opacity: 0.8, marginRight: 5}}>
                    #{Category}
                    </Text>
                    {Category.length + Category2.length <= 15 && (
                        <Text style={{ fontSize: 15, backgroundColor: 'rgba(151,225,220, 0.4)', paddingVertical: 3, paddingHorizontal: 8, borderRadius: 3, opacity: 0.8, marginRight: 5 }}>
                        #{Category2}
                        </Text>
                    )}
                </View>
                <View style={{flexDirection: 'row'}}>
                    <EvilIcons name='location' size={20} color={'black'} />
                    <Text>{Location}</Text>
                </View>
            </View>
        </View>
        <View style={{flexDirection: 'column', alignItems: 'flex-end', gap: 10}}>
            {/* <TouchableOpacity style={{paddingHorizontal: 13, paddingVertical: 8, borderRadius: 20, backgroundColor: '#635bff'}}>
                <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>+ Follow</Text>
            </TouchableOpacity> */}
            <View style={{paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', gap: 3}}>
                {/* <Octicons name='dot-fill' size={15} color={open ? 'green' : 'red'}/> */}
                <Text style={{fontSize: 17, color: '#635bff', fontWeight: '500'}}>+ Follow</Text>
            </View>
        </View>
      </View>
    </View>
  );
};

export default NgoSearch;
