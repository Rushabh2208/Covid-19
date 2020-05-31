import React, {useState, useEffect} from 'react';
import {SearchBar, ListItem} from 'react-native-elements';
import {View, ScrollView} from 'react-native';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import styles from '../../assets/styles';

export default function Screen({navigation}) {
    const[countries, setCountries] = useState([]);
    const[data, setData] = useState({});
    const[loading, setLoading] = useState(false);
    const[searchText, setSearchText] = useState();

      useEffect(() => { 
        setLoading(true);
        fetch('https://api.covid19api.com/summary', {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
      
          })
            .then((response) => response.json())
            .then((json) => {
            console.log(json);
            setData(json);
            setCountries(json.Countries);
            setLoading(false);
            })
        }, []);

    const searchFilterFunction = (text) => {
        setLoading(true);
        setSearchText(text);
        AwesomeDebouncePromise(handleSearch(text), 300);
        setLoading(false);
    }

    const handleSearch = (text) => {
        const textData = text.toLowerCase();
        const newData = data.Countries.filter(function(item) {
            const itemData = item.Country ? item.Country.toLowerCase() : ''.toLowerCase();
            return itemData.indexOf(textData) > -1;
        });
        setCountries(newData);
    }

    return( 
        <View style={styles.mainContainer}>
            <View style={styles.listView}>
                    <SearchBar
                    placeholder="Type Here..."
                    onChangeText={(text) => 
                        searchFilterFunction(text)}
                    value={searchText}
                    showLoading={loading}
                />
                <ScrollView>
                {
                    countries.map((item, i) => (
                    <ListItem
                        key={i}
                        // leftAvatar={{ source: { uri: item.avatar_url } }}
                        title={item.Country}
                        subtitle={item.CountryCode}
                        bottomDivider
                        badge={{ value: item.TotalConfirmed,  
                            badgeStyle: item.TotalConfirmed > 100 
                            ? [styles.up]
                            : (item.TotalConfirmed > 0 
                                ? [styles.same]
                                : [styles.down] )
                            
                        }}
                        onPress={() => navigation.navigate('DetailScreen', 
                        { 
                            country: item.Slug,  
                            countryCode: item.CountryCode,

                        })}
                    />
                ))
                }
                </ScrollView>
            </View>
        </View>
    );
}

