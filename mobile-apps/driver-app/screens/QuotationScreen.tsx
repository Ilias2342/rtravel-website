"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Share,
  ActivityIndicator,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { FileText, Plus, Trash2, Download, Share2, Calculator } from "lucide-react-native"
import { useTranslation } from "../context/LanguageContext"

const QuotationScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const [quotationNumber, setQuotationNumber] = useState("")
  const [clientName, setClientName] = useState("")
  const [clientICE, setClientICE] = useState("")
  const [date, setDate] = useState(new Date().toLocaleDateString("fr-FR"))
  const [items, setItems] = useState([{ id: 1, description: "", priceHT: "", priceTTC: "" }])
  const [totalHT, setTotalHT] = useState(0)
  const [totalTTC, setTotalTTC] = useState(0)
  const [tva, setTva] = useState(0)

  const addItem = () => {
    const newItem = {
      id: items.length + 1,
      description: "",
      priceHT: "",
      priceTTC: "",
    }
    setItems([...items, newItem])
  }

  const removeItem = (id) => {
    if (items.length > 1) {
      const updatedItems = items.filter((item) => item.id !== id)
      setItems(updatedItems)
      calculateTotals(updatedItems)
    } else {
      Alert.alert(t("driver.error"), t("driver.minimumOneItem"))
    }
  }

  const updateItem = (id, field, value) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value }

        // If updating priceHT, calculate priceTTC
        if (field === "priceHT") {
          const priceHT = Number.parseFloat(value) || 0
          updatedItem.priceTTC = (priceHT * 1.2).toFixed(2)
        }

        // If updating priceTTC, calculate priceHT
        if (field === "priceTTC") {
          const priceTTC = Number.parseFloat(value) || 0
          updatedItem.priceHT = (priceTTC / 1.2).toFixed(2)
        }

        return updatedItem
      }
      return item
    })

    setItems(updatedItems)
    calculateTotals(updatedItems)
  }

  const calculateTotals = (currentItems = items) => {
    const ht = currentItems.reduce((sum, item) => sum + (Number.parseFloat(item.priceHT) || 0), 0)
    const ttc = currentItems.reduce((sum, item) => sum + (Number.parseFloat(item.priceTTC) || 0), 0)

    setTotalHT(ht)
    setTotalTTC(ttc)
    setTva(ttc - ht)
  }

  const generateQuotation = () => {
    if (!clientName) {
      Alert.alert(t("driver.error"), t("driver.enterClientName"))
      return
    }

    if (items.some((item) => !item.description || !item.priceHT)) {
      Alert.alert(t("driver.error"), t("driver.completeAllFields"))
      return
    }

    setIsLoading(true)

    // Simulate API call to generate PDF
    setTimeout(() => {
      setIsLoading(false)
      Alert.alert(t("driver.success"), t("driver.quotationGenerated"), [
        {
          text: t("driver.share"),
          onPress: shareQuotation,
        },
        {
          text: t("driver.ok"),
        },
      ])
    }, 2000)
  }

  const shareQuotation = async () => {
    try {
      await Share.share({
        message: `Devis R-TRAVEL N°${quotationNumber || "XXXX"} pour ${clientName} - Total: ${totalTTC.toFixed(2)} MAD TTC`,
        title: "Devis R-TRAVEL",
      })
    } catch (error) {
      Alert.alert(t("driver.error"), t("driver.sharingFailed"))
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t("driver.createQuotation")}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("driver.clientInformation")}</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{t("driver.quotationNumber")}</Text>
          <TextInput
            style={styles.input}
            value={quotationNumber}
            onChangeText={setQuotationNumber}
            placeholder="ex: 25/2025"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{t("driver.clientName")}</Text>
          <TextInput
            style={styles.input}
            value={clientName}
            onChangeText={setClientName}
            placeholder="ex: KASBAH FILM"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{t("driver.clientICE")}</Text>
          <TextInput
            style={styles.input}
            value={clientICE}
            onChangeText={setClientICE}
            placeholder="ex: 002315479000057"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{t("driver.date")}</Text>
          <TextInput style={styles.input} value={date} onChangeText={setDate} placeholder="ex: 15/04/2025" />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>{t("driver.items")}</Text>
          <TouchableOpacity style={styles.addButton} onPress={addItem}>
            <Plus size={16} color="#fff" />
            <Text style={styles.addButtonText}>{t("driver.addItem")}</Text>
          </TouchableOpacity>
        </View>

        {items.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>
                {t("driver.item")} #{item.id}
              </Text>
              <TouchableOpacity onPress={() => removeItem(item.id)}>
                <Trash2 size={18} color="#ef4444" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t("driver.description")}</Text>
              <TextInput
                style={styles.input}
                value={item.description}
                onChangeText={(value) => updateItem(item.id, "description", value)}
                placeholder="ex: Mise a disposition d'une MERCEDES CLASSE V"
                multiline
              />
            </View>

            <View style={styles.rowInputs}>
              <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.inputLabel}>{t("driver.priceHT")}</Text>
                <TextInput
                  style={styles.input}
                  value={item.priceHT}
                  onChangeText={(value) => updateItem(item.id, "priceHT", value)}
                  placeholder="ex: 5000"
                  keyboardType="numeric"
                />
              </View>

              <View style={[styles.inputContainer, { flex: 1 }]}>
                <Text style={styles.inputLabel}>{t("driver.priceTTC")}</Text>
                <TextInput
                  style={styles.input}
                  value={item.priceTTC}
                  onChangeText={(value) => updateItem(item.id, "priceTTC", value)}
                  placeholder="ex: 6000"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("driver.summary")}</Text>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>{t("driver.totalHT")}</Text>
            <Text style={styles.summaryValue}>{totalHT.toFixed(2)} MAD</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>{t("driver.tva")} (20%)</Text>
            <Text style={styles.summaryValue}>{tva.toFixed(2)} MAD</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>{t("driver.totalTTC")}</Text>
            <Text style={styles.totalValue}>{totalTTC.toFixed(2)} MAD</Text>
          </View>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={[styles.actionButton, styles.calculateButton]} onPress={() => calculateTotals()}>
          <Calculator size={20} color="#fff" />
          <Text style={styles.actionButtonText}>{t("driver.calculate")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.generateButton]}
          onPress={generateQuotation}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <FileText size={20} color="#fff" />
              <Text style={styles.actionButtonText}>{t("driver.generate")}</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={shareQuotation}>
          <Share2 size={20} color="#0f766e" />
          <Text style={styles.footerButtonText}>{t("driver.share")}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton}>
          <Download size={20} color="#0f766e" />
          <Text style={styles.footerButtonText}>{t("driver.download")}</Text>
        </TouchableOpacity>
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
  section: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f766e",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 4,
  },
  inputContainer: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
    color: "#1f2937",
  },
  rowInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1f2937",
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
    color: "#4b5563",
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
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  calculateButton: {
    backgroundColor: "#6b7280",
  },
  generateButton: {
    backgroundColor: "#0f766e",
  },
  actionButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    marginTop: 8,
    marginBottom: 24,
  },
  footerButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerButtonText: {
    color: "#0f766e",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
})

export default QuotationScreen
