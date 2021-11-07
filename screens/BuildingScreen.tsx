import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Button, Pressable, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { DBContext } from '../providers/DBProvider';
import { AntDesign } from '@expo/vector-icons';
import { fixed_time, fixed_day } from '../time';

const week_day = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

const time_diff: (t1: number, t2: number) => number = (t1, t2) => {
  if (t1 < t2) {
    return -1 * time_diff(t2, t1);
  }
  const h1 = Math.floor(t1 / 100);
  const m1 = t1 % 100;
  const h2 = Math.floor(t2 / 100);
  const m2 = t2 % 100;

  var h = h1 - h2;
  var m = m1 - m2;
  if (m < 0) {
    h--;
    m += 60;
  }
  return h * 100 + m;
}

export default function BuildingScreen({ navigation, route } : { navigation: any, route: any }) {
  const query = useContext(DBContext)
  const [rooms, setRooms] = useState<any[]|undefined>(undefined);
  const [meetings, setMeetings] = useState<any[]|undefined>(undefined);
  const data = useRef<{ room: string, duration: number }[]>([]);

  useEffect(() => {
    const now = new Date();
    const time = fixed_time; //now.getHours() * 100 + now.getMinutes();
    const day = fixed_day; //week_day[now.getDay()];

    query(`SELECT DISTINCT room FROM "meetings" WHERE building = "${route.params.building}"`, results => setRooms(results))

    if (day == 'saturday' || day == 'sunday')
      setMeetings([]);
    else
      query(`SELECT room, start, end FROM "meetings" WHERE building = "${route.params.building}" AND end > ${time} AND ${day} ORDER BY room, start`, results => setMeetings(results))
  }, [])

  if (data.current.length === 0 && rooms && meetings) {
    const now = new Date();
    const time = fixed_time //now.getHours() * 100 + now.getMinutes();

    const room_times = new Map<string, number>();
    rooms.forEach(item => room_times.set(item.room, -2400));

    for (var i = 0; i < meetings.length; i++) {
      var meeting = meetings[i];
      const room = meetings[i].room

      if (meeting.start > time) {
        room_times.set(room, time_diff(time, meeting.start)); // Negative of available time
      } else {
        while (i < meetings.length - 1 && time_diff(meetings[i + 1].start, meetings[i].end) <=  15 && meetings[i + 1].room == room) {
          i++;
        }
        room_times.set(room, time_diff(meetings[i].end, time)); // Time until available for > 15 minutes
      }
      while (i < meetings.length - 1 && meetings[i + 1].room == room) {
        i++;
      }
    }

    data.current = Array.from(room_times.entries()).map(([r, d])=> ({ room: r, duration: d }));
    data.current.sort((a, b) => a.duration - b.duration);
  }

  const renderItem = ({ item, index }: { item: any, index: number }) => {
    const hours = Math.floor(Math.abs(item.duration) / 100);
    const minutes = Math.abs(item.duration) % 100;
    var time = '';
    if (hours > 0)
      time += hours + 'h ';
    if (minutes > 0)
      time += minutes + 'm';

    var style = styles.item;
    if (index === 0)
      style = { ...styles.firstItem, ...style };
    if (index === data.current.length - 1)
      style = { ...styles.lastItem, ...style };
    return (
      <Pressable onPress={() => navigation.navigate('Room', { building: route.params.building, room: item.room })}>
        <View style={style}>
          <Text style={styles.text} >{'Room ' + item.room}</Text>
          <View style={styles.timeContainer}>
            <AntDesign name={item.duration <= 0 ? 'checkcircle' : 'closecircle'} size={20} color={item.duration <= 0 ? '#00D000' : 'red'} />
            <Text style={styles.timeText}>{item.duration == -2400 ? 'All Day' : time}</Text>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <FlatList
      style={{ height: '100%', backgroundColor: '#F4F4F4' }}
      data={data.current}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.room}
      initialNumToRender={20}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    width: '90%',
    marginLeft: '5%',
    marginBottom: 1,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  firstItem: {
    marginTop: Dimensions.get('window').width * 0.05,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  lastItem: {
    marginBottom: Dimensions.get('window').width * 0.05,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  text: {
    fontSize: 18,
    padding: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 16,
    padding: 16,
    paddingLeft: 8,
  },
});
