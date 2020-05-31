import React, {useEffect, useState} from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { LineChart} from "react-native-chart-kit";
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Flag from 'react-native-flags';
import styles from '../../assets/styles';

export default function DetailScreen({route, navigation}) {
  const {country} = route.params;
  const {countryCode} = route.params;
  const[countryData, setCountryData] = useState([]);
  const[graphXAxis, setGraphXAxis] = useState([]);
  const[graphYAxis, setGraphYAxis] = useState([]);
  const[loading, setLoading] = useState(true);


  useEffect(() => {
    if (countryData.length) {
      insertData(countryData);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [countryData]);

  useEffect(() => { 
    console.log(countryData);
    if (!countryData.length) {
      fetch('https://api.covid19api.com/total/country/'+country,  {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((json) => {
        setCountryData(json);
      });
    }
  }, []);

  console.log(countryData);

  const insertData = (data) => {
    console.log(data);
    let dateArray=[];
    let confirmedArray=[];
    let length=data.length;
    let factor = Math.floor(countryData.length / 6);
    let i;
    for (i = 0; i < length - 10; ) {
        dateArray.push(data[i].Date.substring(5,7)+"/"+data[i].Date.substring(8,10)); 
        confirmedArray.push(data[i].Confirmed);
        i+=factor;
    }
    dateArray.push(data[length-1].Date.substring(5,7)+"/"+data[length-1].Date.substring(8,10)); 
    confirmedArray.push(data[length -1].Confirmed);
    setGraphXAxis(dateArray);
    setGraphYAxis(confirmedArray);
  }
    
  const change = (value, isRecoveredField) => {
    const icon = ((value === 0) || !value)
    ? <Text>{' '}</Text>
    : <Icon name={value < 0 ? 'caret-down' : 'caret-up'} style={styles.icon} />;
    return (
      <View style={[styles.badge, getBadgeStyles(value, isRecoveredField)]}>
        {icon}
        <Text style={styles.value} numberOfLines={1}>
          {Math.abs(value)}
        </Text>
      </View>
    );
  } 

  const getBadgeStyles = (value, isRecoveredField) => {
    return [(value > 0 && !isRecoveredField) ? styles.up : ((value == 0 ) ? styles.same : styles.down)]
  }

  const statField = (fieldName, lastDayNumber, secondLastDayNumber) => {
    return (
    <View style={styles.statsStyle}>
      <View style={styles.row}>
        <Text style={styles.text} numberOfLines={1}>
          {fieldName}
        </Text>
        <View style={styles.right}>
          <Text style={styles.text} numberOfLines={1}>
          {lastDayNumber}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.right}>
          {change(lastDayNumber - secondLastDayNumber, fieldName == 'Recovered')}
        </View>
      </View>
    </View>
    )
  }


  const header = (countryName) => {
    return(
      <View style={[styles.header]}>
        <View style={styles.row}>
          <Text style={styles.headerText} numberOfLines={1}>
            {countryName}
            <Flag code={countryCode} size={24}/>
          </Text>
        </View>
      </View>
    )
  }

  return(
    loading 
    ? <ActivityIndicator style={styles.activityLoader}/> 
    :
    (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        {header(countryData[0].Country)}
        <View style={styles.graphContainer}>
          <LineChart
            data={{ labels: graphXAxis,
            datasets: [{ data: graphYAxis }],}}
            width={Dimensions.get('window').width - 50}
            height={220}
            onDataPointClick={(2469, graphYAxis,() => '#FFF')} 
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#D9D9D9',
              backgroundGradientTo: '#FFF',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              propsForDots: { r: '3', strokeWidth: '1', stroke: '#ffa726', }, 
            }}
            style={{ marginVertical: 5, borderRadius: 5, }}
          />
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statList}>
            {statField("Confirmed", countryData[countryData.length - 1].Confirmed,
              countryData[countryData.length - 2].Confirmed)}
            {statField("Deaths", countryData[countryData.length - 1].Deaths, 
            countryData[countryData.length - 2].Deaths)}
          </View>
          <View style={styles.statList}>
            {statField("Active", countryData[countryData.length - 1].Active, 
              countryData[countryData.length - 2].Active)}
            {statField("Recovered", countryData[countryData.length - 1].Recovered,
              countryData[countryData.length - 2].Recovered)}
          </View>
        </View>
      </View>
    </View>
    )
  );
}
