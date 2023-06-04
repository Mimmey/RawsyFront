import styles from './styles.module.css';
import classNames from "classnames";

export const PaginationList = ({ children }) => {
    const activePage = 1;

    return (<div data-type="pagination-list">
        { children }
        <div className={styles.paginationWrapper}>
            {
                [1,2,3].map((page) => (<p className={classNames(styles.page, {[styles.active]: page === activePage})} key={page}>
                    { page }
                </p>))
            }
        </div>
    </div>)
}