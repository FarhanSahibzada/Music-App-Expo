import { colors } from "@/constnts/token";
import { useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { SearchBarProps } from "react-native-screens";

const deafaultSearchOptions: SearchBarProps = {
    tintColor: colors.primary,
    hideWhenScrolling: false
}


export const UseNavigationSearch = ({ Searchbaroptions }: { Searchbaroptions?: SearchBarProps }) => {

    const [search, setsearch] = useState('');
    const navigation = useNavigation();

    const handleOnChangeText: SearchBarProps['onChangeText'] = ({nativeEvent : { text }}) => {
        setsearch(text)
    }

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerSearchBarOptions : {
                ...deafaultSearchOptions,
                ...Searchbaroptions,
                onChangeText : handleOnChangeText
            }          
        })
    }, [navigation , Searchbaroptions])



    return search

}