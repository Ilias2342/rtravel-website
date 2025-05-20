"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Calendar, Clock, MapPin, Users, CheckCircle, ChevronRight } from "lucide-react-native"
import { useTranslation } from "../context/LanguageContext"

const MinibusScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState("assigned")
  const [minibuses, setMinibuses] = useState([])
  const [specialServices, setSpecialServices] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    // Simulate API call
    setTimeout(() => {
      setMinibuses([
        {
          id: 1,
          type: "Mercedes Sprinter",
          matricule: "68775-B-26",
          capacity: "17 places",
          driver: "Ait Mansour Taoufik",
          driverCIN: "P333598",
          driverPhone: "0674750607",
          client: "les fournisseures",
          startDate: "24-02-2025",
          endDate: "",
          status: "assigned",
          image: "/mercedes-sprinter.png",
        },
        {
          id: 2,
          type: "Mercedes Sprinter",
          matricule: "75627-B-26",
          capacity: "17 places",
          driver: "Said Samouh",
          driverCIN: "BH321279",
          driverPhone: "0666896692",
          client: "les fournisseures",
          startDate: "25-02-2025",
          endDate: "",
          status: "assigned",
          image: "/mercedes-sprinter.png",
        },
        {
          id: 3,
          type: "Renault Master",
          matricule: "29766-D-26",
          capacity: "15 places",
          driver: "Rais Adnane",
          driverCIN: "C393159",
          driverPhone: "0664080394",
          client: "DAR EL HADITH",
          startDate: "18-04-2025",
          endDate: "27-04-2025",
          status: "upcoming",
          image: "/renault-master.png",
        },
        {
          id: 4,
          type: "Volkswagen Crafter",
          matricule: "50912-D-26",
          capacity: "17 places",
          driver: "Bellaghzal El Mahdi Achraf",
          driverCIN: "EE431251",
          driverPhone: "0609511233",
          client: "IAV",
          startDate: "08-04-2025",
          endDate: "08-04-2025",
          status: "completed",
          image: "/volkswagen-crafter.png",
        },
      ])

      setSpecialServices([
        {
          id: 1,
          name: "DAR EL HADITH EL HASSANIA",
          reference: "N°25/2025",
          startDate: "18-04-2025",
          endDate: "27-04-2025",
          status: "upcoming",
          vehicles: [
            {
              type: "Minibus",
              matricule: "49/06810",
              capacity: "20 places",
              driver: "ABD BAQI SAHEL",
              driverCIN: "A474906",
              days: 10,
            },
            {
              type: "Minibus",
              matricule: "47/051788",
              capacity: "20 places",
              driver: "AHMED IKLANE",
              driverCIN: "X250902",
              days: 9,
            },
          ],
        },
        {
          id: 2,
          name: "IAV PRESTATION",
          reference: "N°23/2025/IAV",
          date: "08-04-2025",
          status: "completed",
          drivers: [
            {
              name: "Yassine BERHICHE",
              cin: "AA51675",
              matricule: "01/352543",
              confirmation: "effectué",
              status: "OFF",
            },
            {
              name: "BRAHIM KHEBBAZ",
              cin: "A696639",
              matricule: "49/041325",
              confirmation: "effectué",
              status: "OFF",
            },
            {
              name: "Said Oumoma",
              cin: "AD155210",
              matricule: "49/043365",
              confirmation: "effectué",
              status: "OFF",
              replacement: "JAMAL SABI FAHIMI",
            },
          ],
        },
      ])

      setRefreshing(false)
    }, 1500)
  }

  const onRefresh = () => {
    setRefreshing(true)
    fetchData()
  }

  const handleMinibusPress = (minibus) => {
    navigation.navigate("MinibusDetails", { minibus })
  }

  const handleServicePress = (service) => {
    navigation.navigate("ServiceDetails", { service })
  }

  const getFilteredMinibuses = () => {
    if (activeTab === "assigned") {
      return minibuses.filter((minibus) => minibus.status === "assigned")
    } else if (activeTab === "upcoming") {
      return minibuses.filter((minibus) => minibus.status === "upcoming")
    } else if (activeTab === "completed") {
      return minibuses.filter((minibus) => minibus.status === "completed")
    }
    return minibuses
  }

  const getFilteredServices = () => {
    if (activeTab === "assigned" || activeTab === "upcoming") {
      return specialServices.filter((service) => service.status === "upcoming")
    } else if (activeTab === "completed") {
      return specialServices.filter((service) => service.status === "completed")
    }
    return specialServices
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t("driver.minibusAndServices")}</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "assigned" && styles.activeTab]}
          onPress={() => setActiveTab("assigned")}
        >
          <Text style={[styles.tabText, activeTab === "assigned" && styles.activeTabText]}>{t("driver.assigned")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "upcoming" && styles.activeTab]}
          onPress={() => setActiveTab("upcoming")}
        >
          <Text style={[styles.tabText, activeTab === "upcoming" && styles.activeTabText]}>{t("driver.upcoming")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "completed" && styles.activeTab]}
          onPress={() => setActiveTab("completed")}
        >
          <Text style={[styles.tabText, activeTab === "completed" && styles.activeTabText]}>
            {t("driver.completed")}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Minibuses Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("driver.minibuses")}</Text>

        {getFilteredMinibuses().length > 0 ? (
          getFilteredMinibuses().map((minibus) => (
            <TouchableOpacity key={minibus.id} style={styles.minibusCard} onPress={() => handleMinibusPress(minibus)}>
              <View style={styles.minibusHeader}>
                <View style={styles.minibusInfo}>
                  <Text style={styles.minibusType}>{minibus.type}</Text>
                  <Text style={styles.minibusMatricule}>{minibus.matricule}</Text>
                </View>
                <View style={styles.statusContainer}>
                  {minibus.status === "assigned" && (
                    <View style={[styles.statusBadge, styles.assignedBadge]}>
                      <Text style={styles.statusText}>{t("driver.assigned")}</Text>
                    </View>
                  )}
                  {minibus.status === "upcoming" && (
                    <View style={[styles.statusBadge, styles.upcomingBadge]}>
                      <Text style={styles.statusText}>{t("driver.upcoming")}</Text>
                    </View>
                  )}
                  {minibus.status === "completed" && (
                    <View style={[styles.statusBadge, styles.completedBadge]}>
                      <Text style={styles.statusText}>{t("driver.completed")}</Text>
                    </View>
                  )}
                </View>
              </View>

              <View style={styles.minibusDetails}>
                <View style={styles.detailRow}>
                  <Users size={16} color="#0f766e" />
                  <Text style={styles.detailText}>{minibus.capacity}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Calendar size={16} color="#0f766e" />
                  <Text style={styles.detailText}>
                    {minibus.startDate} {minibus.endDate ? `- ${minibus.endDate}` : ""}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <MapPin size={16} color="#0f766e" />
                  <Text style={styles.detailText}>{minibus.client}</Text>
                </View>
              </View>

              <View style={styles.driverInfo}>
                <Text style={styles.driverLabel}>{t("driver.driver")}:</Text>
                <Text style={styles.driverName}>{minibus.driver}</Text>
              </View>

              <View style={styles.viewDetailsRow}>
                <Text style={styles.viewDetailsText}>{t("driver.viewDetails")}</Text>
                <ChevronRight size={16} color="#0f766e" />
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>{t("driver.noMinibusesFound")}</Text>
          </View>
        )}
      </View>

      {/* Special Services Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("driver.specialServices")}</Text>

        {getFilteredServices().length > 0 ? (
          getFilteredServices().map((service) => (
            <TouchableOpacity key={service.id} style={styles.serviceCard} onPress={() => handleServicePress(service)}>
              <View style={styles.serviceHeader}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceReference}>{service.reference}</Text>
              </View>

              <View style={styles.serviceDetails}>
                {service.startDate && (
                  <View style={styles.detailRow}>
                    <Calendar size={16} color="#0f766e" />
                    <Text style={styles.detailText}>
                      {service.startDate} {service.endDate ? `- ${service.endDate}` : ""}
                    </Text>
                  </View>
                )}

                {service.date && (
                  <View style={styles.detailRow}>
                    <Calendar size={16} color="#0f766e" />
                    <Text style={styles.detailText}>{service.date}</Text>
                  </View>
                )}

                <View style={styles.detailRow}>
                  {service.status === "upcoming" ? (
                    <Clock size={16} color="#0f766e" />
                  ) : (
                    <CheckCircle size={16} color="#0f766e" />
                  )}
                  <Text style={styles.detailText}>
                    {service.status === "upcoming" ? t("driver.upcoming") : t("driver.completed")}
                  </Text>
                </View>
              </View>

              {service.vehicles && (
                <View style={styles.vehiclesContainer}>
                  <Text style={styles.vehiclesTitle}>{t("driver.assignedVehicles")}</Text>
                  {service.vehicles.map((vehicle, index) => (
                    <View key={index} style={styles.vehicleItem}>
                      <Text style={styles.vehicleItemText}>
                        {vehicle.type} - {vehicle.matricule} ({vehicle.capacity})
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              {service.drivers && (
                <View style={styles.vehiclesContainer}>
                  <Text style={styles.vehiclesTitle}>{t("driver.assignedDrivers")}</Text>
                  {service.drivers.map((driver, index) => (
                    <View key={index} style={styles.vehicleItem}>
                      <Text style={styles.vehicleItemText}>
                        {driver.name} - {driver.cin}
                      </Text>
                      {driver.replacement && (
                        <Text style={styles.replacementText}>
                          {t("driver.replacement")}: {driver.replacement}
                        </Text>
                      )}
                    </View>
                  ))}
                </View>
              )}

              <View style={styles.viewDetailsRow}>
                <Text style={styles.viewDetailsText}>{t("driver.viewDetails")}</Text>
                <ChevronRight size={16} color="#0f766e" />
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>{t("driver.noServicesFound")}</Text>
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
    padding: 16,
    backgroundColor: "#0f766e",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginTop: 16,
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
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#0f766e",
  },
  tabText: {
    fontSize: 14,
    color: "#4b5563",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 12,
  },
  minibusCard: {
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
  minibusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  minibusInfo: {
    flex: 1,
  },
  minibusType: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
  },
  minibusMatricule: {
    fontSize: 14,
    color: "#6b7280",
  },
  statusContainer: {
    alignItems: "flex-end",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  assignedBadge: {
    backgroundColor: "#0f766e",
  },
  upcomingBadge: {
    backgroundColor: "#0369a1",
  },
  completedBadge: {
    backgroundColor: "#047857",
  },
  statusText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
  minibusDetails: {
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
  },
  serviceCard: {
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
  serviceHeader: {
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
  },
  serviceReference: {
    fontSize: 14,
    color: "#6b7280",
  },
  serviceDetails: {
    marginBottom: 12,
  },
  vehiclesContainer: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 12,
    marginBottom: 12,
  },
  vehiclesTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 8,
  },
  vehicleItem: {
    backgroundColor: "#f3f4f6",
    borderRadius: 4,
    padding: 8,
    marginBottom: 4,
  },
  vehicleItemText: {
    fontSize: 13,
    color: "#4b5563",
  },
  replacementText: {
    fontSize: 12,
    color: "#0f766e",
    fontStyle: "italic",
    marginTop: 4,
  },
})

export default MinibusScreen
