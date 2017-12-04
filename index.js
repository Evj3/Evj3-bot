'use strict';

const Telegram = require('telegram-node-bot'),
    PersistantMemoryStorage = require('./adapters/PersistentMemoryStorage'),
    storage = new PersistantMemoryStorage(
        `${__dirname}/data/userStorage.json`,
        `${__dirname}/data/chatStorage.json`

    ),
    tg = new Telegram.Telegram('499133720:AAG0LhIw_-ZyNezEe0_m-iWyzr0Jy4JYve8', {
        workers: 1,
        storage: storage
    });

const HelpController = require('./controllers/help'),
      OtherwiseController = require('./controllers/otherwise'),
    TodoController = require('./controllers/todo');

tg.router.when(new Telegram.TextCommand('/help', 'helpCommand'), new HelpController())
.otherwise(new OtherwiseController());

const todoCtrl = new TodoController();
tg.router.when(new Telegram.TextCommand('/add', 'addCommand'), todoCtrl)
    .when(new Telegram.TextCommand('/get', 'getCommand'), todoCtrl)
    .when(new Telegram.TextCommand('/check', 'checkCommand'), todoCtrl)
    .otherwise(new OtherwiseController());

function exitHandler(exitCode) {
    storage.flush();
    process.exit(exitCode);
}

process.on('SIGINT', exitHandler.bind(null, 0));
process.on('uncaughtException', exitHandler.bind(null, 1));