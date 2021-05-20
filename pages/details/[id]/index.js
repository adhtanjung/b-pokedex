import axios from "axios";
import { server } from "../../../config";
import { useEffect, useState } from "react";
import styles from "../../../styles/Detail.module.scss";
import getPokemonGenderStats from "../../../utils/getPokemonGenderStats";
import convertValues from "../../../utils/covertValues";
import About from "../../../components/About";
import BaseStats from "../../../components/BaseStats";
import Header from "../../../components/Header";
import { useRouter } from "next/router";
import Meta from "../../../components/Meta";

const colors = {
	fire: "#FB6C69",
	grass: "#47D0B0",
	electric: "#FFD86D",
	water: "#77BCFD",
	ground: "#f4e7da",
	rock: "#d5d5d4",
	fairy: "#fceaff",
	poison: "#98d7a5",
	bug: "#f8d5a3",
	dragon: "#97b3e6",
	psychic: "#eaeda1",
	flying: "#F5F5F5",
	fighting: "#E6E0D4",
	normal: "#F5F5F5",
};

const header = ["About", "Base Stats", "Evolution", "Moves"];

function Details({ details, species }) {
	const router = useRouter();
	console.log(details.name.charAt(0).toUpperCase() + details.name.slice(1));
	const [selected, setSelected] = useState("About");
	const pokemonGenderRate = getPokemonGenderStats(species.gender_rate);
	const objDetail = {
		heightInMeters: convertValues.decimeterToMeter(details.height),
		heightInFeet: convertValues.decimeterToFeet(details.height),
		weightInKilograms: convertValues.hectogramsToKilograms(details.weight),
		weightInPounds: convertValues.hectogramsToPounds(details.weight),
	};
	const handleRenderDetails = (selected) => {
		if (selected === "About") {
			return (
				<About
					details={details}
					objDetail={objDetail}
					pokemonGenderRate={pokemonGenderRate}
					species={species}
					selected={selected}
				/>
			);
		} else if (selected === "Base Stats") {
			return <BaseStats stats={details.stats} />;
		}
	};
	console.log(species);
	return (
		<>
			<Meta title={details.name} keywords={details.name} />
			<div
				style={{ display: "flex", flexDirection: "column" }}
				className={styles.container}
			>
				<div
					className={styles.pokeCard}
					style={{ backgroundColor: colors[details.types[0].type.name] }}
				>
					<Header pokemon={details} id={details.id} />
					<div className={styles.pokemonName}>
						{details.name.charAt(0).toUpperCase() + details.name.slice(1)}
					</div>
					<div className={styles.underHeader}>
						<div className={styles.typesContainer}>
							{details.types.map((x) => (
								<div className={styles.typeName} key={x.type.url}>
									{x.type.name.charAt(0).toUpperCase() + x.type.name.slice(1)}
								</div>
							))}
						</div>
						<span>#{details.id}</span>
					</div>
				</div>
				<div className={styles.bottomCard}>
					<img
						src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${details.id}.svg`}
						className={styles.cardImagePokemon}
					/>{" "}
					<div className={styles.bottomHeader}>
						{header.map((val, i) => (
							<span
								key={i}
								className={
									selected == val
										? styles.headerDetailSelected
										: styles.headerDetail
								}
								onClick={() => setSelected(val)}
							>
								{val}
							</span>
						))}
					</div>
					{handleRenderDetails(selected)}
					{/* {innerDetails()} */}
				</div>
			</div>
		</>
	);
}

// export const getStaticProps = async (context) => {
// 	const res = await axios.get(`${server}pokemon/${context.params.id}`);
// 	const resSpecies = await axios.get(
// 		`${server}pokemon-species/${context.params.id}`
// 	);
// 	return {
// 		props: {
// 			details: res.data,
// 			species: resSpecies.data,
// 		},
// 	};
// };

// export const getStaticPaths = async () => {
// 	const res = await axios.get(`${server}pokemon?limit=1118`);
// 	const ids = res.data.results.map((details) => details.url);
// 	const paths = ids.map((id) => ({
// 		params: { id: id.split("/")[6] },
// 	}));
// 	return {
// 		paths,
// 		fallback: false,
// 	};
// };

export async function getServerSideProps(context) {
	const res = await axios.get(`${server}pokemon/${context.params.id}`);
	const resSpecies = await axios.get(
		`${server}pokemon-species/${context.params.id}`
	);
	return {
		props: {
			details: res.data,
			species: resSpecies.data,
		},
	};
}

export default Details;
