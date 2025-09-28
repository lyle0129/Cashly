import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function BreakdownChart({ breakdown }) {
  if (!breakdown) return null;

  // Convert totals from strings to numbers
  const incomeData = breakdown.income?.map(item => ({
    category: item.category,
    total: Number(item.total),
  })) || [];

  const expenseData = breakdown.expenses?.map(item => ({
    category: item.category,
    total: Number(item.total),
  })) || [];

  return (
    <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Income Chart */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4">
        <h3 className="text-lg font-semibold text-center mb-4 text-gray-800 dark:text-gray-200">
          Income
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={incomeData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#10B981" name="Income" /> {/* Tailwind green-500 */}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Expense Chart */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4">
        <h3 className="text-lg font-semibold text-center mb-4 text-gray-800 dark:text-gray-200">
          Expenses
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={expenseData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#EF4444" name="Expenses" /> {/* Tailwind red-500 */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
