import classes from './SuccessCheckmark.module.scss';

const SuccessCheckmark = () => {
    return (
        <div className={classes.SuccessCheckmark}>
            <div className={classes.CheckIcon}>
                <span className={[classes.IconLine, classes.LineTip].join(' ')}></span>
                <span className={[classes.IconLine, classes.LineLong].join(' ')}></span>
                <div className={classes.IconCircle}></div>
                <div className={classes.IconFix}></div>
            </div>
        </div>
    );
}

export default SuccessCheckmark;