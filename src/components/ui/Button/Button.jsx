
import styles from './style.module.css';
import classNames from "classnames";

export const Button = ({ children, type, handleclick }) => {
    return <button onClick={handleclick} className={classNames(styles.button, {
        [styles.secondary]: type === 'secondary'
    })}>{ children }</button>
}