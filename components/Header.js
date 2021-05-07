import React, { useEffect, useState } from "react";
import styles from "../styles/Detail.module.scss";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { userAddPokemonAction } from "../redux/actions/userPokemonActions";
function Header({ pokemon, id }) {
	const dispatch = useDispatch();
	const router = useRouter();
	const [added, setAdded] = useState(false);
	const userPoke = useSelector((state) => state.userPoke);
	useEffect(() => {
		const checkAdded = (id) => {
			const isAdded = userPoke.collectedPoke.findIndex((val) => {
				return val.id === id;
			});
			console.log(isAdded);
			if (isAdded >= 0) {
				setAdded(true);
			}
		};
		checkAdded(id);
	}, [dispatch, userPoke.collectedPoke]);
	const handleAdd = (pokemon, id) => {
		if (added) {
			const filtered = userPoke.collectedPoke.filter((val) => {
				return val.id !== id;
			});
			dispatch(userAddPokemonAction(filtered, true));
			setAdded(false);
		} else {
			dispatch(userAddPokemonAction(pokemon, false));
			setAdded(true);
		}
	};
	console.log(added);
	return (
		<div className={styles.header}>
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
			<div className={styles.loveButton} onClick={() => handleAdd(pokemon, id)}>
				<svg
					height="25"
					fill={added ? "gray" : "none"}
					stroke="gray"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						strokeLineCap="round"
						strokeLineJoin="round"
						strokeWidth="2"
						d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
					></path>
				</svg>
			</div>
		</div>
	);
}

export default Header;
