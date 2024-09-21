const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

// Fetch the API token from environment variables
const token = process.env.TELEGRAM_TOKEN;

// Create a bot that uses polling to fetch updates
const bot = new TelegramBot(token, { polling: true });
const app = express();
const PORT = process.env.PORT || 3000;

// Handle the "/start" command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome! Use /invite to generate your invitation link.');
});

// Handle the "/invite" command
bot.onText(/\/invite/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id; // Unique user ID

    // Create a unique invitation link
    const inviteLink = `https://your-server-url/invite?ref=${userId}`;
    
    bot.sendMessage(chatId, `Share this link to invite your friends: ${inviteLink}`);
});

// Handle incoming invitation links
app.get('/invite', (req, res) => {
    const refId = req.query.ref; // Get the referral user ID from the link
    // Logic to handle the invitation (like recording it in the database)

    res.send("Thank you for joining! You were invited by user ID: " + refId);
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
