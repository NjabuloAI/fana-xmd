const { fana } = require('../njabulo/fana');
const gis = require('g-i-s');
const axios = require('axios');
const conf = require(__dirname + '/../set');

fana({
  nomCom: "image",
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
  const loadingMessage = await repondre(`⏳ *Downloading ${searchTerm} image...*`);

  // Search for images
  gis(searchTerm, (error, results) => {
    if (error) {
      repondre("Oops, an error occurred.");
      return;
    }

    if (!results || results.length === 0) {
      repondre("No images found.");
      return;
    }

    // Send images
    results.slice(0, 5).forEach((result) => {
      const caption = `
     🖼️ Title: *${searchTerm}*
     💾 Size: *${result.width}x${result.height}*
     🎆 Quality: *High HD*
     🌐 Download By *➥ sir Njabulo Jbメ*`;
      zk.sendMessage(dest, {
        image: { url: result.url },
        caption: caption
      }, { quoted: ms });
    });

    // Delete loading message
    zk.deleteMessage(dest, loadingMessage.key);
  });
});
