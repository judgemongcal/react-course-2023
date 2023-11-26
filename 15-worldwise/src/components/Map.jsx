import { useNavigate, useSearchParams } from "react-router-dom";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMap,
	useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { useURLPosition } from "../hooks/useURLPosition";
import Button from "./Button";

function Map() {
	const { cities } = useCities();
	const [mapPosition, setMapPosition] = useState([40, 0]);

	const {
		isLoading: isLoadingPosition,
		position: geolocationPostion,
		getPosition: getGeolocationPosition,
	} = useGeolocation();

	const [mapLat, mapLng] = useURLPosition();

	useEffect(
		function () {
			if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
		},
		[mapLat, mapLng],
	);

	useEffect(
		function () {
			if (geolocationPostion)
				setMapPosition([geolocationPostion.lat, geolocationPostion.lng]);
		},
		[geolocationPostion],
	);
	return (
		<div className={styles.mapContainer}>
			{!geolocationPostion && (
				<Button type="position" onClick={getGeolocationPosition}>
					{isLoadingPosition ? "Loading..." : "Use your position."}
				</Button>
			)}
			<MapContainer
				center={mapPosition}
				zoom={8}
				scrollWheelZoom={true}
				className={styles.map}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>
				{cities.map((city) => (
					<Marker
						position={[city.position.lat, city.position.lng]}
						key={city.id}
					>
						<Popup>
							<span>{city.emoji}</span>
							<span>{city.cityName}</span>
						</Popup>
					</Marker>
				))}
				<DetectClick />
				<ChangeCenter position={mapPosition} />
			</MapContainer>
		</div>
	);
}

function ChangeCenter({ position }) {
	const map = useMap();
	map.setView(position);
	return null;
}

function DetectClick() {
	const navigate = useNavigate();
	useMapEvents({
		click: (e) => {
			navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
		},
	});
}

export default Map;
