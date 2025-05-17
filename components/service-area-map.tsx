"use client"

import { useEffect, useRef, useState } from "react"
import { locations } from "@/data/locations"
import { Card } from "@/components/ui/card"

export function ServiceAreaMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    // Load Google Maps API script
    const loadGoogleMapsAPI = () => {
      const existingScript = document.getElementById("google-maps-api")
      if (!existingScript) {
        const script = document.createElement("script")
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`
        script.id = "google-maps-api"
        script.async = true
        script.defer = true
        script.onload = () => initMap()
        document.body.appendChild(script)
      } else {
        initMap()
      }
    }

    // Initialize the map
    const initMap = () => {
      if (!mapRef.current || !window.google) return

      // Center the map on Morocco
      const mapOptions = {
        center: { lat: 31.7917, lng: -7.0926 }, // Center of Morocco
        zoom: 6,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: "administrative",
            elementType: "geometry",
            stylers: [{ visibility: "simplified" }],
          },
          {
            featureType: "poi",
            stylers: [{ visibility: "simplified" }],
          },
        ],
      }

      const map = new window.google.maps.Map(mapRef.current, mapOptions)

      // Add markers for each location
      locations.forEach((location) => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.coordinates.lat, lng: location.coordinates.lng },
          map,
          title: location.name,
          animation: window.google.maps.Animation.DROP,
          icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          },
        })

        // Add info window for each marker
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; max-width: 200px;">
              <h3 style="margin: 0 0 8px; font-weight: bold;">${location.name}</h3>
              <p style="margin: 0 0 8px; font-size: 14px;">${location.services.join(", ")}</p>
              <a href="/locations/${location.id}" style="color: #2563eb; font-size: 14px;">Voir les détails</a>
            </div>
          `,
        })

        marker.addListener("click", () => {
          infoWindow.open(map, marker)
        })
      })

      setMapLoaded(true)
    }

    loadGoogleMapsAPI()

    return () => {
      // Clean up if needed
    }
  }, [])

  return (
    <Card className="w-full overflow-hidden rounded-lg border shadow-md">
      <div
        ref={mapRef}
        className="w-full h-[500px] bg-muted"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!mapLoaded && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Chargement de la carte...</p>
          </div>
        )}
      </div>
    </Card>
  )
}
