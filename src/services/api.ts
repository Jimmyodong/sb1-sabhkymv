import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API endpoint

export const fetchDataset = async (datasetId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/datasets/${datasetId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dataset:', error);
    throw error;
  }
};

export const fetchAvailableDatasets = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/datasets`);
    return response.data;
  } catch (error) {
    console.error('Error fetching available datasets:', error);
    throw error;
  }
};