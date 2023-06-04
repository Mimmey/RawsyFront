import {Layout} from "../../components/Layout/Layout";
import styles from './style.module.css';
import {Button} from "../../components/ui/Button/Button";
import {PaginationList} from "../../components/ui/PaginationList/PaginationList";
import {useSelector} from "react-redux";


const Track = () => {
    return (<div className={styles.trackWrapper}>
        <p className={styles.rate}>4.5</p>
        <div className={styles.trackInfo}>
            <p className={styles.trackName}>TrackName</p>
            <p className={styles.trackAuthor}>AuthorNickname</p>
        </div>
        <Button>Загрузить</Button>
    </div>)
}

const User = () => {
    return (<div className={styles.userWrapper}>
        <img src="" className={styles.avatar} alt=""/>
        <p className={styles.userName}>Name</p>
        <Button type="secondary">Отписаться</Button>
    </div>)
}

export const Profile = () => {
    const user = useSelector(state => state.user);


    return <Layout>
        <main className="container">
            <div className={styles.infoWrapper}>
                <div className={styles.mainInfo}>
                    <div className={styles.avatarWrapper}>
                        <img src="" alt=""/>
                    </div>
                    <div className={styles.infoCard}>
                        <div className={styles.backCard}/>
                        <div className={styles.infoCardHeader}>
                            <p className={styles.nickname}>{ user.nickname }</p>
                            <div className={styles.playBtn}>
                                <svg width="36" height="42" viewBox="0 0 36 42" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M35 19.268C36.3333 20.0378 36.3333 21.9622 35 22.732L3.5 40.9186C2.16667 41.6884 0.5 40.7261 0.5 39.1865L0.5 2.81347C0.5 1.27387 2.16667 0.311615 3.5 1.08142L35 19.268Z"
                                        fill="white"/>
                                </svg>
                            </div>
                        </div>
                        <p className={styles.description}>{ user.about }</p>
                        <div className={styles.infoCardFooter}>
                            <Button>Редактировать</Button>
                            <div className={styles.links}>
                                {user.mediaLinks.map(({content}, idx) => (
                                    <a key={idx} href={content}>{content}</a>))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.stats}>
                    <p>Треков опубликовано: 0 </p>
                    <p>Продаж: {user.tracksPurchasedByOtherUsersCount} </p>
                    <p>Добавили в избранное: {user.tracksInOtherUsersFavouritesCount}</p>
                </div>
            </div>
            <div className={styles.listsWrapper}>
                <div className={styles.listWrapper}>
                    <div className={styles.toggle}></div>
                    <PaginationList>
                        {
                            [].map((_, idx) => <Track key={idx} />)
                        }
                    </PaginationList>
                </div>
                <div className={styles.listWrapper}>
                    <div className={styles.toggle}></div>
                    <PaginationList>
                        {
                            [].map((_, idx) => <User key={idx} />)
                        }
                    </PaginationList>
                </div>
            </div>

        </main>
    </Layout>
}