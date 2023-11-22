import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
	const [searchParams, setSearchParams] = useSearchParams();
	const lat = searchParams.get("lat");
	const lng = searchParams.get("lng");
	return (
		<div className={styles.mapContainer}>
			<h1>MAP</h1>
			<h2>LAT: {lat}</h2>
			<h2>LNG: {lng}</h2>
			<button
				onClick={() => {
					setSearchParams({ lat: 23, lng: 50 });
				}}
			>
				Change Position
			</button>
		</div>
	);
}

export default Map;
