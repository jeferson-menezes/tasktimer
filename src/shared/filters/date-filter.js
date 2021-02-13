import moment from "moment";
import Vue from 'vue'

Vue.filter('datetime', (value) => {
    return moment(value).format('DD/MM/YYYY hh:mm:ss')
})