import React, {useState} from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchBar = () => {
    const [text, onChangeText] = useState('');

    return (
        <View style={{width:'90%', height:40, margin: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EEEEEE', borderRadius: 20}}>
            <View style={{ alignItems: 'center', flexDirection: "row"}}>
                <TextInput onChangeText={onChangeText} value={text} style={{width:280, backgroundColor: '#EEEEEE', borderRadius: 20}}/>
                <Icon.Button onPress={()=>alert('검색!!')} name="search" color="black" backgroundColor='#EEEEEE' size={20}/>
            </View>
        </View>
    );
};
export default SearchBar;