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
    <div className="charts-container" style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
      {/* Income Chart */}
      <div style={{ flex: 1, minWidth: 300 }}>
        <h3>Income</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={incomeData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#00C49F" name="Income" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Expense Chart */}
      <div style={{ flex: 1, minWidth: 300 }}>
        <h3>Expenses</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={expenseData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#FF8042" name="Expenses" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
