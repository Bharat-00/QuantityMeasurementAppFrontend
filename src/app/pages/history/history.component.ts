import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ApiService } from '../../services/api.service';
import { HistoryItem } from '../../models/request.model';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    CommonModule, NavbarComponent, MatCardModule, MatIconModule,
    MatButtonModule, MatProgressSpinnerModule, MatTooltipModule, MatChipsModule
  ],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  history: HistoryItem[] = [];
  loading = true;
  error = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.loading = true;
    this.error = '';
    this.apiService.getHistory().subscribe({
      next: (data) => {
        this.history = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to load history. Please try again.';
        this.loading = false;
      }
    });
  }

  getTypeIcon(type: string): string {
    const map: Record<string, string> = {
      LENGTH: 'straighten',
      TEMPERATURE: 'device_thermostat',
      VOLUME: 'water_drop',
      WEIGHT: 'scale'
    };
    return map[type?.toUpperCase()] || 'straighten';
  }

  getTypeColor(type: string): string {
    const map: Record<string, string> = {
      LENGTH: '#1a73e8',
      TEMPERATURE: '#e53935',
      VOLUME: '#00897b',
      WEIGHT: '#f57c00'
    };
    return map[type?.toUpperCase()] || '#1a73e8';
  }

  getOperationLabel(operation: string): string {
    const map: Record<string, string> = {
      CONVERT: 'Conversion',
      COMPARE: 'Comparison',
      ADD: 'Addition',
      SUBTRACT: 'Subtraction',
      MULTIPLY: 'Multiplication',
      DIVIDE: 'Division'
    };
    return map[operation?.toUpperCase()] || operation;
  }

  formatDate(dateStr: string | undefined): string {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
      ' at ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  formatResult(val: number | string | undefined): string {
    if (val === undefined || val === null) return '—';
    if (typeof val === 'number') {
      return Number.isInteger(val) ? val.toString() : parseFloat(val.toFixed(6)).toString();
    }
    return val.toString();
  }
}
