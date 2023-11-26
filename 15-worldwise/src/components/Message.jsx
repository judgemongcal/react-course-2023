/* eslint-disable react/prop-types */
import styles from "./Message.module.css";

function Message({ children }) {
	return <p className={styles.message}>{children}</p>;
}

export default Message;
