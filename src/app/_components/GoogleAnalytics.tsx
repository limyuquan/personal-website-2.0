'use client';

import Script from 'next/script';

interface GoogleAnalyticsProps {
  gtag: string;
}

export function GoogleAnalytics({ gtag }: GoogleAnalyticsProps) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);} 
            gtag('js', new Date());
            gtag('config', '${gtag}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
        }}
      />
    </>
  );
}

// Type definitions for Google Analytics
interface GtagEventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  custom_parameter?: string;
  [key: string]: string | number | boolean | undefined;
}

interface GtagConfigParams {
  page_title?: string;
  page_location?: string;
  page_path?: string;
  custom_map?: Record<string, string>;
  [key: string]: string | number | boolean | Record<string, string> | undefined;
}

// Optional: Create a hook for tracking events
export function useGoogleAnalytics() {
  const trackEvent = (eventName: string, parameters?: GtagEventParams) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, parameters);
    }
  };

  return { trackEvent };
}

// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: GtagConfigParams
    ) => void;
  }
} 