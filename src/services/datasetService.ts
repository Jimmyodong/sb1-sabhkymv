import { fetchProgramDataElements } from './dhis2Api';
import { transformDHIS2Data } from '../utils/dataTransformers';
import { ProcessedDataset } from '../types/dhis2Types';

export const getAvailableDatasets = async (): Promise<ProcessedDataset[]> => {
  try {
    const rawData = await fetchProgramDataElements();
    return transformDHIS2Data(rawData);
  } catch (error) {
    console.error('Error getting available datasets:', error);
    throw error;
  }
};