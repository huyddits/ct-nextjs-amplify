'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuthStore } from '@/store';
import { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/utils/constants';
import { useAckowledgement } from '@/hooks';

export default function RouteGuardPolicyStrength() {
  const {
    acknowledgementStrength,
    acknowledgementCardio,
    acknowledgementFitness,
    updateAcknowledge,
  } = useAckowledgement();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const onClickAgree = () => {
    updateAcknowledge({
      acknowledgementStrength: true,
      acknowledgementCardio: acknowledgementCardio,
      acknowledgementFitness: acknowledgementFitness,
    });
  };
  const onClickCancel = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    console.log('acknowledgementStrength', acknowledgementStrength);
    if (!acknowledgementStrength) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [acknowledgementStrength]);
  return (
    <Dialog open={isOpen}>
      <DialogContent className="[&_[data-slot=dialog-close]]:hidden">
        <DialogHeader>
          <DialogTitle className="font-bold">IMPORTANT SAFETY NOTICE AND DISCLAIMER</DialogTitle>
          <DialogDescription>
            <h3 className="text-gray-600">STRENGTH TRAINING SAFETY REQUIREMENTS</h3>
          </DialogDescription>
        </DialogHeader>
        <div className="text-sm space-y-6 overflow-auto h-[400px]">
          <h4 className="font-bold text-lg">SPECIFIC MEDICAL CLEARANCE REQUIRED FOR:</h4>
          <ul className="list-disc pl-5">
            <li>
              Any cardiovascular condition (heart disease, arrhythmia, high blood pressure
              &gt;140/90, heart murmur)
            </li>
            <li>
              Respiratory conditions (asthma, exercise-induced bronchospasm, chronic lung disease)
            </li>
            <li>Metabolic disorders (diabetes, thyroid disorders, metabolic syndrome)</li>
            <li>Musculoskeletal injuries or surgeries within the past 12 months</li>
            <li>Neurological conditions (seizures, concussion history, balance disorders)</li>
            <li>Joint instability, arthritis, or chronic pain conditions</li>
            <li>Current pregnancy or recent childbirth (within 6 months)</li>
            <li>Any medication that affects heart rate, blood pressure, or exercise capacity</li>
            <li>History of eating disorders or body dysmorphia</li>
            <li>Recent surgery or current physical therapy treatment</li>
          </ul>

          <h4 className="font-bold text-lg">AGE AND PARENTAL CONSENT REQUIREMENTS:</h4>
          <ul className="list-disc pl-5">
            <li>
              Users under 18 must have explicit written parental/guardian consent before
              participation
            </li>
            <li>
              Users under 16 require direct adult supervision during all strength training
              activities
            </li>
            <li>
              Minors with any health conditions require both medical clearance AND parental
              acknowledgment of risks
            </li>
          </ul>

          <h4 className="font-bold text-lg">
            ABSOLUTE CONTRAINDICATIONS - DO NOT PARTICIPATE IF YOU HAVE:
          </h4>
          <ul className="list-disc pl-5">
            <li>Uncontrolled high blood pressure (&gt;180/110)</li>
            <li>
              Recent heart attack or cardiac procedure (within 6 months without medical clearance)
            </li>
            <li>Active inflammatory conditions, infection, or fever</li>
            <li>Acute injuries or severe joint pain</li>
            <li>Pregnancy complications or high-risk pregnancy</li>
            <li>Recent surgery without specific medical clearance for resistance training</li>
            <li>Severe osteoporosis or bone density issues</li>
          </ul>

          <h4 className="font-bold text-lg">COMPREHENSIVE SAFETY REQUIREMENTS</h4>

          <h5 className="mb-2 font-semibold">Equipment Safety:</h5>
          <ul className="list-disc pl-5">
            <li>Inspect all equipment before use for damage, wear, or malfunction</li>
            <li>Use equipment only as designed and within weight/capacity limits</li>
            <li>Ensure proper equipment setup and safety features (collars, safety bars, etc.)</li>
            <li>Never use damaged or improvised equipment</li>
            <li>Report any equipment issues immediately</li>
          </ul>

          <h5 className="mb-2 font-semibold">Training Safety Protocols:</h5>
          <ul className="list-disc pl-5">
            <li>Always use appropriate spotters for exercises that require them</li>
            <li>Start with lighter weights and progress gradually</li>
            <li>Warm up for minimum 10 minutes before resistance training</li>
            <li>Stop any exercise immediately if you experience unusual symptoms</li>
            <li>
              Allow minimum 48 hours recovery between intense training sessions for same muscle
              groups
            </li>
            <li>Progress gradually - no more than 10% increase in intensity/volume per week</li>
          </ul>

          <h5 className="mb-2 font-semibold">Environmental Safety Requirements:</h5>
          <ul className="list-disc pl-5">
            <li>Ensure adequate ventilation and appropriate temperature (65–75°F)</li>
            <li>Verify sufficient space for safe movement and emergency access</li>
            <li>Confirm proper lighting for exercise visibility and safety</li>
            <li>Remove obstacles and ensure non-slip surfaces</li>
            <li>Have emergency communication access (phone) readily available</li>
            <li>Ensure first aid supplies are accessible during training sessions</li>
          </ul>

          <h4 className="font-bold text-lg">EMERGENCY PROCEDURES:</h4>
          <p>Stop all activity immediately if experiencing:</p>
          <ul className="list-disc pl-5">
            <li>Chest pain or pressure</li>
            <li>Difficulty breathing or shortness of breath</li>
            <li>Dizziness, lightheadedness, or nausea</li>
            <li>Unusual fatigue or weakness</li>
            <li>Joint pain or muscle injury</li>
            <li>Any concerning symptoms</li>
          </ul>
          <p>Call 911 immediately for:</p>
          <ul>
            <li>Chest pain or signs of heart attack</li>
            <li>Severe shortness of breath</li>
            <li>Loss of consciousness</li>
            <li>Severe injury or suspected fracture</li>
            <li>Signs of stroke (facial drooping, arm weakness, speech difficulty)</li>
          </ul>

          <h5 className="mb-2 font-semibold">Emergency Preparedness:</h5>
          <ul>
            <li>Have emergency contact information readily available</li>
            <li>Know location of nearest medical facility</li>
            <li>Maintain current first aid knowledge</li>
            <li>Have emergency action plan in place</li>
          </ul>

          <h4 className="font-bold text-lg">INHERENT RISK ACKNOWLEDGMENT:</h4>
          <p>
            Strength training carries significant inherent risks of injury, including but not
            limited to:
          </p>
          <ul>
            <li>Muscle strains, tears, and overuse injuries</li>
            <li>Joint injuries including sprains, dislocations, and chronic wear</li>
            <li>Equipment-related injuries</li>
            <li>Acute injuries from loss of balance, improper form, or excessive loading</li>
            <li>Cardiovascular events during high-intensity exercises</li>
            <li>Spinal injuries</li>
            <li>In rare cases, serious injury, permanent disability, or death</li>
          </ul>

          <h4 className="font-bold text-lg">RECOVERY AND PROGRESSION REQUIREMENTS:</h4>
          <ul>
            <li>Allow minimum 48 hours recovery between intense training sessions</li>
            <li>Progress gradually - no more than 10% increase per week</li>
            <li>Stop training if performance decreases or fatigue persists</li>
            <li>Maintain proper nutrition and hydration</li>
            <li>Seek medical attention for persistent pain or unusual symptoms</li>
          </ul>

          <h4 className="font-bold text-lg">COMPREHENSIVE LIABILITY WAIVER:</h4>
          <p>
            <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</strong>
          </p>
          <p>You understand and voluntarily assume all risks associated with strength training.</p>
          <ul>
            <li>
              You release Cheer Trainer LLC, its officers, directors, employees, and affiliates from
              any claims
            </li>
            <li>You assume full responsibility for any resulting expenses or damages</li>
            <li>
              Our total liability for any claims related to strength training shall not exceed $100
            </li>
          </ul>

          <h4 className="font-bold text-lg">HEALTH DATA PRIVACY NOTICE:</h4>
          <p>
            By using these features, you consent to the collection and processing of health and
            fitness data as described in our Privacy Policy.
          </p>

          <h4 className="font-bold text-lg">GENERAL WARNINGS:</h4>
          <ul>
            <li>
              <strong>INDIVIDUAL RESPONSIBILITY:</strong> Participation is entirely at your own risk
            </li>
            <li>
              <strong>NO MEDICAL ADVICE:</strong> This is not a substitute for medical
              diagnosis/treatment
            </li>
            <li>
              <strong>RESULTS NOT GUARANTEED:</strong> Individual results may vary
            </li>
            <li>
              <strong>TECHNICAL ERRORS:</strong> Platform content may contain inaccuracies
            </li>
          </ul>

          <h4 className="font-bold text-lg">ACKNOWLEDGMENT REQUIRED:</h4>
          <ul className="list-disc pl-5">
            <li>Read and understood this safety disclaimer</li>
            <li>Met all medical clearance requirements</li>
            <li>Agreed to follow all safety protocols</li>
            <li>Accepted all risks associated with strength training</li>
            <li>Agreed to the liability waiver described above</li>
          </ul>

          <p>
            <strong>
              If you do not agree to these terms, you must not use the strength training features.
            </strong>
          </p>
          <p>
            For complete legal terms, see Section 23 "Comprehensive Training and Testing
            Disclaimers" in our Terms and Conditions.
          </p>
        </div>
        <div className="mt-5">
          <Label>
            <Checkbox
              checked={isAgree}
              onCheckedChange={value => setIsAgree(value === 'indeterminate' ? false : value)}
            ></Checkbox>
            I understand and agree to the above terms
          </Label>
        </div>
        <div className="flex gap-2 w-fit ml-auto">
          <Button onClick={onClickAgree} disabled={!isAgree}>
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
