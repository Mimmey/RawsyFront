import {Layout} from "../../components/Layout/Layout";
import styles from './style.module.css';
import {Select} from "../../components/ui/Select/Select";
import {Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {register} from "../../api/register";
import classNames from "classnames";
import {getCountries} from "../../api/getCountries";
import {getCurrentUserInfo} from "../../api/getCurrentUserInfo";
import {setUserAvatar} from "../../api/setUserAvatar";
import {useDispatch} from "react-redux";


const MainForm = (
    {
        changeField,
        nextStep,
        data
    }
) => {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const repeatPasswordRef = useRef(null);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        getCountries()
            .then(data => {
                setCountries(data.map(({id, name}) => ({value: id, title: name})))
            })
    }, [])

    const handleNext = (e) => {
        e.preventDefault();
        let isErr = false;
        if (!data.nickname.trim().length) {
            nameRef.current.setAttribute('data-error', '')
            nameRef.current.setAttribute('placeholder', 'Поле обязательное');
            isErr = true;
        }
        if (!data.email.trim().length) {
            emailRef.current.setAttribute('data-error', '')
            emailRef.current.setAttribute('placeholder', 'Поле обязательное')
            isErr = true;
        }

        if (data.password !== data.repeatPassword) {
            passwordRef.current.setAttribute('data-error', '')
            passwordRef.current.setAttribute('placeholder', 'Пароли должны совпадать')
            repeatPasswordRef.current.setAttribute('data-error', '')
            repeatPasswordRef.current.setAttribute('placeholder', 'Пароли должны совпадать')
            isErr = true;
        }

        if (!data.password.trim().length) {
            passwordRef.current.setAttribute('data-error', '')
            passwordRef.current.setAttribute('placeholder', 'Поле обязательно')
            isErr = true;
        }

        if (!data.repeatPassword.trim().length) {
            repeatPasswordRef.current.setAttribute('data-error', '')
            repeatPasswordRef.current.setAttribute('placeholder', 'Поле обязательно')
            isErr = true;
        }

        if (!isErr) {
            nextStep(2)
        }
    }

    const handleChange = (field) => (e) => {
        e.target.removeAttribute('data-error')
        changeField(field, e.target.value);
    }


    return (<form className={styles.form}>
        <div className={styles.rect}></div>
        <h2 className={styles.heading}>Создайте аккаунт Rawsy</h2>

        <input ref={nameRef} value={data.nickname} onChange={handleChange('nickname')} required
               placeholder="Имя пользователя" type="text"/>
        <input name='email' ref={emailRef} value={data.email} onChange={handleChange('email')} required
               placeholder="Email"
               type="text"/>
        <Select
            onChange={handleChange('nickname')}
            value={data.countryId}
            handleChange={value => changeField('countryId', value)}
            options={countries} placeholder="Страна"
        />
        <div className={styles.passworWrapper}>
            <input ref={passwordRef} name='password' onChange={handleChange('password')} required placeholder="Пароль"
                   type="password"/>
            <input ref={repeatPasswordRef} name='password' onChange={handleChange('repeatPassword')} required
                   placeholder="Подтверждение"
                   type="password"/>
        </div>
        <div className={styles.buttons}>
            <Link to="/login">Войти</Link>
            <button onClick={handleNext}>Далее</button>
        </div>
    </form>)
}


const AboutForm = ({data, changeField, nextStep}) => {

    const changeMedia = (value, idx) => {
        const newMedia = [...data.mediaLinks];
        newMedia[idx] = value;
        changeField('mediaLinks', newMedia)
    }

    return (<form className={styles.form}>
        <div className={styles.rect}></div>
        <h2 className={styles.heading}>Дополните информацию</h2>
        <textarea value={data.about} onChange={(e) => changeField('about', e.target.value)} placeholder="О себе"
                  className={styles.textarea} cols="30" rows="10"></textarea>
        <div className={styles.mediasWrapper}>
            {
                (data.mediaLinks.length ? data.mediaLinks : ['']).map((value, idx) => (<div key={idx} className={styles.mediaWrapper}>
                    <input value={value} onChange={(e) => changeMedia(e.target.value, idx)}
                           placeholder="Ссылка на страницу в соцсети" type="text"/>
                    <svg onClick={() => changeField('mediaLinks', [...data.mediaLinks, ''])} width="24" height="24"
                         viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.0091 23.5142V0.0767032H13.9864V23.5142H10.0091ZM0.279031 13.7841V9.80682H23.7165V13.7841H0.279031Z"
                            fill="white"/>
                    </svg>
                </div>))
            }
        </div>
        <div className={styles.buttons}>
            <p onClick={() => nextStep(3)}>Пропустить</p>
            <button onClick={() => nextStep(3)}>Далее</button>
        </div>
    </form>)
}

