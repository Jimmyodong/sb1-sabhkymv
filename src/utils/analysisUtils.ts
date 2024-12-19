import { AnalysisGuideline, AnalysisResult } from '../types';
import { calculateDescriptiveStats, performTimeSeriesAnalysis, detectOutliers } from './dataAnalysis';
import { fetchDataset } from '../services/api';

export const matchGuidelinesToQuery = (
  query: string,
  guidelines: AnalysisGuideline[]
): AnalysisGuideline[] => {
  const lowercaseQuery = query.toLowerCase();
  return guidelines.filter(guideline => 
    guideline.description.toLowerCase().includes(lowercaseQuery) ||
    guideline.category.toLowerCase().includes(lowercaseQuery)
  );
};

export const analyzeData = async (query: string, datasetId: string): Promise<AnalysisResult> => {
  try {
    const dataset = await fetchDataset(datasetId);
    const data = dataset.data.map(d => d.value);
    
    if (query.includes('descriptive') || query.includes('statistics')) {
      const stats = calculateDescriptiveStats(data);
      return {
        type: 'descriptive',
        description: 'Descriptive statistics analysis',
        results: stats
      };
    }
    
    if (query.includes('time series') || query.includes('trend')) {
      const analysis = performTimeSeriesAnalysis(dataset.data);
      return {
        type: 'timeSeries',
        description: 'Time series analysis',
        results: analysis,
        visualizationData: dataset.data
      };
    }
    
    if (query.includes('outlier')) {
      const outliers = detectOutliers(data);
      return {
        type: 'outliers',
        description: 'Outlier detection',
        results: { outliers }
      };
    }
    
    return {
      type: 'unknown',
      description: 'Could not determine appropriate analysis type',
      results: null
    };
  } catch (error) {
    console.error('Error analyzing data:', error);
    throw error;
  }
};

export const formatAnalysisResponse = (result: AnalysisResult): string => {
  switch (result.type) {
    case 'descriptive':
      return `Statistical Summary:\n
        Mean: ${result.results.mean.toFixed(2)}
        Median: ${result.results.median.toFixed(2)}
        Standard Deviation: ${result.results.standardDeviation.toFixed(2)}
        Range: ${result.results.min.toFixed(2)} to ${result.results.max.toFixed(2)}`;
    
    case 'timeSeries':
      return `Time Series Analysis:\n
        Total Change: ${result.results.totalChange.toFixed(2)}
        Percentage Change: ${result.results.percentageChange.toFixed(2)}%
        Trend: ${result.results.trend.length} points calculated`;
    
    case 'outliers':
      return `Outlier Detection:\n
        Found ${result.results.outliers.length} outliers in the dataset
        Outlier values: ${result.results.outliers.map(v => v.toFixed(2)).join(', ')}`;
    
    default:
      return 'Could not perform the requested analysis. Please try a different query.';
  }
};