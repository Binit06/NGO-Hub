import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, AntDesign, Entypo, Feather, FontAwesome } from '@expo/vector-icons'; // Make sure to import the appropriate icon library
import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';

interface SearchHeaderProps {
    onSearchInputChange: (text: string) => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ onSearchInputChange }) => {
    const navigation = useNavigation()
    const textInputRef = useRef<TextInput | null>(null)

    const handleSearchClick = () => {
        textInputRef.current?.focus()
    }

    const handleSearchInputChange = (text: string) => {
        onSearchInputChange(text)
    }
    return (
        <SafeAreaView>
        <View style={[styles.headerContainer]}>
            <TouchableOpacity onPress={() => {navigation.goBack()}}>
                <Feather name='arrow-left' size={24} color={"black"}/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.SearchBar]} onPress={handleSearchClick}>
                <Entypo name='magnifying-glass' size={20} color="#635bff" onPress={handleSearchClick}/>
                <TextInput ref={textInputRef} placeholder='Search' keyboardType='default' onChangeText={(text) => handleSearchInputChange(text)}/>
            </TouchableOpacity>
        </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    headerContainer: {
      backgroundColor: '#fff',
      paddingVertical: 10,
      alignItems: 'center',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
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

export default SearchHeader