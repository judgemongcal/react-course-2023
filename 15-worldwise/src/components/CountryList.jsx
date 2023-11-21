/* eslint-disable react/prop-types */
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
import Spinner from "./Spinner";

function CityList({ cities, isLoading }) {
	if (isLoading) return <Spinner />;

	if (!cities.length)
		return (
			<Message
				message={"Add your first city by clicking on a city on the map!"}
			/>
		);

	const countries = cities.reduce((arr, city) => {
		if (!arr.map((el) => el.country).includes(city.country)) {
			return [...arr, { country: city.country, emoji: city.emoji }];
		} else {
			return arr;
		}
	}, []);

	return (
		<ul className={styles.countryList}>
			{countries.map((country, index) => (
				<CountryItem country={country} key={index} />
			))}
		</ul>
	);
}

export default CityList;
