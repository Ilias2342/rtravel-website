// Type definitions for Google Tag Manager
interface Window {
  dataLayer: any[]
  gtag: (...args: any[]) => void
}

// Type definitions for Google Analytics gtag
declare function gtag(...args: any[]): void
