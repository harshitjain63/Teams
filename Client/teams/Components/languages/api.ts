import axiosInstances from './AxiosInstance';

// Fetch languages
export const fetchLanguages = async () => {
  try {
    const response = await axiosInstances.get('/languages');
    console.log('Response:', response.data); // Log the entire response
    return response.data[0].data; // Access the first item in the array and then the data property
  } catch (error) {
    console.error('Error fetching languages:', error);
    throw error;
  }
};

export const fetchTranslations = async (screen: string, language: string) => {
  try {
    const response = await axiosInstances.get('/translations');
    const translationsData = response.data[0].data.screens;
    const loginTranslations = translationsData.find(
      (item: {screen: string; language: string}) =>
        item.screen === screen && item.language === language,
    );
    return loginTranslations;
  } catch (error) {
    console.error('Error fetching translations:', error);
    throw error; // You might want to handle errors differently depending on your requirements
  }
};
