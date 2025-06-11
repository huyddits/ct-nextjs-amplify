export default function TableSkeleton() {
  return Array(15)
    .fill('')
    .map((_, index) => (
      <tr key={index} className="even:bg-gray-50 odd:bg-white">
        {Array(7)
          .fill('')
          .map((_, cellIndex) => (
            <td key={cellIndex} className="py-3 px-4 border-b">
              <div className="h-6 size-full bg-gray-200 animate-pulse rounded" />
            </td>
          ))}
      </tr>
    ));
}
