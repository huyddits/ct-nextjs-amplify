export default function StrengthValue({
  name,
  content,
  lastCompleted,
}: {
  name: string;
  content: string;
  lastCompleted: string;
}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-600 mt-1">{content}</p>
      <p className="text-sm text-gray-500 mt-2">{lastCompleted}</p>
    </div>
  );
}
