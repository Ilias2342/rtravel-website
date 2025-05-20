"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Calendar, MapPin, Clock, Car, FileText, Plus, ChevronRight } from "lucide-react-native"
import { useTranslation } from "../context/LanguageContext"

const HomeScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = useState(false)
  const [activeBookings, setActiveBookings] = useState([])
  const [upcomingBookings, setUpcomingBookings] = useState([])
  const [recommendedVehicles, setRecommendedVehicles] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    // Simulate API call
    setTimeout(() => {
      setActiveBookings([
        {
          id: "B1001",
          vehicle: "CITROEN C-ELYSEE",
          matricule: "22976-T-1",
          driver: "Mohammed Alami",
          startDate: "05-06-2025",
          endDate: "12-06-2025",
          status: "active",
        },
      ])

      setUpcomingBookings([
        {
          id: "B1002",
          vehicle: "FIAT 500",
          matricule: "36990-E-1",
          driver: "Pending assignment",
          startDate: "15-06-2025",
          endDate: "20-06-2025",
          status: "confirmed",
        },
        {
          id: "B1003",
          type: "transfer",
          destination: "Aéroport Mohammed V",
          date: "18-06-2025",
          time: "14:30",
          status: "confirmed",
        },
      ])

      setRecommendedVehicles([
        {
          id: "V1001",
          type: "DACIA LOGAN",
          image: "/classic-red-convertible.png",
          priceDay: 250,
          available: true,
        },
        {
          id: "V1002",
          type: "RENAULT EXPRESS",
          image: "/classic-panel-van.png",
          priceDay: 300,
          available: true,
        },
        {
          id: "V1003",
          type: "Duster automatique",
          image: "/modern-family-suv.png",
          priceDay: 350,
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

  const handleBookingPress = (booking) => {
    navigation.navigate("BookingDetails", { booking })
  }

  const handleVehiclePress = (vehicle) => {
    navigation.navigate("VehicleDetails", { vehicle })
  }

  const handleNewBooking = () => {
    navigation.navigate("NewBooking")
  }

  const handleViewAllBookings = () => {
    navigation.navigate("Réservations")
  }

  const handleViewAllVehicles = () => {
    navigation.navigate("Véhicules")
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>{t("client.greeting")}</Text>
        <Text style={styles.name}>KASBAH FILM</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleNewBooking}>
          <View style={styles.actionIcon}>
            <Car size={24} color="#0f766e" />
          </View>
          <Text style={styles.actionText}>{t("client.rentCar")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("NewBooking", { type: "transfer" })}
        >
          <View style={styles.actionIcon}>
            <MapPin size={24} color="#0f766e" />
          </View>
          <Text style={styles.actionText}>{t("client.bookTransfer")}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("Documents")}>
          <View style={styles.actionIcon}>
            <FileText size={24} color="#0f766e" />
          </View>
          <Text style={styles.actionText}>{t("client.documents")}</Text>
        </TouchableOpacity>
      </View>

      {/* Active Bookings */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t("client.activeBookings")}</Text>
          {activeBookings.length > 0 && (
            <TouchableOpacity onPress={handleViewAllBookings}>
              <Text style={styles.viewAll}>{t("client.viewAll")}</Text>
            </TouchableOpacity>
          )}
        </View>

        {activeBookings.length > 0 ? (
          activeBookings.map((booking) => (
            <TouchableOpacity key={booking.id} style={styles.bookingCard} onPress={() => handleBookingPress(booking)}>
              <View style={styles.bookingHeader}>
                <Text style={styles.vehicleName}>{booking.vehicle}</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{t("client.active")}</Text>
                </View>
              </View>
              <Text style={styles.matricule}>{booking.matricule}</Text>

              <View style={styles.bookingDetails}>
                <View style={styles.detailRow}>
                  <Calendar size={16} color="#0f766e" />
                  <Text style={styles.detailText}>
                    {booking.startDate} - {booking.endDate}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Clock size={16} color="#0f766e" />
                  <Text style={styles.detailText}>{t("client.daysLeft", { days: 7 })}</Text>
                </View>
              </View>

              <View style={styles.driverInfo}>
                <Text style={styles.driverLabel}>{t("client.driver")}:</Text>
                <Text style={styles.driverName}>{booking.driver}</Text>
              </View>

              <View style={styles.viewDetailsRow}>
                <Text style={styles.viewDetailsText}>{t("client.viewDetails")}</Text>
                <ChevronRight size={16} color="#0f766e" />
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>{t("client.noActiveBookings")}</Text>
            <TouchableOpacity style={styles.emptyStateButton} onPress={handleNewBooking}>
              <Plus size={16} color="#fff" />
              <Text style={styles.emptyStateButtonText}>{t("client.createBooking")}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Upcoming Bookings */}
      {upcomingBookings.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t("client.upcomingBookings")}</Text>
            <TouchableOpacity onPress={handleViewAllBookings}>
              <Text style={styles.viewAll}>{t("client.viewAll")}</Text>
            </TouchableOpacity>
          </View>

          {upcomingBookings.map((booking) => (
            <TouchableOpacity
              key={booking.id}
              style={styles.upcomingBookingCard}
              onPress={() => handleBookingPress(booking)}
            >
              {booking.type === "transfer" ? (
                <>
                  <View style={styles.upcomingBookingHeader}>
                    <Text style={styles.upcomingBookingType}>{t("client.transfer")}</Text>
                    <View style={[styles.statusBadge, styles.confirmedBadge]}>
                      <Text style={styles.statusText}>{t("client.confirmed")}</Text>
                    </View>
                  </View>
                  <View style={styles.upcomingBookingDetails}>
                    <View style={styles.detailRow}>
                      <MapPin size={16} color="#0f766e" />
                      <Text style={styles.detailText}>{booking.destination}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Calendar size={16} color="#0f766e" />
                      <Text style={styles.detailText}>{booking.date}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Clock size={16} color="#0f766e" />
                      <Text style={styles.detailText}>{booking.time}</Text>
                    </View>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.upcomingBookingHeader}>
                    <Text style={styles.upcomingBookingType}>{booking.vehicle}</Text>
                    <View style={[styles.statusBadge, styles.confirmedBadge]}>
                      <Text style={styles.statusText}>{t("client.confirmed")}</Text>
                    </View>
                  </View>
                  <Text style={styles.matricule}>{booking.matricule}</Text>
                  <View style={styles.upcomingBookingDetails}>
                    <View style={styles.detailRow}>
                      <Calendar size={16} color="#0f766e" />
                      <Text style={styles.detailText}>
                        {booking.startDate} - {booking.endDate}
                      </Text>
                    </View>
                  </View>
                </>
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Recommended Vehicles */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t("client.recommendedVehicles")}</Text>
          <TouchableOpacity onPress={handleViewAllVehicles}>
            <Text style={styles.viewAll}>{t("client.viewAll")}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.vehiclesContainer}>
          {recommendedVehicles.map((vehicle) => (
            <TouchableOpacity key={vehicle.id} style={styles.vehicleCard} onPress={() => handleVehiclePress(vehicle)}>
              <Image source={{ uri: vehicle.image }} style={styles.vehicleImage} resizeMode="cover" />
              <View style={styles.vehicleInfo}>
                <Text style={styles.vehicleType}>{vehicle.type}</Text>
                <Text style={styles.vehiclePrice}>
                  {vehicle.priceDay} MAD <Text style={styles.perDay}>{t("client.perDay")}</Text>
                </Text>
                <TouchableOpacity
                  style={styles.bookNowButton}
                  onPress={() => navigation.navigate("NewBooking", { vehicleId: vehicle.id })}
                >
                  <Text style={styles.bookNowText}>{t("client.bookNow")}</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    padding: 20,
    backgroundColor: "#0f766e",
  },
  greeting: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 4,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    margin: 16,
    marginTop: -20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  actionButton: {
    alignItems: "center",
    flex: 1,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(15, 118, 110, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: "#374151",
    textAlign: "center",
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  viewAll: {
    fontSize: 14,
    color: "#0f766e",
  },
  bookingCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  bookingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  statusBadge: {
    backgroundColor: "#0f766e",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  confirmedBadge: {
    backgroundColor: "#0369a1",
  },
  statusText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
  matricule: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 12,
  },
  bookingDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#374151",
  },
  driverInfo: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 12,
  },
  driverLabel: {
    fontSize: 14,
    color: "#6b7280",
  },
  driverName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#374151",
    marginLeft: 4,
  },
  viewDetailsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 8,
  },
  viewDetailsText: {
    fontSize: 14,
    color: "#0f766e",
    marginRight: 4,
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
    marginBottom: 16,
  },
  emptyStateButton: {
    backgroundColor: "#0f766e",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },
  upcomingBookingCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  upcomingBookingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  upcomingBookingType: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
  },
  upcomingBookingDetails: {
    marginTop: 8,
  },
  vehiclesContainer: {
    paddingBottom: 8,
  },
  vehicleCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    width: 200,
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: "hidden",
  },
  vehicleImage: {
    width: "100%",
    height: 120,
    backgroundColor: "#e5e7eb",
  },
  vehicleInfo: {
    padding: 12,
  },
  vehicleType: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  vehiclePrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0f766e",
    marginBottom: 12,
  },
  perDay: {
    fontWeight: "normal",
    fontSize: 12,
    color: "#6b7280",
  },
  bookNowButton: {
    backgroundColor: "#0f766e",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  bookNowText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
})

export default HomeScreen
