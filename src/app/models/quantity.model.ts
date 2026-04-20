export type MeasurementType = 'LENGTH' | 'TEMPERATURE' | 'VOLUME' | 'WEIGHT';

export interface UnitOption {
  value: string;
  label: string;
}

export const MEASUREMENT_UNITS: Record<MeasurementType, UnitOption[]> = {
  LENGTH: [
    { value: 'METER', label: 'Meter (m)' },
    { value: 'KILOMETER', label: 'Kilometer (km)' },
    { value: 'CENTIMETER', label: 'Centimeter (cm)' },
    { value: 'MILLIMETER', label: 'Millimeter (mm)' },
    { value: 'MILE', label: 'Mile (mi)' },
    { value: 'YARD', label: 'Yard (yd)' },
    { value: 'FOOT', label: 'Foot (ft)' },
    { value: 'INCH', label: 'Inch (in)' }
  ],
  TEMPERATURE: [
    { value: 'CELSIUS', label: 'Celsius (°C)' },
    { value: 'FAHRENHEIT', label: 'Fahrenheit (°F)' },
    { value: 'KELVIN', label: 'Kelvin (K)' }
  ],
  VOLUME: [
    { value: 'LITER', label: 'Liter (L)' },
    { value: 'MILLILITER', label: 'Milliliter (mL)' },
    { value: 'GALLON', label: 'Gallon (gal)' },
    { value: 'QUART', label: 'Quart (qt)' },
    { value: 'PINT', label: 'Pint (pt)' },
    { value: 'CUP', label: 'Cup' },
    { value: 'FLUID_OUNCE', label: 'Fluid Ounce (fl oz)' },
    { value: 'CUBIC_METER', label: 'Cubic Meter (m³)' }
  ],
  WEIGHT: [
    { value: 'KILOGRAM', label: 'Kilogram (kg)' },
    { value: 'GRAM', label: 'Gram (g)' },
    { value: 'MILLIGRAM', label: 'Milligram (mg)' },
    { value: 'POUND', label: 'Pound (lb)' },
    { value: 'OUNCE', label: 'Ounce (oz)' },
    { value: 'TON', label: 'Metric Ton (t)' }
  ]
};

export const MEASUREMENT_CARDS = [
  {
    type: 'LENGTH' as MeasurementType,
    label: 'Length',
    icon: 'straighten',
    description: 'Convert between metric and imperial length units',
    color: '#1a73e8'
  },
  {
    type: 'TEMPERATURE' as MeasurementType,
    label: 'Temperature',
    icon: 'device_thermostat',
    description: 'Convert between Celsius, Fahrenheit and Kelvin',
    color: '#e53935'
  },
  {
    type: 'VOLUME' as MeasurementType,
    label: 'Volume',
    icon: 'water_drop',
    description: 'Convert between metric and US volume units',
    color: '#00897b'
  },
  {
    type: 'WEIGHT' as MeasurementType,
    label: 'Weight',
    icon: 'scale',
    description: 'Convert between metric and imperial weight units',
    color: '#f57c00'
  }
];
