import axios from "axios";
import Link from "next/link";
import { server } from "../config";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.scss";
export default function Home({ pokeList: { results } }) {
	const router = useRouter();
	const { page } = router.query;

	return (
		<>
			<h1>Pokemon List</h1>
			<Link href="/pokedex">
				<label className={styles.goToList}>My Pokemon List</label>
			</Link>
			<div className={styles.pokeContainer}>
				{results.map((val) => (
					<Link href={`/details/${val.url.split("/")[6]}`}>
						<div className={styles.pokemon}>
							<div className={styles.imgContainer}>
								<img
									src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
										val.url.split("/")[6]
									}.svg`}
									className={styles.img}
								/>
							</div>
							<div className={styles.info}>
								<span className={styles.number}>#{val.url.split("/")[6]}</span>
								<span className={styles.name}>{val.name}</span>
							</div>
						</div>
					</Link>
				))}
			</div>
			<button
				onClick={() => {
					!page
						? router.push("/?page=1")
						: router.push(`/?page=${parseInt(page) - 1}`);
				}}
				disabled={page == 1}
				className={styles.prevButton}
			>
				<svg
					width="30"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 19l-7-7 7-7"
					></path>
				</svg>
			</button>
			<button
				onClick={() => {
					!page
						? router.push("/?page=2")
						: router.push(`/?page=${parseInt(page) + 1}`);
				}}
				className={styles.nextButton}
			>
				<svg
					width="30"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 5l7 7-7 7"
					></path>
				</svg>
			</button>
		</>
	);
}

export const getServerSideProps = async ({ query }) => {
	let page = query.page || 1;

	let pokeList = null;
	try {
		const res = await axios.get(
			`${server}/pokemon?offset=${(page - 1) * 20}&limit=20`
		);
		if (res.status !== 200) {
			throw new Error("Failed to fetch");
		}
		pokeList = res.data;
	} catch (err) {
		pokeList = { error: { message: err.message } };
	}
	return { props: { pokeList } };
};
