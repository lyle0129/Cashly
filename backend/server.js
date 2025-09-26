import express from "express";
import dotenv from "dotenv";
import {sql} from "./config/db.js"; 

dotenv.config();

const app = express()

// Middleware, basically need ito so that it could translate yung sa req.body
app.use(express.json());

const PORT = process.env.PORT || 5001;

async function initDB(){
    try {
        await sql`CREATE TABLE IF NOT EXISTS transactions(
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`

        console.log("Database initialized successfully")
    } catch (error) {
        console.log("Error initiallizing DB", error);
        process.exit(1);
    }
}

// For getting a transactions of a user //
// we put `:` since it is dynamic
app.get("/api/transactions/:userId", async (req,res) => {
    try {
        // need to be the same as above in the get function
        const {userId} = req.params;
        const transactions = await sql`
        SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC
        `;
        console.log(transactions)
        res.status(200).json(transactions);
    } catch (error) {
        console.log("Error getting the transactions", error)
        res.status(500).json({message: "Internal server Error" });
    }
})

// creating a transaction
app.post("/api/transactions", async (req,res) => {
    // title, amount, category, user_id
    try {
        const {title, amount, category, user_id} = req.body;

        if (!title || !category || !user_id || amount === undefined){
            return res.status(400).json({message: "All fields are required"})
        }

        const transaction = await sql`
            INSERT INTO transactions(user_id, title, amount, category)
            VALUES (${user_id}, ${title}, ${amount}, ${category})
            RETURNING *
        `;
        console.log(transaction[0]);
        res.status(201).json(transaction[0]);
    } catch (error) {
        console.log("Error creating the transaction", error)
        res.status(500).json({message: "Internal Server Error"})
    }
})

// deleting id of a transaction
app.delete("/api/transactions/:id", async(req,res) => {
    try {
        const {id} = req.params

        if (isNaN(parseInt(id))){
            res.status(400).json({message:"Invalid ID"})
        }

        const result = await sql`
        DELETE FROM transactions WHERE id = ${id} RETURNING *
        `;

        if (result === 0){
            return res.status(404).json({message: "Transaction not found."})
        }
        res.status(200).json({message: "Transaction deleted successfully"})
    } catch (error) {
        console.log("Error deleting the transaction", error)
        res.status(500).json({message: "Internal Server Error"})
    }
})

// getting the summary of the transactions
app.get("/api/transactions/summary/:userId", async(req,res) =>{
    try {
        const {userId} = req.params;

        const balanceResult = await sql `
        SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE user_id = ${userId}
        `;

        const incomeResult = await sql `
        SELECT COALESCE(SUM(amount), 0) as income FROM transactions WHERE user_id = ${userId} AND amount > 0
        `;

        const expenseResult = await sql `
        SELECT COALESCE(SUM(amount), 0) as expenses FROM transactions WHERE user_id = ${userId} AND amount < 0
        `;

        res.status(200).json({
            balance: balanceResult[0].balance ,
            income: incomeResult[0].income ,
            expenses: expenseResult[0].expenses
        })
    } catch (error) {
        console.log("Error getting the summary of transactions", error)
        res.status(500).json({message: "Internal Server Error"})
    }
})

initDB().then( () => {
    app.listen(PORT, () =>
        {
            console.log("Server is up and running on port:", PORT)
        });
})

// Note: i did not ratelimit, but its a good addition to be added eventually...
// Additionally, i did not do the routing since the project is relatively small, but if i had free time maybe i would add that eventually
