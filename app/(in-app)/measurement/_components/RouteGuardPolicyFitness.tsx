'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useAcknowledgement } from '@/hooks';
import { useAuthStore } from '@/store';
import { AccountType } from '@/utils/types';
import { CoachFitnessPolicy, AthleteFitnessPolicy } from '../_components';
export default function RouteGuardPolicyFitness() {
  const {
    loading,
    acknowledgementStrength,
    acknowledgementCardio,
    acknowledgementFitness,
    updateAcknowledge,
  } = useAcknowledgement();
  const { info } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isAgree, setIsAgree] = useState(false);

  const onClickAgree = () => {
    updateAcknowledge({
      acknowledgementStrength: acknowledgementStrength,
      acknowledgementCardio: acknowledgementCardio,
      acknowledgementFitness: true,
    });
  };
  const onClickCancel = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!acknowledgementFitness) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [acknowledgementFitness]);
  return (
    <Dialog open={isOpen}>
      <DialogContent className="[&_[data-slot=dialog-close]]:hidden">
        <DialogHeader>
          <DialogTitle className="font-bold">IMPORTANT SAFETY NOTICE AND DISCLAIMER</DialogTitle>
          <DialogDescription className="text-gray-600">
            FITNESS SAFETY REQUIREMENTS
          </DialogDescription>
        </DialogHeader>

        {info?.accountType === AccountType.Coach ? (
          <CoachFitnessPolicy />
        ) : (
          <AthleteFitnessPolicy />
        )}

        <div>
          <Label>
            <Checkbox
              checked={isAgree}
              onCheckedChange={value => setIsAgree(value === 'indeterminate' ? false : value)}
            />
            I understand and agree to the above terms
          </Label>
        </div>
        <div className="flex gap-2 w-fit ml-auto">
          <Button onClick={onClickAgree} disabled={!isAgree} loading={loading}>
            Agree
          </Button>
          <Button variant="outline" onClick={onClickCancel}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
