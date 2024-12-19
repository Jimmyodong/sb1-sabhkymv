import { DHIS2ProgramData, ProcessedDataset, DataPoint } from '../types/dhis2Types';

export const transformDHIS2Data = (rawData: DHIS2ProgramData[]): ProcessedDataset[] => {
  return rawData.map(program => ({
    id: program.id,
    name: program.name,
    description: program.shortName,
    data: [] // Initialize empty data array, to be populated with actual values
  }));
};

export const parseDataPoints = (values: any[]): DataPoint[] => {
  return values
    .filter(value => !isNaN(Number(value.value)))
    .map(value => ({
      timestamp: new Date(value.created),
      value: Number(value.value)
    }));
};