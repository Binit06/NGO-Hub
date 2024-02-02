import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';

interface MainHeaderProps {
    title: string;
}
const MainHeader: React.FC<MainHeaderProps> = ({ title }) => {
    const handleSearchClick = () => {
        
    }
    return (
        <SafeAreaView>
            <View style={[styles.headerContainer]}>
                <Link href={'/profiletab/ProfileScreen'} asChild>
                    <Pressable>
                        <Image source={{ uri: "https://links.papareact.com/wru" }} style={{height: 20, width: 20, backgroundColor: 'rgb(209, 213, 219)', padding: 20, borderRadius: 20}}/>
                    </Pressable>
                </Link>
                <Link href={'/searchtab/searchScreen'} asChild>
                <Pressable style={{flex: 1}}>
                    <View style={[styles.SearchBar]}>
                        <Entypo name='magnifying-glass' size={20} color="#635bff"/>
                        <TextInput placeholder='Search' keyboardType='default'/>
                    </View>
                </Pressable>
                </Link>
                <View style={[styles.Notification]}>
                    <FontAwesome name='bell-o' size={20} color={"#000000"}/>
                </View>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    headerContainer: {
      backgroundColor: '#fff',
      paddingVertical: 10,
      alignItems: 'center',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      flexDirection: 'row',
      paddingHorizontal: 15,
      gap: 10
    },
    headerTitle: {
      color: '#000000',
      fontSize: 18,
      fontWeight: 'bold',
    },
    SearchBar: {
        flexDirection: 'row',
        flex: 1,
        gap: 10,
        backgroundColor: 'rgb(229 231 235)',
        padding: 5,
        alignItems: 'center',
        borderRadius: 5
    },
    Notification: {
    }
});

export default MainHeader