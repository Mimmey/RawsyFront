import {Layout} from "../../components/Layout/Layout";
import {PaginationList} from "../../components/ui/PaginationList/PaginationList";
import styles from './style.module.css';
import {PlayerCard} from "../../components/ui/PlayerCard/PlayerCard";


export const News = () => {
    return (<Layout>
        <main className="container">
            <PaginationList>
                <h2 className={styles.heading}>Лучшее за неделю</h2>
                <div className={styles.wrapper}>
                    <PlayerCard />
                    <PlayerCard />
                    <PlayerCard />
                </div>
            </PaginationList>
            <PaginationList>
                <h2 className={styles.heading}>Новое за неделю</h2>
                <div className={styles.wrapper}>
                    <PlayerCard />
                    <PlayerCard />
                    <PlayerCard />
                </div>
            </PaginationList>
        </main>
    </Layout>)
}