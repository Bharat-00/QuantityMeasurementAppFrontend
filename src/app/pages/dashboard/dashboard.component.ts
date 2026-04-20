import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import {
  MeasurementType, MEASUREMENT_UNITS, MEASUREMENT_CARDS, UnitOption
} from '../../models/quantity.model';
import {
  ConvertResponse, CompareResponse, ArithmeticResponse
} from '../../models/request.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, NavbarComponent,
    MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonModule, MatIconModule, MatTabsModule, MatSnackBarModule,
    MatTooltipModule, MatDividerModule, MatProgressSpinnerModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  measurementCards = MEASUREMENT_CARDS;
  selectedType: MeasurementType | null = null;
  units: UnitOption[] = [];
  username: string | null = null;

  convertForm: FormGroup;
  compareForm: FormGroup;
  arithmeticForm: FormGroup;

  convertResult: ConvertResponse | null = null;
  compareResult: CompareResponse | null = null;
  arithmeticResult: ArithmeticResponse | null = null;

  loading = { convert: false, compare: false, arithmetic: false };
  activeTab = 0;

  operations = [
    { value: 'ADD', label: 'Add (+)' },
    { value: 'SUBTRACT', label: 'Subtract (-)' },
    { value: 'MULTIPLY', label: 'Multiply (×)' },
    { value: 'DIVIDE', label: 'Divide (÷)' }
  ];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.convertForm = this.fb.group({
      value: ['', [Validators.required, Validators.min(0)]],
      fromUnit: ['', Validators.required],
      toUnit: ['', Validators.required]
    });

    this.compareForm = this.fb.group({
      firstValue: ['', [Validators.required]],
      firstUnit: ['', Validators.required],
      secondValue: ['', [Validators.required]],
      secondUnit: ['', Validators.required]
    });

    this.arithmeticForm = this.fb.group({
      firstValue: ['', [Validators.required]],
      firstUnit: ['', Validators.required],
      operation: ['ADD', Validators.required],
      secondValue: ['', [Validators.required]],
      secondUnit: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
  }

  selectType(type: MeasurementType): void {
    this.selectedType = type;
    this.units = MEASUREMENT_UNITS[type];
    this.convertForm.reset();
    this.compareForm.reset({ operation: 'ADD' });
    this.arithmeticForm.reset({ operation: 'ADD' });
    this.convertResult = null;
    this.compareResult = null;
    this.arithmeticResult = null;
  }

  getCardColor(type: string): string {
    return this.measurementCards.find(c => c.type === type)?.color || '#1a73e8';
  }

  getGreeting(): string {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  }

  onConvert(): void {
    if (this.convertForm.invalid || !this.selectedType) { this.convertForm.markAllAsTouched(); return; }
    this.loading.convert = true;
    this.convertResult = null;
    this.apiService.convert({ type: this.selectedType, ...this.convertForm.value }).subscribe({
      next: (res) => { this.convertResult = res; this.loading.convert = false; },
      error: (err) => {
        this.loading.convert = false;
        this.snackBar.open(err?.error?.message || 'Conversion failed.', 'Close', { duration: 4000, panelClass: 'snack-error' });
      }
    });
  }

  onCompare(): void {
    if (this.compareForm.invalid || !this.selectedType) { this.compareForm.markAllAsTouched(); return; }
    this.loading.compare = true;
    this.compareResult = null;
    this.apiService.compare({ type: this.selectedType, ...this.compareForm.value }).subscribe({
      next: (res) => { this.compareResult = res; this.loading.compare = false; },
      error: (err) => {
        this.loading.compare = false;
        this.snackBar.open(err?.error?.message || 'Comparison failed.', 'Close', { duration: 4000, panelClass: 'snack-error' });
      }
    });
  }

  onArithmetic(): void {
    if (this.arithmeticForm.invalid || !this.selectedType) { this.arithmeticForm.markAllAsTouched(); return; }
    this.loading.arithmetic = true;
    this.arithmeticResult = null;
    this.apiService.arithmetic({ type: this.selectedType, ...this.arithmeticForm.value }).subscribe({
      next: (res) => { this.arithmeticResult = res; this.loading.arithmetic = false; },
      error: (err) => {
        this.loading.arithmetic = false;
        this.snackBar.open(err?.error?.message || 'Arithmetic operation failed.', 'Close', { duration: 4000, panelClass: 'snack-error' });
      }
    });
  }

  getUnitLabel(value: string): string {
    return this.units.find(u => u.value === value)?.label || value;
  }

  formatNumber(n: number | undefined): string {
    if (n === undefined || n === null) return '—';
    return Number.isInteger(n) ? n.toString() : parseFloat(n.toFixed(6)).toString();
  }
}
