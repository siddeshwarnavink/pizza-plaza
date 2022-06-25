import { useEffect, useState } from 'react';
import { useNavigate, Navigate } from "react-router-dom";
import { BrowserView } from 'react-device-detect';
import { connect } from 'react-redux';

import classes from './CartCheckout.module.scss';
import * as actions from '../../store/actions';
import useFormValidation from '../../hooks/useFormValidation';
import validate, { Validations } from '../../utils/validate';
import PageContainer from '../../hoc/PageContainer/PageContainer';
import CheckoutSteps from '../../components/Checkout/CheckoutSteps/CheckoutSteps';
import CartList from '../../components/Cart/CartList/CartList';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import FormField from '../../components/Form/FormField/FormField';
import Input from '../../components/Form/Input/Input';
import Button from '../../components/UI/Button/Button';
import GoogleMapInput from '../../components/Form/GoogleMapInput/GoogleMapInput';
import SuccessCheckmark from '../../components/Animation/SuccessCheckmark/SuccessCheckmark';
import CheckoutFormAction from '../../components/Checkout/CheckoutFormAction/CheckoutFormAction';
import CheckoutFormFields from '../../components/Checkout/CheckoutFormFields/CheckoutFormFields';
import CheckoutFormView from '../../components/Checkout/CheckoutFormView/CheckoutFormView';
import CheckoutCaption from '../../components/Checkout/CheckoutCaption/CheckoutCaption';
import Spinner from '../../components/UI/Spinner/Spinner';

