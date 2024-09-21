const TelegramBot = require('node-telegram-bot-api');

// Fetch the API token from environment variables
const token = process.env.TELEGRAM_TOKEN;

// Create a bot that uses polling to fetch updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/start"
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    // Define an inline keyboard with buttons
    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Button 1", callback_data: "btn1" }],
                [{ text: "Button 2", callback_data: "btn2" }]
            ]
        }
    };

    bot.sendMessage(chatId, 'Choose an option:', options);
});

// Handle button clicks (callback queries)
bot.on('callback_query', (callbackQuery) => {
    const message = callbackQuery.message;
    const data = callbackQuery.data;

    if (data === 'btn1') {
        bot.sendMessage(message.chat.id, 'You clicked Button 1!');
    } else if (data === 'btn2') {
        bot.sendMessage(message.chat.id, 'You clicked Button 2!');
    }
});
