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

export default function RouteGuardPolicyCardio() {
  const {
    loading,
    acknowledgementCardio,
    acknowledgementFitness,
    acknowledgementStrength,
    updateAcknowledge,
  } = useAcknowledgement();
  const [isOpen, setIsOpen] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [allowChecked, setAllowChecked] = useState(false);
  const [allowCheckedRef, setAllowCheckedRef] = useState<HTMLDivElement | null>(null);
  const onClickAgree = () => {
    updateAcknowledge({
      acknowledgementCardio: true,
      acknowledgementStrength: acknowledgementStrength,
      acknowledgementFitness: acknowledgementFitness,
    });
  };
  const onClickCancel = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    console.log('acknowledgementCardio', acknowledgementCardio);
    if (!acknowledgementCardio) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [acknowledgementCardio]);

  useEffect(() => {
    if (allowCheckedRef) {
      const observer = new IntersectionObserver(
        entries => {
          setAllowChecked(entries[0].isIntersecting);
          if (!entries[0].isIntersecting) {
            setIsAgree(false);
          }
        },
        { threshold: 1.0 }
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
            CARDIO TRAINING SAFETY REQUIREMENTS
          </DialogDescription>
        </DialogHeader>
        <div className="text-sm space-y-6 overflow-auto h-[400px]">
          <h4 className="font-bold text-lg">SPECIFIC MEDICAL CLEARANCE REQUIRED FOR:</h4>
          <ul className="list-disc pl-5">
            <li>
              Any cardiovascular condition (heart disease, arrhythmia, high blood pressure
              &gt;140/90, heart murmur)
            </li>
            <li>History of heart attack, stroke, or cardiac procedures</li>
            <li>
              Respiratory conditions (asthma, exercise-induced bronchospasm, chronic lung disease)
            </li>
            <li>Metabolic disorders (diabetes, thyroid disorders, metabolic syndrome)</li>
            <li>Blood pressure medications or heart rate affecting medications</li>
            <li>Current pregnancy or recent childbirth (within 6 months)</li>
            <li>History of exercise-induced complications or fainting</li>
            <li>Chest pain or shortness of breath during physical activity</li>
            <li>Joint problems that may be aggravated by cardiovascular exercise</li>
            <li>Any condition that affects your ability to exercise safely</li>
          </ul>

          <h4 className="font-bold text-lg">AGE AND PARENTAL CONSENT REQUIREMENTS:</h4>
          <ul className="list-disc pl-5">
            <li>
              Users under 18 must have explicit written parental/guardian consent before
              participation
            </li>
            <li>
              Users under 16 require direct adult supervision during all cardiovascular training
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
            <li>Active inflammatory heart conditions (myocarditis, pericarditis)</li>
            <li>Severe aortic stenosis or other obstructive heart conditions</li>
            <li>Uncontrolled arrhythmias or heart rhythm disorders</li>
            <li>Active respiratory infection, fever, or systemic illness</li>
            <li>Pregnancy complications or high-risk pregnancy</li>
            <li>Recent surgery without specific medical clearance for cardiovascular exercise</li>
            <li>Severe anemia or blood disorders</li>
          </ul>

          <h4 className="font-bold text-lg">COMPREHENSIVE SAFETY REQUIREMENTS:</h4>

          <h5>Pre-Exercise Preparation:</h5>
          <ul className="list-disc pl-5">
            <li>
              Complete proper warm-up for minimum 10 minutes before intense cardiovascular exercise
            </li>
            <li>
              Monitor your exertion level and stay within safe training zones for your fitness level
            </li>
            <li>Start with low intensity and progress gradually over weeks and months</li>
            <li>Never begin high-intensity training without proper conditioning base</li>
          </ul>

          <h5>During Exercise Safety:</h5>
          <ul className="list-disc pl-5">
            <li>Maintain proper hydration before, during, and after cardiovascular exercise</li>
            <li>Monitor heart rate and perceived exertion throughout exercise</li>
            <li>
              Exercise in appropriate environmental conditions (avoid extreme heat, humidity, or
              cold)
            </li>
            <li>Stop any activity immediately if you experience concerning symptoms</li>
            <li>Never ignore chest pain, severe shortness of breath, or dizziness</li>
            <li>Allow adequate rest and recovery between intense cardio sessions</li>
          </ul>

          <h5>Environmental Safety Requirements:</h5>
          <ul className="list-disc pl-5">
            <li>Ensure adequate ventilation and appropriate temperature (65–75°F recommended)</li>
            <li>Verify sufficient space for safe movement and emergency access</li>
            <li>Confirm proper lighting and safe surfaces for dynamic movements</li>
            <li>Remove obstacles and trip hazards from exercise area</li>
            <li>Have emergency communication access (phone) readily available</li>
            <li>Exercise with others when possible, especially during intense sessions</li>
          </ul>

          <h4 className="font-bold text-lg">HEART RATE AND INTENSITY GUIDELINES:</h4>
          <p>
            Maximum Heart Rate Calculation: <strong>220 - your age</strong> = estimated maximum
            heart rate
          </p>
          <p>Training Zones (% of Maximum Heart Rate):</p>
          <ul className="list-disc pl-5">
            <li>Light intensity: 50-60% (comfortable conversation possible)</li>
            <li>Moderate intensity: 60-70% (somewhat difficult to talk)</li>
            <li>Vigorous intensity: 70-85% (difficult to maintain conversation)</li>
            <li>Maximum intensity: 85-100% (very short duration only)</li>
          </ul>

          <h5>Warning Signs to Stop Exercise:</h5>
          <ul className="list-disc pl-5">
            <li>Heart rate exceeding safe training zones for your fitness level</li>
            <li>Inability to maintain proper breathing pattern</li>
            <li>Chest pain, pressure, or discomfort</li>
            <li>Severe shortness of breath beyond normal exercise response</li>
            <li>Dizziness, lightheadedness, or feeling faint</li>
            <li>Nausea or vomiting</li>
            <li>Unusual fatigue or weakness</li>
          </ul>

          <h4 className="font-bold text-lg">EMERGENCY PROCEDURES:</h4>
          <p>Stop all activity immediately if experiencing:</p>
          <ul className="list-disc pl-5">
            <li>Chest pain, pressure, or tightness</li>
            <li>Severe shortness of breath beyond normal exercise response</li>
            <li>Dizziness, lightheadedness, or feeling faint</li>
            <li>Nausea, vomiting, or excessive sweating</li>
            <li>Unusual heart rhythm (skipping, racing, or irregular beats)</li>
            <li>Severe fatigue or weakness</li>
          </ul>

          <p>Call 911 immediately for:</p>
          <ul className="list-disc pl-5">
            <li>Chest pain or signs of heart attack</li>
            <li>Severe shortness of breath</li>
            <li>Loss of consciousness or fainting</li>
            <li>Signs of stroke (facial drooping, arm weakness, speech difficulty)</li>
            <li>Heat exhaustion or heat stroke symptoms</li>
            <li>Any life-threatening emergency</li>
          </ul>

          <h5>Emergency Preparedness:</h5>
          <ul className="list-disc pl-5">
            <li>Have emergency contact information readily available</li>
            <li>Know location of nearest medical facility</li>
            <li>Maintain current first aid and CPR knowledge</li>
            <li>Have emergency action plan in place</li>
            <li>Exercise with partners when possible</li>
          </ul>

          <h4 className="font-bold text-lg">INHERENT RISK ACKNOWLEDGMENT:</h4>
          <p>
            Cardiovascular training carries significant inherent risks of injury and medical
            emergencies, including but not limited to:
          </p>
          <ul className="list-disc pl-5">
            <li>Cardiovascular events including heart attack, arrhythmia, or cardiac arrest</li>
            <li>Sudden cardiac death (rare but possible, especially with underlying conditions)</li>
            <li>Dehydration and heat-related illnesses (heat exhaustion, heat stroke)</li>
            <li>Overexertion and exercise-induced complications</li>
            <li>Falls, trips, and impact injuries during dynamic movements</li>
            <li>Respiratory complications in individuals with breathing conditions</li>
            <li>Blood pressure fluctuations during high-intensity activities</li>
            <li>Exercise-induced asthma or bronchospasm</li>
            <li>In rare cases, serious injury, permanent disability, or death</li>
          </ul>

          <h4 className="font-bold text-lg">RECOVERY AND PROGRESSION REQUIREMENTS:</h4>
          <ul className="list-disc pl-5">
            <li>Allow adequate recovery time between intense cardiovascular sessions</li>
            <li>
              Progress gradually - no more than 10% increase in duration or intensity per week
            </li>
            <li>Monitor resting heart rate and sleep quality as indicators of recovery</li>
            <li>Stop training if performance decreases significantly or fatigue persists</li>
            <li>Maintain proper nutrition and hydration for recovery and performance</li>
            <li>Seek immediate medical attention for persistent symptoms or concerns</li>
          </ul>

          <h4 className="font-bold text-lg">COMPREHENSIVE LIABILITY WAIVER:</h4>
          <p>
            <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</strong>
          </p>
          <p>
            You understand and voluntarily assume all risks associated with cardiovascular training.
          </p>
          <ul className="list-disc pl-5">
            <li>
              You release Cheer Trainer LLC, its officers, directors, employees, and affiliates from
              any claims arising from your participation in cardiovascular training
            </li>
            <li>
              You assume full responsibility for any medical expenses, lost wages, rehabilitation
              costs, or other damages resulting from cardio training participation
            </li>
            <li>
              Our total liability for any claims related to cardiovascular training shall not exceed
              $100
            </li>
          </ul>

          <h4 className="font-bold text-lg">HEALTH DATA PRIVACY NOTICE:</h4>
          <p>
            By using these features, you consent to the collection and processing of health and
            fitness data as described in our Privacy Policy. This may include sharing of performance
            data with designated coaches and team members. You may withdraw consent at any time
            through your privacy settings.
          </p>

          <h4 className="font-bold text-lg">GENERAL WARNINGS:</h4>
          <ul className="list-disc pl-5">
            <li>
              <strong>INDIVIDUAL RESPONSIBILITY:</strong> Participation is entirely at your own risk
              and voluntary
            </li>
            <li>
              <strong>NO MEDICAL ADVICE:</strong> Information provided is for educational purposes
              only and is not medical advice, diagnosis, or treatment
            </li>
            <li>
              <strong>RESULTS NOT GUARANTEED:</strong> Individual results may vary and are not
              typical or guaranteed
            </li>
            <li>
              <strong>HEART RATE MONITORING:</strong> Use heart rate guidelines as general
              recommendations only - listen to your body above all else
            </li>
          </ul>

          <h4 className="font-bold text-lg">ACKNOWLEDGMENT REQUIRED:</h4>
          <ul className="list-disc pl-5">
            <li>Read and understood this comprehensive safety disclaimer</li>
            <li>Met all medical clearance requirements or obtained appropriate medical approval</li>
            <li>Agreed to follow all safety protocols and intensity guidelines</li>
            <li>Understood and accepted all risks associated with cardiovascular training</li>
            <li>Agreed to the comprehensive liability waiver described above</li>
          </ul>

          <p>
            <strong>
              If you do not agree to these terms, you must not use the cardiovascular training
              features.
            </strong>
          </p>
          <p>
            For complete legal terms, see Section 23 "Comprehensive Training and Testing
            Disclaimers" in our Terms and Conditions.
          </p>
          <div
            aria-hidden
            className="h-px"
            aria-label="bottom"
            ref={ref => setAllowCheckedRef(ref)}
          />
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
        <div className="flex gap-4 w-fit ml-auto">
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
