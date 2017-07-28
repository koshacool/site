import axios from 'axios';
import request from 'superagent';

import { apiPrefix } from '../../etc/config.json';

export default {
  listPhotos() {
    return request.get(`${apiPrefix}/get/all`);
  },

  weddingPhotos() {
    return request.get(`${apiPrefix}/get/wedding`);
  },

  lovestoryPhotos() {
    return request.get(`${apiPrefix}/get/lovestory`);
  },

  childrenPhotos() {
    return request.get(`${apiPrefix}/get/children`);
  },

  //createPhotos(data) {
  //  return axios.post(`${apiPrefix}/get/photos`, data);
  //},

  deletePhotos(photoId) {
    return axios.delete(`${apiPrefix}/remove/${photoId}`);
  }
}
