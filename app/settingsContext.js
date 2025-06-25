// settingsContext.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [useDecks, setUseDecks] = useState(false);
  const [deckCount, setDeckCount] = useState(1);
  const [countCards, setCountCards] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Load all settings on mount
  useEffect(() => {
    (async () => {
      try {
        const useDecksValue = await AsyncStorage.getItem('useDecks');
        if (useDecksValue !== null) setUseDecks(useDecksValue === 'true');

        const deckCountValue = await AsyncStorage.getItem('deckCount');
        if (deckCountValue !== null) setDeckCount(parseInt(deckCountValue, 10));

        const countCardsValue = await AsyncStorage.getItem('countCards');
        if (countCardsValue !== null) setCountCards(countCardsValue === 'true');

        const darkModeValue = await AsyncStorage.getItem('darkMode');
        if (darkModeValue !== null) setDarkMode(darkModeValue === 'true');
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    })();
  }, []);

  // Save settings when they change
  useEffect(() => {
    AsyncStorage.setItem('useDecks', useDecks.toString());
  }, [useDecks]);

  useEffect(() => {
    AsyncStorage.setItem('deckCount', deckCount.toString());
  }, [deckCount]);

  useEffect(() => {
    AsyncStorage.setItem('countCards', countCards.toString());
  }, [countCards]);

  useEffect(() => {
    AsyncStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  return (
    <SettingsContext.Provider
      value={{
        useDecks,
        setUseDecks,
        deckCount,
        setDeckCount,
        countCards,
        setCountCards,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
