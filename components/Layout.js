import React from "react";
import styles from "../styles/Layout.module.scss";

function Layout({ children }) {
	return (
		<div className={styles.layout}>
			<main className={styles.main}> {children}</main>
		</div>
	);
}

export default Layout;
