export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface AnalysisGuideline {
  id: string;
  description: string;
  category: string;
}

export interface DataPoint {
  timestamp: Date;
  value: number;
}

export interface Dataset {
  id: string;
  name: string;
  description: string;
  data: DataPoint[];
}

export interface AnalysisResult {
  type: string;
  description: string;
  results: any;
  visualizationData?: any;
}