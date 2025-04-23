interface Item {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

export default function ItemCard({ item }: { item: Item }) {
  return (
    <div className="border p-4 rounded-lg shadow card">
      <h2 className="text-xl font-semibold">{item.title}</h2>
      <p className="text-gray-600">{item.description}</p>
      <p className="text-sm text-gray-500">
        생성일: {new Date(item.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
} 