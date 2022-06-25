const { expressApp } = require('./functions');

expressApp.listen(process.env.PORT || 5000, () => {
    console.log('App running');
});