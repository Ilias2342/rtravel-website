type EventNames =
  | "page_view"
  | "vehicle_view"
  | "reservation_start"
  | "reservation_complete"
  | "contact_form_submit"
  | "language_change"
  | "theme_change"

type EventParams = {
  [key: string]: string | number | boolean | null | undefined
}

// Votre ID de mesure réel
const GA_MEASUREMENT_ID = "G-HPB6Y7Y2SR"

// Helper to ensure gtag is available
const isGtagAvailable = (): boolean => {
  return typeof window !== "undefined" && typeof window.gtag !== "undefined"
}

/**
 * Track a page view
 */
export const pageview = (url: string) => {
  if (!isGtagAvailable()) return

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  })
}

/**
 * Track an event
 */
export const trackEvent = (name: EventNames, params: EventParams = {}) => {
  if (!isGtagAvailable()) return

  window.gtag("event", name, params)
}

/**
 * Common events for convenience
 */
export const analytics = {
  viewVehicle: (vehicleId: string, vehicleName: string) => {
    trackEvent("vehicle_view", { vehicle_id: vehicleId, vehicle_name: vehicleName })
  },

  startReservation: (vehicleId: string) => {
    trackEvent("reservation_start", { vehicle_id: vehicleId })
  },

  completeReservation: (vehicleId: string, date: string) => {
    trackEvent("reservation_complete", {
      vehicle_id: vehicleId,
      reservation_date: date,
    })
  },

  submitContactForm: () => {
    trackEvent("contact_form_submit")
  },

  changeLanguage: (language: string) => {
    trackEvent("language_change", { language })
  },

  changeTheme: (theme: string) => {
    trackEvent("theme_change", { theme })
  },
}
