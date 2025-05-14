import { AccountType, MeasurementUnit } from '../types';

// TODO(ducnm): Check usage
export const CHEER_STYLE_OPTIONS = [
  { label: 'All Girl', value: 'all-girl' },
  { label: 'Coed', value: 'coed' },
];

// TODO(ducnm): Check usage
export const CHEER_TYPE_OPTIONS = [
  { label: 'All Star', value: 'all-star' },
  { label: 'College', value: 'college' },
  { label: 'High School', value: 'high-school' },
  { label: 'Recreational', value: 'recreational' },
  { label: 'Other', value: 'other' },
];

// TODO(ducnm): Check usage
export const ROLE_OPTIONS = [
  { label: 'Base', value: 'base' },
  { label: 'Flyer', value: 'flyer' },
];

// TODO(ducnm): Check usage
export const EQUIPMENT_OPTIONS = [
  { value: 'all-equipment', label: '1. All Equipment' },
  { value: 'body-weight', label: '2. Body Weight' },
  { value: 'resistance-band', label: '3. Resistance Band' },
  { value: 'dumbbell', label: '4. Dumbbell' },
  { value: 'kettlebell', label: '5. Kettlebell' },
  {
    value: 'ankle-wrist-weight',
    label: '6. Ankle & Wrist Weight',
  },
  { value: 'cable-machine', label: '7. Cable Machine' },
  { value: 'agility-ladder', label: '8. Agility Ladder' },
  { value: 'landmine-barbell', label: '9. Landmine and Barbell' },
  { value: 'machines', label: '10. Machines' },
  { value: 'weighted-ball', label: '11. Weighted Ball' },
  { value: 'balance-equipment', label: '12. Balance Equipment' },
  { value: 'step', label: '13. Step' },
  { value: 'plyometric-box', label: '14. Plyometric Box' },
  { value: 'foam-roller', label: '15. Foam Roller' },
  { value: 'exercise-ball', label: '16. Exercise Ball' },
  { value: 'free-weights', label: '17. Free Weights' },
  { value: 'chair', label: '18. Chair' },
  { value: 'jump-rope', label: '19. Jump Rope' },
];

export const MEASUREMENT_UNIT_OPTIONS = [
  { value: MeasurementUnit.Imperial, label: 'Imperial (lb, ft)' },
  { value: MeasurementUnit.Metric, label: 'Metric (kg, m)' },
];

export const USER_TYPE_OPTIONS = [
  { value: AccountType.Athlete, label: 'Athlete' },
  { value: AccountType.Coach, label: 'Coach' },
];
