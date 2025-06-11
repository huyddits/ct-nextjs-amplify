import { TrainingLogResponse } from '@/api/types/trainingLog';

type Props = Partial<TrainingLogResponse>;

export default function LogData({ athletes, teamAverages }: Props) {
  if (!athletes?.length)
    return (
      <tr>
        <td colSpan={7} className="text-center py-3 px-4 border-b">
          No training data available.
        </td>
      </tr>
    );
  return athletes.map(athlete => (
    <tr key={athlete.name} className="even:bg-gray-50 odd:bg-white">
      <td className="py-3 px-4 border-b">{athlete.name}</td>
      <td className="text-center py-3 px-2 border-b">{athlete.strengthTrainingDays}</td>
      <td className="text-center py-3 px-2 border-b text-primary">
        {teamAverages?.averageStrengthTrainingDays}d
      </td>
      <td className="text-center py-3 px-2 border-b">{athlete.cardioTrainingDays}</td>
      <td className="text-center py-3 px-2 border-b text-primary">
        {teamAverages?.averageCardioTrainingDays}d
      </td>
      <td className="text-center py-3 px-2 border-b">{athlete.cardioTotalDuration}</td>
      <td className="text-center py-3 px-2 border-b text-primary">
        {teamAverages?.averageCardioDuration}min
      </td>
    </tr>
  ));
}
