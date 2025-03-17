import { useEffect, useRef, useState } from "react";

const SimpleMap = () => {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (document.querySelector("script[src*='maps.googleapis.com']")) {
        setMapLoaded(true);
        return;
      }

      const apiKey = process.env.GOOGLE_MAPS_API_KEY;
      if (!apiKey) {
        console.log("🔑 Google Maps API Key:", process.env.GOOGLE_MAPS_API_KEY);
        console.error("❌ Google Maps API key is missing! Check your .env file.");
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&v=weekly`;
      script.async = true;
      script.defer = true;
      script.onload = () => setMapLoaded(true);
      script.onerror = () => console.error("❌ Failed to load Google Maps API");
      document.body.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

  useEffect(() => {
    if (mapLoaded && window.google && window.google.maps && mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 40.7128, lng: -74.006 },
        zoom: 10,
      });
      console.log("✅ Map Initialized:", map);
    }
  }, [mapLoaded]);

  return <div ref={mapRef} style={{ width: "100vw", height: "100vh", backgroundColor: "red" }} />;
};

export default SimpleMap;
