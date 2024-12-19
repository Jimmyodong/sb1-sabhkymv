import axios from 'axios';
import { DHIS2ProgramData } from '../types/dhis2Types';

const API_BASE_URL = 'https://uat.familyhealthuganda.com/dhis/api';

export const dhis2Client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const fetchProgramDataElements = async (): Promise<DHIS2ProgramData[]> => {
  try {
    const response = await dhis2Client.get('/programDataElements');
    return response.data;
  } catch (error) {
    console.error('Error fetching DHIS2 program data:', error);
    throw error;
  }
};