import { get } from './rest';
import { AsyncStorage } from "react-native"

export const getPublicationTags = async () => ['Celiacos', 'Vegetarianos', 'Kosher'];

export const getPublicationTypes = async () => ['Receta', 'Restaurante', 'Especialista', 'Producto'];

export const publish = async (data) => console.log({
  tags: data.selectedTags.map(tag => tag.value),
  type: data.selectedType.value,
  title: data.title,
  body: data.body
});

export const getProfile = async (data) => ({
  name: "FULANA DE TAL",
});

export const getMyTags = async () => {
  const username = await getUsername();
  const tags = await getPublicationTags();
  return {
    interests: [{ value: 'Celiacos', label: 'Celiacos'}],
    tags,
  }
};

export const join = async (data) => {
  await AsyncStorage.setItem('username', data.username);
}

export const login = async (data) => {
  await AsyncStorage.setItem('username', data.username);
}

export const getUsername = async () => {
  return await AsyncStorage.getItem('username');
}

export const logout = async () => {
  return await AsyncStorage.removeItem('username');
}