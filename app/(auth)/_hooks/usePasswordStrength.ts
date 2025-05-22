import { useState, useEffect } from 'react';
import * as $v from '@/utils/validators';
export const usePasswordStrength = (password: string) => {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [strengthText, setStrengthText] = useState('');
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      setStrengthText('');
      return;
    }

    let strength = 0;
    let checks = 0;

    if ($v.isContainUppercase(password)) {
      strength += 25;
      checks++;
    }

    if ($v.isContainLowercase(password)) {
      strength += 25;
      checks++;
    }

    if ($v.isContainNumber(password)) {
      strength += 25;
      checks++;
    }

    if ($v.isContainSpecialChar(password)) {
      strength += 25;
      checks++;
    }

    strength = Math.min(100, Math.floor(strength));

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

  return {
    passwordStrength,
    strengthText,
  };
};
