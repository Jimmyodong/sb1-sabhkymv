import * as ss from 'simple-statistics';
import { DataPoint } from '../types';

export const calculateDescriptiveStats = (data: number[]) => {
  return {
    mean: ss.mean(data),
    median: ss.median(data),
    standardDeviation: ss.standardDeviation(data),
    min: Math.min(...data),
    max: Math.max(...data)
  };
};

export const calculateCorrelation = (x: number[], y: number[]) => {
  return ss.sampleCorrelation(x, y);
};

export const performTimeSeriesAnalysis = (data: DataPoint[]) => {
  const values = data.map(d => d.value);
  const movingAverage = ss.movingAverage(values, 3);
  
  return {
    trend: movingAverage,
    totalChange: values[values.length - 1] - values[0],
    percentageChange: ((values[values.length - 1] - values[0]) / values[0]) * 100
  };
};

export const detectOutliers = (data: number[]) => {
  const q1 = ss.quantile(data, 0.25);
  const q3 = ss.quantile(data, 0.75);
  const iqr = q3 - q1;
  const lowerBound = q1 - 1.5 * iqr;
  const upperBound = q3 + 1.5 * iqr;
  
  return data.filter(value => value < lowerBound || value > upperBound);
};