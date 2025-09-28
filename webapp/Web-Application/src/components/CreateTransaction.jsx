import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
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

export default function CreateTransaction() {
  const { user } = useUser();
  const { createTransaction } = useTransactions(user?.id);

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isExpense, setIsExpense] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const resetForm = () => {
    setTitle("");
    setAmount("");
    setSelectedCategory("");
    setIsExpense(true);
    setError("");
  };

  const handleCreate = async () => {
    if (!title.trim()) {
      setErrorMessage("Please enter a transaction title");
      setShowError(true);
      return;
    }
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setErrorMessage("Please enter a valid amount");
      setShowError(true);
      return;
    }
    if (!selectedCategory) {
      setErrorMessage("Please select a category");
      setShowError(true);
      return;
    }
  
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
      setShowSuccess(true); // ✅ open success modal
      resetForm();
      setShowModal(false); // close modal after save
    } else {
      setError("Failed to create transaction");
    }
  };

  return (
    <div className="mt-6">
      {/* showSuccess message modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-80 text-center">
            <p className="text-lg font-semibold text-green-600">
              Transaction created successfully 
            </p>
            <button
              onClick={() => {
                setShowSuccess(false);
              }}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Error Message modal */}
      {showError && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-80 text-center">
            <p className="text-lg font-semibold text-red-600">
              {errorMessage}
            </p>
            <button
              onClick={() => setShowError(false)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        ➕ New Transaction
      </button>

      {/* Modal */}
      {showModal && (!showError) &&(
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              New Transaction
            </h2>

            {error && (
              <p className="mb-3 text-sm text-red-500 font-medium">{error}</p>
            )}

            {/* Type Toggle */}
            <div className="flex gap-4 mb-6">
              <button
                className={`flex-1 py-2 rounded-lg font-medium transition ${
                  isExpense
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setIsExpense(true)}
              >
                Expense ⬇️
              </button>
              <button
                className={`flex-1 py-2 rounded-lg font-medium transition ${
                  !isExpense
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setIsExpense(false)}
              >
                Income ⬆️
              </button>
            </div>

            {/* Amount */}
            <div className="flex items-center border rounded-lg px-3 py-2 mb-4 bg-gray-50 dark:bg-gray-700">
              <span className="text-gray-500 dark:text-gray-300 mr-2">₱</span>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-100"
              />
            </div>

            {/* Title */}
            <input
              type="text"
              placeholder="Transaction Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-6 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            />

            {/* Categories */}
            <h4 className="text-md font-semibold mb-3 text-gray-700 dark:text-gray-300">
              Category
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg border transition ${
                    selectedCategory === cat.name
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  }`}
                  onClick={() => setSelectedCategory(cat.name)}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  resetForm();
                  setShowModal(false);
                }}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

