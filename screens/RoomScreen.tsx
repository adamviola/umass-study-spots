import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions, ScrollView } from 'react-native';
import BottomDrawer from '../components/BottomDrawer';
import { DBContext } from '../components/DBProvider';
import Map from '../components/Map'
import { fixed_day, fixed_time } from '../time';

const ITEM_HEIGHT = 120;
const GRAY = '#C0C0C0'

function Meeting({ subject, number, start, end }: { subject: string, number: string, start: number, end: number}) {
  const start_h = Math.floor(start / 100);
  const start_m = start % 100;
  const end_h = Math.floor(end / 100);
  const end_m = end % 100;

  const style = {
    top: ITEM_HEIGHT / 2 + ITEM_HEIGHT * start_h + start_m / 60 * ITEM_HEIGHT,
    height: (end_h - start_h) * ITEM_HEIGHT + (end_m - start_m) / 60 * ITEM_HEIGHT,
    ...styles.meeting
  }
  return (
    <View style={style}>

    </View>
  )
}

export default function RoomScreen({ route } : { route: any }) {
  const query = useContext(DBContext);
  const [meetings, setMeetings] = React.useState([]);
  const data = ['12am','1am','2am','3am','4am','5am','6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm', '4pm','5pm','6pm','7pm','8pm','9pm','10pm','11pm'];
  // const data = ['12:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

  useEffect(() => {
    query(`SELECT subject, number, start, end FROM "meetings" WHERE building = "${route.params.building}" AND room = "${route.params.room}" AND ${fixed_day} ORDER BY start`, results => setMeetings(results));
  }, [])

  const renderItem = ({ item, index }: { item: any, index: number }) => {
    return (
      <View style={styles.item} key={index}>
        <View style={styles.textContainer}><Text style={styles.text}>{item}</Text></View>
        <View style={styles.line}></View>
      </View>
    )
  }

  const hours = Math.floor(fixed_time / 100);
  const minutes = fixed_time % 100;

  return (
    <>
    {/* <FlatList style={{backgroundColor: '#F4F4F4'}} initialScrollIndex={9} data={data} renderItem={renderItem} keyExtractor={(item, index) => item.toString()} getItemLayout={(data, index) => (
      {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
    )} /> */}
    {/* <View style={{ position: 'absolute', top: 0, backgroundColor: 'red', height: 20, width: 20}} ></View> */}
    <ScrollView contentOffset={{x: 0, y: hours * ITEM_HEIGHT}}>
      {data.map((item, index) => renderItem({ item, index }))}
      {meetings.map((item, index) => (<Meeting {...item} key={index} />))}
      <View style={{top: (hours + minutes / 60 + 0.5) * ITEM_HEIGHT - 4, ...styles.current}}>
        <View style={styles.circle} />
        <View style={styles.bar} />
      </View>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    height: ITEM_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  line: {
    height: 1,
    flex: 1,
    backgroundColor: GRAY,
  },
  textContainer: {
    height: ITEM_HEIGHT,
    width: '15%',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: GRAY
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: GRAY
  },
  meeting: {
    width: '70%',
    borderRadius: 8,
    left: '22.5%',
    position: 'absolute',
    backgroundColor: GRAY,
  },
  current: {
    height: 8,
    width: Dimensions.get('window').width * 0.8125 + 4,
    right: 0,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bar: {
    height: 2,
    flex: 1,
    backgroundColor: 'red',
  },
  circle: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'red'
  }
});
