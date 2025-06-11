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
        <p className="text-sm text-gray-600">
          {/* Stand with feet shoulder-width apart. Keep your back straight and core engaged throughout
          the movement. */}
          {instructions}
        </p>
      </div>
      <div className="bg-white p-3 rounded-lg shadow-sm">
        <h2 className="font-medium mb-1 text-sm">Cues</h2>
        {/* <ul className="text-sm text-gray-600 space-y-0.5">
          <li>• Chest up, proud</li>
          <li>• Break at hips and knees together</li>
          <li>• Push knees out</li>
        </ul> */}
        <p className="text-sm text-gray-600">{cues}</p>
      </div>
    </div>
  );
}
