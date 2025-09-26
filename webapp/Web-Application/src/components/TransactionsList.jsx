import * as ReactWindow from 'react-window';
const { FixedSizeList } = ReactWindow;
import { formatDate } from "../hooks/utils";

const TransactionRow = ({ index, style, data }) => {
  const { transactions, handleDelete } = data;
  const tx = transactions[index];

  return (
    <div
      style={{
        ...style,
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr",
        alignItems: "center",
        padding: "0.5rem",
        borderBottom: "1px solid #ccc",
        backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
      }}
    >
      <div>{formatDate(tx.created_at)}</div>
      <div>{tx.title}</div>
      <div>${tx.amount}</div>
      <div>{tx.category}</div>
      <div>
        <button onClick={() => handleDelete(tx.id)}>Delete</button>
      </div>
    </div>
  );
};

export default function TransactionsList({ transactions, handleDelete }) {
  const itemSize = 50; // px height per row
  const height = Math.min(transactions.length * itemSize, 400); // max 400px scroll container

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: "5px" }}>
      {/* Table header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr",
          fontWeight: "bold",
          padding: "0.5rem",
          backgroundColor: "#eee",
          borderBottom: "1px solid #ccc",
        }}
      >
        <div>Date</div>
        <div>Description</div>
        <div>Amount</div>
        <div>Type</div>
        <div></div>
      </div>

      {/* Virtualized list */}
      <FixedSizeList
        height={height}
        itemCount={transactions.length}
        itemSize={itemSize}
        width="100%"
        itemData={{ transactions, handleDelete }}
      >
        {TransactionRow}
      </FixedSizeList>

    </div>
  );
}