const CartCheckout = props => {
    const [currentSelectedFormStep, setCurrentSelectedFormStep] = useState(0);
    const [mapPickedLocation, setMapPickedLocation] = useState(null);
    const [mapPickerError, setMapPickerError] = useState(false);
    const navigate = useNavigate();

    // Form fileds
    const [formFieldName, setFormFieldName, isFormFieldNameValid, isFormFieldNameTouched] = useFormValidation(value => validate(value, [
        Validations.required
    ]));
    const [formFieldEmail, setFormFieldEmail, isFormFieldEmailValid, isFormFieldEmailTouched] = useFormValidation(value => validate(value, [
        Validations.required,
        Validations.validEmail
    ]));
    const [formFieldPhone, setFormFieldPhone, isFormFieldPhoneValid, isFormFieldPhoneTouched] = useFormValidation(value => validate(value, [
        Validations.required,
        Validations.validPhoneno
    ]));
    const [formFieldAddress, setFormFieldAddress, isFormFieldAddressValid, isFormFieldAddressTouched] = useFormValidation(value => validate(value, [
        Validations.required
    ]));

    useEffect(() => {
        if (props.cartList.length < 1) {
            navigate('/', { replace: true });
            props.pushNewFlashMessage({
                text: "Your cart is empty",
                type: 'info'
            });
        }
    }, []);

    useEffect(() => {
        if (mapPickedLocation && mapPickerError) {
            setMapPickerError(false);
        }
    }, [mapPickedLocation]);

    useEffect(() => {
        if (props.ordersError) {
            props.pushNewFlashMessage({
                text: props.ordersError.message,
                type: 'danger'
            });

            setCurrentSelectedFormStep(0);
        }
    }, [props.ordersError])

    const viewOrderHandler = () => {
        navigate('/customer/orders', { replace: true });
    }

    let switchToSelectHandler;

    const pullSwitchToSelectHandler = (callback) => {
        switchToSelectHandler = callback;
    }

    const checkoutFormSubmitHandler = event => {
        event.preventDefault();

        if (currentSelectedFormStep === 0) {
            if (isFormFieldNameValid && isFormFieldEmailValid && isFormFieldPhoneValid) {
                switchToSelectHandler(1);
            }
        }

        if (currentSelectedFormStep === 1) {
            if (mapPickedLocation) {
                props.clearCart();

                props.placeOrder({
                    name: formFieldName,
                    email: formFieldEmail,
                    phone: formFieldPhone,
                    address: formFieldAddress,
                    order: props.cartList,
                    mapPickedLocation
                });
                switchToSelectHandler(2);
            } else {
                setMapPickerError(true);
            }
        }
    };


    const checkoutForm = (
        <Auxiliary>
            {props.cartList.length > 0 && !props.isAuthenticated ? (
                <Navigate to="/auth/login" replace />
            ) : null}

            <CheckoutCaption>Checkout detail</CheckoutCaption>

            {currentSelectedFormStep >= 0 ? (
                <CheckoutFormFields>
                    <FormField>
                        <Input
                            label="Name"
                            name="name"
                            error={isFormFieldNameTouched && !isFormFieldNameValid}
                            onChange={e => setFormFieldName(e.target.value)}
                        />
                    </FormField>
                    <FormField>
                        <Input
                            label="Email"
                            name="name"
                            error={isFormFieldEmailTouched && !isFormFieldEmailValid}
                            onChange={e => setFormFieldEmail(e.target.value)}
                        />
                    </FormField>
                    <FormField>
                        <Input
                            label="Phone number"
                            name="name"
                            inputType="number"
                            error={isFormFieldPhoneTouched && !isFormFieldPhoneValid}
                            onChange={e => setFormFieldPhone(e.target.value)}
                        />
                    </FormField>
                </CheckoutFormFields>
            ) : null}

            <CheckoutFormAction
                displayPrevButton={false}
                isNextButtonDisable={!isFormFieldNameValid || !isFormFieldEmailValid || !isFormFieldPhoneValid}
            />
        </Auxiliary>
    );


    const contactForm = (
        <Auxiliary>
            <CheckoutCaption>Delivery Location</CheckoutCaption>

            {currentSelectedFormStep >= 1 ? (
                <CheckoutFormFields>
                    <FormField label="Location on map" isError={mapPickerError}>
                        <GoogleMapInput
                            pickLocation={setMapPickedLocation}
                        />
                    </FormField>
                    <FormField>
                        <Input
                            label="Address"
                            name="address"
                            error={isFormFieldAddressTouched && !isFormFieldAddressValid}
                            onChange={e => setFormFieldAddress(e.target.value)}
                        />
                    </FormField>
                </CheckoutFormFields>
            ) : null}

            <CheckoutFormAction
                displayPrevButton={true}
                onClickPrevBtn={() => switchToSelectHandler(0)}
                isNextButtonDisable={!isFormFieldAddressValid || !mapPickedLocation}
            />
        </Auxiliary>
    );

    const orderPlaced = props.ordersLoading && !props.ordersError ? <Spinner /> : (
        <Auxiliary>
            <CheckoutCaption>Order placed</CheckoutCaption>
            <SuccessCheckmark />
            <Button buttonType="button" flat onClick={viewOrderHandler}>View order</Button>
        </Auxiliary>
    );

    return (
        <PageContainer>
            <div className={classes.CartCheckout}>
                <div className={classes.CartCheckout__Form}>
                    <div className={classes.CartCheckout_Form__Container}>
                        <div className={classes.CartCheckout_StepController}>
                            <CheckoutSteps
                                currentSelected={currentSelectedFormStep}
                                setCurrentSelected={setCurrentSelectedFormStep}
                                pullSwitchToSelectCtrl={pullSwitchToSelectHandler}
                                lockNavigation
                            />
                        </div>
                        <CheckoutFormView
                            onSubmit={checkoutFormSubmitHandler}
                            currentSelectedFormStep={currentSelectedFormStep}
                            checkoutForm={checkoutForm}
                            contactForm={contactForm}
                            orderPlaced={orderPlaced}
                        />
                    </div>
                </div>

                <BrowserView className={classes.CartCheckout__Cart}>
                    <CheckoutCaption>Your order</CheckoutCaption>

                    <div className={classes.CartCheckout__List}>
                        <CartList
                            noContainer
                            cartList={props.cartList}
                            cartTotalPrice={props.cartTotalPrice}
                            locked
                            noFixedListHeight
                        />
                    </div>
                </BrowserView>
            </div>
        </PageContainer>
    );
};

const mapStateToProps = state => ({
    cartList: state.cart.cartList,
    cartTotalPrice: state.cart.totalPrice,
    ordersLoading: state.orders.isLoading,
    ordersError: state.orders.error,
    isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
    pushNewFlashMessage: (newMessage) => dispatch(actions.pushNewFlashMessage(newMessage)),
    clearCart: () => dispatch(actions.clearCart()),
    placeOrder: orderDetail => dispatch(actions.placeOrder(orderDetail))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartCheckout);