export const Validations = {
    required: 'Validation_required',
    validEmail: 'Validation_validEmail',
    validPhoneno: 'Validation_validPhoneno'
};

const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const validate = (value, validationsArray) => {
    let isValid = true;

    validationsArray.forEach(validationName => {
        if (validationName === Validations.required) {
            isValid = isValid && (value.trim().length > 0);
        }

        if (validationName === Validations.validEmail) {
            isValid = isValid && (value.match(validEmailRegex));
        }

        if (validationName === Validations.validPhoneno) {
            isValid = isValid && (value.trim().length === 10);
        }
    });

    return isValid;
}

export default validate;