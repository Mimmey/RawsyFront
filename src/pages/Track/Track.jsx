import styles from './style.module.css'
import {Layout} from "../../components/Layout/Layout";
import {Button} from "../../components/ui/Button/Button";
import {PaginationList} from "../../components/ui/PaginationList/PaginationList";


const TrackPlayer = () => {

    return (<div className={styles.player}>
        <div className={styles.playBtn}>
            <svg width="60" height="60" viewBox="0 0 36 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M35 19.268C36.3333 20.0378 36.3333 21.9622 35 22.732L3.5 40.9186C2.16667 41.6884 0.5 40.7261 0.5 39.1865L0.5 2.81347C0.5 1.27387 2.16667 0.311615 3.5 1.08142L35 19.268Z"
                    fill="white"/>
            </svg>
        </div>
        <div className={styles.trackInfo}>
            <p className={styles.name}>TrackName</p>
            <p className={styles.author}>Brutality Will Prevail</p>
        </div>
        <p className={styles.rate}>4.5</p>
    </div>)
}

export const Track = () => {
    return (<Layout>
        <main className="container">
            <div className={styles.trackWrapper}>
                <div className={styles.trackBack}></div>
                <div className={styles.track}>
                    <TrackPlayer/>
                    <div className={styles.trackDecriptions}>
                        <div className={styles.trackDescWrapper}>
                            {`
                            Тип: сырой
                            Жанры: рок, метал
                            Настроения: яркое, живое, 
                            динамичное
                            Наличие вокала: нет
                            Зацикленность: нет
                            BPM: 150
                            Длительность: 2:30

                            `}
                        </div>
                        <div className={styles.trackDescWrapper}>
                            Описание: очень хороший трек
                        </div>
                        <div className={styles.trackActions}>
                            <Button>Редактировать</Button>
                            <Button type="secondary">Удалить</Button>
                        </div>
                    </div>
                </div>
                <svg className={styles.favoriteIcon} width="44" height="38" viewBox="0 0 44 38" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M22 36.1875C22 36.1875 1.6875 25.25 1.6875 12.3594C1.6875 9.56217 2.79869 6.87953 4.77661 4.90161C6.75453 2.92369 9.43717 1.8125 12.2344 1.8125C16.6465 1.8125 20.4258 4.2168 22 8.0625C23.5742 4.2168 27.3535 1.8125 31.7656 1.8125C34.5628 1.8125 37.2455 2.92369 39.2234 4.90161C41.2013 6.87953 42.3125 9.56217 42.3125 12.3594C42.3125 25.25 22 36.1875 22 36.1875Z"
                        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <div className={styles.comments}>
                <PaginationList>
                    <div className={styles.commentWrapper}>
                        <div className={styles.commentHeader}>
                            <img src="" className={styles.commentAvatar} alt=""/>
                            <p className={styles.commentName}>The Commentator</p>
                            <div className={styles.stars}>
                                {
                                    [1, 2, 3, 4, 5].map((_, idx) => (<svg
                                        width="43"
                                        height="41"
                                        key={idx}
                                        viewBox="0 0 43 41"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M21.5 0L26.5516 15.5471H42.8988L29.6736 25.1558L34.7252 40.7029L21.5 31.0942L8.27483 40.7029L13.3264 25.1558L0.101229 15.5471H16.4484L21.5 0Z"
                                            fill="#FFC737"/>
                                    </svg>))
                                }
                            </div>
                        </div>
                        <p className={styles.commentText}>Трек очень хорош</p>
                    </div>
                </PaginationList>
            </div>
        </main>
    </Layout>)
}