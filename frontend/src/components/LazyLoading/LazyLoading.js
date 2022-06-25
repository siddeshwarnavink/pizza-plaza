import { useEffect, useRef } from 'react';

import useOnScreen from '../../hooks/useOnScreen';

const LazyLoading = props => {
    const lazyLoadRef = useRef();
    const isVisible = useOnScreen(lazyLoadRef);


    useEffect(() => {
        if (isVisible) {
            props.onVisible();
        }
    }, [isVisible])

    return (
        <div ref={lazyLoadRef} />
    );
}

export default LazyLoading;