'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircleIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
interface AvailablePlanBlockProps {
  className?: string;
}
export default function AvailablePlanBlock({ className }: AvailablePlanBlockProps) {
  const [promoApplied, setPromoApplied] = useState(false);
  const [currentPlan, setCurrentPlan] = useState({
    name: 'Coach Plan',
    price: 9.99,
    interval: 'monthly',
    status: 'active',
  });
  return (
    <div className={cn('bg-white p-4 rounded-lg shadow-sm mb-4', className)}>
      <h2 className="text-sm text-gray-600 mb-3">Available Plans</h2>

      <div className="space-y-4">
        <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wider mt-2">
          Coach Plans
        </h3>

        {/* Monthly Coach Plan */}
        <div className="border rounded-md p-3 flex justify-between items-center">
          <div>
            <div className="font-medium">Coach Plan</div>
            <div className="text-sm text-gray-600">$9.99/month</div>
            <div className="text-xs text-gray-600">Billed monthly</div>
          </div>
          {currentPlan.name === 'Coach Plan' && currentPlan.interval === 'monthly' ? (
            <div className="bg-green-50 text-green-600 text-xs font-medium px-2.5 py-1 rounded">
              Current
            </div>
          ) : (
            <Button variant="outline" size="sm" className="text-xs">
              Switch
            </Button>
          )}
        </div>

        {/* 3-Month Coach Plan */}
        <div
          className={`border rounded-md p-3 ${promoApplied ? 'border-green-300 bg-green-50' : ''}`}
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">Coach Plan - 3 Months</div>
              {promoApplied ? (
                <div className="flex items-center">
                  <div className="text-sm text-gray-400 line-through mr-2">$29.97</div>
                  <div className="text-sm text-green-600 font-medium">$25.47</div>
                  <Badge className="ml-2 bg-green-600">Save 15%</Badge>
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="text-sm text-gray-400 line-through mr-2">$29.97</div>
                  <div className="text-sm text-blue-600 font-medium">$28.47</div>
                  <Badge className="ml-2 bg-blue-600">Save 5%</Badge>
                </div>
              )}
              <div className="text-xs text-gray-600">Billed every 3 months</div>
            </div>
            {currentPlan.name === 'Coach Plan' && currentPlan.interval === 'quarterly' ? (
              <div className="bg-green-50 text-gray-600 text-xs font-medium px-2.5 py-1 rounded">
                Current
              </div>
            ) : (
              <Button variant="outline" size="sm" className="text-xs">
                Switch
              </Button>
            )}
          </div>
          {promoApplied && (
            <div className="mt-2 text-xs text-green-600 flex items-center">
              <CheckCircleIcon className="h-3 w-3 mr-1" />
              Promo code CHEER1 applied - 15% off for 3 months
            </div>
          )}
        </div>

        {/* Annual Coach Plan */}
        <div className="border rounded-md p-3 flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 right-0">
            <div className="bg-blue-600 text-white text-xs px-4 py-1 rotate-45 translate-x-2 translate-y-2">
              Best Value
            </div>
          </div>
          <div>
            <div className="font-medium">Coach Plan - Annual</div>
            <div className="flex items-center">
              <div className="text-sm text-gray-400 line-through mr-2">$119.88</div>
              <div className="text-sm text-blue-600 font-medium">$107.89</div>
              <Badge className="ml-2 bg-blue-600">Save 10%</Badge>
            </div>
            <div className="text-xs text-gray-600">Billed annually</div>
          </div>
          {currentPlan.name === 'Coach Plan' && currentPlan.interval === 'annual' ? (
            <div className="bg-green-50 text-gray-600 text-xs font-medium px-2.5 py-1 rounded">
              Current
            </div>
          ) : (
            <Button variant="outline" size="sm" className="text-xs">
              Switch
            </Button>
          )}
        </div>

        <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wider mt-4">
          Athlete Plans
        </h3>

        {/* Monthly Athlete Plan */}
        <div className="border rounded-md p-3 flex justify-between items-center">
          <div>
            <div className="font-medium">Athlete Plan</div>
            <div className="text-sm text-gray-600">$4.99/month</div>
            <div className="text-xs text-gray-600">Billed monthly</div>
          </div>
          {currentPlan.name === 'Athlete Plan' && currentPlan.interval === 'monthly' ? (
            <div className="bg-green-50 text-gray-600 text-xs font-medium px-2.5 py-1 rounded">
              Current
            </div>
          ) : (
            <Button variant="outline" size="sm" className="text-xs">
              Switch
            </Button>
          )}
        </div>

        {/* 3-Month Athlete Plan */}
        <div
          className={`border rounded-md p-3 ${promoApplied ? 'border-green-300 bg-green-50' : ''}`}
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">Athlete Plan - 3 Months</div>
              {promoApplied ? (
                <div className="flex items-center">
                  <div className="text-sm text-gray-400 line-through mr-2">$14.97</div>
                  <div className="text-sm text-green-600 font-medium">$12.72</div>
                  <Badge className="ml-2 bg-green-600">Save 15%</Badge>
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="text-sm text-gray-400 line-through mr-2">$14.97</div>
                  <div className="text-sm text-blue-600 font-medium">$14.22</div>
                  <Badge className="ml-2 bg-blue-600">Save 5%</Badge>
                </div>
              )}
              <div className="text-xs text-gray-600">Billed every 3 months</div>
            </div>
            {currentPlan.name === 'Athlete Plan' && currentPlan.interval === 'quarterly' ? (
              <div className="bg-green-50 text-gray-600 text-xs font-medium px-2.5 py-1 rounded">
                Current
              </div>
            ) : (
              <Button variant="outline" size="sm" className="text-xs">
                Switch
              </Button>
            )}
          </div>
          {promoApplied && (
            <div className="mt-2 text-xs text-green-600 flex items-center">
              <CheckCircleIcon className="h-3 w-3 mr-1" />
              Promo code CHEER1 applied - 15% off for 3 months
            </div>
          )}
        </div>

        {/* Annual Athlete Plan */}
        <div className="border rounded-md p-3 flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 right-0">
            <div className="bg-blue-600 text-white text-xs px-4 py-1 rotate-45 translate-x-2 translate-y-2">
              Best Value
            </div>
          </div>
          <div>
            <div className="font-medium">Athlete Plan - Annual</div>
            <div className="flex items-center">
              <div className="text-sm text-gray-400 line-through mr-2">$59.88</div>
              <div className="text-sm text-blue-600 font-medium">$53.89</div>
              <Badge className="ml-2 bg-blue-600">Save 10%</Badge>
            </div>
            <div className="text-xs text-gray-600">Billed annually</div>
          </div>
          {currentPlan.name === 'Athlete Plan' && currentPlan.interval === 'annual' ? (
            <div className="bg-green-50 text-gray-600 text-xs font-medium px-2.5 py-1 rounded">
              Current
            </div>
          ) : (
            <Button variant="outline" size="sm" className="text-xs">
              Switch
            </Button>
          )}
        </div>
      </div>

      <div className="text-xs text-gray-600 mt-3">
        All plans automatically renew until canceled. You can cancel anytime.
      </div>
    </div>
  );
}
