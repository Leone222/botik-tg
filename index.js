const token = "6257598629:AAFfk3qqMIyaMlrl8dkxJz8_-g0H222iaoo"
const api = require('node-telegram-bot-api')
const {json} = require("express");
const {stringify} = require("nodemon/lib/utils");
const bot = new api(token, {polling: true})
const chats = []

const game_option = {
    reply_markup: JSON.stringify({
        inline_keyboard:[
            [{text:'1', callback_data:'1'},{text:'2', callback_data:'2'}, {text:'3', callback_data:'3'}]
        ]
    })
}

const again_option = {
    reply_markup: JSON.stringify({
    inline_keyboard: [
        [{text:'Играть снова', callback_data:'/again'}]
    ]
})
}

const startgame = (chatid) => {
    bot.sendMessage(chatid, 'я загадаю цифру 1 или 2, а ты отгадаешь')
    const rannum = Math.floor(Math.random() * 3) + 1
    chats[chatid] = rannum
    setTimeout(1000)
    bot.sendMessage(chatid, `Загадал, отгадывай ${chats[chatid]}`, game_option)
}

bot.on('message', msg => {
    const text = msg.text
    const chatid = msg.chat.id
    if(text == '/game'){
       return startgame(chatid)
    }
})

bot.on('callback_query', msg => {
    const number = msg.data
    const chatid = msg.message.chat.id
        if(number == '/again') {
            return startgame(chatid)
        }


    if(number == chats[chatid]){
        bot.sendMessage(chatid, 'ты выбрал верное число!', again_option)
    } else {
        bot.sendMessage(chatid, 'неверное!', again_option)}


}
)

