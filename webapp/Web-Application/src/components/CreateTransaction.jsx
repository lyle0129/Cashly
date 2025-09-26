import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useTransactions } from "../hooks/useTransactions";

const CATEGORIES = [
  { id: "food", name: "Food & Drinks", icon: "🍔" },
  { id: "shopping", name: "Shopping", icon: "🛍️" },
  { id: "transportation", name: "Transportation", icon: "🚗" },
  { id: "entertainment", name: "Entertainment", icon: "🎬" },
  { id: "bills", name: "Bills", icon: "🧾" },
  { id: "income", name: "Income", icon: "💵" },
  { id: "other", name: "Other", icon: "🔖" },
];

function CreateTransaction() {
  const { user } = useUser();
  const navigate = useNavigate();
  const { createTransaction } = useTransactions(user?.id);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isExpense, setIsExpense] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (!title.trim()) return alert("Please enter a transaction title");
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      return alert("Please enter a valid amount");
    }
    if (!selectedCategory) return alert("Please select a category");

    setIsLoading(true);

    const formattedAmount = isExpense
      ? -Math.abs(parseFloat(amount))
      : Math.abs(parseFloat(amount));

    const success = await createTransaction({
      user_id: user.id,
      title,
      amount: formattedAmount,
      category: selectedCategory,
    });

    setIsLoading(false);

    if (success) {
      alert("Transaction created successfully ✅");
      navigate("/dashboard");
    } else {
      alert("Failed to create transaction ❌");
    }
  };

  return (
    <div className="create-container">
      <h2>New Transaction</h2>

      {/* Type Toggle */}
      <div className="type-selector">
        <button
          className={isExpense ? "active" : ""}
          onClick={() => setIsExpense(true)}
        >
          Expense ⬇️
        </button>
        <button
          className={!isExpense ? "active" : ""}
          onClick={() => setIsExpense(false)}
        >
          Income ⬆️
        </button>
      </div>

      {/* Amount */}
      <div className="amount-input">
        <span>$</span>
        <input
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {/* Title */}
      <input
        type="text"
        placeholder="Transaction Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Categories */}
      <h4>Category</h4>
      <div className="category-grid">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={selectedCategory === cat.name ? "selected" : ""}
            onClick={() => setSelectedCategory(cat.name)}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Save Button */}
      <button onClick={handleCreate} disabled={isLoading}>
        {isLoading ? "Saving..." : "Save"}
      </button>
    </div>
  );
}

export default CreateTransaction;