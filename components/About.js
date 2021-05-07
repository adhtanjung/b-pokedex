import React from "react";
import styles from "../styles/Detail.module.scss";
function About({ details, objDetail, species, pokemonGenderRate, selected }) {
	return (
		<div>
			<table className={styles.detailTable}>
				<tr>
					<td>Species:</td>
					<td>{details.species.name}</td>
				</tr>
				<tr>
					<td>Height:</td>
					<td>
						{objDetail.heightInMeters}m ({objDetail.heightInFeet}ft)
					</td>
				</tr>
				<tr>
					<td>Weight:</td>
					<td>
						{objDetail.weightInKilograms}kg ({objDetail.weightInPounds}lbs)
					</td>
				</tr>
				<tr>
					<td>Abilities:</td>
					<td>
						{details.abilities.length > 1
							? details.abilities.map((x) => `${x.ability.name}, `)
							: details.abilities.map((z) => z.ability.name)}
					</td>
				</tr>
				<tr>
					<td
						style={{
							fontSize: "16px",
							fontWeight: 600,
							color: "black",
							paddingTop: "10px",
						}}
					>
						Breeding
					</td>
				</tr>
				<tr>
					<td>Gender:</td>
					<td>
						{pokemonGenderRate[0].gender === "genderless"
							? "genderless"
							: `♂${pokemonGenderRate[0].rate} ♀${pokemonGenderRate[1].rate}`}
					</td>
				</tr>
				<tr>
					<td>Egg Groups:</td>
					<td>{species.egg_groups.map((val) => `${val.name}, `)}</td>
				</tr>
			</table>
		</div>
	);
}

export default About;
