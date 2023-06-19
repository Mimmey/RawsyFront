import styles from './style.module.css';
import {Button} from "../Button/Button";


export const PlayerCard = () => {

    return (<div className={styles.wrapper}>
        <div className={styles.head}>
            <div className={styles.play}>
                <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M20 10.268C21.3333 11.0378 21.3333 12.9623 20 13.7321L3.5 23.2583C2.16667 24.0281 0.5 23.0659 0.5 21.5263L0.5 2.47372C0.5 0.934118 2.16667 -0.0281308 3.5 0.74167L20 10.268Z"
                        fill="white"/>
                </svg>
            </div>
            <div className={styles.titles}>
                <p className={styles.name}><span>TrackName</span>  <span className={styles.rating}>4.5</span></p>
                <p className={styles.author}>Brutality Will Prevail</p>
            </div>
        </div>
        <div className={styles.progres}> <span></span></div>
       <div className={styles.footer}>
           <div className={styles.price}>
               2000₽
           </div>
           <div className={styles.buttons}>
               <Button>В корзину</Button>
               <Button>Купить сейчас</Button>
           </div>
       </div>
    </div>)
}