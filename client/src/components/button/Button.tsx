import { Link } from "react-router-dom";
import styles from "./Button.module.css";
function Button() {
  return (
    <Link to="/maps" className={styles.Button}>
      GOOOOO !!!!!
    </Link>
  );
}

export default Button;
