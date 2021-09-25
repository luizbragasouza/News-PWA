/* eslint-disable no-console */
/* eslint-disable consistent-return */
const params = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const URL = 'https://stormy-brook-79548.herokuapp.com/api';

const getNews = async (subject: any) => {
  if (subject)
    try {
      const response = await fetch(`${URL}/${subject}`, params);
      return await response.json();
    } catch (err) {
      console.error('Ocorreu um err', err);
    }
};

const getNewsById = async (subject: any, id: string) => {
  if (subject && id) {
    return fetch(`${URL}/${subject}/${id}`, params)
      .then((response) => response.json())
      .catch((err) => {
        console.error('Ocorreu um err', err);
      });
  }
};

export default {
  getNews,
  getNewsById,
};
