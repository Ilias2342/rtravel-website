"use client"

import { useState, useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, I18nManager } from "react-native"
import { Home, Map, Calendar, FileText, User, AlertTriangle } from "lucide-react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

// Screens
import HomeScreen from "./screens/HomeScreen"
import MissionsScreen from "./screens/MissionsScreen"
import NavigationScreen from "./screens/NavigationScreen"
import DocumentsScreen from "./screens/DocumentsScreen"
import ProfileScreen from "./screens/ProfileScreen"
import LoginScreen from "./screens/LoginScreen"
import MissionDetailsScreen from "./screens/MissionDetailsScreen"
import SOSScreen from "./screens/SOSScreen"

// Context
import { AuthProvider, useAuth } from "./context/AuthContext"
import { LanguageProvider } from "./context/LanguageContext"

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let icon

          if (route.name === "Accueil") {
            icon = <Home size={size} color={color} />
          } else if (route.name === "Missions") {
            icon = <Calendar size={size} color={color} />
          } else if (route.name === "Navigation") {
            icon = <Map size={size} color={color} />
          } else if (route.name === "Documents") {
            icon = <FileText size={size} color={color} />
          } else if (route.name === "Profil") {
            icon = <User size={size} color={color} />
          }

          return icon
        },
        tabBarActiveTintColor: "#0f766e",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="Missions" component={MissionsScreen} />
      <Tab.Screen name="Navigation" component={NavigationScreen} />
      <Tab.Screen name="Documents" component={DocumentsScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

function AppNavigator() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0f766e" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    )
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen
            name="MissionDetails"
            component={MissionDetailsScreen}
            options={{
              headerShown: true,
              title: "Détails de la mission",
              headerTintColor: "#0f766e",
            }}
          />
          <Stack.Screen
            name="SOS"
            component={SOSScreen}
            options={{
              headerShown: true,
              title: "Urgence",
              headerStyle: {
                backgroundColor: "#ef4444",
              },
              headerTintColor: "#fff",
            }}
          />
        </>
      )}
    </Stack.Navigator>
  )
}

export default function App() {
  const [isRTL, setIsRTL] = useState(false)

  useEffect(() => {
    const checkLanguage = async () => {
      try {
        const lang = await AsyncStorage.getItem("r-travel-language")
        const shouldBeRTL = lang === "ar"

        if (I18nManager.isRTL !== shouldBeRTL) {
          I18nManager.forceRTL(shouldBeRTL)
          setIsRTL(shouldBeRTL)
        }
      } catch (error) {
        console.error("Failed to get language settings:", error)
      }
    }

    checkLanguage()
  }, [])

  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <AuthProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <AppNavigator />
          </NavigationContainer>
        </AuthProvider>
      </LanguageProvider>
      <SOSButton />
    </SafeAreaProvider>
  )
}

// SOS Floating Button
function SOSButton() {
  const handleSOSPress = () => {
    // Navigate to SOS screen
  }

  return (
    <TouchableOpacity style={styles.sosButton} onPress={handleSOSPress} activeOpacity={0.7}>
      <AlertTriangle size={24} color="#fff" />
      <Text style={styles.sosText}>SOS</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#374151",
  },
  sosButton: {
    position: "absolute",
    right: 20,
    bottom: 90,
    backgroundColor: "#ef4444",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sosText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
    marginTop: 2,
  },
})
