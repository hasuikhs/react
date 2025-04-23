interface Item {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

export default function ItemCard({ item }: { item: Item }) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-sm bg-white dark:bg-gray-800 transition-colors">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{item.title}</h2>
      <p className="text-gray-600 dark:text-gray-300 mt-2">{item.description}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        생성일: {new Date(item.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
} 