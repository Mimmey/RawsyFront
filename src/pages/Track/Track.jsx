import styles from './style.module.css'
import {Layout} from "../../components/Layout/Layout";
import {Button} from "../../components/ui/Button/Button";
import {PaginationList} from "../../components/ui/PaginationList/PaginationList";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import fetcher from "../../api/fetcher";
import {useSelector} from "react-redux";
import classNames from "classnames";


const TrackPlayer = ({track, id}) => {
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
        fetch(`/public/tracks/${id}/preview`).then(r => r.blob()).then(blob => {
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

    return (<div className={styles.player}>
        <div className={classNames(styles.playBtn, {[styles.disabled]: !audio})} onClick={() => toggleAudioStatus()}>
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
            <p className={styles.name}>{track.name}</p>
            <p className={styles.author}>Author</p>
        </div>
        <p className={styles.rate}>{track.rating}</p>
        <div className={styles.progress}>
            { audio && <span style={{width: `${currentTime / (audio.duration / 100)}%`}}/>}
        </div>
    </div>)
}

export const Track = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const [isLoading, setIsLoading] = useState(true);
    const [track, setTrack] = useState(null);
    const [comments, setComments] = useState([]);
    const isOwner = track?.authorId === user.id;

    useEffect(() => {
        fetcher.get(`/public/tracks/${id}`)
            .then(setTrack)
            .finally(() => setIsLoading(false))
        fetcher.get(`/public/tracks/${id}/comments`)
            .then((comments) => {
                console.log(comments)
            })
    }, [])

    const remove = () => {
        fetcher.delete(`/my/published/tracks/${id}`)
            .then(() => navigate('/profile'))
    }

    const download = () => {
        fetcher.post(`/public/track/${id}/multitrack`)
            .then(res => res.blob())
            .then(blob => {
                const downloadElement = document.createElement('a');
                downloadElement.download = `${track.name}.zip`
                downloadElement.href = URL.createObjectURL(blob);
                downloadElement.click();
            })
    }


    if (isLoading) return <h1>Loading ...</h1>;

    return (<Layout>
        <main className="container">
            <div className={styles.trackWrapper}>
                <div className={styles.trackBack}></div>
                <div className={styles.track}>
                    <TrackPlayer id={id} track={track}/>
                    <div className={styles.trackDecriptions}>
                        <div className={styles.trackDescWrapper}>
                            {`Тип: ${track.type.name}`}<br/>
                            {`Жанры: ${track.genres.map(i => i.name).join(', ')}`}<br/>
                            {`Настроения: ${track.moods.map(i => i.name).join(', ')}`}<br/>
                            {`Наличие вокала: ${track.hasVocal ? 'Да' : 'Нет'}`}<br/>
                            {`Зацикленность: ${track.isCycled ? 'Да' : 'Нет'}`}<br/>
                            {`BPM: ${track.bpm}`}<br/>
                            {`Длительность: ${Math.floor(track.duration) / 60}:${('00' + track.duration % 60).slice(-2)}`}<br/>
                        </div>
                        <div className={styles.trackDescWrapper}>
                            {track.about}
                        </div>
                        <div className={styles.trackActions}>
                            {
                                isOwner &&
                                <>
                                    <Link to={`/track/update/${id}`}><Button>Редактировать</Button></Link>
                                    <Button handleclick={download}>Скачать</Button>
                                    <Button handleclick={remove} type="secondary">Удалить</Button>
                                </>
                            }
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
                    {
                        comments.length ?
                            [] :
                            <h5 style={{color: '#fff', textAlign: 'center'}}>Комментарии не найдены</h5>
                    }
                    {/*<div className={styles.commentWrapper}>*/}
                    {/*    <div className={styles.commentHeader}>*/}
                    {/*        <img src="" className={styles.commentAvatar} alt=""/>*/}
                    {/*        <p className={styles.commentName}>The Commentator</p>*/}
                    {/*        <div className={styles.stars}>*/}
                    {/*            {*/}
                    {/*                [1, 2, 3, 4, 5].map((_, idx) => (<svg*/}
                    {/*                    width="43"*/}
                    {/*                    height="41"*/}
                    {/*                    key={idx}*/}
                    {/*                    viewBox="0 0 43 41"*/}
                    {/*                    fill="none"*/}
                    {/*                    xmlns="http://www.w3.org/2000/svg"*/}
                    {/*                >*/}
                    {/*                    <path*/}
                    {/*                        d="M21.5 0L26.5516 15.5471H42.8988L29.6736 25.1558L34.7252 40.7029L21.5 31.0942L8.27483 40.7029L13.3264 25.1558L0.101229 15.5471H16.4484L21.5 0Z"*/}
                    {/*                        fill="#FFC737"/>*/}
                    {/*                </svg>))*/}
                    {/*            }*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <p className={styles.commentText}>Трек очень хорош</p>*/}
                    {/*</div>*/}
                </PaginationList>
            </div>
        </main>
    </Layout>)
}