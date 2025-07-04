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
import { useAcknowledgement, useRole } from '@/hooks';
import { useAuthStore } from '@/store';
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
  const [allowChecked, setAllowChecked] = useState(false);
  const { isCoach } = useRole();
  const [allowCheckedRef, setAllowCheckedRef] = useState<HTMLDivElement | null>(null);
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

  useEffect(() => {
    if (allowCheckedRef) {
      const observer = new IntersectionObserver(
        entries => {
          const isInView = entries[0].isIntersecting;
          if (isInView) {
            setAllowChecked(true);
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(allowCheckedRef);
      return () => observer.disconnect();
    }
  }, [allowCheckedRef]);

  return (
    <Dialog open={isOpen}>
      <DialogContent className="[&_[data-slot=dialog-close]]:hidden">
        <DialogHeader>
          <DialogTitle className="font-bold">IMPORTANT SAFETY NOTICE AND DISCLAIMER</DialogTitle>
          <DialogDescription className="text-gray-600">
            FITNESS SAFETY REQUIREMENTS
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[400px] overflow-y-auto">
          {isCoach ? (
            <CoachFitnessPolicy ref={ref => setAllowCheckedRef(ref)} />
          ) : (
            <AthleteFitnessPolicy ref={ref => setAllowCheckedRef(ref)} />
          )}
          <div aria-hidden className="h-px" aria-label="bottom" />
        </div>

        <div>
          <Label>
            <Checkbox
              disabled={!allowChecked}
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
