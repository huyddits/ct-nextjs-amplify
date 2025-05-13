import AlertItem from './AlertItem';

export default function AlertItemSection() {
  const listItems = [
    {
      title: 'Past-due check-offs',
      content: [
        { name: 'Michael Johnson', exercise: '3 Hand in Hand', value: 'Mar 12, 2025' },
        { name: 'Sarah Williams', exercise: '5 Back Tucks', value: 'Mar 10, 2025' },
        { name: 'David Chen', exercise: '2 Full Up and 2 Back Tucks', value: 'Mar 13, 2025' },
      ],
      colorClass: 'red',
      closable: true,
    },
    {
      title: 'Submitted check-offs',
      content: [
        { name: 'Michael Johnson', exercise: '5 Back Tucks', value: 'Mar 15, 2025' },
        { name: 'James Wilson', exercise: '2 Full Up and 2 Back Tucks', value: 'Mar 14, 2025' },
      ],
      colorClass: 'green',
      closable: true,
    },
    {
      title: 'Recent measurements',
      content: [
        { name: 'Alex Thompson', exercise: 'Max Squat', value: '225 lbs' },
        { name: 'Olivia Parker', exercise: 'Mile Time', value: '5:42 min' },
      ],
      colorClass: 'blue',
      closable: true,
    },
  ];
  return (
    <section>
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <div className="mb-12">
          <h2 className="font-semibold mb-3">Alerts</h2>

          <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-8">
            {listItems.map(item => (
              <AlertItem key={item.title} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
