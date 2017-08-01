import axios from 'axios';
import request from 'superagent';
import { apiPrefix } from '../../etc/config.json';


export default {
  createPhotos(filesObj, type) {
    return new Promise((resolve, reject) => {
      const req = request.post(`${apiPrefix}/upload`);
      req.query({type});

      const files = Object.keys(filesObj);

      files.forEach(fileName => {
        req.attach(fileName, filesObj[fileName]);//Create random name for each file
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
      const req = request.post(`${apiPrefix}/photosession`);
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
