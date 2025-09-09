// src/screens/PeopleScreen.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Button, Alert } from 'react-native';
import { listenPeople, addPeople} from '../data/peopleApi';

export default function PeopleScreen() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  // subscribe แบบ realtime
  useEffect(() => {
    const unsub = listenPeople(
      (rows) => {
        setPeople(rows);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        Alert.alert('Firestore error', err?.message ?? 'Something went wrong');
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);
  // ปุ่ม refresh ข้อมูลตัวอย่าง
  const addPress = async () => {
    try {
      await addPeople();
      Alert.alert('สำเร็จ', 'อ่านข้อมูลใหม่');
    } catch (e) {
      Alert.alert('Error', e?.message ?? 'failed');
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: '600' }}>People (Realtime)</Text>
      <FlatList
        data={people}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Text style={{ fontSize: 16 }}>
            ID: {item.id}   Name: {item.name}
          </Text>
          
        )}
        
      />
      <Button title="Refresh" onPress={addPress} />
    </View>
  );
}
