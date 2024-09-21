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
                [{ text: "Play Game", callback_data: "play_game" }],
                [{ text: "Instructions", callback_data: "instructions" }],
                [{ text: "Help", callback_data: "help" }],
                [{ text: "Button 1", callback_data: "btn1" }],
                [{ text: "Button 2", callback_data: "btn2" }]
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
    if (data === 'play_game') {
        startTappingGame(message.chat.id);
    } else if (data === 'instructions') {
        bot.sendMessage(message.chat.id, 'Instructions: Tap the button to play!');
    } else if (data === 'help') {
        bot.sendMessage(message.chat.id, 'Help: Contact @support for assistance.');
    }

    // Handle Button 1 and Button 2 logic
    if (data === 'btn1') {
        bot.sendMessage(message.chat.id, 'You clicked Button 1!');
    } else if (data === 'btn2') {
        bot.sendMessage(message.chat.id, 'You clicked Button 2!');
    }
});

// Tapping game function
function startTappingGame(chatId) {
    let score = 0;
    const gameDuration = 10; // Game duration in seconds
    const gameInterval = setInterval(() => {
        score++;
        bot.sendMessage(chatId, `Tap! Your current score is: ${score}`);
    }, 1000); // Send a message every second

    setTimeout(() => {
        clearInterval(gameInterval);
        bot.sendMessage(chatId, `Game over! Your final score is: ${score}`);
    }, gameDuration * 1000); // End the game after the specified duration
}

// Handle the "/tap" command if needed
bot.onText(/\/tap/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'You tapped! Keep going!');
});
