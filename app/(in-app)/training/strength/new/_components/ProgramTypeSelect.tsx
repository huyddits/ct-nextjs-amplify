import { AppSelect, type SelectOption } from '@/components/compose';
import { cn } from '@/lib/utils';
import { type ProgramType } from '@/utils/types';
interface ProgramTypeSelectProps {
  value: string;
  options: SelectOption[];
  className?: string;
  onChangeSelected: (value: ProgramType) => void;
}
export default function ProgramTypeSelect({
  value,
  options,
  className,
  onChangeSelected,
}: ProgramTypeSelectProps) {
  return (
    <div className={cn('bg-white rounded-lg p-4 shadow-sm', className)}>
      <AppSelect
        label="Program Type"
        placeholder="Select Program Type"
        selectedValue={value}
        onChangeSelected={value => onChangeSelected(value as ProgramType)}
        options={options}
        fullWidth
      />
    </div>
  );
}
