import {Layout} from "../../../components/Layout/Layout";
import styles from './style.module.css';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Select} from "../../../components/ui/Select/Select";
import {getCountries} from "../../../api/getCountries";
import {updateUserInfo} from "../../../store/user.slice";
import {Link} from "react-router-dom";

export const ChangeProfile = () => {
    const user = useSelector(state => state.user);
    const [countries, setCountries] = useState([]);
    const dispatch = useDispatch();
    const [draftUser, setDraftUser] = useState({
        nickname: user.nickname,
        email: user.email,
        about: user.about,
        country: user.country,
        mediaLinks: user.mediaLinks
    })
    const [newLinkValue, setNewLinkValue] = useState('');

    const changeDraftProp = (field, value) => setDraftUser(prev => ({...prev, [field]: value}));
    const addLink = () => {
        if (!newLinkValue.trim().length) return;
        changeDraftProp('mediaLinks', [...draftUser.mediaLinks, newLinkValue]);
        setNewLinkValue('');
    }
    const removeLink = (idx) => changeDraftProp('mediaLinks', draftUser.mediaLinks.filter((_, i) => i !== idx));

    useEffect(() => {
        getCountries()
            .then(data => {
                setCountries(data.map(({id, name}) => ({value: id, title: name})))
            })
    }, [])

    return (<Layout>
        <main>
            <div className={styles.wrapper}>
                <h3>Изменить аккаунт</h3>
                <div className={styles.mainInfoWrapp}>
                    <img className={styles.avatar} src={user.avatar} alt="avatar"/>
                    <div className={styles.mainInfoInputsWrapper}>
                        <label className={styles.label}>Имя</label>
                        <input
                            onChange={e => changeDraftProp('nickname', e.target.value)}
                            value={draftUser.nickname}
                            type="text"/>
                        <label className={styles.label}>Email</label>
                        <input
                            onChange={e => changeDraftProp('email', e.target.value)}
                            value={draftUser.email}
                            type="text"/>
                    </div>
                </div>
                <label className={styles.label}>О себе</label>
                <textarea
                    value={draftUser.about}
                    className={styles.descriptions}
                    onChange={e => changeDraftProp('about', e.target.value)}
                    placeholder="Я композитор и я пишу песни"/>
                <div className={styles.countryWrapper}>
                    <label className={styles.label}>Страна</label>
                    <Select options={countries} value={draftUser.country.id} placeholder={'Страна'}/>
                </div>
                <label className={styles.label}>Ссылка</label>
                <div className={styles.links}>
                    {
                        draftUser.mediaLinks.map((content, idx) => (<div key={idx} className={styles.linkWrapper}>
                            <input readOnly value={content} placeholder="Новая ссылка" type="text"/>
                            <svg onClick={() => removeLink(idx)} width="16" height="5" viewBox="0 0 16 5" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.9612 0.457386V4.36364H0.0521129V0.457386H15.9612Z" fill="white"/>
                            </svg>
                        </div>))
                    }
                    <div className={styles.linkWrapper}>
                        <input value={newLinkValue} onChange={e => setNewLinkValue(e.target.value)}
                               placeholder="Новая ссылка" type="text"/>
                        <svg onClick={addLink} width="24" height="24" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.0091 23.5142V0.0767032H13.9864V23.5142H10.0091ZM0.279031 13.7841V9.80682H23.7165V13.7841H0.279031Z"
                                fill="white"/>
                        </svg>
                    </div>
                </div>
                <div className={styles.fileLoader}>
                    <input id="jingle-loader" type="file"/>
                    <div className={styles.field}>
                        Filename.ext
                        <svg width="16" height="5" viewBox="0 0 16 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.9612 0.457386V4.36364H0.0521129V0.457386H15.9612Z" fill="white"/>
                        </svg>
                    </div>
                    <label className={styles.button} htmlFor="jingle-loader">Загрузить джингл</label>
                </div>
                <div className={styles.footer}>
                    <Link to="/profile">Отменить</Link>
                    <p onClick={() => dispatch(updateUserInfo(draftUser))} className={styles.button}>Принять</p>
                </div>
            </div>
        </main>
    </Layout>)
}