import classes from './RetryFallback.module.scss';
import noConnectionImage from '../../images/no_connection.svg';
import Button from '../UI/Button/Button';

const RetryFallback = props => {
    return (
        <div className={classes.RetryFallback}>
            <img alt="no connection" src={noConnectionImage} />

            <h1>Failed to load data</h1>

            <Button flat onClick={props.onRetry}>
                Try again
            </Button>
        </div>
    );
}

export default RetryFallback;