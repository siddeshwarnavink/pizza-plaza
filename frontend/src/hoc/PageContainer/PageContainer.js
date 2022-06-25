import classes from './PageContainer.module.scss';

const PageContainer = props => {
    return (
        <div className={classes.PageContainer} data-testid="app-page-container">
            {props.children}
        </div>
    );
};

export default PageContainer;