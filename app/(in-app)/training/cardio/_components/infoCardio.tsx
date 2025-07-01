export default function infoCardio() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Cardio Training for Cheerleaders</h1>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Why Cardio Training Matters</h2>
      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 mb-4">
        During a competition, a cheerleader performs flawlessly at the start but struggles near the
        end. Jumps lose height, stunts become unstable, and tumbling technique suffers.
      </blockquote>
      <p>This happens because cheerleaders need:</p>
      <ul className="list-disc list-inside mb-6">
        <li>
          <strong>Endurance:</strong> To maintain energy throughout routines
        </li>
        <li>
          <strong>Power:</strong> To keep jumps and tumbling strong
        </li>
        <li>
          <strong>Recovery:</strong> To quickly bounce back between intense elements
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Quick Reference Guide</h2>

      <h3 className="text-xl font-semibold mt-8 mb-2">Types of Cardio Training</h3>
      <table className="w-full border border-collapse mb-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Training Type</th>
            <th className="border px-2 py-1">What It Is</th>
            <th className="border px-2 py-1">How It Helps</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-1">Steady-State</td>
            <td className="border px-2 py-1">Continuous activity at moderate intensity</td>
            <td className="border px-2 py-1">Builds overall stamina for full routines</td>
          </tr>
          <tr>
            <td className="border px-2 py-1">Interval Training</td>
            <td className="border px-2 py-1">Alternating between high and low intensity</td>
            <td className="border px-2 py-1">Improves power for jumps and tumbling</td>
          </tr>
          <tr>
            <td className="border px-2 py-1">Recovery Cardio</td>
            <td className="border px-2 py-1">Very light activity</td>
            <td className="border px-2 py-1">Helps muscles recover between practices</td>
          </tr>
          <tr>
            <td className="border px-2 py-1">Sport-Specific</td>
            <td className="border px-2 py-1">Mimics cheer movements and timing</td>
            <td className="border px-2 py-1">Directly transfers to better performances</td>
          </tr>
        </tbody>
      </table>

      <h3 className="text-xl font-semibold mt-8 mb-2">Cardio RPE Scale (0-10)</h3>
      <table className="w-full border border-collapse mb-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">RPE</th>
            <th className="border px-2 py-1">Feels Like</th>
            <th className="border px-2 py-1">Breathing</th>
            <th className="border px-2 py-1">Example in Cheerleading</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Rest', 'Normal', 'Sitting, complete rest'],
            ['Very Light', 'Normal', 'Walking to position on mat'],
            ['Light', 'Normal', 'Easy warm-up movements'],
            ['Moderate', 'Slightly elevated', 'Basic choreography, simple motions'],
            ['Somewhat Hard', 'Noticeable but controlled', 'Standard practice pace, basic stunts'],
            ['Hard', 'Deeper breathing', 'Full routine run-through'],
            ['Harder', 'Heavy breathing', 'Multiple routine run-throughs'],
            ['Very Hard', 'Difficult to speak', 'Competition-level routine intensity'],
            ['Extremely Hard', 'Can say only a word or two', 'Advanced tumbling sequences'],
            ['Maximum Effort', 'Gasping for air', 'Competition finals performance'],
            ['Absolute Maximum', 'Cannot maintain', 'All-out sprint, maximum jump effort'],
          ].map((row, i) => (
            <tr key={i}>
              <td className="border px-2 py-1">{i}</td>
              <td className="border px-2 py-1">{row[0]}</td>
              <td className="border px-2 py-1">{row[1]}</td>
              <td className="border px-2 py-1">{row[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-xl font-semibold mt-8 mb-2">Heart Rate Training Zones</h3>
      <table className="w-full border border-collapse mb-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Zone</th>
            <th className="border px-2 py-1">% of Max HR</th>
            <th className="border px-2 py-1">When to Use</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-1">Zone 1</td>
            <td className="border px-2 py-1">50-60%</td>
            <td className="border px-2 py-1">Recovery, warm-up, cool-down</td>
          </tr>
          <tr>
            <td className="border px-2 py-1">Zone 2</td>
            <td className="border px-2 py-1">60-70%</td>
            <td className="border px-2 py-1">Building basic endurance</td>
          </tr>
          <tr>
            <td className="border px-2 py-1">Zone 3</td>
            <td className="border px-2 py-1">70-80%</td>
            <td className="border px-2 py-1">Improving routine stamina</td>
          </tr>
          <tr>
            <td className="border px-2 py-1">Zone 4</td>
            <td className="border px-2 py-1">80-90%</td>
            <td className="border px-2 py-1">High-intensity sections</td>
          </tr>
          <tr>
            <td className="border px-2 py-1">Zone 5</td>
            <td className="border px-2 py-1">90-100%</td>
            <td className="border px-2 py-1">Explosive elements (very brief)</td>
          </tr>
        </tbody>
      </table>
      <p className="mb-10">
        <strong>Max Heart Rate:</strong> 220 - your age = estimated maximum heart rate
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Training Programs</h2>
      <h3 className="text-xl font-semibold mt-6 mb-2">For High School Athletes</h3>
      <table className="w-full border border-collapse mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Goal</th>
            <th className="border px-2 py-1">Workout Type</th>
            <th className="border px-2 py-1">How Long</th>
            <th className="border px-2 py-1">How Hard</th>
            <th className="border px-2 py-1">How Often</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-1">Build Endurance</td>
            <td className="border px-2 py-1">Steady cardio</td>
            <td className="border px-2 py-1">20-30 min</td>
            <td className="border px-2 py-1">RPE 4-6</td>
            <td className="border px-2 py-1">2-3 times/week</td>
          </tr>
          <tr>
            <td className="border px-2 py-1">Develop Power</td>
            <td className="border px-2 py-1">Intervals</td>
            <td className="border px-2 py-1">15-20 min</td>
            <td className="border px-2 py-1">
              Work: RPE 7-8
              <br />
              Rest: RPE 2-3
            </td>
            <td className="border px-2 py-1">1-2 times/week</td>
          </tr>
          <tr>
            <td className="border px-2 py-1">Active Recovery</td>
            <td className="border px-2 py-1">Light cardio</td>
            <td className="border px-2 py-1">15-25 min</td>
            <td className="border px-2 py-1">RPE 2-3</td>
            <td className="border px-2 py-1">1 time/week</td>
          </tr>
        </tbody>
      </table>
      <p className="mb-8">
        <strong>Sample Beginner Interval Workout:</strong>
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>5 min warm-up (RPE 3)</li>
        <li>30 sec harder effort (RPE 7)</li>
        <li>90 sec easy recovery (RPE 2-3)</li>
        <li>Repeat 8 times</li>
        <li>5 min cool-down (RPE 2)</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-2">For College Athletes</h3>
      <table className="w-full border border-collapse mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Goal</th>
            <th className="border px-2 py-1">Workout Type</th>
            <th className="border px-2 py-1">How Long</th>
            <th className="border px-2 py-1">How Hard</th>
            <th className="border px-2 py-1">How Often</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-1">Build Endurance</td>
            <td className="border px-2 py-1">Steady cardio</td>
            <td className="border px-2 py-1">30-45 min</td>
            <td className="border px-2 py-1">RPE 5-7</td>
            <td className="border px-2 py-1">2-3 times/week</td>
          </tr>
          <tr>
            <td className="border px-2 py-1">Develop Power</td>
            <td className="border px-2 py-1">Intervals</td>
            <td className="border px-2 py-1">20-30 min</td>
            <td className="border px-2 py-1">
              Work: RPE 8-9
              <br />
              Rest: RPE 2-3
            </td>
            <td className="border px-2 py-1">2-3 times/week</td>
          </tr>
          <tr>
            <td className="border px-2 py-1">Active Recovery</td>
            <td className="border px-2 py-1">Light cardio</td>
            <td className="border px-2 py-1">20-30 min</td>
            <td className="border px-2 py-1">RPE 2-3</td>
            <td className="border px-2 py-1">1-2 times/week</td>
          </tr>
        </tbody>
      </table>
      <p className="mb-8">
        <strong>Sample Advanced Interval Workout:</strong>
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>8 min progressive warm-up (RPE 3-5)</li>
        <li>20 sec high intensity (RPE 8-9)</li>
        <li>60 sec recovery (RPE 2-3)</li>
        <li>Repeat 12 times</li>
        <li>5-8 min cool-down (RPE 2)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Training Through the Season</h2>
      <table className="w-full border border-collapse mb-8">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Season Phase</th>
            <th className="border px-2 py-1">What to Focus On</th>
            <th className="border px-2 py-1">How Much</th>
            <th className="border px-2 py-1">Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-1">Off-Season</td>
            <td className="border px-2 py-1">Building base endurance</td>
            <td className="border px-2 py-1">More volume</td>
            <td className="border px-2 py-1">3-4 longer sessions/week</td>
          </tr>
          <tr>
            <td className="border px-2 py-1">Pre-Season</td>
            <td className="border px-2 py-1">Power and speed</td>
            <td className="border px-2 py-1">Medium-high volume</td>
            <td className="border px-2 py-1">2 high-intensity + 1-2 endurance sessions</td>
          </tr>
          <tr>
            <td className="border px-2 py-1">Competition</td>
            <td className="border px-2 py-1">Performance-specific training</td>
            <td className="border px-2 py-1">Medium volume</td>
            <td className="border px-2 py-1">2 specific sessions + 1 recovery</td>
          </tr>
          <tr>
            <td className="border px-2 py-1">Peak Week</td>
            <td className="border px-2 py-1">Maintaining fitness</td>
            <td className="border px-2 py-1">Lower volume</td>
            <td className="border px-2 py-1">1-2 short, quality sessions</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-2xl font-semibold mt-10 mb-4">How to Progress Safely</h2>
      <p>You're ready to increase difficulty when:</p>
      <ul className="list-disc list-inside mb-6">
        <li>You recover faster after workouts</li>
        <li>Your routine feels easier than before</li>
        <li>Your performance is improving</li>
      </ul>
      <p>How to progress (change only one at a time):</p>
      <ul className="list-disc list-inside mb-6">
        <li>Add 5-10% more time to your workout</li>
        <li>Increase intensity slightly</li>
        <li>Reduce rest periods slightly</li>
        <li>Add one more session per week</li>
      </ul>
      <p className="mb-10 font-semibold">
        Safety tip: Never increase your weekly training volume by more than 10%
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Signs Your Cardio Is Improving</h2>
      <ul className="list-disc list-inside mb-6">
        <li>You recover faster between stunts and tumbling</li>
        <li>Your jumps stay high throughout routines</li>
        <li>You maintain good form from start to finish</li>
        <li>Your resting heart rate is lower</li>
        <li>You have better stamina during competitions</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Safety Basics</h2>
      <ul className="list-disc list-inside mb-6">
        <li>Drink water before, during, and after training</li>
        <li>Always warm up for 5-10 minutes</li>
        <li>Cool down for at least 5 minutes after workouts</li>
        <li>Listen to your body and rest when needed</li>
        <li>Eat properly to fuel your workouts</li>
      </ul>

      <hr className="my-10" />
      <p className="text-sm italic text-gray-500">
        Sources:
        <br />
        American College of Sports Medicine. ACSM's Guidelines for Exercise Testing and
        Prescription. 11th ed. 2021.
        <br />
        Buchheit M, Laursen PB. High-Intensity Interval Training, Solutions to the Programming
        Puzzle. Sports Med. 2013;43:313-338.
        <br />
        Foster C, et al. A new approach to monitoring exercise training. J Strength Cond Res.
        2001;15(1):109-115.
        <br />
        Thompson WR. Worldwide Survey of Fitness Trends for 2022. ACSM's Health & Fitness Journal.
        2022;26(1):11-20.
      </p>
    </section>
  );
}
