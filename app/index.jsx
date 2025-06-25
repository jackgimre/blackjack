import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BlackjackImage from '../assets/images/blackjack.png';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={BlackjackImage} style={styles.image} />
      <Text style={styles.title}>Jack's Blackjack Trainer</Text>
      <Text style={styles.subtitle}>Practice your skills offline</Text>
      <TouchableOpacity style={styles.button} onPress={()=>{
        router.push('/game');
      }}> 
        <Text style={styles.buttonText}>Start New Game</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingsButton} onPress={()=>{
        router.push('/settings');
      }}> 
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },

  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#033d1d",
    padding: 10,
    borderRadius: 5,
    width: '40%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsButton: {
    marginTop: 5,
    backgroundColor: "#8f8f8f",
    padding: 10,
    borderRadius: 5,
    width: '40%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
})

export default HomeScreen;