const ContentForm = ({data}) => {
    const [avatar, setAvatar] = useState('');
    const dispatch = useDispatch();
    const formRef = useRef();
    const avatarInputRef = useRef();
    const [file, setFile] = useState(null);

    const changeAvatar = (e) => {
        const reader = new FileReader();
        setFile(e.target.files[0])
        reader.onload = (e) => setAvatar(e.target.result);
        reader.readAsDataURL(e.target.files[0]);
    }

    const handleRegRequest = async (e) => {
        e.preventDefault();

        const requestData = {...data};
        delete requestData.repeatPassword;
        register(requestData)
            .then(() => {
                if (file) {
                    const formData = new FormData();
                    formData.append('file', file);
                    return setUserAvatar(formData);
                }
            })
            .then(() => {
                window.localStorage.removeItem('token');
                window.location.href = '/auth/success'
            })
    }

    return (<form ref={formRef} className={styles.form}>
        <div className={styles.rect}></div>
        <h2 className={styles.heading}>Дополните информацию</h2>
        <div className={styles.fileLoaderWrapper}>
            {
                avatar ?
                    <img src={avatar} alt="User avatar"/> :
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M80 40C80 62.0914 62.0914 80 40 80C17.9086 80 0 62.0914 0 40C0 17.9086 17.9086 0 40 0C62.0914 0 80 17.9086 80 40Z"
                            fill="#D9D9D9"/>
                    </svg>
            }

            <label htmlFor="avatar_loader">Загрузить аватар</label>
            <input name="avatar" onChange={changeAvatar} ref={avatarInputRef}  id="avatar_loader" type="file"/>
        </div>
        <div className={classNames(styles.fileLoaderWrapper, styles.lastLoader)}>
            <div className={styles.playBtn}>
                <svg width="36" height="42" viewBox="0 0 36 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M35 19.268C36.3333 20.0378 36.3333 21.9622 35 22.732L3.5 40.9186C2.16667 41.6884 0.5 40.7261 0.5 39.1865L0.5 2.81347C0.5 1.27387 2.16667 0.311615 3.5 1.08142L35 19.268Z"
                        fill="white"/>
                </svg>
            </div>
            <label htmlFor="jingle_loader">Загрузить джингл</label>
            <input onChange={changeAvatar} name="avatar" id="jingle_loader" type="file"/>
        </div>

        <div className={styles.buttons}>
            <p>Пропустить</p>
            <button onClick={handleRegRequest}>Зарегистрироваться</button>
        </div>
    </form>)
}


export const Register = () => {
    const [userData, setUserData] = useState({
        repeatPassword: '',
        "nickname": "",
        "email": "",
        "password": "",
        "countryId": 0,
        "about": "",
        "mediaLinks": []
    });
    const [step, setStep] = useState(1);

    const changeField = (field, value) => setUserData(data => ({...data, [field]: value}))


    return (<Layout>

        <main className="container">
            <div className={styles.formWrapper}>
                {
                    step === 1 ?
                        <MainForm data={userData} nextStep={setStep} changeField={changeField}/> :
                        step === 2 ?
                            <AboutForm nextStep={setStep} changeField={changeField} data={userData}/> :
                            step === 3 ? <ContentForm data={userData}/> : null
                }

                <div className={styles.bigArc}></div>
            </div>
        </main>
    </Layout>)
}