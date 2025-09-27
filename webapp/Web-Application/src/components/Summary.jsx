import React from 'react';

function Summary({summary}) {
  return (
    <div className="summary-cards">
            <div className="card balance">
              <h3>Balance</h3>
              <p>${parseFloat(summary.balance).toFixed(2)}</p>
            </div>
            <div className="card income">
              <h3>Income</h3>
              <p>${parseFloat(summary.income).toFixed(2)}</p>
            </div>
            <div className="card expenses">
              <h3>Expenses</h3>
              <p>-${Math.abs(parseFloat(summary.expenses)).toFixed(2)}</p>
            </div>
          </div>
  )
}

export default Summary