import { NavLink } from "react-router-dom";
import styles from "./AuthNav.module.css";

export default function AuthNav() {
	return (
		<>
			<ul className={styles.AuthNav__list}>
				<li className={styles.AuthNav__item}>
					<NavLink
						to="/register"
						className={({ isActive }) =>
							isActive ? styles.AuthNav__activeLink : styles.AuthNav__link
						}
					>
						Registration
					</NavLink>
				</li>
				<li className={styles.AuthNav__item}>
					<NavLink
						to="/login"
						className={({ isActive }) =>
							isActive ? styles.AuthNav__activeLink : styles.AuthNav__link
						}
					>
						Login
					</NavLink>
				</li>
			</ul>
		</>
	);
}
