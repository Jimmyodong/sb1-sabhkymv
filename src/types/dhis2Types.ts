export interface DHIS2ProgramData {
  id: string;
  name: string;
  shortName: string;
  valueType: string;
  aggregationType: string;
  domainType: string;
}

export interface ProcessedDataset {
  id: string;
  name: string;
  description: string;
  data: DataPoint[];
}

export interface DataPoint {
  timestamp: Date;
  value: number;
}