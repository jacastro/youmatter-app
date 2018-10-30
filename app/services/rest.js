import axios from 'axios';

export const get = async(url, params) => {
  try {
    const result = await axios.get(`https://uade-sem-int-tpo-api.herokuapp.com/${url}`,{ params });
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export const post = async(url, params) => {
  try {
    const result = await axios.post(`https://uade-sem-int-tpo-api.herokuapp.com/${url}`, params);
    return result.data;
  } catch (error) {
    console.error(error);
  }
}
