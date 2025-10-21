const { fana } = require('../njabulo/fana');
const gis = require('g-i-s');
const axios = require('axios');
const conf = require(__dirname + '/../set');

fana({
  nomCom: "xmd",
  aliases: ["image", "images"],
  categorie: "Images",
  reaction: "☘️"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  // Check if search term is provided
  if (!arg[0]) {
    repondre('Which image?');
    return;
  }

  const searchTerm = arg.join(" ");

  // Loading message
  const loadingMessage = await repondre(`⏳ Searching for ${searchTerm} images...`);

  try {
    // Search for images
    const results = await new Promise((resolve, reject) => {
      gis(searchTerm, (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });

    if (!results || results.length === 0) {
      await zk.sendMessage(dest, { text: "No images found." }, { quoted: ms });
      return;
    }

    // Send images
    for (let i = 0; i < Math.min(results.length, 5); i++) {
      const result = results[i];
      const caption = `Title: ${searchTerm}\nSize: ${result.width}x${result.height}\nQuality: High HD`;
      await zk.sendMessage(dest, {
        image: { url: result.url },
        caption: caption,
        contextInfo: {
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363345407274799@newsletter',
            newsletterName: "NJABULO JB",
            serverMessageId: 143,
          },
          forwardingScore: 999,
          externalAdReply: {
            title: "🦋ɴᴊᴀʙᴜʟᴏ ᴊʙ🦋",
            body: "message on",
            mediaType: 1,
            renderSmallThumbnail: true
          }
        }
      }, { quoted: ms });
    }

    // Delete loading message
    await zk.deleteMessage(dest, loadingMessage.key);
  } catch (error) {
    console.error(error);
    repondre("Oops, an error occurred.");
  }
});
