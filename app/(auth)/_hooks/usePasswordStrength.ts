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

  return {
    passwordStrength,
    strengthText,
  };
};
