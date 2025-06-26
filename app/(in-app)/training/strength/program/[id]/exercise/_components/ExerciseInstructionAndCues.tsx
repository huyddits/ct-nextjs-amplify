export default function ExerciseInstructionAndCues({
  instructions,
  cues,
}: {
  instructions: string;
  cues: string;
}) {
  return (
    <div className="space-y-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="font-medium mb-2">Instructions</h2>
        <p className="text-sm text-gray-600">{instructions}</p>
      </div>
      <div className="bg-white p-3 rounded-lg shadow-sm">
        <h2 className="font-medium mb-1 text-sm">Cues</h2>
        <p className="text-sm text-gray-600">{cues}</p>
      </div>
    </div>
  );
}
