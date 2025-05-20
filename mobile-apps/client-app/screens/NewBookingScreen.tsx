"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Calendar, Clock, MapPin, Car, User, CreditCard, ChevronDown, Check } from "lucide-react-native"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { useTranslation } from "../context/LanguageContext"

const NewBookingScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const route = useRoute()
  const initialBookingType = route.params?.type || "rental"
  const initialVehicleId = route.params?.vehicleId

  const [bookingType, setBookingType] = useState(initialBookingType)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false)
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false)
  const [isVehicleModalVisible, setVehicleModalVisible] = useState(false)
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card")
  const [specialRequests, setSpecialRequests] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // For transfer booking
  const [transferDate, setTransferDate] = useState(new Date())
  const [transferTime, setTransferTime] = useState(new Date())
  const [isTransferDatePickerVisible, setTransferDatePickerVisibility] = useState(false)
  const [isTransferTimePickerVisible, setTransferTimePickerVisibility] = useState(false)
  const [pickupLocation, setPickupLocation] = useState("")
  const [dropoffLocation, setDropoffLocation] = useState("")
  const [passengerCount, setPassengerCount] = useState("1")

  // Available vehicles for selection
  const [availableVehicles, setAvailableVehicles] = useState([
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

  useEffect(() => {
    if (initialVehicleId) {
      const vehicle = availableVehicles.find((v) => v.id === initialVehicleId)
      if (vehicle) {
        setSelectedVehicle(vehicle)
      }
    }
  }, [initialVehicleId])

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true)
  }

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false)
  }

  const handleStartDateConfirm = (date) => {
    setStartDate(date)
    hideStartDatePicker()
  }

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true)
  }

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false)
  }

  const handleEndDateConfirm = (date) => {
    setEndDate(date)
    hideEndDatePicker()
  }

  const showTransferDatePicker = () => {
    setTransferDatePickerVisibility(true)
  }

  const hideTransferDatePicker = () => {
    setTransferDatePickerVisibility(false)
  }

  const handleTransferDateConfirm = (date) => {
    setTransferDate(date)
    hideTransferDatePicker()
  }

  const showTransferTimePicker = () => {
    setTransferTimePickerVisibility(true)
  }

  const hideTransferTimePicker = () => {
    setTransferTimePickerVisibility(false)
  }

  const handleTransferTimeConfirm = (time) => {
    setTransferTime(time)
    hideTransferTimePicker()
  }

  const toggleVehicleModal = () => {
    setVehicleModalVisible(!isVehicleModalVisible)
  }

  const selectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle)
    setVehicleModalVisible(false)
  }

  const togglePaymentModal = () => {
    setPaymentModalVisible(!isPaymentModalVisible)
  }

  const selectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method)
    setPaymentModalVisible(false)
  }

  const handleSubmit = () => {
    setIsLoading(true)

    // Validate form
    if (bookingType === "rental" && !selectedVehicle) {
      Alert.alert(t("client.error"), t("client.selectVehicleError"))
      setIsLoading(false)
      return
    }

    if (bookingType === "transfer" && (!pickupLocation || !dropoffLocation)) {
      Alert.alert(t("client.error"), t("client.locationError"))
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      Alert.alert(t("client.bookingSuccess"), t("client.bookingSuccessMessage"), [
        {
          text: "OK",
          onPress: () => navigation.navigate("Réservations"),
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

  const calculateTotalPrice = () => {
    if (!selectedVehicle) return 0

    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
    return selectedVehicle.priceDay * days
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Booking Type Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("client.bookingType")}</Text>
          <View style={styles.bookingTypeContainer}>
            <TouchableOpacity
              style={[styles.bookingTypeButton, bookingType === "rental" && styles.bookingTypeButtonActive]}
              onPress={() => setBookingType("rental")}
            >
              <Car size={20} color={bookingType === "rental" ? "#fff" : "#0f766e"} />
              <Text style={[styles.bookingTypeText, bookingType === "rental" && styles.bookingTypeTextActive]}>
                {t("client.carRental")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.bookingTypeButton, bookingType === "transfer" && styles.bookingTypeButtonActive]}
              onPress={() => setBookingType("transfer")}
            >
              <MapPin size={20} color={bookingType === "transfer" ? "#fff" : "#0f766e"} />
              <Text style={[styles.bookingTypeText, bookingType === "transfer" && styles.bookingTypeTextActive]}>
                {t("client.transfer")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {bookingType === "rental" ? (
          <>
            {/* Vehicle Selection */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t("client.selectVehicle")}</Text>
              <TouchableOpacity style={styles.selector} onPress={toggleVehicleModal}>
                {selectedVehicle ? (
                  <View style={styles.selectedItem}>
                    <Car size={20} color="#0f766e" />
                    <Text style={styles.selectedItemText}>{selectedVehicle.type}</Text>
                    <Text style={styles.selectedItemPrice}>
                      {selectedVehicle.priceDay} MAD / {t("client.day")}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.placeholderItem}>
                    <Text style={styles.placeholderText}>{t("client.selectVehicle")}</Text>
                    <ChevronDown size={20} color="#6b7280" />
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* Date Selection */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t("client.rentalPeriod")}</Text>
              <View style={styles.dateContainer}>
                <TouchableOpacity style={styles.dateSelector} onPress={showStartDatePicker}>
                  <Calendar size={20} color="#0f766e" />
                  <View style={styles.dateTextContainer}>
                    <Text style={styles.dateLabel}>{t("client.startDate")}</Text>
                    <Text style={styles.dateValue}>{formatDate(startDate)}</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.dateSelector} onPress={showEndDatePicker}>
                  <Calendar size={20} color="#0f766e" />
                  <View style={styles.dateTextContainer}>
                    <Text style={styles.dateLabel}>{t("client.endDate")}</Text>
                    <Text style={styles.dateValue}>{formatDate(endDate)}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <>
            {/* Transfer Details */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t("client.transferDetails")}</Text>

              <View style={styles.inputContainer}>
                <MapPin size={20} color="#0f766e" />
                <TextInput
                  style={styles.input}
                  placeholder={t("client.pickupLocation")}
                  value={pickupLocation}
                  onChangeText={setPickupLocation}
                />
              </View>

              <View style={styles.inputContainer}>
                <MapPin size={20} color="#0f766e" />
                <TextInput
                  style={styles.input}
                  placeholder={t("client.dropoffLocation")}
                  value={dropoffLocation}
                  onChangeText={setDropoffLocation}
                />
              </View>

              <View style={styles.dateContainer}>
                <TouchableOpacity style={styles.dateSelector} onPress={showTransferDatePicker}>
                  <Calendar size={20} color="#0f766e" />
                  <View style={styles.dateTextContainer}>
                    <Text style={styles.dateLabel}>{t("client.date")}</Text>
                    <Text style={styles.dateValue}>{formatDate(transferDate)}</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.dateSelector} onPress={showTransferTimePicker}>
                  <Clock size={20} color="#0f766e" />
                  <View style={styles.dateTextContainer}>
                    <Text style={styles.dateLabel}>{t("client.time")}</Text>
                    <Text style={styles.dateValue}>{formatTime(transferTime)}</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <User size={20} color="#0f766e" />
                <TextInput
                  style={styles.input}
                  placeholder={t("client.passengers")}
                  value={passengerCount}
                  onChangeText={setPassengerCount}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </>
        )}

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("client.paymentMethod")}</Text>
          <TouchableOpacity style={styles.selector} onPress={togglePaymentModal}>
            <View style={styles.selectedItem}>
              <CreditCard size={20} color="#0f766e" />
              <Text style={styles.selectedItemText}>
                {selectedPaymentMethod === "card" ? t("client.creditCard") : t("client.cash")}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Special Requests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("client.specialRequests")}</Text>
          <TextInput
            style={styles.textArea}
            placeholder={t("client.specialRequestsPlaceholder")}
            value={specialRequests}
            onChangeText={setSpecialRequests}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Summary */}
        {bookingType === "rental" && selectedVehicle && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("client.summary")}</Text>
            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{t("client.vehicle")}</Text>
                <Text style={styles.summaryValue}>{selectedVehicle.type}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{t("client.duration")}</Text>
                <Text style={styles.summaryValue}>
                  {Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))} {t("client.days")}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{t("client.pricePerDay")}</Text>
                <Text style={styles.summaryValue}>{selectedVehicle.priceDay} MAD</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>{t("client.totalPrice")}</Text>
                <Text style={styles.totalValue}>{calculateTotalPrice()} MAD</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <Text style={styles.submitButtonText}>{t("client.processing")}</Text>
          ) : (
            <Text style={styles.submitButtonText}>{t("client.confirmBooking")}</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Date Pickers */}
      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="date"
        onConfirm={handleStartDateConfirm}
        onCancel={hideStartDatePicker}
        minimumDate={new Date()}
      />

      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="date"
        onConfirm={handleEndDateConfirm}
        onCancel={hideEndDatePicker}
        minimumDate={startDate}
      />

      <DateTimePickerModal
        isVisible={isTransferDatePickerVisible}
        mode="date"
        onConfirm={handleTransferDateConfirm}
        onCancel={hideTransferDatePicker}
        minimumDate={new Date()}
      />

      <DateTimePickerModal
        isVisible={isTransferTimePickerVisible}
        mode="time"
        onConfirm={handleTransferTimeConfirm}
        onCancel={hideTransferTimePicker}
      />

      {/* Vehicle Selection Modal */}
      {isVehicleModalVisible && (
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>{t("client.selectVehicle")}</Text>
            <ScrollView style={styles.modalContent}>
              {availableVehicles.map((vehicle) => (
                <TouchableOpacity key={vehicle.id} style={styles.modalItem} onPress={() => selectVehicle(vehicle)}>
                  <View style={styles.modalItemContent}>
                    <Car size={20} color="#0f766e" />
                    <View style={styles.modalItemTextContainer}>
                      <Text style={styles.modalItemText}>{vehicle.type}</Text>
                      <Text style={styles.modalItemPrice}>
                        {vehicle.priceDay} MAD / {t("client.day")}
                      </Text>
                    </View>
                  </View>
                  {selectedVehicle && selectedVehicle.id === vehicle.id && <Check size={20} color="#0f766e" />}
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.modalCloseButton} onPress={toggleVehicleModal}>
              <Text style={styles.modalCloseButtonText}>{t("client.close")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

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

              <TouchableOpacity style={styles.modalItem} onPress={() => selectPaymentMethod("cash")}>
                <View style={styles.modalItemContent}>
                  <CreditCard size={20} color="#0f766e" />
                  <Text style={styles.modalItemText}>{t("client.cash")}</Text>
                </View>
                {selectedPaymentMethod === "cash" && <Check size={20} color="#0f766e" />}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
    backgroundColor: "#ffffff",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
  },
  bookingTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bookingTypeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15, 118, 110, 0.1)",
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  bookingTypeButtonActive: {
    backgroundColor: "#0f766e",
  },
  bookingTypeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0f766e",
    marginLeft: 8,
  },
  bookingTypeTextActive: {
    color: "#ffffff",
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
    flex: 1,
  },
  selectedItemPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0f766e",
  },
  placeholderItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  placeholderText: {
    fontSize: 14,
    color: "#9ca3af",
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#1f2937",
    marginLeft: 8,
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
  summaryContainer: {
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    padding: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#6b7280",
  },
  summaryValue: {
    fontSize: 14,
    color: "#1f2937",
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#d1d5db",
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0f766e",
  },
  footer: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
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
    maxHeight: "80%",
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
    flex: 1,
  },
  modalItemTextContainer: {
    marginLeft: 8,
    flex: 1,
  },
  modalItemText: {
    fontSize: 14,
    color: "#1f2937",
  },
  modalItemPrice: {
    fontSize: 12,
    color: "#0f766e",
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

export default NewBookingScreen
