"use client";

import React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import {
  EyeIcon,
  EyeOffIcon,
  MailIcon,
  LockIcon,
  ChevronRightIcon,
  UserIcon,
  CalendarIcon,
  SchoolIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    userType: "athlete", // Default to athlete
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    schoolName: "",
    cheerType: "",
    cheerStyle: "",
    role: "",
    equipment: "",
    measurementUnit: "",
  });

  // Update role when userType changes
  useEffect(() => {
    if (formData.userType === "coach") {
      setFormData((prev) => ({
        ...prev,
        role: "coach",
      }));
    } else if (formData.userType === "athlete" && formData.role === "coach") {
      // Reset role if switching from coach to athlete and role was set to coach
      setFormData((prev) => ({
        ...prev,
        role: "",
      }));
    }
  }, [formData.userType]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log("Signup attempt with:", formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label id="user-type-label" className="text-base font-medium">
            I am a:
          </Label>
          <RadioGroup
            defaultValue={formData.userType}
            onValueChange={(value) => handleSelectChange("userType", value)}
            className="flex space-x-4"
            aria-labelledby="user-type-label"
            id="user-typ"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                id="athlete"
                value="athlete"
                aria-labelledby="athlete-label"
              />
              <Label
                id="athlete-label"
                htmlFor="athlete"
                className="cursor-pointer"
              >
                Athlete
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                id="coach"
                value="coach"
                aria-labelledby="coach-label"
              />
              <Label
                id="coach-label"
                htmlFor="coach"
                className="cursor-pointer"
              >
                Coach
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="border-t border-gray-200 pt-4"></div>

        {/* First Name and Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First"
                className="pl-10"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MailIcon className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              className="pl-10"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LockIcon className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className="pl-10 pr-10"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LockIcon className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className="pl-10 pr-10"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? (
                <EyeOffIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CalendarIcon className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              className="pl-10"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="schoolName">School Name</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SchoolIcon className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="schoolName"
              name="schoolName"
              type="text"
              placeholder="School Name"
              className="pl-10"
              value={formData.schoolName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label  id="cheer-type-label">
            Type of Cheer
          </Label>
          <Select
            onValueChange={(value) => handleSelectChange("cheerType", value)}
            value={formData.cheerType}
          >
            <SelectTrigger aria-labelledby="cheer-type-label">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-star">All Star</SelectItem>
              <SelectItem value="college">College</SelectItem>
              <SelectItem value="high-school">High School</SelectItem>
              <SelectItem value="recreational">Recreational</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cheerStyle">Style of Cheer</Label>
          <Select
            onValueChange={(value) => handleSelectChange("cheerStyle", value)}
            value={formData.cheerStyle}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-girl">All Girl</SelectItem>
              <SelectItem value="coed">Coed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {formData.userType === "athlete" ? (
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              onValueChange={(value) => handleSelectChange("role", value)}
              value={formData.role}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="base">Base</SelectItem>
                <SelectItem value="flyer">Flyer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input id="role" value="Coach" disabled className="bg-gray-50" />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="equipment">Equipment Access</Label>
          <div className="relative">
            <Select
              onValueChange={(value) => handleSelectChange("equipment", value)}
              value={formData.equipment}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Equipment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-equipment">1. All Equipment</SelectItem>
                <SelectItem value="body-weight">2. Body Weight</SelectItem>
                <SelectItem value="resistance-band">
                  3. Resistance Band
                </SelectItem>
                <SelectItem value="dumbbell">4. Dumbbell</SelectItem>
                <SelectItem value="kettlebell">5. Kettlebell</SelectItem>
                <SelectItem value="ankle-wrist-weight">
                  6. Ankle & Wrist Weight
                </SelectItem>
                <SelectItem value="cable-machine">7. Cable Machine</SelectItem>
                <SelectItem value="agility-ladder">
                  8. Agility Ladder
                </SelectItem>
                <SelectItem value="landmine-barbell">
                  9. Landmine and Barbell
                </SelectItem>
                <SelectItem value="machines">10. Machines</SelectItem>
                <SelectItem value="weighted-ball">11. Weighted Ball</SelectItem>
                <SelectItem value="balance-equipment">
                  12. Balance Equipment
                </SelectItem>
                <SelectItem value="step">13. Step</SelectItem>
                <SelectItem value="plyometric-box">
                  14. Plyometric Box
                </SelectItem>
                <SelectItem value="foam-roller">15. Foam Roller</SelectItem>
                <SelectItem value="exercise-ball">16. Exercise Ball</SelectItem>
                <SelectItem value="free-weights">17. Free Weights</SelectItem>
                <SelectItem value="chair">18. Chair</SelectItem>
                <SelectItem value="jump-rope">19. Jump Rope</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="measurementUnit">Measurement Unit</Label>
          <Select
            onValueChange={(value) =>
              handleSelectChange("measurementUnit", value)
            }
            value={formData.measurementUnit}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="imperial">Imperial (lb, ft)</SelectItem>
              <SelectItem value="metric">Metric (kg, m)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms" className="text-sm">
            I agree to the{" "}
            <Link
              href="/terms-and-conditions"
              className="text-[#257951] hover:underline"
            >
              Terms and Conditions
            </Link>
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#257951] hover:bg-[#1a5a3a]"
        >
          Create Account
          <ChevronRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or sign up with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <Button variant="outline" className="w-full">
            <Icon icon="simple-icons:facebook" color="#1877F2" />
            <span className="sr-only">Facebook</span>
          </Button>
          <Button variant="outline" className="w-full">
            <Icon icon="simple-icons:twitter" color="#1DA1F2" />
            <span className="sr-only">Twitter</span>
          </Button>
          <Button variant="outline" className="w-full">
            <Icon icon="simple-icons:instagram" color="#E1306C" />
            <span className="sr-only">Instagram</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
