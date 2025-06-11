interface SimpleTableProps {
  title: string;
  listItems: { id: string; name: string; value?: string }[];
}
export default function SimpleTable({ title, listItems }: SimpleTableProps) {
  return (
    <div className="bg-white rounded overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="bg-primary/10 py-2 px-4 font-medium text-left" colSpan={3}>
              <div>{title}</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {listItems.map((item, i) => (
            <tr key={item.id} className="border-b border-gray-100">
              <td className="py-2 px-4 w-10 text-center">{i + 1}</td>
              <td className="py-2">{item.name}</td>
              <td className="py-2 px-4 text-right">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
