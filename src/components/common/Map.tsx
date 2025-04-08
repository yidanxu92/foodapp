import { Spinner } from "@nextui-org/react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import Loader from "./Loader";

const Map = () => {
  const { isLoaded } = useLoadScript({
   // googleMapsApiKey: 'AIzaSyDXD0z7x4TV6fMNyCT6PUJbDTHJzIf_lXE',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  // static lat and lng
  const center = { lat: 40.299, lng: -74.729 };

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