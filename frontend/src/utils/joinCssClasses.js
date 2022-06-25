const joinCssClasses = (cssClassesArray) => {
    return cssClassesArray.filter(n => n).join(' ');
}

export default joinCssClasses