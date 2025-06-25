import { Stack } from "expo-router";
import { SettingsProvider } from "./settingsContext";

const RootLayout = () => {
  return <SettingsProvider><Stack 
  screenOptions={{
    headerStyle: { backgroundColor: '#033d1d' },
    headerTintColor: '#fff',
    headerTitleStyle: { fontWeight: 'bold' },
    headerTitleAlign: 'center',
  }}>
    <Stack.Screen name="index" options={{ title: 'Home' }} />
    <Stack.Screen name="game" options={{ title: 'Blackjack' }} />
    <Stack.Screen name="settings" options={{ title: 'Settings' }} />  
  </Stack></SettingsProvider>;
}

export default RootLayout;
