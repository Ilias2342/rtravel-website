"use client"

import { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Calendar, Clock, MapPin, Users, CreditCard, Check, Plane, Car } from "lucide-react-native"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { useTranslation } from "../context/LanguageContext"

const BookPremiumServiceScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const route = useRoute()
  const { service, type } = route.params

  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date())
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false)
  const [passengerCount, setPassengerCount] = useState(type === "jet" ? "8" : "4")
  const [pickupLocation, setPickupLocation] = useState("")
  const [dropoffLocation, setDropoffLocation] = useState("")
  const [specialRequests, setSpecialRequests] = useState("")
  const [contactName, setContactName] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card")
  const [isLoading, setIsLoading] = useState(false)

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleDateConfirm = (selectedDate) => {
    setDate(selectedDate)
    hideDatePicker()
  }

  const showTimePicker = () => {
    setTimePickerVisibility(true)
  }

  const hideTimePicker = () => {
    setTimePickerVisibility(false)
  }

  const handleTimeConfirm = (selectedTime) => {
    setTime(selectedTime)
    hideTimePicker()
  }

  const togglePaymentModal = () => {
    setPaymentModalVisible(!isPaymentModalVisible)
  }

  const selectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method)
    setPaymentModalVisible(false)
  }

  const handleSubmit = () => {
    // Validate form
    if (!contactName || !contactPhone) {
      Alert.alert(t("client.error"), t("client.contactInfoRequired"))
      return
    }

    if (type === "jet" && (!pickupLocation || !dropoffLocation)) {
      Alert.alert(t("client.error"), t("client.locationRequired"))
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      Alert.alert(t("client.bookingSuccess"), t("client.premiumBookingSuccessMessage"), [
        {
          text: "OK",
          onPress: () => navigation.navigate("Main"),
        },
      ])
    }, 2000)
  }

  const formatDate = (date) => {
    return date.toLocaleDateString("fr-FR")
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
  }

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {type === "jet" ? t("client.bookPrivateJet") : t("client.bookLuxuryVehicle")}
          </Text>
        </View>

        {/* Service Summary */}
        <View style={styles.serviceCard}>
          <View style={styles.serviceHeader}>
            {type === "jet" ? <Plane size={24} color="#0f766e" /> : <Car size={24} color="#0f766e" />}
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceType}>{service.type}</Text>
              <Text style={styles.serviceModel}>{type === "jet" ? service.model : service.description}</Text>
            </View>
          </View>

          <View style={styles.serviceDetails}>
            <View style={styles.detailRow}>
              <MapPin size={16} color="#0f766e" />
              <Text style={styles.detailText}>{service.route}</Text>
            </View>

            {type === "jet" && (
              <View style={styles.detailRow}>
                <Users size={16} color="#0f766e" />
                <Text style={styles.detailText}>{service.capacity}</Text>
              </View>
            )}
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>{t("client.totalPrice")}</Text>
            <Text style={styles.priceValue}>{formatPrice(service.price)} MAD</Text>
          </View>
        </View>

        {/* Booking Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("client.bookingDetails")}</Text>

          <View style={styles.dateContainer}>
            <TouchableOpacity style={styles.dateSelector} onPress={showDatePicker}>
              <Calendar size={20} color="#0f766e" />
              <View style={styles.dateTextContainer}>
                <Text style={styles.dateLabel}>{t("client.date")}</Text>
                <Text style={styles.dateValue}>{formatDate(date)}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.dateSelector} onPress={showTimePicker}>
              <Clock size={20} color="#0f766e" />
              <View style={styles.dateTextContainer}>
                <Text style={styles.dateLabel}>{t("client.time")}</Text>
                <Text style={styles.dateValue}>{formatTime(time)}</Text>
              </View>
            </TouchableOpacity>
          </View>

          {type === "jet" && (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{t("client.passengers")}</Text>
                <TextInput
                  style={styles.input}
                  value={passengerCount}
                  onChangeText={setPassengerCount}
                  keyboardType="numeric"
                  placeholder="ex: 8"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{t("client.departureLocation")}</Text>
                <TextInput
                  style={styles.input}
                  value={pickupLocation}
                  onChangeText={setPickupLocation}
                  placeholder="ex: Aéroport de Tanger"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{t("client.arrivalLocation")}</Text>
                <TextInput
                  style={styles.input}
                  value={dropoffLocation}
                  onChangeText={setDropoffLocation}
                  placeholder="ex: Aéroport d'El Houceima"
                />
              </View>
            </>
          )}

          {type === "luxury" && (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{t("client.pickupLocation")}</Text>
                <TextInput
                  style={styles.input}
                  value={pickupLocation}
                  onChangeText={setPickupLocation}
                  placeholder="ex: Hôtel Four Seasons Rabat"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{t("client.specialRequests")}</Text>
                <TextInput
                  style={styles.textArea}
                  value={specialRequests}
                  onChangeText={setSpecialRequests}
                  placeholder={t("client.specialRequestsPlaceholder")}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            </>
          )}
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("client.contactInformation")}</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t("client.contactName")}</Text>
            <TextInput
              style={styles.input}
              value={contactName}
              onChangeText={setContactName}
              placeholder="ex: John Doe"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t("client.contactPhone")}</Text>
            <TextInput
              style={styles.input}
              value={contactPhone}
              onChangeText={setContactPhone}
              placeholder="ex: 0661234567"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t("client.contactEmail")}</Text>
            <TextInput
              style={styles.input}
              value={contactEmail}
              onChangeText={setContactEmail}
              placeholder="ex: email@example.com"
              keyboardType="email-address"
            />
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("client.paymentMethod")}</Text>
          <TouchableOpacity style={styles.selector} onPress={togglePaymentModal}>
            <View style={styles.selectedItem}>
              <CreditCard size={20} color="#0f766e" />
              <Text style={styles.selectedItemText}>
                {selectedPaymentMethod === "card" ? t("client.creditCard") : t("client.bankTransfer")}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>{t("client.confirmBooking")}</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Date Pickers */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date()}
      />

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />

      {/* Payment Method Modal */}
      {isPaymentModalVisible && (
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>{t("client.selectPaymentMethod")}</Text>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.modalItem} onPress={() => selectPaymentMethod("card")}>
                <View style={styles.modalItemContent}>
                  <CreditCard size={20} color="#0f766e" />
                  <Text style={styles.modalItemText}>{t("client.creditCard")}</Text>
                </View>
                {selectedPaymentMethod === "card" && <Check size={20} color="#0f766e" />}
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalItem} onPress={() => selectPaymentMethod("transfer")}>
                <View style={styles.modalItemContent}>
                  <CreditCard size={20} color="#0f766e" />
                  <Text style={styles.modalItemText}>{t("client.bankTransfer")}</Text>
                </View>
                {selectedPaymentMethod === "transfer" && <Check size={20} color="#0f766e" />}
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.modalCloseButton} onPress={togglePaymentModal}>
              <Text style={styles.modalCloseButtonText}>{t("client.close")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  )
}

