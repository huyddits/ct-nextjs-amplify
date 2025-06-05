export default function ExercisesProgramitem({
  name,
  description,
}: Readonly<{
  name: string;
  description: string;
}>) {
  return (
    <div className="flex items-center justify-between p-4 border-b last:border-b-0">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-200 rounded-md mr-3"></div>
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
}
