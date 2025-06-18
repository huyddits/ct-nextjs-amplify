'use client';

import { CalendarIcon, SchoolIcon, UserIcon } from 'lucide-react';
import { useProfileForm } from '../_hooks';
import { Controller } from 'react-hook-form';
import { AppDatePicker, AppInput, AppSelect } from '@/components/compose';
import { useCategories, useSafeAreaInset } from '@/hooks';
import AppMultipleSelect from '@/components/compose/AppMultipleSelect';
import { MEASUREMENT_UNIT_OPTIONS } from '@/utils/constants';
import ButtonEdit from './ButtonEdit.client';
import { useMemo } from 'react';
import { SafeAreaDetection } from '@/app/_components';

export default function ProfileForm() {
  const { insetBottom } = useSafeAreaInset();
  const { isCoach, isEditing, coachCode, control, trigger, onSaveInfo, onToggle, loading } =
    useProfileForm();
  const {
    roles: roleOptions,
    cheerStyles: cheerStyleOptions,
    cheerTypes: cheerTypeOptions,
    equipments: equipmentOptions,
    measurementUnits: measurementUnitOptions,
  } = useCategories();

  const roleOptionsByType = useMemo(() => {
    return roleOptions.filter(item => item.isCoach === isCoach);
  }, [roleOptions, isCoach]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-4 pb-[80px] max-w-3xl mx-auto p-4">
        <div className="bg-white p-4 rounded-lg shadow-sm space-y-6">
          {!isCoach ? (
            <>
              <div className="flex justify-end">
                <ButtonEdit isEditing={isEditing} onClick={onToggle} loading={loading} />
              </div>
              <Controller
                control={control}
                name="coachCode"
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <AppInput
                    label={<div>Coach's Code</div>}
                    inputProps={{
                      placeholder: "Enter Coach's Code to be added to Team",
                      className:
                        'text-base placeholder:text-base text-center border-primary md:text-lg',
                    }}
                    value={value}
                    errorMessage={error?.message}
                    size="lg"
                    onChange={event => onChange(event.target.value)}
                    disabled={!isEditing}
                  />
                )}
              />
            </>
          ) : (
            <>
              <div>
                <div className="text-gray-600">
                  Coach Code
                  <span className="text-gray-400 text-sm ml-2">
                    (Share with Athletes to be added to Team)
                  </span>
                </div>
                <div className="mt-1 border border-primary rounded-md p-3 text-center font-medium">
                  {coachCode}
                </div>
              </div>
              <div className="flex justify-end">
                <ButtonEdit isEditing={isEditing} onClick={onToggle} />
              </div>
            </>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Controller
                control={control}
                name="firstName"
                render={({ field: { value, onChange }, fieldState: { error } }) => {
                  return (
                    <AppInput
                      label="First Name"
                      icon={<UserIcon className="icon-input" />}
                      disabled={!isEditing}
                      value={value}
                      onChange={event => onChange(event.target.value)}
                      errorMessage={error?.message}
                    />
                  );
                }}
              />

              <Controller
                control={control}
                name="lastName"
                render={({ field: { value, onChange }, fieldState: { error } }) => {
                  return (
                    <AppInput
                      icon={<UserIcon className="icon-input" />}
                      label="Last Name"
                      disabled={!isEditing}
                      value={value}
                      onChange={event => onChange(event.target.value)}
                      errorMessage={error?.message}
                    />
                  );
                }}
              />
            </div>

            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange }, fieldState: { error } }) => {
                return (
                  <AppInput
                    label="Email Address"
                    icon={<UserIcon className="icon-input" />}
                    disabled
                    inputProps={{ placeholder: 'email@example.com' }}
                    value={value}
                    onChange={event => onChange(event.target.value)}
                    errorMessage={error?.message}
                  />
                );
              }}
            />

            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field: { value, onChange }, fieldState: { error } }) => {
                return (
                  <AppDatePicker
                    icon={<CalendarIcon className="icon-input" />}
                    label="Date of Birth"
                    dateFormat="MM/dd/yyyy"
                    placeholder="mm/dd/yyyy"
                    maxDate={new Date()}
                    value={value}
                    onChange={value => onChange(value || '')}
                    onBlur={() => trigger('dateOfBirth')}
                    errorMessage={error?.message}
                    disabled={!isEditing}
                    fullWidth
                    required
                  />
                );
              }}
            />

            <Controller
              control={control}
              name="schoolName"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <AppInput
                  disabled={!isEditing}
                  label="School Name"
                  icon={<SchoolIcon className="icon-input" />}
                  inputProps={{ placeholder: 'School Name' }}
                  errorMessage={error?.message}
                  required
                  value={value}
                  onChange={event => onChange(event.target.value)}
                  onBlur={() => trigger('schoolName')}
                />
              )}
            />

            <Controller
              control={control}
              name="cheerType"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <AppSelect
                  label="Type of Cheer"
                  placeholder="Select Type"
                  selectedValue={value}
                  onChangeSelected={onChange}
                  options={cheerTypeOptions}
                  errorMessage={error?.message}
                  disabled={!isEditing}
                  fullWidth
                  required
                />
              )}
            />

            <Controller
              control={control}
              name="cheerStyle"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <AppSelect
                  label="Style of Cheer"
                  placeholder="Select Style"
                  selectedValue={value}
                  onChangeSelected={onChange}
                  options={cheerStyleOptions}
                  errorMessage={error?.message}
                  disabled={!isEditing}
                  fullWidth
                  required
                />
              )}
            />

            <Controller
              control={control}
              name="role"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <AppSelect
                  label="Role"
                  placeholder="Select Role"
                  selectedValue={value}
                  onChangeSelected={onChange}
                  options={roleOptionsByType}
                  errorMessage={error?.message}
                  disabled={!isEditing}
                  fullWidth
                  required
                />
              )}
            />

            <Controller
              control={control}
              name="equipment"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <AppMultipleSelect
                  label="Equipment Access"
                  options={equipmentOptions}
                  selectedValues={value}
                  onChangeSelected={onChange}
                  placeholder="Select Equipment"
                  errorMessage={error?.message}
                  disabled={!isEditing}
                  enableCheckAll
                  labelCheckAll="All Equipment"
                />
              )}
            />

            <Controller
              control={control}
              name="measurementUnit"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <AppSelect
                  label="Measurement Unit"
                  options={
                    measurementUnitOptions.length
                      ? measurementUnitOptions
                      : MEASUREMENT_UNIT_OPTIONS
                  }
                  selectedValue={value}
                  onChangeSelected={onChange}
                  placeholder="Select Unit"
                  errorMessage={error?.message}
                  disabled={!isEditing}
                  fullWidth
                  required
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
