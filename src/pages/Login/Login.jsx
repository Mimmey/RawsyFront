import {Layout} from "../../components/Layout/Layout";
import styles from './style.module.css';
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {getCurrentUserInfo} from "../../api/getCurrentUserInfo";
import {useDispatch} from "react-redux";
import {setUserData} from "../../store/user.slice";

export const Login = () => {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        const token = btoa(`${nickname}:${password}`);
        window.localStorage.setItem('token', token);
        getCurrentUserInfo()
            .then((data) => {
                dispatch(setUserData(data));
                navigate('/profile')
            })
    }


    return (<Layout>
        <main className="container">
            <div className={styles.arc}></div>
            <form onSubmit={login} className={styles.form}>
                <input value={nickname} onChange={e => setNickname(e.target.value)} required placeholder="Имя пользователя" type="text"/>
                <input value={password} onChange={e => setPassword(e.target.value)} required placeholder="Пароль" type="password"/>
                <button>Войти</button>
            </form>
            <div className={styles.regBtnWrapper}>
                <Link to="/auth" className={styles.regLink}>Зарегистрироваться</Link>
            </div>
        </main>
    </Layout>)
}