import axios from 'axios';
import request from 'superagent';
import { apiPrefix } from '../../etc/config.json';


export default {
  createPhotos(filesObj, type, photosessionId) {
    return new Promise((resolve, reject) => {
      const req = request.post(`${apiPrefix}/upload`);
      req.query({type, photosessionId});

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
    return axios.delete(`${apiPrefix}/photo/${photoId}`);
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


  createPhotosession(photoName, description) {
    return new Promise((resolve, reject) => {
      const req = request.post(`${apiPrefix}/photosession`);

      req.query({cover: `images/${photoName}.jpg`, description});
      req.end((err, res) => {
        if (err) {
          reject(new Error(err));
        }

        resolve(res);
      });
    });
  },

  photosession() {
    return request.get(`${apiPrefix}/get/photosession`);
  },

  photosessionPhotos(id) {
    return request.get(`${apiPrefix}/get/photosession/${id}`);
  },

  deletePhotosession(id) {
    return axios.delete(`${apiPrefix}/photosession/${id}`);
  },

}
