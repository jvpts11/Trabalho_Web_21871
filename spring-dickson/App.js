import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { GameEngine } from 'react-native-game-engine';

export default function App() {
  return (
    <View style={{flex :1}}>
      <GameEngine
        style = {{
          position : 'absolute'
        }}
      >
      </GameEngine>
      <StatusBar style="auto" hidden={true} />
    </View>
  );
}
