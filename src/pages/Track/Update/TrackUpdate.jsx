import {Layout} from "../../../components/Layout/Layout";
import styles from './style.module.css'
import classNames from "classnames";
import {Select} from "../../../components/ui/Select/Select";
import {useEffect, useState} from "react";
import {getAllGenres} from "../../../api/getAllGenres";
import {getTrackTypes} from "../../../api/getTrackTypes";
import {getMoodsTrack} from "../../../api/getMoodsTrack";
import {createTrack} from "../../../api/createTrack";
import {useParams, useSearchParams} from "react-router-dom";
import fetcher from "../../../api/fetcher";
import {useDispatch} from "react-redux";
import {updateTrack} from "../../../store/user.slice";


const MultiCheckbox = (
    {
        label,
        options,
        selected,
        onChange
    }
) => {
    return <div className={styles.checkboxWrapper}>
        <p className={styles.label}>{label}</p>
        <div className={styles.items}>
            {
                options.map(({name, id}) => <div key={id} onClick={() => onChange(id)} className={styles.item}>
                    <div className={classNames(styles.checkbox, {[styles.active]: selected === id})}></div>
                    {name}
                </div>)
            }
        </div>
    </div>
}


const MultiInput = ({label, options, change, selected}) => {
    return (<div className={styles.multiInput}>
        <p className={styles.title}>{label}</p>
        <div>
            <div className={styles.selectedInputs}>
                {
                    selected.map((id) => <div key={id}>{options.find(el => el.value === id)?.title} <span
                        onClick={() => change(id)}>-</span></div>)
                }
            </div>
            <div className={styles.selectWrapper}>
                <Select
                    options={options}
                    value={null}
                    placeholder={label}
                    handleChange={change}
                />
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_195_2044)">
                        <circle cx="24" cy="20" r="19.5" stroke="white"/>
                        <path
                            d="M22.4162 27.7109V12.9666H25.7614V27.7109H22.4162ZM16.7166 22.0114V18.6662H31.4609V22.0114H16.7166Z"
                            fill="white"/>
                    </g>
                    <defs>
                        <filter id="filter0_d_195_2044" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse"
                                colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix"
                                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="4"/>
                            <feGaussianBlur stdDeviation="2"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_195_2044"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_195_2044" result="shape"/>
                        </filter>
                    </defs>
                </svg>
            </div>
        </div>
    </div>)
}


const vokalList = [
    {name: 'Есть', id: true}, {name: 'Нет', id: false}
]
const repeatList = [
    {name: 'Есть', id: true}, {name: 'Нет', id: false}
]

export const TrackUpdate = () => {

    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [track, setTrack] = useState(null);
    const [draftTrack, setDraftTrack] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        fetcher.get(`/my/published/tracks/${id}`)
            .then((track) => {
                setInitialTrack(track)
                setTrack(track);
            })
            .catch(console.log)
            .finally(() => setIsLoading(false))
    }, [])

    const setInitialTrack = (track) => {
        console.log(track)
        setDraftTrack({
            "name": track.name,
            "typeId": track.type.id,
            "about": track.about,
            "invoice": track.invoice,
            "hasVocal": track.hasVocal,
            "isCycled": track.isCycled,
            "bpm": track.bpm,
            "duration": track.duration,
            "cost": track.cost,
            "genreIds": track.genres.map(({id}) => id),
            "moodIds": track.moods.map(({id}) => id)
        })
    }


    const [genres, setGenres] = useState([]);
    const [trackTypes, setTrackTypes] = useState([]);
    const [mods, setMods] = useState([]);


    const changeDraftProp = (field, value) => setDraftTrack({...draftTrack, [field]: value});

    useEffect(() => {
        getAllGenres()
            .then(genres => setGenres(genres.map(({id, name}) => ({title: name, value: id}))));
        getTrackTypes()
            .then(setTrackTypes)
        getMoodsTrack()
            .then(mods => setMods(mods.map(({id, name}) => ({title: name, value: id}))))
    }, [])

    const handleUpdate = () => {
        const payload = {...draftTrack};

        if (!draftTrack.name.trim().length) return;
        if (!draftTrack.about.trim().length) return;
        if (!draftTrack.invoice.trim().length) return;

        payload.bpm = parseInt(payload.bpm) || 0;
        payload.duration = parseInt(payload.duration) || 0;
        payload.cost = parseInt(payload.cost) || 0;

        dispatch(updateTrack({id: track.id, payload}));
    }

    if (isLoading && !draftTrack) return <h1>Loading ...</h1>

    return (<Layout>
        <main>
            <div className={styles.formWrapper}>
                <h3>Описание трека</h3>
                <input
                    value={draftTrack.name}
                    onChange={e => changeDraftProp('name', e.target.value)}
                    placeholder="Название трека"
                    type="text"/>
                <textarea
                    placeholder="Описание трека"
                    value={draftTrack.about}
                    onChange={e => changeDraftProp('about', e.target.value)}
                />
                <textarea
                    placeholder="Сообщение покупателям"
                    value={draftTrack.invoice}
                    onChange={e => changeDraftProp('invoice', e.target.value)}
                />
            </div>
            <div className={styles.formWrapper}>
                <h3>Характеристики</h3>
                <MultiCheckbox onChange={id => changeDraftProp('typeId', id)} selected={draftTrack.typeId}
                               options={trackTypes} label="Тип"/>
                <MultiCheckbox onChange={(val) => changeDraftProp('hasVocal', val)} selected={draftTrack.hasVocal}
                               options={vokalList} label="Вокал"/>
                <MultiCheckbox onChange={(val) => changeDraftProp('isCycled', val)} selected={draftTrack.isCycled}
                               options={repeatList} label="Зацикленность"/>
                <div className={styles.inputWithLabel}>
                    <label htmlFor="BPM">BPM</label>
                    <input onChange={(e) => changeDraftProp('bpm', e.target.value)} value={draftTrack.bpm} id="BPM"
                           type="text" placeholder="120"/>
                </div>
                <div className={styles.inputWithLabel}>
                    <label htmlFor="time">Длительность <br/>в секундах</label>
                    <input onChange={(e) => changeDraftProp('duration', e.target.value)} value={draftTrack.duration}
                           id="time" type="text" placeholder="120"/>
                </div>
                <MultiInput
                    options={genres}
                    selected={draftTrack.genreIds}
                    change={(id) => {
                        changeDraftProp('genreIds',
                            draftTrack.genreIds.includes(id) ?
                                draftTrack.genreIds.filter(el => el !== id) :
                                [...draftTrack.genreIds, id])
                    }}
                    label="Жанр"
                />
                <MultiInput
                    options={mods}
                    selected={draftTrack.moodIds}
                    change={(id) => {
                        changeDraftProp('moodIds',
                            draftTrack.moodIds.includes(id) ?
                                draftTrack.moodIds.filter(el => el !== id) :
                                [...draftTrack.moodIds, id])
                    }}
                    label="Настроение"
                />
            </div>
            <div className={styles.formWrapper}>
                <h3>Цена (₽)</h3>
                <div className={styles.inputWithLabel}>
                    <label htmlFor="BPM">
                        Цена в <br/>
                        российских<br/>
                        рублях
                    </label>
                    <input onChange={e => changeDraftProp('cost', parseInt(e.target.value) || 0)} value={draftTrack.cost} id="BPM" type="text" placeholder="2000"/>
                </div>
                <button onClick={handleUpdate} style={{marginLeft: 'auto'}} className={styles.button}>Сохранить</button>
            </div>
        </main>
    </Layout>)
}