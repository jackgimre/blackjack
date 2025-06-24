// settingsContext.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [useDecks, setUseDecks] = useState(false);
  const [deckCount, setDeckCount] = useState(1);
  const [countCards, setCountCards] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Load saved setting
  useEffect(() => {
    const load = async () => {
      checkIfSaved('useDecks', false);
      checkIfSaved('deckCount', 1);
      checkIfSaved('countCards', false);
      checkIfSaved('darkMode', false);
    };
    load();
  }, []);

  async function checkIfSaved(settingString, defaultValue) {
    const saved = await AsyncStorage.getItem('useDecks');
      if (saved !== null) setDarkMode(saved === 'true');
  }

  // Save setting when it changes
  useEffect(() => {
    AsyncStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  return (
    <SettingsContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </SettingsContext.Provider>
  );
};
