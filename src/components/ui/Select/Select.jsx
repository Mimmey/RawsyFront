import styles from './style.module.css';
import classNames from "classnames";
import {useState} from "react";

export const Select = (
    {
        options,
        value,
        placeholder,
        handleChange
    }
) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        if (isOpen) return;
        setIsOpen(true)
        requestIdleCallback(() => {
            window.addEventListener('click', () => {
                setIsOpen(false)
            }, { once: true })
        })
    }

    return (<div className={classNames(styles.select, {[styles.open]: isOpen})} onClick={handleClick}>
        <p>{ options.find(o => o.value === value)?.title || placeholder }</p>
        <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.8" d="M1 1L6 6L11 1" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className={styles.dropdown}>
            {
                options.map(({value, title}) => (<div key={value} onClick={() => handleChange(value)}>
                    { title }
                </div>))
            }
        </div>
    </div>)
}