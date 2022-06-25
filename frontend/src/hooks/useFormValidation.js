import { useState, useCallback } from "react";

const useFormValidation = (validationFunc, initialValue = '') => {
    const [state, setState] = useState(initialValue)
    const [isValid, setIsValid] = useState(() => validationFunc(state));
    const [isTouched, setIsTouched] = useState(false);

    const onChange = useCallback(
        nextState => {
            if (!isTouched) {
                setIsTouched(true);
            }
            const value = typeof nextState === "function" ? nextState(state) : nextState
            setState(value)
            setIsValid(validationFunc(value))
        },
        [validationFunc]
    )

    return [state, onChange, isValid, isTouched];
};

export default useFormValidation;