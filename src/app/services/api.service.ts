import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import {
  ConvertRequest, ConvertResponse,
  CompareRequest, CompareResponse,
  ArithmeticRequest, ArithmeticResponse,
  HistoryItem
} from '../models/request.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  convert(payload: ConvertRequest): Observable<ConvertResponse> {
    return this.http.post<ConvertResponse>(`${this.baseUrl}/convert`, payload, {
      headers: this.getHeaders()
    });
  }

  compare(payload: CompareRequest): Observable<CompareResponse> {
    return this.http.post<CompareResponse>(`${this.baseUrl}/compare`, payload, {
      headers: this.getHeaders()
    });
  }

  arithmetic(payload: ArithmeticRequest): Observable<ArithmeticResponse> {
    return this.http.post<ArithmeticResponse>(`${this.baseUrl}/arithmetic`, payload, {
      headers: this.getHeaders()
    });
  }

  getHistory(): Observable<HistoryItem[]> {
    return this.http.get<HistoryItem[]>(`${this.baseUrl}/history`, {
      headers: this.getHeaders()
    });
  }
}
