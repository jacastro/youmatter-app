import axios from 'axios';

const server = 'http://158.69.204.48:19011'

export const get = async(url, params) => {
  try {
    const result = await axios.get(`${server}/${url}`,{ params });
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export const put = async(url, params) => {
  try {
    const result = await axios.put(`${server}/${url}`, params);
    return result.data;
  } catch (error) {
    console.error(error);
  }
}
