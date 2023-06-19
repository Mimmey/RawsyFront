import {Layout} from "../../components/Layout/Layout";
import styles from './style.module.css';
import {Button} from "../../components/ui/Button/Button";
import {PaginationList} from "../../components/ui/PaginationList/PaginationList";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchPublishedTracks, fetchSubscribersUser, fetchSubscriptionsUser} from "../../store/user.slice";
import {Link} from "react-router-dom";
import classNames from "classnames";
import fetcher from "../../api/fetcher";


const Track = ({track, user}) => {
    const isOwner = user.id === track.authorId;

    return (<div className={styles.trackWrapper}>
        <p className={styles.rate}>{track.rating}</p>
        <div className={styles.trackInfo}>
            <Link to={`/track/${track.id}`}><p className={styles.trackName}>{track.name}</p></Link>
            <p className={styles.trackAuthor}>{isOwner ? user.nickname : "AuthorNickname"}</p>
        </div>
        {isOwner ?
            <Link to={`/track/update/${track.id}`}><Button>Редактировать</Button></Link> :
            <Button>Загрузить</Button>
        }
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
    const dispatch = useDispatch();
    const [showTrackId, setShowTrackId] = useState('publish');
    const showTracks = user[showTrackId === 'publish' ? 'publishedTracks' : showTrackId === 'favorite' ? 'favoriteTracks' : 'buyTracks'];
    const [usersMod, setUsersMod] = useState('subscriptions');
    const showUsers = user[usersMod === 'subscriptions' ? 'subscriptions' : 'subscribers']

    useEffect(() => {
        dispatch(fetchPublishedTracks())
        dispatch(fetchSubscriptionsUser())
        dispatch(fetchSubscribersUser())

    }, [dispatch])

    console.log(user)

    return <Layout>
        <main className="container">
            <div className={styles.infoWrapper}>
                <div className={styles.mainInfo}>
                    <div className={styles.avatarWrapper}>
                        <img src={user.avatar} alt=""/>
                    </div>
                    <div className={styles.infoCard}>
                        <div className={styles.backCard}/>
                        <div className={styles.infoCardHeader}>
                            <p className={styles.nickname}>{user.nickname}</p>
                            <div className={styles.playBtn}>
                                <svg width="36" height="42" viewBox="0 0 36 42" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M35 19.268C36.3333 20.0378 36.3333 21.9622 35 22.732L3.5 40.9186C2.16667 41.6884 0.5 40.7261 0.5 39.1865L0.5 2.81347C0.5 1.27387 2.16667 0.311615 3.5 1.08142L35 19.268Z"
                                        fill="white"/>
                                </svg>
                            </div>
                        </div>
                        <p className={styles.description}>{user.about}</p>
                        <div className={styles.infoCardFooter}>
                            <Link to="/profile/change">
                                <Button>Редактировать</Button>
                            </Link>
                            <div className={styles.links}>
                                {user.mediaLinks.map(({content}, idx) => (
                                    <a key={idx} href={content}>{content}</a>))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.stats}>
                    <p>Треков опубликовано: {user.publishedTracks.list.length} </p>
                    <p>Продаж: {user.tracksPurchasedByOtherUsersCount} </p>
                    <p>Добавили в избранное: {user.tracksInOtherUsersFavouritesCount}</p>
                </div>
            </div>
            <div className={styles.listsWrapper}>
                <div className={styles.listWrapper}>
                    <div className={styles.toggleWrapper}>
                        <div onClick={() => setShowTrackId('publish')}
                             className={classNames({[styles.active]: showTrackId === 'publish'})}>Опубликованные
                        </div>
                        <div onClick={() => setShowTrackId('favorite')}
                             className={classNames({[styles.active]: showTrackId === 'favorite'})}>Избранные
                        </div>
                        <div onClick={() => setShowTrackId('buy')}
                             className={classNames({[styles.active]: showTrackId === 'buy'})}>Приобретенные
                        </div>
                    </div>
                    <PaginationList>
                        {
                            showTracks.isLoading ?
                                <p>Track Loading...</p> :
                                showTracks.list.length ?
                                    showTracks.list.map((track, idx) => <Track user={user} track={track} key={idx}/>) :
                                    <p style={{marginTop: '20px'}} className={styles.notFound}>Track not found</p>
                        }
                    </PaginationList>
                </div>
                <div className={styles.listWrapper}>
                    <div className={styles.toggleWrapper}>
                        <div onClick={() => setUsersMod('subscriptions')}
                             className={classNames({[styles.active]: usersMod === 'subscriptions'})}>Подписки
                        </div>
                        <div onClick={() => setUsersMod('subscribers')}
                             className={classNames({[styles.active]: usersMod === 'subscribers'})}>Подписчики
                        </div>
                    </div>
                    <PaginationList>
                        {
                            showUsers.isLoading ?
                                <p>Users loading...</p> :
                                user.subscriptions.list.length ?
                                    user.subscriptions.list.map((_, idx) => <User key={idx}/>) :
                                    <p style={{marginTop: '20px'}} className={styles.notFound}>{usersMod} not found</p>
                        }
                    </PaginationList>
                </div>
            </div>

        </main>
    </Layout>
}