import { useEffect, useRef } from "react";

const SimpleMap = () => {
  const mapRef = useRef(null);

  // Define the global initMap function
  window.initMap = () => {
    if (mapRef.current && window.google && window.google.maps) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 40.7128, lng: -74.0060 },
        zoom: 10,
      });
      console.log("✅ Map Initialized:", map);
    } else {
      console.error("❌ Failed to initialize map. Google Maps is not available.");
    }
  };

  useEffect(() => {
    console.log("Google Maps API Key: ", process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

    // Load Google Maps Script with async and callback
    const loadGoogleMapsScript = () => {
      // Check if the script already exists
      if (document.querySelector("script[src*='maps.googleapis.com']")) {
        return; // No need to reload if it's already loaded
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=weekly&callback=initMap`;
      script.async = true;  // Ensure async loading
      script.defer = true;
      script.onerror = () => console.error("❌ Failed to load Google Maps API");
      document.body.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []); // Empty dependency array ensures this runs only once on mount

  return <div ref={mapRef} style={{ width: "100vw", height: "100vh", backgroundColor: "red" }} />;
};

export default SimpleMap;