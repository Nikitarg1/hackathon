import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                customText: '#4a5568', // цвет для основного текста
                // customHeader: ''
            },
            dark: {
                customText: '#ffffff'
            },
        },
    },
});
