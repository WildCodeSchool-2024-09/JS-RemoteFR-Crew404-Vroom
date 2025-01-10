import { Link } from "react-router-dom";
import styles from "./Button.module.css";
function Button() {
  return (
    <Link to="/Maps" className={styles.Button}>
      GOOOOO !!!!!
    </Link>
  );
}

export default Button;