import axios from 'axios';
import request from 'superagent';

import { apiPrefix } from '../../etc/config.json';

const randomSymbols = (n) => Math.random().toString(36).slice(2, 2 + Math.max(1, Math.min(n, 25)));

export default {
  createPhotos(files, type) {
    return new Promise((resolve, reject) => {
      const req = request.post(`${apiPrefix}/upload`);
      req.query({type});

      files.forEach(file => {
        req.attach(randomSymbols(15), file);//Create random name for each file
      });

      req.end((err, res) => {
        if (err) {
          reject(new Error(err));
        }

        resolve(res);
      });
    });
  },

  deletePhotos(photoId) {
    return axios.delete(`${apiPrefix}/remove/${photoId}`);
  },


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


  createPhotosession(files, type) {
    return new Promise((resolve, reject) => {
      const req = request.post(`${apiPrefix}/upload`);
      req.query({type});

      files.forEach(file => {
        req.attach(randomSymbols(15), file);//Create random name for each file
      });

      req.end((err, res) => {
        if (err) {
          reject(new Error(err));
        }

        resolve(res);
      });
    });
  },

}
