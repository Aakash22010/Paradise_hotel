import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const HotelMap = ({ hotels }) => {
  const defaultPos = hotels.length ? [hotels[0].latitude, hotels[0].longitude] : [12.56, 101.46];

  return (
    <MapContainer center={defaultPos} zoom={6} className="h-[500px] w-full rounded mt-8">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {hotels.map(hotel => (
        <Marker key={hotel.hotel_id} position={[hotel.latitude, hotel.longitude]}>
          <Popup>
            <strong>{hotel.hotel_name}</strong><br />
            {hotel.city}, {hotel.country}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default HotelMap;
