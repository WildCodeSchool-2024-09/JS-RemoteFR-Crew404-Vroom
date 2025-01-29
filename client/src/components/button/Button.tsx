import { Link } from "react-router-dom";
import styles from "./Button.module.css";
function Button() {
  return (
    <div>
      <Link to="/maps" className={styles.Button}>
        GOOOOO !!!!!
      </Link>
    </div>
  );
}

export default Button;
