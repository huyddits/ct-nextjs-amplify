'use client';

import React, { useEffect, useMemo, useState } from 'react';
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
import { ROUTES, USER_TYPE_OPTIONS } from '@/utils/constants';
import { useCategories, useSafeAreaInset } from '@/hooks';
import { useSignup } from '../_hooks';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import AppMultipleSelect from '@/components/compose/AppMultipleSelect';
import { FooterSection, PasswordStrength } from '../../_components';
import { AccountType } from '@/utils/types';
import LoginLinkSection from './LoginLinkSection';

export default function SignupForm() {
  const router = useRouter();
  const {
    roles: roleOptions,
    cheerStyles: cheerStyleOptions,
    cheerTypes: cheerTypeOptions,
    equipments: equipmentOptions,
    measurementUnits: measurementUnitOptions,
  } = useCategories();

  const {
    control,
    isValid,
    userType,
    password,
    loading,
    onSubmit,
    trigger,
    setValue,
    getValues,
    reset,
  } = useSignup({
    onSuccess: () => {
      toast.success('Account create successfully');
      router.push(`/${ROUTES.LOGIN}`);
    },
    onFailure: () => {
      toast.error('Something went wrong');
    },
  });

  const [isAgree, setIsAgree] = useState(false);

  const roleOptionsByType = useMemo(() => {
    return roleOptions?.filter(item => item.isCoach === (userType === AccountType.Coach)) || [];
  }, [roleOptions, userType]);

  useEffect(() => {
    setValue('role', roleOptionsByType.find(item => item.isCoach)?.value ?? '');
  }, [userType]);

  const onCacheInfo = () => {
    const value = getValues();
    sessionStorage.setItem('signupFormData', JSON.stringify(value));
  };
  useEffect(() => {
    const cachedData = sessionStorage.getItem('signupFormData');
    const clearSessionStorage = () => {
      sessionStorage.removeItem('signupFormData');
    };
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);

      setTimeout(() => {
        reset(parsedData, {
          keepErrors: false,
          keepDefaultValues: false,
        });
        clearSessionStorage();
      });
    }
    window.addEventListener('beforeunload', clearSessionStorage);
    () => {
      window.removeEventListener('beforeunload', clearSessionStorage);
    };
  }, []);
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <Controller
          control={control}
          name="userType"
          render={({ field: { value, onChange } }) => (
            <AppRadioGroup
              label="I am a:"
              options={USER_TYPE_OPTIONS}
              selected={value}
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
              required
              password
              {...field}
              onBlur={() => trigger('password')}
              errorMessage={error?.type === 'required' ? error.message : undefined}
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
              onBlur={() => trigger('confirmPassword')}
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
              onBlur={() => trigger('dateOfBirth')}
              errorMessage={error?.message}
              fullWidth
              required
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
              options={cheerTypeOptions || []}
              errorMessage={error?.message}
              fullWidth
              required
              selectedValue={value}
              onChangeSelected={onChange}
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
              options={cheerStyleOptions || []}
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
                options={roleOptionsByType}
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
              options={equipmentOptions || []}
              selectedValues={value}
              onChangeSelected={onChange}
              placeholder="Select Equipment"
              errorMessage={error?.message}
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
              options={measurementUnitOptions || []}
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
          <Label htmlFor="terms" className="text-sm gap-1">
            I agree to the
            <Link
              href={`/${ROUTES.TERMS_AND_CONDITIONS}`}
              className="text-primary hover:underline"
              target="_blank"
            >
              Terms and Conditions
            </Link>
          </Label>
        </div>

        <Button type="submit" className="w-full" disabled={!isAgree || !isValid} loading={loading}>
          Create Account
          <ChevronRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </form>

      <LoginLinkSection />
      <FooterSection onNavigate={onCacheInfo} />
    </div>
  );
}
