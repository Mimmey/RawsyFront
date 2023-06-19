import {Layout} from "../../components/Layout/Layout";
import {Link} from "react-router-dom";
import styles from './style.module.css';

export const SuccessReg = () => {

    return (<Layout>
        <main>
            <div className={styles.wrapper}>
                <h3>Регистрация прошла успешно</h3>
                <Link className={styles.link} to="/login">Войти</Link>
            </div>
        </main>
    </Layout>)
}