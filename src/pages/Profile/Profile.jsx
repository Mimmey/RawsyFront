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
    const [audio, setAudio] = useState(null);
    const [status, setStatus] = useState('pause');
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const onPlay = () => {
            setStatus('play')
        };

        const onPause = () => {
            setStatus('pause')
        }

        const onUpdate = () => {
            setCurrentTime(audio.currentTime)
        }

        audio?.addEventListener('play', onPlay);
        audio?.addEventListener('pause', onPause);
        audio?.addEventListener('timeupdate', onUpdate);
        return () => {
            audio?.removeEventListener('play', onPlay);
            audio?.removeEventListener('pause', onPause);
            audio?.removeEventListener('timeupdate', onUpdate);
        }
    }, [audio])

    useEffect(() => {
        fetch(`/public/tracks/${track.id}/preview`).then(r => r.blob()).then(blob => {
            const audio = document.createElement('audio');
            audio.setAttribute('preload', 'auto');
            audio.src = URL.createObjectURL(new Blob([blob], {type : 'audio/vaw'}));
            setAudio(audio);
        })
    }, [])


    const toggleAudioStatus = () => {
        if (audio.paused) {
            audio.play()
        } else {
            audio.pause()
        }
    }


    return (<div className={styles.trackWrapper}>
       <div className={styles.audioPlay} onClick={toggleAudioStatus}>
           { status === 'play' && <svg className={styles.pause} width="50" height="50" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path fillRule="evenodd" clipRule="evenodd" d="M3.71429 0C1.66294 0 0 1.66294 0 3.71429V22.2857C0 24.3371 1.66294 26 3.71429 26C5.76563 26 7.42857 24.3371 7.42857 22.2857V3.71429C7.42857 1.66294 5.76563 0 3.71429 0ZM22.2856 0C20.2343 0 18.5714 1.66294 18.5714 3.71429V22.2857C18.5714 24.3371 20.2343 26 22.2856 26C24.337 26 25.9999 24.3371 25.9999 22.2857V3.71429C25.9999 1.66294 24.337 0 22.2856 0Z" fill="white"/>
           </svg>
           }
           {
               status === 'pause' && <svg className={styles.play} width="60" height="60" viewBox="0 0 36 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path
                       d="M35 19.268C36.3333 20.0378 36.3333 21.9622 35 22.732L3.5 40.9186C2.16667 41.6884 0.5 40.7261 0.5 39.1865L0.5 2.81347C0.5 1.27387 2.16667 0.311615 3.5 1.08142L35 19.268Z"
                       fill="white"/>
               </svg>
           }
       </div>
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