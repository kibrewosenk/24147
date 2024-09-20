const TelegramBot = require('node-telegram-bot-api');

// Fetch the token from environment variables
const token = process.env.TELEGRAM_TOKEN;

// Create a bot instance using polling
const bot = new TelegramBot(token, {polling: true});

// Handle the "/start" command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome to the Tapping Game! Type /tap to play.');
});

// Handle the "/tap" command
bot.onText(/\/tap/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'You tapped! Keep going!');
});
