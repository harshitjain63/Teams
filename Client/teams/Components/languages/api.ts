import axiosInstances from './AxiosInstance';

export const fetchHindiTranslations = async () => {
  try {
    const response = await axiosInstances.get('/hi');
    const translationsData = response.data[0].data;
    return translationsData;
  } catch (error) {
    console.error('Error fetching translations:', error);
    throw error;
  }
};

export const fetchEnglishTranslations = async () => {
  try {
    const response = await axiosInstances.get('/en');
    const translationsData = response.data[0].data;
    return translationsData;
  } catch (error) {
    console.error('Error fetching translations:', error);
    throw error;
  }
};
