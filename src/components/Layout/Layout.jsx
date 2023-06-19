import styles from './style.module.css';
import classNames from "classnames";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

export const Layout = ({children}) => {
    const user = useSelector(state => state.user);


    return (<>
        <div className={styles.headerWrapper}>
            <header className={classNames('container', styles.header)}>
                <div className={styles.arc}/>
                <div className={styles.searchWrapper}>
                    <svg className={styles.searchIcon} width="21" height="21" viewBox="0 0 21 21" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M14.8441 11.4318C15.4281 10.3268 15.7433 9.09147 15.7433 7.80158C15.7433 5.72595 14.9323 3.77216 13.4659 2.30157C10.4323 -0.732033 5.49535 -0.732033 2.46172 2.30157C-0.571877 5.3352 -0.571877 10.2722 2.46172 13.3058C3.97855 14.8226 5.97014 15.5789 7.96174 15.5789C9.21383 15.5789 10.4617 15.2806 11.5962 14.6839L15.0836 18.1713L18.3315 14.9192L14.8441 11.4318ZM3.05838 12.7091C0.352498 10.0033 0.352498 5.60408 3.05838 2.8982C4.41131 1.54527 6.18443 0.868806 7.96174 0.868806C9.73904 0.868806 11.5163 1.54527 12.8693 2.8982C14.1802 4.20494 14.9029 5.94862 14.9029 7.80158C14.9029 9.65872 14.1802 11.4024 12.8693 12.7091C10.1634 15.415 5.76427 15.415 3.05838 12.7091ZM19.6802 16.268L18.9239 15.5117L15.676 18.7638L16.4323 19.52C16.8777 19.9654 17.4659 20.1923 18.0542 20.1923C18.6424 20.1923 19.2306 19.9654 19.6802 19.52C20.5752 18.6251 20.5752 17.1629 19.6802 16.268Z"
                            fill="white"/>
                    </svg>
                    <input placeholder="Поиск" type="text" className={styles.search}/>
                </div>
                {
                    user.isAuth ?
                        <div className={styles.userMenu}>
                            <Link to="/track/create">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.0091 23.5142V0.0767032H13.9864V23.5142H10.0091ZM0.279031 13.7841V9.80682H23.7165V13.7841H0.279031Z" fill="white"/>
                                </svg>
                            </Link>
                            <img src={user.avatar} alt=""/>
                        </div> :
                        <p className={styles.openClose}>Войти</p>
                }
            </header>
        </div>
        {children}
    </>)
}