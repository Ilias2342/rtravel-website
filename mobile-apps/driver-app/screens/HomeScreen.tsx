"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Calendar, MapPin, Clock, AlertCircle, CheckCircle, TrendingUp, Droplet, Battery } from "lucide-react-native"
import { useTranslation } from "../context/LanguageContext"

const HomeScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = useState(false)
  const [currentMission, setCurrentMission] = useState(null)
  const [upcomingMissions, setUpcomingMissions] = useState([])
  const [vehicleStatus, setVehicleStatus] = useState({
    fuel: 75,
    battery: 100,
    maintenance: "OK",
    nextService: "15/07/2025",
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    // Simulate API call
    setTimeout(() => {
      setCurrentMission({
        id: "M1001",
        client: "KASBAH FILM",
        project: "CONVOY",
        vehicle: "CITROEN C-ELYSEE",
        matricule: "22976-T-1",
        startTime: "08:30",
        endTime: "17:00",
        location: "Rabat - Casablanca",
        status: "in-progress",
      })

      setUpcomingMissions([
        {
          id: "M1002",
          client: "EVA-NORA MYNGHEER",
          project: "TRANSFERT",
          vehicle: "CLIO 5",
          matricule: "24860-T-1",
          date: "Demain",
          startTime: "09:00",
          location: "Aéroport Mohammed V",
          status: "scheduled",
        },
        {
          id: "M1003",
          client: "SANEKIL",
          project: "TRANSFERTS",
          vehicle: "DACIA LOGAN",
          matricule: "19492-E-1",
          date: "15/06/2025",
          startTime: "14:30",
          location: "Hôtel Sofitel - Rabat",
          status: "scheduled",
        },
      ])

      setRefreshing(false)
    }, 1500)
  }

  const onRefresh = () => {
    setRefreshing(true)
    fetchData()
  }

  const handleMissionPress = (mission) => {
    navigation.navigate("MissionDetails", { mission })
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>{t("driver.greeting")}</Text>
        <Text style={styles.name}>Mohammed Alami</Text>
      </View>

      {/* Current Mission */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("driver.currentMission")}</Text>
        {currentMission ? (
          <TouchableOpacity style={styles.missionCard} onPress={() => handleMissionPress(currentMission)}>
            <View style={styles.missionHeader}>
              <Text style={styles.missionClient}>{currentMission.client}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{t("driver.inProgress")}</Text>
              </View>
            </View>
            <Text style={styles.missionProject}>{currentMission.project}</Text>
            <View style={styles.missionDetails}>
              <View style={styles.detailRow}>
                <Calendar size={16} color="#0f766e" />
                <Text style={styles.detailText}>{t("driver.today")}</Text>
              </View>
              <View style={styles.detailRow}>
                <Clock size={16} color="#0f766e" />
                <Text style={styles.detailText}>
                  {currentMission.startTime} - {currentMission.endTime}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <MapPin size={16} color="#0f766e" />
                <Text style={styles.detailText}>{currentMission.location}</Text>
              </View>
            </View>
            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleName}>{currentMission.vehicle}</Text>
              <Text style={styles.matricule}>{currentMission.matricule}</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>{t("driver.noCurrentMission")}</Text>
          </View>
        )}
      </View>

      {/* Vehicle Status */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("driver.vehicleStatus")}</Text>
        <View style={styles.vehicleStatusCard}>
          <View style={styles.vehicleStatusHeader}>
            <Text style={styles.vehicleStatusTitle}>{t("driver.vehicleCondition")}</Text>
            {vehicleStatus.maintenance === "OK" ? (
              <CheckCircle size={20} color="#22c55e" />
            ) : (
              <AlertCircle size={20} color="#ef4444" />
            )}
          </View>

          <View style={styles.statusGrid}>
            <View style={styles.statusItem}>
              <Droplet size={24} color="#0f766e" />
              <Text style={styles.statusValue}>{vehicleStatus.fuel}%</Text>
              <Text style={styles.statusLabel}>{t("driver.fuel")}</Text>
            </View>
            <View style={styles.statusItem}>
              <Battery size={24} color="#0f766e" />
              <Text style={styles.statusValue}>{vehicleStatus.battery}%</Text>
              <Text style={styles.statusLabel}>{t("driver.battery")}</Text>
            </View>
            <View style={styles.statusItem}>
              <TrendingUp size={24} color="#0f766e" />
              <Text style={styles.statusValue}>{vehicleStatus.maintenance}</Text>
              <Text style={styles.statusLabel}>{t("driver.maintenance")}</Text>
            </View>
            <View style={styles.statusItem}>
              <Calendar size={24} color="#0f766e" />
              <Text style={styles.statusValue}>{vehicleStatus.nextService}</Text>
              <Text style={styles.statusLabel}>{t("driver.nextService")}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Upcoming Missions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("driver.upcomingMissions")}</Text>
        {upcomingMissions.length > 0 ? (
          upcomingMissions.map((mission) => (
            <TouchableOpacity
              key={mission.id}
              style={styles.upcomingMissionCard}
              onPress={() => handleMissionPress(mission)}
            >
              <View style={styles.upcomingMissionHeader}>
                <Text style={styles.upcomingDate}>{mission.date}</Text>
                <Text style={styles.upcomingTime}>{mission.startTime}</Text>
              </View>
              <Text style={styles.upcomingClient}>{mission.client}</Text>
              <Text style={styles.upcomingProject}>{mission.project}</Text>
              <View style={styles.upcomingLocation}>
                <MapPin size={14} color="#6b7280" />
                <Text style={styles.locationText}>{mission.location}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>{t("driver.noUpcomingMissions")}</Text>
          </View>
        )}
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
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1f2937",
  },
  missionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  missionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  missionClient: {
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
  statusText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
  missionProject: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 12,
  },
  missionDetails: {
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
  vehicleInfo: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 12,
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  vehicleName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#374151",
  },
  matricule: {
    fontSize: 14,
    color: "#6b7280",
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
  vehicleStatusCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  vehicleStatusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  vehicleStatusTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
  },
  statusGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statusItem: {
    width: "48%",
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  statusValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginTop: 8,
  },
  statusLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
  upcomingMissionCard: {
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
  upcomingMissionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  upcomingDate: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0f766e",
  },
  upcomingTime: {
    fontSize: 14,
    color: "#0f766e",
  },
  upcomingClient: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
  },
  upcomingProject: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
  },
  upcomingLocation: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#6b7280",
  },
})

export default HomeScreen
