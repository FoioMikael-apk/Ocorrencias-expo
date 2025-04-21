import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { useColorScheme } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import NovaOcorrenciaScreen from "./src/screens/NovaOcorrenciaScreen";
import DetalhesOcorrenciaScreen from "./src/screens/DetalhesOcorrenciaScreen";
import Toast from "react-native-toast-message";
import Layout from "./src/components/Layout";

const Stack = createNativeStackNavigator();

export default function App() {
  const isDark = useColorScheme() === "dark";

  return (
    <PaperProvider theme={isDark ? MD3DarkTheme : MD3LightTheme}>
      <NavigationContainer>
        <Layout>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="NovaOcorrencia" component={NovaOcorrenciaScreen} />
            <Stack.Screen name="DetalhesOcorrencia" component={DetalhesOcorrenciaScreen} />
          </Stack.Navigator>
        </Layout>
      </NavigationContainer>
      <Toast />
    </PaperProvider>
  );
}
