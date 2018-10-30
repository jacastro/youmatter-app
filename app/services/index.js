import { get, put } from './rest';
import { AsyncStorage } from "react-native"

export const getPublicationTags = async () => await get('tags').then(result => result.map(tag => tag.name));

//export const getPublicationTypes = async () => ['Receta', 'Restaurante', 'Especialista', 'Producto'];
export const getPublicationTypes = async () => await get('types');

export const publish = async (data) => {
  const body = {
    tags: data.selectedTags.map(tag => tag.value),
    type: data.selectedType.value,
    title: data.title,
    body: data.body
  }
  const username = await getUsername();
  await put(`users/${username}/publication`, body);
};

export const getProfile = async () => {
  const username = await getUsername();
  return await get(`users/${username}`);
};

export const getMyTags = async () => {
  const username = await getUsername();
  const interests = await get(`users/${username}/interests`);
  const tags = await getPublicationTags();
  return {
    interests: interests.map(tag => ({ value: tag.name, label: tag.name})),
    tags, 
  }
};

export const getMyPosts = async () => {
  const username = await getUsername();
  const posts = await get(`users/${username}/publication`);
  return posts ? posts : [];
};

/*export const join = async (data) => {
  await AsyncStorage.setItem('username', data.username);
}*/

export const join = async (data) => {
  put(`users`, data).then(async response => {
    console.log(response)
    await AsyncStorage.setItem('username', data.username);
  });
};

export const login = async (data) => {
  await AsyncStorage.setItem('username', data.username);
}

export const getUsername = async () => {
  return await AsyncStorage.getItem('username');
}

export const logout = async () => {
  return await AsyncStorage.removeItem('username');
}