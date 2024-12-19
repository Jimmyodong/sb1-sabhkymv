import React from 'react';
import { ProcessedDataset } from '../types/dhis2Types';

interface DatasetSelectorProps {
  datasets: ProcessedDataset[];
  selectedDataset: string | null;
  onSelect: (datasetId: string) => void;
  isLoading: boolean;
}

export const DatasetSelector: React.FC<DatasetSelectorProps> = ({
  datasets,
  selectedDataset,
  onSelect,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="mb-4">
        <p className="text-gray-600">Loading datasets...</p>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Dataset
      </label>
      <select
        value={selectedDataset || ''}
        onChange={(e) => onSelect(e.target.value)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">Choose a dataset...</option>
        {datasets.map(dataset => (
          <option key={dataset.id} value={dataset.id}>
            {dataset.name} - {dataset.description}
          </option>
        ))}
      </select>
    </div>
  );
};