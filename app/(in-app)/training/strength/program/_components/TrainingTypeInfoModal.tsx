import { XIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
export default function TrainingTypeInfoModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-screen sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>Resistance Training Fundamentals</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="p-6 overflow-auto max-h-[80vh]">
          <h2 className="text-2xl font-bold mb-6">Core Training Types</h2>

          <div className="overflow-x-auto mb-8">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Training Type</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Definition</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Cheerleading Application
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">Maximal Strength</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Training for maximum force production
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    Pressing stunts to extension, basket tosses
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">Hypertrophy</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Training for muscle size growth
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    Building the foundation for increased strength potential
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">Power</td>
                  <td className="border border-gray-300 px-4 py-2">Producing force with speed</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Generating height in tosses, explosive jumps
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">Endurance</td>
                  <td className="border border-gray-300 px-4 py-2">Training to resist fatigue</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Maintaining performance throughout long practices/competitions
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">Plyometrics</td>
                  <td className="border border-gray-300 px-4 py-2">Quick, multi-joint movements</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Enhancing tumbling power, jump height, and basket toss performance
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold mt-8 mb-4">Key Variables in Your Training Program</h2>

          <h3 className="text-lg font-semibold mt-6 mb-2">1. Range of Motion</h3>
          <p className="mb-4">
            Full range exercises develop strength throughout the entire movement pattern, crucial
            for stunting stability at different positions.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">2. Speed of Movement</h3>
          <p className="mb-2">Training at various speeds develops different capabilities:</p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-1">
              <strong>Slow:</strong> Builds control and strength
            </li>
            <li className="mb-1">
              <strong>Moderate:</strong> Builds functional movement patterns
            </li>
            <li className="mb-1">
              <strong>Fast:</strong> Develops power for tosses and dynamic skills
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-2">3. Muscle Action Types</h3>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Action Type</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Cheerleading Relevance
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">Isometric</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Muscle maintains constant length
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    Holding stunts, static body positions
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">Concentric</td>
                  <td className="border border-gray-300 px-4 py-2">Muscle shortens under load</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Lifting flyers, pressing to extension
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">Eccentric</td>
                  <td className="border border-gray-300 px-4 py-2">Muscle lengthens under load</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Controlled dismounts, preventing tendon injuries
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-2">4. Frequency</h3>
          <p className="font-medium mb-1">How often should you train?</p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-1">Beginners: 2-3 sessions per week</li>
            <li className="mb-1">Experienced: 3-4+ sessions per week, depending on goals</li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-2">5. Volume</h3>
          <p className="font-medium mb-1">How much work per session?</p>
          <p className="mb-2">Volume = Resistance × Sets × Repetitions</p>
          <p className="mb-4">Example: 135 lbs × 3 sets × 15 reps</p>

          <h3 className="text-lg font-semibold mt-6 mb-2">6. Intensity</h3>
          <p className="font-medium mb-2">How challenging should each set be?</p>
          <p className="mb-2">Three ways to measure intensity:</p>

          <p className="font-medium mb-1">A. Percentage of 1-Rep Max (1RM)</p>
          <p className="mb-4">Example: 3 sets × 8 reps at 70% of 1RM</p>

          <p className="font-medium mb-1">B. Rate of Perceived Exertion (RPE)</p>
          <p className="mb-4">
            Scale of 1-10 measuring how hard an exercise feels
            <br />
            Example: 3 sets × 8 reps at RPE 7-8
          </p>

          <p className="font-medium mb-1">C. Repetitions in Reserve (RIR)</p>
          <p className="mb-4">
            How many more reps you could do before failure
            <br />
            Example: 3 sets × 8 reps with 2-3 RIR
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4">RPE and RIR Reference Guide</h3>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">RPE</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">What It Feels Like</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">RIR</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">5</td>
                  <td className="border border-gray-300 px-4 py-2">Easy, warm-up level</td>
                  <td className="border border-gray-300 px-4 py-2">5+</td>
                  <td className="border border-gray-300 px-4 py-2">Technique practice, recovery</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">6</td>
                  <td className="border border-gray-300 px-4 py-2">Mild difficulty, quick reps</td>
                  <td className="border border-gray-300 px-4 py-2">4</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Skill development, technique work
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">7</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Moderate difficulty, normal pace
                  </td>
                  <td className="border border-gray-300 px-4 py-2">3</td>
                  <td className="border border-gray-300 px-4 py-2">Hypertrophy, endurance</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">8</td>
                  <td className="border border-gray-300 px-4 py-2">Heavy, movement slowing down</td>
                  <td className="border border-gray-300 px-4 py-2">2</td>
                  <td className="border border-gray-300 px-4 py-2">Strength, hypertrophy</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">9</td>
                  <td className="border border-gray-300 px-4 py-2">Very heavy, slow movement</td>
                  <td className="border border-gray-300 px-4 py-2">1</td>
                  <td className="border border-gray-300 px-4 py-2">Maximal strength</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">10</td>
                  <td className="border border-gray-300 px-4 py-2">Maximum effort, very slow</td>
                  <td className="border border-gray-300 px-4 py-2">0</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Testing limits, not for regular training
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold mt-8 mb-4">
            Progression: When and How to Increase Difficulty
          </h2>
          <p className="mb-4">
            The ACSM recommends a 2%-10% increase in resistance when you can perform the current
            weight for 1-2 extra reps in two consecutive training sessions.
          </p>

          <p className="font-medium mb-2">Pro Tip: Change only one variable at a time:</p>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-1">Increase weight OR</li>
            <li className="mb-1">Increase reps/sets OR</li>
            <li className="mb-1">Adjust movement speed</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4">Using the Cheer Trainer App for Tracking</h2>
          <p className="mb-2">The Cheer Trainer app allows you to track:</p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-1">Repetitions (required)</li>
            <li className="mb-1">Resistance (required)</li>
            <li className="mb-1">RPE (optional but recommended)</li>
            <li className="mb-1">Notes (optional but valuable for tracking progress)</li>
          </ul>
          <p className="mb-6">
            This information can be shared with your coach via email to monitor your development and
            adjust your program as needed.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">Training Program Guidelines</h2>

          <h3 className="text-lg font-semibold mt-6 mb-3">For Beginners</h3>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left">Goal</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Sets</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Reps/Set</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Resistance</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">RPE</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Rest</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Frequency</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr>
                  <td className="border border-gray-300 px-3 py-2 font-medium">Strength</td>
                  <td className="border border-gray-300 px-3 py-2">1-3</td>
                  <td className="border border-gray-300 px-3 py-2">8-12</td>
                  <td className="border border-gray-300 px-3 py-2">
                    Start at 50%, progress to 60-70% 1RM
                  </td>
                  <td className="border border-gray-300 px-3 py-2">7-10</td>
                  <td className="border border-gray-300 px-3 py-2">2-3 min</td>
                  <td className="border border-gray-300 px-3 py-2">2-3× weekly</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 font-medium">Hypertrophy</td>
                  <td className="border border-gray-300 px-3 py-2">1-3</td>
                  <td className="border border-gray-300 px-3 py-2">8-12</td>
                  <td className="border border-gray-300 px-3 py-2">70-85% 1RM</td>
                  <td className="border border-gray-300 px-3 py-2">8-10</td>
                  <td className="border border-gray-300 px-3 py-2">1-2 min</td>
                  <td className="border border-gray-300 px-3 py-2">2-3× weekly</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2 font-medium">Power (Speed)</td>
                  <td className="border border-gray-300 px-3 py-2">3-6</td>
                  <td className="border border-gray-300 px-3 py-2">3-6</td>
                  <td className="border border-gray-300 px-3 py-2">30-60% 1RM</td>
                  <td className="border border-gray-300 px-3 py-2">4-6</td>
                  <td className="border border-gray-300 px-3 py-2">2-3 min</td>
                  <td className="border border-gray-300 px-3 py-2">2-3× weekly</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 font-medium">Power (Force)</td>
                  <td className="border border-gray-300 px-3 py-2">3-6</td>
                  <td className="border border-gray-300 px-3 py-2">3-6</td>
                  <td className="border border-gray-300 px-3 py-2">85-100% 1RM</td>
                  <td className="border border-gray-300 px-3 py-2">7-8</td>
                  <td className="border border-gray-300 px-3 py-2">2-3 min</td>
                  <td className="border border-gray-300 px-3 py-2">2-3× weekly</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2 font-medium">Endurance</td>
                  <td className="border border-gray-300 px-3 py-2">3+</td>
                  <td className="border border-gray-300 px-3 py-2">10-25</td>
                  <td className="border border-gray-300 px-3 py-2">&gt;50% 1RM</td>
                  <td className="border border-gray-300 px-3 py-2">9-10</td>
                  <td className="border border-gray-300 px-3 py-2">1-2 min</td>
                  <td className="border border-gray-300 px-3 py-2">2-4× weekly</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 font-medium">Plyometrics</td>
                  <td className="border border-gray-300 px-3 py-2">5-15</td>
                  <td className="border border-gray-300 px-3 py-2">3-30</td>
                  <td className="border border-gray-300 px-3 py-2">Light-Moderate</td>
                  <td className="border border-gray-300 px-3 py-2">-</td>
                  <td className="border border-gray-300 px-3 py-2">2-7 min</td>
                  <td className="border border-gray-300 px-3 py-2">4-6× weekly</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-3">For Experienced Athletes</h3>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left">Goal</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Sets</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Reps/Set</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Resistance</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">RPE</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Rest</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Frequency</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr>
                  <td className="border border-gray-300 px-3 py-2 font-medium">Strength</td>
                  <td className="border border-gray-300 px-3 py-2">3-4</td>
                  <td className="border border-gray-300 px-3 py-2">8-12</td>
                  <td className="border border-gray-300 px-3 py-2">70-85% 1RM</td>
                  <td className="border border-gray-300 px-3 py-2">7-10</td>
                  <td className="border border-gray-300 px-3 py-2">2-3 min</td>
                  <td className="border border-gray-300 px-3 py-2">3-4× weekly</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 font-medium">Hypertrophy</td>
                  <td className="border border-gray-300 px-3 py-2">3-6</td>
                  <td className="border border-gray-300 px-3 py-2">6-12</td>
                  <td className="border border-gray-300 px-3 py-2">70-100% 1RM</td>
                  <td className="border border-gray-300 px-3 py-2">8-10</td>
                  <td className="border border-gray-300 px-3 py-2">1-3 min</td>
                  <td className="border border-gray-300 px-3 py-2">4× weekly</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2 font-medium">Power (Speed)</td>
                  <td className="border border-gray-300 px-3 py-2">3-6</td>
                  <td className="border border-gray-300 px-3 py-2">3-6</td>
                  <td className="border border-gray-300 px-3 py-2">30-60% 1RM</td>
                  <td className="border border-gray-300 px-3 py-2">4-6</td>
                  <td className="border border-gray-300 px-3 py-2">2-3 min</td>
                  <td className="border border-gray-300 px-3 py-2">3-5× weekly</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 font-medium">Power (Force)</td>
                  <td className="border border-gray-300 px-3 py-2">3-6</td>
                  <td className="border border-gray-300 px-3 py-2">3-6</td>
                  <td className="border border-gray-300 px-3 py-2">85-100% 1RM</td>
                  <td className="border border-gray-300 px-3 py-2">7-8</td>
                  <td className="border border-gray-300 px-3 py-2">2-3 min</td>
                  <td className="border border-gray-300 px-3 py-2">3-5× weekly</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2 font-medium">Endurance</td>
                  <td className="border border-gray-300 px-3 py-2">3+</td>
                  <td className="border border-gray-300 px-3 py-2">10-25</td>
                  <td className="border border-gray-300 px-3 py-2">&gt;50% 1RM</td>
                  <td className="border border-gray-300 px-3 py-2">9-10</td>
                  <td className="border border-gray-300 px-3 py-2">1-2 min</td>
                  <td className="border border-gray-300 px-3 py-2">2-4× weekly</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 font-medium">Plyometrics</td>
                  <td className="border border-gray-300 px-3 py-2">5-15</td>
                  <td className="border border-gray-300 px-3 py-2">3-30</td>
                  <td className="border border-gray-300 px-3 py-2">Light-Moderate</td>
                  <td className="border border-gray-300 px-3 py-2">-</td>
                  <td className="border border-gray-300 px-3 py-2">2-7 min</td>
                  <td className="border border-gray-300 px-3 py-2">4-6× weekly</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold mt-8 mb-4">Safety First</h2>
          <p className="mb-2">Always prioritize safety in your training:</p>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-1">Start with lower volume and intensity</li>
            <li className="mb-1">Progress gradually</li>
            <li className="mb-1">Use proper form</li>
            <li className="mb-1">
              Consider working with a qualified strength coach, especially when beginning
            </li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4">Coming Soon</h2>
          <p className="mb-8">
            Look for additional training resources and specialized programs in future Cheer Trainer
            updates!
          </p>

          <div className="border-t pt-6 text-sm text-gray-600">
            <p className="font-medium mb-2">Sources:</p>
            <p className="mb-2">
              American College of Sports Medicine. Position stand: Progression models in resistance
              training for healthy adults. Med Sci Sports Exerc. 2009;41(3):687-708.
            </p>
            <p className="mb-2">
              Helms, E.R., et al. "Application of the Repetitions in Reserve-Based Rating of
              Perceived Exertion Scale for Resistance Training." Strength and Conditioning Journal,
              2016;38(4):42-49.
            </p>
            <p className="mb-2">
              Kilpatrick, M., et al. "Scientific Rationale for RPE Use in Fitness Assessment and
              Exercise Participation." ACSM's Health & Fitness Journal, 2020;24(4):24-30.
            </p>
            <p className="mb-2">
              Webster, A.L., Aznar-Laín, S. "Intensity of Physical Activity and the 'Talk Test': A
              Brief Review and Practical Application." ACSM's Health & Fitness Journal,
              2008;12(3):13-17.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
