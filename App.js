// App.js
import { setLogLevel } from 'firebase/firestore';
setLogLevel('debug');
import React from 'react';
import PeopleScreen from './screens/PeopleScreen';

export default function App() {
  return <PeopleScreen />;
}
