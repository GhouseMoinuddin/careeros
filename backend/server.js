import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import {clerkMiddleware} from '@clerk/express';
import {serve} from 'inngest/express';
// import { inngest, functions } from './src/inngest';
import { inngest, functions } from './inngest/index.js';

const app = express();

//exp middleware
app.use(express.json()); 
app.use(cors());

app.use(clerkMiddleware()); // Clerk Middleware
app.get("/", (req, res)=> {
    res.send("Hi i am root");
})

// Set up the "/api/inngest" (recommended) routes with the serve handler
app.use("/api/inngest", serve({ client: inngest, functions }));

const PORT = process.env.PORT || 8000;

const start = () => {
        app.listen(PORT, () => {
            console.log(`Server is Listening at ${PORT}`);
        })
}

start();

