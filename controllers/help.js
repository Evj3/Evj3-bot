'use strict';

const Telegram = require('telegram-node-bot');

class HelpController extends Telegram.TelegramBaseController {
    helpHandler($) {
        $.sendMessage('   ' +
            'Tb | PID07\n' +
        'also I\'m Todo bot\n');
    }

    get routes() {
        return {
            'helpCommand': 'helpHandler'
        };
    }
}

module.exports = HelpController;