import { View, Text, ScrollView, Dimensions, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { LineChart } from 'react-native-chart-kit'
import FUNDSDATA from '../../datasets/FundsData';
import { AntDesign } from '@expo/vector-icons';
import useDetailsModelStore from '../../hooks/useDetailsModel';

interface chartProps {
    postId: string;
}

const Chart: React.FC<chartProps> = ({postId}) => {
    const fundData = FUNDSDATA.filter((data) => data.post_id === postId)[0];
    let Maindata = Array<number>()
    if (fundData) {
        const main_data = [];
      
        for (let i = 0; i < fundData.duration; i++) {
          let dailyTotal = 0;
      
          const donationsOnDay = fundData.donation.filter(
            (donation) =>
              donation.donated_on.getTime() ===
              new Date(fundData.raising_start.getFullYear(), fundData.raising_start.getMonth(), fundData.raising_start.getDate() + i).getTime()
          );
      
          donationsOnDay.forEach((donation) => {
            dailyTotal += donation.donation_amount;
          });
      
          main_data.push(dailyTotal);
        }
      
        Maindata = main_data
    } else {
        Maindata = [0]
    }
    const data = {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
        datasets: [
            {
                data: Maindata,
            },
        ]
    };
    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#fff",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(99, 91 ,255, ${opacity})`,
        strokeWidth: 3,
        barPercentage: 1,
        useShadowColorFromDataset: false
    };
    function sumBeforeIndex(array: Array<number>, index: number) {
        if (index >= 0 && index < array.length) {
          return array.slice(0, index+1).reduce((sum, value) => sum + value, 0);
        } else {
          console.error('Invalid index');
          return 0;
        }
    }
    const [clickedDotIndex, setClickedDotIndex] = useState<number | null>(sumBeforeIndex(Maindata, Maindata.length - 1));
    const detailsModel = useDetailsModelStore()
    return (
        <View>
        <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center'}}>
            <View style={{marginRight: 5, marginLeft: 5, padding: 3}}>
                <AntDesign name="linechart" size={20} color="black" />
            </View>
            <View style={{flex: 1, position: 'relative', top: 0, left: 0, paddingVertical: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 7, overflow: 'hidden', marginRight: 5}}>
                <View style={{position: 'absolute', top: 0, left: 0, height: '200%', width: `${((clickedDotIndex || 0)/100000)*100}%`, backgroundColor: 'rgba(0,255,0,0.2)'}}></View>
                <Text style={{fontWeight: '700'}}>{clickedDotIndex} / 100000</Text>
            </View>
        </View>
        <ScrollView horizontal contentContainerStyle={{marginTop: 17}} showsHorizontalScrollIndicator={false}>
            <LineChart 
            data={data}
            width={Dimensions.get('screen').width * 2}
            height={200}
            chartConfig={chartConfig}
            yAxisLabel=""
            style={{}}
            yAxisSuffix=""
            fromZero={true}
            onDataPointClick={(value) => {setClickedDotIndex(sumBeforeIndex(Maindata, value.index))}}
            />
        </ScrollView>
        <View style={{paddingHorizontal: 20, marginTop: 5}}>
            <TouchableOpacity style={{width: '100%', height: 47, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,255,0,0.3)', borderRadius: 25}} onPress={() => detailsModel.onOpen(<View><Text>Hi</Text></View>)}>
                <Text style={{fontSize: 16, fontWeight: '700'}}>Donate</Text>
            </TouchableOpacity>
        </View>
        </View>
    )
}

export default Chart