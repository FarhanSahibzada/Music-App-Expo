import {  utlisStyles } from '@/styles'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Searchbar } from 'react-native-paper'


interface AndroidSearch {
    placeholder: string,
    searchText: string,
    setSearchText: (text: string) => void
}

const { width } = Dimensions.get('window')
export function SearchbarAndroid({ placeholder, searchText, setSearchText }: AndroidSearch) {

    const handleSearch = (text: string) => {
        setSearchText(text)
    }
    return (

        <View style={[utlisStyles.simplecontainer , {marginBottom : 10,}]} >
            <Searchbar
                placeholder={placeholder}
                onChangeText={handleSearch}
                value={searchText}
                theme={{ colors: {text : '#EEEEEE' } }}
                style={styles.input1}
                iconColor='#EEEEEE'
                rippleColor='#EEEEEE'
                placeholderTextColor="#EEEEEE"
                inputStyle = {{ color : "#EEEEEE"}}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    input1: {
        alignSelf : 'center',
        width: width * 0.9,
        height: 50,
        backgroundColor: "transparent",
        borderColor: "#EEEEEE", 
        borderWidth: 1,       
        shadowColor: "#F5F7F8",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 22,
        
    }
})