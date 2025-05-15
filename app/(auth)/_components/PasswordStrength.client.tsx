'use client';

import { useMemo } from 'react';
import * as $v from '@/utils/validators';
import { usePasswordStrength } from '@/app/(auth)/_hooks';

export default function PasswordStrength({ password }: { password: string }) {
  const { passwordStrength, strengthText } = usePasswordStrength(password);

  const strengthTextColor = useMemo(() => {
    if (passwordStrength < 30) return 'text-red-500';
    if (passwordStrength < 60) return 'text-yellow-500';
    if (passwordStrength < 80) return 'text-green-400';
    return 'text-green-600';
  }, [passwordStrength]);

  const strengthProgressColor = useMemo(() => {
    if (passwordStrength < 30) return 'bg-red-500';
    if (passwordStrength < 60) return 'bg-yellow-500';
    if (passwordStrength < 80) return 'bg-green-400';
    return 'bg-green-500';
  }, [passwordStrength]);

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">Password strength:</span>
        <span className={`text-xs font-medium ${strengthTextColor}`}>{strengthText}</span>
      </div>

      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${strengthProgressColor} transition-all duration-300 ease-in-out`}
          style={{ width: `${passwordStrength}%` }}
          aria-valuenow={passwordStrength}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {passwordStrength < 60 && (
          <ul className="list-disc list-inside space-y-0.5">
            {password.length < 8 && <li>Use at least 8 characters</li>}
            {!$v.isContainUppercase(password) && <li>Include uppercase letters</li>}
            {!$v.isContainLowercase(password) && <li>Include lowercase letters</li>}
            {!$v.isContainNumber(password) && <li>Include numbers</li>}
            {!$v.isContainSpecialChar(password) && <li>Include special characters</li>}
          </ul>
        )}
      </div>
    </div>
  );
}
