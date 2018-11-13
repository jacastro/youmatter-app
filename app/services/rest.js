import axios from 'axios';

const server = 'http://youmatter.studionext.com.ar/api'

export const get = async(url, params) => {
  try {
    const result = await axios.get(`${server}/${url}`,{ params });
    return result.data;
  } catch (error) {
    throw Error("Error")
  }
} 

export const put = (url, params) => {
  console.log("PUT", `${server}/${url}`, params) 
  return axios.put(`${server}/${url}`, params)
};
