import { Spinner } from "@nextui-org/react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import Loader from "./Loader";

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  // static lat and lng
  const center = { lat: 40.2935, lng: -74.724 };

  if (!isLoaded) return <Loader className={"h-full"}/>

  return (
    <GoogleMap
      zoom={18}
      center={center}
      mapContainerClassName="map"
      mapContainerStyle={{ width: "100%", height: "75%", margin: "auto" }}
    />

  );
};

export default Map;