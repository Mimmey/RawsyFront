import styles from './styles.module.css';
import classNames from "classnames";

export const PaginationList = ({ children }) => {
    const activePage = 1;

    return (<div data-type="pagination-list">
        { children }
        <div data-type="pagination-items" className={styles.paginationWrapper}>
            {
                [1].map((page) => (<p data-type="pagination-item" className={classNames(styles.page, {[styles.active]: page === activePage})} key={page}>
                    { page }
                </p>))
            }
        </div>
    </div>)
}