import { StyleSheet } from "react-native"
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  scrollView: {
    flex: 1,
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
  serviceCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    margin: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  serviceHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  serviceInfo: {
    marginLeft: 12,
    flex: 1,
  },
  serviceType: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
  },
  serviceModel: {
    fontSize: 14,
    color: "#6b7280",
  },
  serviceDetails: {
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
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 12,
  },
  priceLabel: {
    fontSize: 14,
    color: "#6b7280",
  },
  priceValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f766e",
  },
  section: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    margin: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  dateSelector: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    flex: 0.48,
  },
  dateTextContainer: {
    marginLeft: 8,
  },
  dateLabel: {
    fontSize: 12,
    color: "#6b7280",
  },
  dateValue: {
    fontSize: 14,
    color: "#1f2937",
    fontWeight: "500",
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: "#1f2937",
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: "#1f2937",
    height: 100,
  },
  selector: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
  },
  selectedItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedItemText: {
    fontSize: 14,
    color: "#1f2937",
    marginLeft: 8,
  },
  footer: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    marginTop: 8,
    marginBottom: 24,
  },
  submitButton: {
    backgroundColor: "#0f766e",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    width: "90%",
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
    textAlign: "center",
  },
  modalContent: {
    maxHeight: 300,
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  modalItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalItemText: {
    fontSize: 14,
    color: "#1f2937",
    marginLeft: 8,
  },
  modalCloseButton: {
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 16,
  },
  modalCloseButtonText: {
    color: "#1f2937",
    fontSize: 14,
    fontWeight: "bold",
  },
})

export default BookPremiumServiceScreen
