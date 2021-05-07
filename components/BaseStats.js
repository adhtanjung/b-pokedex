import React from "react";
import styles from "../styles/Detail.module.scss";

function BaseStats({ stats }) {
	return (
		<div style={{ padding: "10px" }}>
			{stats.map((value) => (
				<div className={styles.stat}>
					<span>{value.stat.name}</span>
					<div className={styles.statGraph}>
						<span>{value.base_stat}</span>
						<div className={styles.statLine}>
							<div
								className={styles.statValue}
								style={{
									backgroundColor: value.base_stat < 50 ? "red" : "green",
									width: `${value.base_stat}%`,
								}}
							>
								&nbsp;
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default BaseStats;
