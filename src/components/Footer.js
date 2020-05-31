import React from 'react';
import {View} from 'react-native';
import {Button, ButtonGroup} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../assets/styles';

export default function Footer({navigation}) {
    const searchButton = () => <Button 
    onPress={() => navigation.navigate('Search')}
    type="clear" 
    icon={
        <Icon
          name="search"
          size={15}
          color="white"
        />
      }
    />
    const dashBoardButton = () => <Button 
    onPress={() => navigation.navigate('DetailSearch')}
    type="clear" 
    icon={
        <Icon
          name="list-alt"
          size={15}
          color="white"
        />
      }
    />
    const buttons = [{ element: dashBoardButton }, { element: searchButton }]
    return(
        <View style={styles.footer}>
            <ButtonGroup
            buttons={buttons}
            containerStyle={styles.button}
            />
        </View>
    );
};
