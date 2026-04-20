import { MeasurementType } from './quantity.model';

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username?: string;
  email?: string;
  message?: string;
}

export interface ConvertRequest {
  type: MeasurementType;
  fromUnit: string;
  toUnit: string;
  value: number;
}

export interface ConvertResponse {
  result: number;
  fromUnit: string;
  toUnit: string;
  fromValue: number;
  type?: string;
}

export interface CompareRequest {
  type: MeasurementType;
  firstUnit: string;
  firstValue: number;
  secondUnit: string;
  secondValue: number;
}

export interface CompareResponse {
  result: string;
  comparison?: string;
  firstValue?: number;
  secondValue?: number;
  firstUnit?: string;
  secondUnit?: string;
}

export interface ArithmeticRequest {
  type: MeasurementType;
  firstUnit: string;
  firstValue: number;
  secondUnit: string;
  secondValue: number;
  operation: 'ADD' | 'SUBTRACT' | 'MULTIPLY' | 'DIVIDE';
}

export interface ArithmeticResponse {
  result: number;
  resultUnit: string;
  operation?: string;
}

export interface HistoryItem {
  id?: number;
  type: string;
  operation: string;
  fromUnit?: string;
  toUnit?: string;
  fromValue?: number;
  result?: number | string;
  createdAt?: string;
  timestamp?: string;
}
