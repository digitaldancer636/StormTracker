import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
    width: "100vw",
    height: "100vh",
    minHeight: "500px", // Ensure it's visible
    minWidth: "500px",
    backgroundColor: "red",
  };

const Map = ({ center, zoom }) => {
  return (
    <div className="map">
        <LoadScript googleMapsApiKey="AIzaSyAgBdG2tOhOv8Z1Ng_Z380K06U7mt9lgtE" >
            <GoogleMap
                mapContainerStyle={containerStyle}
                defaultCenter={ center }
                defaultZoom={ zoom }
            />
        </LoadScript>
    </div>
  )
};

Map.defaultProps={
    center: {
        lat: -104.8216,
        lng: 38.8353
    }, 
    zoom: 6
};

export default Map
