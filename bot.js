const TelegramBot = require('node-telegram-bot-api');

// Fetch the API token from environment variables
const token = process.env.TELEGRAM_TOKEN;

// Create a bot that uses polling to fetch updates
const bot = new TelegramBot(token, { polling: true });

// Handle the "/start" command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    // Main menu with inline keyboard buttons
    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Play Game", web_app: { url: "https://gamesee.gg/mini-games/taptaptap/play/" } }],
                [{ text: "Instructions", callback_data: "instructions" }],
                [{ text: "Help", callback_data: "help" }]
            ]
        }
    };

    bot.sendMessage(chatId, 'Welcome! Choose an option:', options);
});

// Handle button clicks (callback queries)
bot.on('callback_query', (callbackQuery) => {
    const message = callbackQuery.message;
    const data = callbackQuery.data;

    // Handle the main menu options
    if (data === 'instructions') {
        bot.sendMessage(message.chat.id, 'Instructions: Tap the button to play!');
    } else if (data === 'help') {
        bot.sendMessage(message.chat.id, 'Help: Contact @support for assistance.');
    }
});

// Handle the "/tap" command if needed
bot.onText(/\/tap/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'You tapped! Keep going!');
});
