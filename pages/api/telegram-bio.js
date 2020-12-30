import axios from 'axios';
import * as cheerio from 'cheerio'

export default async function handler(req, res) {

    if (!req.query.name) {
        res.json({message: 'nope'});
        return;
    }

    const {data} = await axios.get('https://t.me/' + req.query.name, { 
        responseType: 'text',
    });

    const $ = cheerio.load(data);
    const bio = $('.tgme_page_description').text();
    
    res.json({ bio });
}





const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '1455241782:AAG_mcoMCwsMGM37qiNKjevyGxh8rDP35tM';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});