import { useEffect, useState } from 'react';
import { usePosition } from 'use-position';
import MapPicker from 'react-google-map-picker';

import classes from './GoogleMapInput.module.scss';
import Button from '../../UI/Button/Button';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import MapLocationIcon from '../../Icons/MapLocationIcon';
import Modal from '../../UI/Modal/Modal';

const GoogleMapInput = props => {
    const [isMapPickerModalOpen, setIsMapPickerModalOpen] = useState(false);
    const [currentSelectedLocation, setCurrentSelectedLocation] = useState({ lat: null, lng: null });
    const [pickedLocation, setPickedLocation] = useState(null);
    const { latitude, longitude, error } = usePosition();

    useEffect(() => {
        if (currentSelectedLocation.lat === null && currentSelectedLocation.lng === null) {
            if (latitude && longitude) {
                setCurrentSelectedLocation({
                    lat: latitude,
                    lng: longitude
                });
            }
        }
    }, [latitude, longitude])

    const openMapPickerHandler = () => {
        setIsMapPickerModalOpen(true);
    }

    const changeLocationHandler = (lat, lng) => {
        setCurrentSelectedLocation({ lat, lng });
    }

    const pickLocationHandler = () => {
        setIsMapPickerModalOpen(false);
        setPickedLocation(currentSelectedLocation);
        props.pickLocation(currentSelectedLocation);
    }

    return (
        <Auxiliary>
            <Modal
                isOpen={isMapPickerModalOpen}
                onClose={() => setIsMapPickerModalOpen(false)}
            >
                <MapPicker
                    defaultLocation={{ lat: latitude, lng: longitude }}
                    zoom={10}
                    mapTypeId="roadmap"
                    style={{ height: '400px' }}
                    className={classes.PickableMap}
                    onChangeLocation={changeLocationHandler}
                    apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8' />

                <div className={classes.PickButton}>
                    <Button buttonType="button" onClick={pickLocationHandler}>
                        Pick
                    </Button>
                </div>
            </Modal>
            {error ? (
                <div className={classes.GoogleMapInput}>
                    <div className={classes.GoogleMapInput__Error}>
                        Allow Location in your browser
                    </div>
                </div>
            ) : pickedLocation ? (
                <div className={classes.GoogleMapInput} onClick={openMapPickerHandler}>
                    <p>location picked</p>
                </div>
            ) : (
                <div className={classes.GoogleMapInput} onClick={openMapPickerHandler}>
                    <div className={classes.GoogleMapInput__PickButton}>
                        <Button buttonType="button" icon={MapLocationIcon}>
                            Pick location
                        </Button>
                    </div>
                </div>
            )}
            <input
                type="hidden"
                style={{ opacity: 0 }}
                value={JSON.stringify(pickedLocation)}
                name="mapLocation"
                {...props.inputProps}
            />
        </Auxiliary>
    );
}

export default GoogleMapInput;