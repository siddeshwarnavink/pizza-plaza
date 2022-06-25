const CheckoutFormView = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <div style={{ display: props.currentSelectedFormStep === 0 ? 'block' : 'none' }}>
                {props.checkoutForm}
            </div>
            <div style={{ display: props.currentSelectedFormStep === 1 ? 'block' : 'none' }}>
                {props.contactForm}
            </div>
            <div style={{ display: props.currentSelectedFormStep === 2 ? 'block' : 'none' }}>
                {props.orderPlaced}
            </div>
        </form>
    );
}

export default CheckoutFormView;