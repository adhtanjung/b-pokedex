const EIGHTS = 8;

const getPokemonGenderStats = (gender_rate) => {
	if (gender_rate === -1) {
		return [
			{
				gender: "genderless",
			},
		];
	}
	const femalePerncentage = (gender_rate / EIGHTS) * 100;

	const malePercentage = 100 - femalePerncentage;

	return [
		{ gender: "male", rate: malePercentage },
		{
			gender: "female",
			rate: femalePerncentage,
		},
	];
};
export default getPokemonGenderStats;
