import axios from "axios";
import * as _ from "lodash";

const get = async (url: string): Promise<any> => {
//   console.log('Request:%s', url);
  const response = await axios.get(url);
//   console.log('Response:%s', JSON.stringify(response));
  return response;
};

const post = async (url: string, values?: any, config?: any): Promise<any> => {
//   console.log('Request:%s', url);
  const response = await axios.post(url, jsonToForm(values, new FormData()), config);
//   console.log('Response:%s', JSON.stringify(response) );
  return response;
};

const put = async (url: string, values?: any, config?: any): Promise<any> => {
//   console.log('Request:%s', url);
  const response = await axios.put(url, jsonToForm(values, new FormData()), config);
//   console.log('Response:%s', JSON.stringify(response) );
  return response;
};

const del = async (url: string): Promise<any> => {
//   console.log('Request:%s', url);
  const response = await axios.delete(url);
//   console.log('Response:%s', JSON.stringify(response) );
  return response;
};

const jsonToForm = (params, formData, name = '') => {
  if (_.isArray(params)) formatArray(params, formData, name);
  if (_.isPlainObject(params)) formatObject(params, formData, name);
  return formData;
}

const formatObject = (params, formData, name) => {
  _.forEach(params, (v, k) => {
    if (_.isArray(v) || _.isPlainObject(v)) {
      jsonToForm(v, formData, !name ? k : `${name}.${k}`);
      return;
    }
    formData.append(!name ? k : `${name}.${k}`, v);
  })
}

const formatArray = (params, formData, name) => {
  _.map(params, (data, index) => {
    if (_.isArray(data) || _.isPlainObject(data)) {
      jsonToForm(data, formData, `${name}[${index}]`);
      return;
    }
    formData.append(`${name}[${index}]`, data);
  });
  return formData;
}

export const API = {
  get,
  post,
  put,
  del
}