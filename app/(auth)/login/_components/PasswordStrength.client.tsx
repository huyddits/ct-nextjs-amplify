'use client';

import { useEffect, useMemo, useState } from 'react';
import * as $v from '@/utils/validators';

export default function PasswordStrength({ password }: { password: string }) {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [strengthText, setStrengthText] = useState('');

  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      setStrengthText('');
      return;
    }

    // Calculate strength based on various criteria
    let strength = 0;
    let checks = 0;

    // Check length
    if (password.length >= 8) {
      strength += 25;
      checks++;
    }

    // Check for uppercase letters
    if ($v.isContainUppercase(password)) {
      strength += 25;
      checks++;
    }

    // Check for lowercase letters
    if ($v.isContainLowercase(password)) {
      strength += 25;
      checks++;
    }

    // Check for numbers
    if ($v.isContainNumber(password)) {
      strength += 25;
      checks++;
    }

    // Check for special characters
    if ($v.isContainSpecialChar(password)) {
      strength += 25;
      checks++;
    }

    // Normalize strength to 100
    strength = Math.min(100, Math.floor(strength));

    // Set strength text based on score
    if (strength < 30) {
      setStrengthText('Weak');
    } else if (strength < 60) {
      setStrengthText('Medium');
    } else if (strength < 80) {
      setStrengthText('Strong');
    } else {
      setStrengthText('Very Strong');
    }

    setPasswordStrength(strength);
  }, [password]);

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
