import { Navigate, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';

import validate, { Validations } from '../../utils/validate';
import * as actions from '../../store/actions';
import useFormValidation from '../../hooks/useFormValidation';
import PageContainer from '../../hoc/PageContainer/PageContainer';
import FormField from '../../components/Form/FormField/FormField';
import Input from '../../components/Form/Input/Input';
import Button from '../../components/UI/Button/Button';
import AuthContainer from '../../components/Auth/AuthContainer/AuthContainer';
import Spinner from '../../components/UI/Spinner/Spinner';

const Auth = props => {
    const navigate = useNavigate();

    const [formFieldEmail, setFormFieldEmail, isFormFieldEmailValid, isFormFieldEmailTouched] = useFormValidation(value => validate(value, [
        Validations.required,
        Validations.validEmail
    ]));

    const [formFieldPassword, setFormFieldPassword, isFormFieldPasswordValid, isFormFieldPasswordTouched] = useFormValidation(value => validate(value, [
        Validations.required,
    ]));

    const onSubmitHandler = event => {
        event.preventDefault();

        if (isFormFieldEmailValid && isFormFieldPasswordValid) {
            props.auth(
                formFieldEmail,
                formFieldPassword,
                props.isSignin
            );
        }
    }

    const switchAuthTypeHandler = () => {
        let navigateUrl = '/auth/createAccount';

        if (!props.isSignin) {
            navigateUrl = '/auth/login';
        }

        navigate(navigateUrl, { replace: true });
    }

    return (
        <PageContainer>
            {props.isAuthenticated ? (
                <Navigate to={props.authRedirectPath} replace />
            ) : null}

            <AuthContainer>
                {props.authLoading ? <Spinner /> : (
                    <form onSubmit={onSubmitHandler}>
                        <h1>{props.isSignin ? "Sign in" : "Create account"}</h1>

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
                                label="Password"
                                name="password"
                                inputType="password"
                                error={isFormFieldPasswordTouched && !isFormFieldPasswordValid}
                                onChange={e => setFormFieldPassword(e.target.value)}
                            />
                        </FormField>

                        <Button
                            disable={!isFormFieldEmailValid && !isFormFieldPasswordValid}
                        >
                            {props.isSignin ? "Login" : "Create account"}
                        </Button>

                        <div style={{ marginTop: 10 }} />

                        <Button
                            flat
                            buttonType="button"
                            onClick={switchAuthTypeHandler}
                        >
                            {!props.isSignin ? "Login" : "Create account"}
                        </Button>
                    </form>
                )}
            </AuthContainer>
        </PageContainer>
    );
}

const mapStateToProps = state => ({
    authLoading: state.auth.loading,
    authRedirectPath: state.auth.authRedirectPath,
    isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
    auth: (email, password, isSignin) => dispatch(actions.auth(email, password, !isSignin))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth);