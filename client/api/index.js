import axios from 'axios';
import request from 'superagent';

import { apiPrefix } from '../../etc/config.json';

export default {
  listPhotos() {
    return request.get(`${apiPrefix}/all`);
  },

  weddingPhotos() {
    return request.get(`${apiPrefix}/wedding`);
  },

  lovestoryPhotos() {
    return request.get(`${apiPrefix}/lovestory`);
  },

  childrenPhotos() {
    return request.get(`${apiPrefix}/children`);
  },

  createPhotos(data) {
    return axios.post(`${apiPrefix}/photos`, data);
  },

  deletePhotos(noteId) {
    return axios.delete(`${apiPrefix}/photos/${noteId}`);
  }
}
