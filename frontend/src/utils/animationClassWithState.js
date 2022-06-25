const animationClassWithState = (defaultClasses, animationClasses, state) => {
    return [
        ...defaultClasses,
        state === 'entering' && animationClasses[0],
        state === 'entered' && animationClasses[1],
        state === 'exiting' && animationClasses[2],
        state === 'exited' && animationClasses[3]
    ];
}

export default animationClassWithState;