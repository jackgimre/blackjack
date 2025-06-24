import { Stack } from "expo-router";

const RootLayout = () => {
  return <Stack 
  screenOptions={{
    headerStyle: { backgroundColor: '#033d1d' },
    headerTintColor: '#fff',
    headerTitleStyle: { fontWeight: 'bold' },
    headerTitleAlign: 'center',
  }}>
    <Stack.Screen name="index" options={{ title: 'Home' }} />
    <Stack.Screen name="game" options={{ title: 'Blackjack' }} />
    <Stack.Screen name="settings" options={{ title: 'Settings' }} />  
  </Stack>;
}

export default RootLayout;
