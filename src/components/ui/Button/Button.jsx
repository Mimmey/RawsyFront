
import styles from './style.module.css';
import classNames from "classnames";

export const Button = ({ children, type }) => {
    return <button className={classNames(styles.button, {
        [styles.secondary]: type === 'secondary'
    })}>{ children }</button>
}