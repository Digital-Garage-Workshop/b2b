"use client";
import React, { useState, useCallback, ReactNode, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { VStack } from "@chakra-ui/react";
import { secondary } from "@/theme/colors";

const containerStyle = {
  width: "100%",
  height: "534px",
};

const defaultCenter = {
  lat: 40.7128,
  lng: -74.006,
};

const defaultMapOptions: google.maps.MapOptions = {
  // Disable satellite view button
  mapTypeControl: false,
  // Disable street view (little human)
  streetViewControl: false,
  // Disable routing/directions
  fullscreenControl: false,
  zoomControl: false,
  // You can customize the map style further with styles array
  styles: [
    // Optional: Add custom map styling here
    // This example keeps the map simple with fewer labels and points of interest
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ],
};

// TypeScript interfaces
interface MapProps {
  apiKey: string;
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  markers?: MarkerData[];
  mapOptions?: google.maps.MapOptions;
  showRoadBetween?: [string, string];
  pathOptions?: google.maps.DirectionsRendererOptions;
}

interface MarkerData {
  id: string;
  position: google.maps.LatLngLiteral;
  title?: string;
  content?: string;
  iconUrl?: string | ReactNode | Promise<ReactNode>; // URL to custom marker icon
  iconSize?: google.maps.Size; // Size of the custom marker
}

const GoogleMapComponent: React.FC<MapProps> = ({
  apiKey,
  center = defaultCenter,
  zoom = 15,
  markers = [],
  mapOptions = {},
  showRoadBetween = ["1", "2"], // Default to showing path between first two markers
  pathOptions = {},
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [directionsError, setDirectionsError] = useState<string | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Combine default options with any custom options passed in
  const combinedMapOptions = { ...defaultMapOptions, ...mapOptions };

  // Function to find markers by IDs
  const findMarkerById = useCallback(
    (id: string) => {
      return markers.find((marker) => marker.id === id);
    },
    [markers]
  );

  // Calculate directions between two markers
  useEffect(() => {
    if (!markers || markers.length < 2 || !map) {
      // Reset directions if no valid markers provided
      setDirections(null);
      setDirectionsError(null);
      return;
    }

    const [originId, destinationId] = showRoadBetween;
    const origin = findMarkerById(originId);
    const destination = findMarkerById(destinationId);

    if (!origin || !destination) {
      console.log("Could not find one or both markers for directions");
      setDirectionsError("Invalid marker IDs for directions");
      return;
    }

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: origin.position,
        destination: destination.position,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
          setDirectionsError(null);
        } else {
          console.log(`Directions request failed: ${status}`);
          setDirectionsError(`Could not calculate directions: ${status}`);
        }
      }
    );
  }, [markers, map, findMarkerById, showRoadBetween]);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={combinedMapOptions}
      >
        {/* {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              suppressMarkers: true, // Don't show default A/B markers
              polylineOptions: {
                strokeColor: "#FF5722", // Default orange color for the path
                strokeWeight: 5,
                strokeOpacity: 0.8,
                ...pathOptions?.polylineOptions,
              },
              ...pathOptions,
            }}
          />
        )} */}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            title={marker.title}
            onClick={() => setSelectedMarker(marker)}
            // Use custom marker icon if provided
            icon={"/home/dot.svg"}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            // options={{ headerDisabled: false, headerContent: null }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <h3>{selectedMarker.title}</h3>
              <p>{selectedMarker.content}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
