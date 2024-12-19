import { useState, useEffect } from 'react';
import { ProcessedDataset } from '../types/dhis2Types';
import { getAvailableDatasets } from '../services/datasetService';

export const useDatasets = () => {
  const [datasets, setDatasets] = useState<ProcessedDataset[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDatasets = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const availableDatasets = await getAvailableDatasets();
        setDatasets(availableDatasets);
      } catch (error) {
        setError('Failed to load datasets. Please try again later.');
        console.error('Error loading datasets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDatasets();
  }, []);

  return { datasets, isLoading, error };
};