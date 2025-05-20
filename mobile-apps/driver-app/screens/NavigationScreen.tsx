"use client"

import { useState, useEffect, useRef } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions, Alert } from "react-native"
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps"
import * as Location from "expo-location"
import { useTranslation } from "../context/LanguageContext"
import { Navigation, Crosshair, CornerDownLeft, Clock, MapPin, AlertTriangle } from "lucide-react-native"

const { width, height } = Dimensions.get("window")

const NavigationScreen = () => {
  const { t } = useTranslation()
  const mapRef = useRef(null)
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [destination, setDestination] = useState({
    latitude: 33.9716,
    longitude: -6.8498,
    title: "Destination",
    description: "Rabat, Maroc",
  })
  const [route, setRoute] = useState(null)
  const [eta, setEta] = useState("25 min")
  const [distance, setDistance] = useState("12.5 km")
  const [isNavigating, setIsNavigating] = useState(false)

  useEffect(() => {
    ;(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied")
        setIsLoading(false)
        return
      }

      try {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        })
        setLocation(location)

        // Simulate route fetching
        setTimeout(() => {
          const routeCoordinates = generateRouteCoordinates(location.coords, destination)
          setRoute(routeCoordinates)
          setIsLoading(false)
        }, 1500)
      } catch (error) {
        setErrorMsg("Could not fetch location")
        setIsLoading(false)
      }
    })()

    // Start location updates
    const locationSubscription = Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 10,
      },
      (newLocation) => {
        setLocation(newLocation)
      },
    )

    return () => {
      if (locationSubscription) {
        locationSubscription.remove()
      }
    }
  }, [])

  // Generate mock route coordinates
  const generateRouteCoordinates = (start, end) => {
    const points = 20
    const latDiff = end.latitude - start.latitude
    const lngDiff = end.longitude - start.longitude

    return Array.from({ length: points }).map((_, i) => {
      const fraction = i / (points - 1)
      return {
        latitude: start.latitude + latDiff * fraction + (Math.random() - 0.5) * 0.01,
        longitude: start.longitude + lngDiff * fraction + (Math.random() - 0.5) * 0.01,
      }
    })
  }

  const startNavigation = () => {
    setIsNavigating(true)
    Alert.alert(t("driver.navigationStarted"), t("driver.followInstructions"), [{ text: "OK" }])
  }

  const stopNavigation = () => {
    setIsNavigating(false)
  }

  const centerOnUser = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      })
    }
  }

  const reportIssue = () => {
    Alert.alert(t("driver.reportIssue"), t("driver.reportIssueDescription"), [
      { text: t("driver.cancel"), style: "cancel" },
      {
        text: t("driver.report"),
        onPress: () => {
          // Handle issue reporting
          Alert.alert(t("driver.issueReported"), t("driver.issueReportedDescription"))
        },
      },
    ])
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0f766e" />
        <Text style={styles.loadingText}>{t("driver.loadingMap")}</Text>
      </View>
    )
  }

  if (errorMsg) {
    return (
      <View style={styles.errorContainer}>
        <AlertTriangle size={48} color="#ef4444" />
        <Text style={styles.errorText}>{errorMsg}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => setIsLoading(true)}>
          <Text style={styles.retryButtonText}>{t("driver.retry")}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          showsUserLocation
          followsUserLocation
        >
          <Marker
            coordinate={destination}
            title={destination.title}
            description={destination.description}
            pinColor="#0f766e"
          />

          {route && (
            <Polyline
              coordinates={[
                {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                },
                ...route,
              ]}
              strokeWidth={4}
              strokeColor="#0f766e"
            />
          )}
        </MapView>
      )}

      {/* Navigation Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={centerOnUser}>
          <Crosshair size={24} color="#0f766e" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={reportIssue}>
          <AlertTriangle size={24} color="#0f766e" />
        </TouchableOpacity>
      </View>

      {/* Navigation Info */}
      <View style={styles.infoContainer}>
        <View style={styles.destinationInfo}>
          <MapPin size={20} color="#0f766e" />
          <Text style={styles.destinationText}>{destination.description}</Text>
        </View>

        <View style={styles.etaContainer}>
          <View style={styles.etaItem}>
            <Clock size={16} color="#6b7280" />
            <Text style={styles.etaText}>{eta}</Text>
          </View>
          <View style={styles.etaItem}>
            <CornerDownLeft size={16} color="#6b7280" />
            <Text style={styles.etaText}>{distance}</Text>
          </View>
        </View>

        {isNavigating ? (
          <TouchableOpacity style={[styles.navigationButton, styles.stopButton]} onPress={stopNavigation}>
            <Text style={styles.navigationButtonText}>{t("driver.stopNavigation")}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.navigationButton} onPress={startNavigation}>
            <Navigation size={20} color="#fff" />
            <Text style={styles.navigationButtonText}>{t("driver.startNavigation")}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    padding: 20,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: "#ef4444",
    textAlign: "center",
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: "#0f766e",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  map: {
    width,
    height,
  },
  controlsContainer: {
    position: "absolute",
    top: 16,
    right: 16,
    flexDirection: "column",
  },
  controlButton: {
    backgroundColor: "#ffffff",
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  infoContainer: {
    position: "absolute",
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  destinationInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  destinationText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
  },
  etaContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  etaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  etaText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#6b7280",
  },
  navigationButton: {
    backgroundColor: "#0f766e",
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  stopButton: {
    backgroundColor: "#ef4444",
  },
  navigationButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
})

export default NavigationScreen
