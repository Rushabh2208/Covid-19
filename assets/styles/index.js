import {StyleSheet} from 'react-native';

const DOWN_COLOR = '#4CAF50';
const UP_COLOR = '#FF5505'; 
const SAME_COLOR = '#F5A623';
const BACKGROUND_COLOR = '#393E42';
const TEXT_COLOR = '#FFF';

export default StyleSheet.create({
    //APP
    androidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    //COMMON
    mainContainer:{
        flex:1,
    },
    down: { 
        backgroundColor: DOWN_COLOR 
    },
    up: { 
        backgroundColor: UP_COLOR
    },
    same: { 
        backgroundColor: SAME_COLOR
    },
    //DETAIL-SCREEN
    container:{
        flex:1,
        padding:20,
    },
    statsContainer:{
        flex:8,
    },
    graphContainer:{
        flex:5,
        paddingTop:10,
        paddingLeft:5,
    },
    statsStyle:{
        borderRadius: 10,
        padding: 10,
        flex:1,
        backgroundColor: BACKGROUND_COLOR,
    },
    header:{
        borderRadius: 10,
        backgroundColor: BACKGROUND_COLOR,
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
    },
    right: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: 5,
    },
    text: {
        color: TEXT_COLOR,
        fontSize: 16,
        fontWeight: '500',
    }, 
    headerText: {
        color: TEXT_COLOR,
        fontSize: 20,
        fontWeight: '500',
    },
    statList: {
        flexDirection: 'row',       
        flexWrap: 'wrap',
        padding: 10,
    },
    badge: {
        flexDirection: 'row',
        borderRadius: 20,
        paddingLeft: 5,
        paddingRight: 5,
    },
    activityLoader: {
        justifyContent: 'center',
        top: '50%',
    },
    //FOOTER
    button:{
        backgroundColor:'transparent',
        borderWidth:0,
        flex:1,
    },
    footer:{
        // height:50,
        position:'absolute',
        bottom:0,
        width: '100%',
        backgroundColor: BACKGROUND_COLOR,
    },
    //SEARCH-SCREEN
    listView: {
        paddingBottom: 50,
    },
});