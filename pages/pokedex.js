import styles from "../styles/Pokedex.module.scss";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

const colors = {
	fire: "#FB6C69",
	grass: "#3EC6A8",
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
function pokedex() {
	const dispatch = useDispatch();
	const router = useRouter();

	const { collectedPoke } = useSelector((state) => state.userPoke);
	console.log(collectedPoke);

	const renderPokemons = () => {
		return collectedPoke.map((poke) => {
			return (
				<button
					onClick={() => router.push(`/details/${poke.id}`)}
					className={styles.cardPoke}
					style={{ backgroundColor: colors[poke.types[0].type.name] }}
				>
					<div className={styles.leftCard}>
						<label className={styles.text}>
							{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
						</label>
						{poke.types.map((val) => (
							<label className={styles.typesName}>{val.type.name}</label>
						))}
					</div>

					<img
						src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${poke.id}.svg`}
						alt=""
						className={styles.image}
					/>
				</button>
			);
		});
	};
	return (
		<div className={styles.mainContainer}>
			<h1>My Pokemon List</h1>
			<div className={styles.goBackButton} onClick={() => router.back()}>
				<svg
					fill="none"
					stroke="gray"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					height="25"
				>
					<path
						strokeLineCap="round"
						strokeLineJoin="round"
						strokeWidth="2"
						d="M7 16l-4-4m0 0l4-4m-4 4h18"
					></path>
				</svg>
			</div>
			<div className={styles.pokeContainer}>{renderPokemons()}</div>
		</div>
	);
}
export default pokedex;
