import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {WebView} from 'react-native-webview';
import LedControl from './components/LedControl';
export default function App() {
  return (<LedControl />);
}   

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5dfcf',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
