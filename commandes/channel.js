const { fana } = require('../njabulo/fana');
const axios = require('axios');
const fs = require('fs-extra');
const conf = require(__dirname + "/../set");

fana({
  nomCom: 'channel-react',
  aliases: ['react'],
  reaction: '😊',
  categorie: 'Utility'
}, async (origineMessage, groupeId, client, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  client.on('message', (message) => {
    if (message.channel.id === '0029VbAckOZ7tkj92um4KN3u') {
      const emojis = [
        '🥲', '🙃', '😍', '😙', '🤨', '😜', '😣', '🤩', '😳', '😡', 
        '🫣', '🫠', '😧', '🫩', '🤧', '🤠', '🤖', '🤌', '✊', '🤦‍♂️',
        '🐠', '🦈', '🦒', '🫏', '🌧️', '🌊', '🍒', '🍓', '🥣', '🥎',
        '🏀', '🪁', '🪃', '🎫', '🎤', '🚡', '⏳', '⚖️', '🧰', '🛠️',
        '🔩', '🎏', '📨', '📜', '📅', '❤️‍🩹', '⛎', '♍', '♌', '☣️',
        '⭕', '🚭', '⚜️', '🌀', '🆗', '▶️', '9️⃣', '⏩', '◀️', '🔺',
        '⬜', '🔈', '🔕', '🕐', '🕘', '🇦🇫', '🕞', '🇦🇸', '🇧🇼', '🇰🇾',
        '❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️',
        '❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️',
        '❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️',
        '❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️'
      ];
      emojis.forEach((emoji) => {
        message.react(emoji);
      });
    }
  });
});
