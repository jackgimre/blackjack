import { useContext } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { SettingsContext } from './settingsContext';

const SettingsScreen = () => {
  const { useDecks, setUseDecks, deckCount, setDeckCount, countCards, setCountCards, darkMode, setDarkMode } = useContext(SettingsContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Customize your Blackjack experience</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Use Decks: {useDecks ? 'Yes' : 'No'}</Text>
        <View style={styles.switchWrapper}>
          <Switch
            value={useDecks}
            onValueChange={setUseDecks}
          />
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Deck Count: {deckCount}</Text>
        <View style={styles.switchWrapper}>
          <TouchableOpacity style={styles.button} onPress={()=>{
                  if(deckCount > 1) {
                    setDeckCount(deckCount - 1);
                  }
                }}> 
                <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>{
                  if(deckCount < 10) {
                    setDeckCount(deckCount + 1);
                  }
                }}> 
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Count Cards: {countCards ? 'Yes' : 'No'}</Text>
        <View style={styles.switchWrapper}>
          <Switch
            value={countCards}
            onValueChange={setCountCards}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    color: "#333",
    marginTop: '5%'
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },

  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#d1d1d6",
    padding: 10,
    borderRadius: 5,
    width: '20%',
    marginHorizontal: 1
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  label: {
    fontSize: 18,
    flex: 1,            // take up available space
    textAlign: 'left',  // explicitly align text left
    marginHorizontal: 10,
    marginLeft: 15
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  switchWrapper: {
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,            // take up available space
  }
})

export default SettingsScreen;