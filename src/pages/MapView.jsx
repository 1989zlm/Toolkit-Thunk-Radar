import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { icon } from "leaflet";
import { clearPath } from "../redux/slices/flightSlice";

const MapView = ({ setDetailId }) => {
  //!stora abone olduk ama consolda root diye bi hata verdi o yuzden store un hepsine değil sadece istediğimiz bilgiye abone olduk. // const veri = useSelector((store) => store);
  const flightState = useSelector((store) => store.flightReducer);

  const dispatch = useDispatch();

  // console.log("mapviewdan", flightState.path); //uçak izi

  // console.log(flightState);
  const planceIcon = icon({
    iconUrl: "/plane-icon.png",
    iconSize: [30, 30],
  });
  return (
    <MapContainer
      center={[38.948771, 35.425597]}
      zoom={6}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/*uçuş verisi kadar ekrana imleç bas  */}
      {flightState.flights.map((flight) => (
        //uçuşların enlam ve boylamını aktifleştirdik.
        <Marker
          icon={planceIcon}
          key={flight.id}
          position={[flight.lat, flight.lng]}
        >
          <Popup>
            <div className="d-flex flex-column gap-2">
              <span>Kod:{flight.code}</span>
              <button
                onClick={() => setDetailId(flight.id)}
                className="w-100 bg-black text-white"
              >
                Detay
              </button>
              {/*ekranda rota varsa temizle butonu koy  */}
              {flightState.path.length > 0 && (
                <button onClick={() => dispatch(clearPath())}>
                  Rotayı Temizle
                </button>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
      {/* uçağın rotasına ait izi bas */}
      <Polyline positions={flightState?.path} />
    </MapContainer>
  );
};

export default MapView;
