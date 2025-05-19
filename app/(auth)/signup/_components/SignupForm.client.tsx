'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MailIcon,
  LockIcon,
  ChevronRightIcon,
  UserIcon,
  CalendarIcon,
  SchoolIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Controller } from 'react-hook-form';
import { AppDatePicker, AppInput, AppRadioGroup, AppSelect } from '@/components/compose';
import { MEASUREMENT_UNIT_OPTIONS, ROUTES, USER_TYPE_OPTIONS } from '@/utils/constants';
import { useCategories } from '@/hooks';
import { useSignup } from '../_hooks';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import AppMultipleSelect from '@/components/compose/AppMultipleSelect';
import { PasswordStrength } from '../../_components';

export default function SignupForm() {
  const router = useRouter();
  const {
    roles: roleOptions,
    cheerStyles: cheerStyleOptions,
    cheerTypes: cheerTypeOptions,
    equipments: equipmentOptions,
    measurementUnits: _measurementUnitOptions,
  } = useCategories();
  const { control, isValid, userType, password, onSubmit, trigger } = useSignup({
    onSuccess: () => {
      toast.success('Account create successfully');
      router.push(`/${ROUTES.LOGIN}`);
    },
    onFailure: () => {
      toast.error('Something went wrong');
    },
  });

  const [isAgree, setIsAgree] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <Controller
          control={control}
          name="userType"
          render={({ field: { value, onChange }, fieldState }) => (
            <AppRadioGroup
              label="I am a:"
              options={USER_TYPE_OPTIONS}
              defaultSelected={value}
              onChangeSelected={onChange}
            />
          )}
        />

        <div className="border-t border-gray-200 pt-4"></div>

        <div className="grid grid-cols-2 gap-4">
          <Controller
            control={control}
            name="firstName"
            render={({ field, fieldState: { error } }) => (
              <AppInput
                label="First Name"
                icon={<UserIcon className="icon-input" />}
                inputProps={{ placeholder: 'First' }}
                errorMessage={error?.message}
                required
                {...field}
                onBlur={() => trigger('firstName')}
              />
            )}
          />

          <Controller
            control={control}
            name="lastName"
            render={({ field, fieldState: { error } }) => {
              return (
                <AppInput
                  label="Last Name"
                  icon={<UserIcon className="icon-input" />}
                  inputProps={{ placeholder: 'Last' }}
                  errorMessage={error?.message}
                  required
                  {...field}
                  onBlur={() => trigger('lastName')}
                />
              );
            }}
          />
        </div>

        <Controller
          control={control}
          name="email"
          render={({ field, fieldState: { error } }) => {
            return (
              <AppInput
                label="Email"
                icon={<MailIcon className="icon-input" />}
                inputProps={{ placeholder: 'name@example.com' }}
                errorMessage={error?.message}
                required
                {...field}
                onBlur={() => trigger('email')}
              />
            );
          }}
        />

        <Controller
          control={control}
          name="password"
          render={({ field, fieldState: { error } }) => (
            <AppInput
              label="Password"
              icon={<LockIcon className="icon-input" />}
              inputProps={{ placeholder: 'Password' }}
              errorMessage={error?.message}
              required
              password
              {...field}
            />
          )}
        />

        <PasswordStrength password={password} />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field, fieldState: { error } }) => (
            <AppInput
              label="Confirm Password"
              icon={<LockIcon className="icon-input" />}
              inputProps={{ placeholder: 'Confirm Password' }}
              errorMessage={error?.message}
              required
              password
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="dateOfBirth"
          render={({ field, fieldState: { error } }) => (
            <AppDatePicker
              icon={<CalendarIcon className="icon-input" />}
              label="Date of Birth"
              dateFormat="MM/dd/yyyy"
              placeholder="mm/dd/yyyy"
              maxDate={new Date()}
              value={field.value}
              onChange={field.onChange}
              errorMessage={error?.message}
              fullWidth
            />
          )}
        />

        <Controller
          control={control}
          name="schoolName"
          render={({ field, fieldState: { error } }) => (
            <AppInput
              label="School Name"
              icon={<SchoolIcon className="icon-input" />}
              inputProps={{ placeholder: 'School Name' }}
              errorMessage={error?.message}
              required
              {...field}
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
              selectedValue={value}
              onChangeSelected={onChange}
              placeholder="Select Style"
              options={cheerStyleOptions}
              errorMessage={error?.message}
              fullWidth
              required
            />
          )}
        />

        {userType === 'athlete' ? (
          <Controller
            control={control}
            name="role"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <AppSelect
                label="Role"
                options={roleOptions}
                selectedValue={value}
                onChangeSelected={onChange}
                placeholder="Select Role"
                errorMessage={error?.message}
                fullWidth
                required
              />
            )}
          />
        ) : (
          <div className="space-y-2">
            <Label htmlFor="role">
              Role <span className="text-red-500">*</span>
            </Label>
            <Input id="role" value="Coach" disabled className="bg-gray-50" />
          </div>
        )}

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
            />
          )}
        />

        <Controller
          control={control}
          name="measurementUnit"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <AppSelect
              label="Mesurement Unit"
              // options={measurementUnitOptions}
              options={MEASUREMENT_UNIT_OPTIONS}
              selectedValue={value}
              onChangeSelected={onChange}
              placeholder="Select Unit"
              errorMessage={error?.message}
              fullWidth
              required
            />
          )}
        />

        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={isAgree}
            onCheckedChange={checked => setIsAgree(checked === 'indeterminate' ? false : checked)}
          />
          <Label htmlFor="terms" className="text-sm">
            I agree to the{' '}
            <Link
              href="/term-and-conditions"
              className="text-primary hover:underline"
              target="_blank"
            >
              Terms and Conditions
            </Link>
          </Label>
        </div>

        <Button type="submit" className="w-full" disabled={!isAgree || !isValid}>
          Create Account
          <ChevronRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </form>

      {/* <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or sign up with</span>
          </div>
        </div>

        <SSOViaSocial type="signup" />
      </div> */}
    </div>
  );
}
