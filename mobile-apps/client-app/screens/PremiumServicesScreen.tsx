"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, RefreshControl, TextInput } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Plane, Car, MapPin, Users, ChevronRight, Search, Filter } from "lucide-react-native"
import { useTranslation } from "../context/LanguageContext"

const PremiumServicesScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState("jets")
  const [searchQuery, setSearchQuery] = useState("")
  const [jets, setJets] = useState([])
  const [luxuryVehicles, setLuxuryVehicles] = useState([])
  const [isFilterModalVisible, setFilterModalVisible] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    // Simulate API call
    setTimeout(() => {
      setJets([
        {
          id: 1,
          type: "Jet Privé",
          model: "Citation CJ3+",
          capacity: "8 personnes",
          route: "Tanger - El Houceima",
          price: 365000,
          image: "/private-jet-1.png",
          available: true,
        },
        {
          id: 2,
          type: "Jet Privé",
          model: "Embraer Phenom 300",
          capacity: "8 personnes",
          route: "Tanger - Rabat",
          price: 285000,
          image: "/private-jet-2.png",
          available: true,
        },
        {
          id: 3,
          type: "Hélicoptère",
          model: "Bell 429",
          capacity: "6 personnes",
          route: "Rabat - Casablanca",
          price: 120000,
          image: "/helicopter.png",
          available: true,
        },
      ])

      setLuxuryVehicles([
        {
          id: 1,
          type: "Mercedes Classe V",
          description: "Mise à disposition avec chauffeur, carburant et autoroute inclus",
          route: "Casa - Rabat",
          price: 3500,
          image: "/mercedes-v-class.png",
          available: true,
        },
        {
          id: 2,
          type: "Mercedes Classe V",
          description: "Mise à disposition avec chauffeur, carburant et autoroute inclus",
          route: "Tanger",
          price: 4200,
          image: "/mercedes-v-class.png",
          available: true,
        },
        {
          id: 3,
          type: "Mercedes Classe V",
          description: "Mise à disposition avec chauffeur, carburant et autoroute inclus",
          route: "El Houceima",
          price: 5800,
          image: "/mercedes-v-class.png",
          available: true,
        },
        {
          id: 4,
          type: "Mercedes Classe S",
          description: "Mise à disposition avec chauffeur, carburant et autoroute inclus",
          route: "Rabat - Marrakech",
          price: 4500,
          image: "/mercedes-s-class.png",
          available: true,
        },
      ])

      setRefreshing(false)
    }, 1500)
  }

  const onRefresh = () => {
    setRefreshing(true)
    fetchData()
  }

  const handleJetPress = (jet) => {
    navigation.navigate("JetDetails", { jet })
  }

  const handleVehiclePress = (vehicle) => {
    navigation.navigate("LuxuryVehicleDetails", { vehicle })
  }

  const handleBookJet = (jet) => {
    navigation.navigate("BookPremiumService", { service: jet, type: "jet" })
  }

  const handleBookVehicle = (vehicle) => {
    navigation.navigate("BookPremiumService", { service: vehicle, type: "luxury" })
  }

  const getFilteredJets = () => {
    if (!searchQuery) return jets
    return jets.filter(
      (jet) =>
        jet.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        jet.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        jet.route.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  const getFilteredVehicles = () => {
    if (!searchQuery) return luxuryVehicles
    return luxuryVehicles.filter(
      (vehicle) =>
        vehicle.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.route.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t("client.premiumServices")}</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#6b7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={t("client.searchServices")}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={() => setFilterModalVisible(true)}>
          <Filter size={20} color="#0f766e" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "jets" && styles.activeTab]}
          onPress={() => setActiveTab("jets")}
        >
          <Plane size={16} color={activeTab === "jets" ? "#fff" : "#0f766e"} />
          <Text style={[styles.tabText, activeTab === "jets" && styles.activeTabText]}>{t("client.privateJets")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "luxury" && styles.activeTab]}
          onPress={() => setActiveTab("luxury")}
        >
          <Car size={16} color={activeTab === "luxury" ? "#fff" : "#0f766e"} />
          <Text style={[styles.tabText, activeTab === "luxury" && styles.activeTabText]}>
            {t("client.luxuryVehicles")}
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === "jets" && (
        <View style={styles.section}>
          <Text style={styles.sectionDescription}>{t("client.privateJetsDescription")}</Text>

          {getFilteredJets().length > 0 ? (
            getFilteredJets().map((jet) => (
              <TouchableOpacity key={jet.id} style={styles.serviceCard} onPress={() => handleJetPress(jet)}>
                <Image source={{ uri: jet.image }} style={styles.serviceImage} resizeMode="cover" />

                <View style={styles.serviceContent}>
                  <View style={styles.serviceHeader}>
                    <View>
                      <Text style={styles.serviceType}>{jet.type}</Text>
                      <Text style={styles.serviceModel}>{jet.model}</Text>
                    </View>
                    <View style={styles.priceBadge}>
                      <Text style={styles.priceText}>{formatPrice(jet.price)} MAD</Text>
                    </View>
                  </View>

                  <View style={styles.serviceDetails}>
                    <View style={styles.detailRow}>
                      <MapPin size={16} color="#0f766e" />
                      <Text style={styles.detailText}>{jet.route}</Text>
                    </View>

                    <View style={styles.detailRow}>
                      <Users size={16} color="#0f766e" />
                      <Text style={styles.detailText}>{jet.capacity}</Text>
                    </View>
                  </View>

                  <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.detailsButton} onPress={() => handleJetPress(jet)}>
                      <Text style={styles.detailsButtonText}>{t("client.details")}</Text>
                      <ChevronRight size={16} color="#0f766e" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.bookButton} onPress={() => handleBookJet(jet)}>
                      <Text style={styles.bookButtonText}>{t("client.book")}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>{t("client.noJetsFound")}</Text>
            </View>
          )}
        </View>
      )}

      {activeTab === "luxury" && (
        <View style={styles.section}>
          <Text style={styles.sectionDescription}>{t("client.luxuryVehiclesDescription")}</Text>

          {getFilteredVehicles().length > 0 ? (
            getFilteredVehicles().map((vehicle) => (
              <TouchableOpacity key={vehicle.id} style={styles.serviceCard} onPress={() => handleVehiclePress(vehicle)}>
                <Image source={{ uri: vehicle.image }} style={styles.serviceImage} resizeMode="cover" />

                <View style={styles.serviceContent}>
                  <View style={styles.serviceHeader}>
                    <View>
                      <Text style={styles.serviceType}>{vehicle.type}</Text>
                      <Text style={styles.serviceDescription}>{vehicle.description}</Text>
                    </View>
                    <View style={styles.priceBadge}>
                      <Text style={styles.priceText}>{formatPrice(vehicle.price)} MAD</Text>
                    </View>
                  </View>

                  <View style={styles.serviceDetails}>
                    <View style={styles.detailRow}>
                      <MapPin size={16} color="#0f766e" />
                      <Text style={styles.detailText}>{vehicle.route}</Text>
                    </View>
                  </View>

                  <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.detailsButton} onPress={() => handleVehiclePress(vehicle)}>
                      <Text style={styles.detailsButtonText}>{t("client.details")}</Text>
                      <ChevronRight size={16} color="#0f766e" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.bookButton} onPress={() => handleBookVehicle(vehicle)}>
                      <Text style={styles.bookButtonText}>{t("client.book")}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>{t("client.noVehiclesFound")}</Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    padding: 16,
    backgroundColor: "#0f766e",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingBottom: 8,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: "#1f2937",
  },
  filterButton: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
  },
  activeTab: {
    backgroundColor: "#0f766e",
  },
  tabText: {
    fontSize: 14,
    color: "#0f766e",
    fontWeight: "500",
    marginLeft: 8,
  },
  activeTabText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  section: {
    padding: 16,
  },
  sectionDescription: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 16,
    lineHeight: 20,
  },
  serviceCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceImage: {
    width: "100%",
    height: 160,
    backgroundColor: "#e5e7eb",
  },
  serviceContent: {
    padding: 16,
  },
  serviceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  serviceType: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  serviceModel: {
    fontSize: 14,
    color: "#4b5563",
    marginTop: 2,
  },
  serviceDescription: {
    fontSize: 13,
    color: "#4b5563",
    marginTop: 2,
    flexShrink: 1,
    width: "90%",
  },
  priceBadge: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  priceText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0f766e",
  },
  serviceDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#4b5563",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 12,
  },
  detailsButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsButtonText: {
    fontSize: 14,
    color: "#0f766e",
    marginRight: 4,
  },
  bookButton: {
    backgroundColor: "#0f766e",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  bookButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffffff",
  },
  emptyState: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
  },
})

export default PremiumServicesScreen
