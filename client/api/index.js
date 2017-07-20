import axios from 'axios';
import request from 'superagent';

import { apiPrefix } from '../../etc/config.json';

export default {
    listPhotos() {
        return request.get(`${apiPrefix}/all`);
        //return axios.get(`${apiPrefix}/photos`);
    },

    createPhotos(data) {
        return axios.post(`${apiPrefix}/photos`, data);
    },

    deletePhotos(noteId) {
        return axios.delete(`${apiPrefix}/photos/${noteId}`);
    }
}
