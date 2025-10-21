const { fana } = require("../njabulo/fana");
const {getAllSudoNumbers,isSudoTableNotEmpty} = require("../bdd/sudo")
const conf = require("../set");

fana({ nomCom: "owner", categorie: "General", reaction: "❣️" }, async (dest, zk, commandeOptions) => {
    const { ms , mybotpic } = commandeOptions;
    
  const thsudo = await isSudoTableNotEmpty()
       // List of image URLs
    const njabulox = [
        "https://files.catbox.moe/iii5jv.jpg",
        "https://files.catbox.moe/xjeyjh.jpg",
        "https://files.catbox.moe/mh36c7.jpg",
        "https://files.catbox.moe/u6v5ir.jpg",
        "https://files.catbox.moe/bnb3vx.jpg" // New image added
    ];

    // Select a random image file
    const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];
    
  if (thsudo) {
     let msg = `*My Super-User*\n
     *Owner Number*\n :
- 🌟 @${conf.NUMERO_OWNER}

------ *other sudos* -----\n`
     
 let sudos = await getAllSudoNumbers()

   for ( const sudo of sudos) {
    if (sudo) { // Vérification plus stricte pour éliminer les valeurs vides ou indéfinies
      sudonumero = sudo.replace(/[^0-9]/g, '');
      msg += `- 💼 @${sudonumero}\n`;
    } else {return}

   }   const ownerjid = conf.NUMERO_OWNER.replace(/[^0-9]/g) + "@s.whatsapp.net";
   const mentionedJid = sudos.concat([ownerjid])
   console.log(sudos);
   console.log(mentionedJid)
      zk.sendMessage(
        dest,
        {
          image : { url : mybotpic() },
          caption : msg,
          mentions : mentionedJid
        }
      )
  } else {    
    
    const vcard =
        'BEGIN:VCARD\n' + // metadata of the contact card
        'VERSION:3.0\n' +
        'FN:' + conf.OWNER_NAME + '\n' + // full name
        'ORG:undefined;\n' + // the organization of the contact
        'TEL;type=CELL;type=VOICE;waid=' + conf.NUMERO_OWNER + ':+' + conf.NUMERO_OWNER + '\n' + // WhatsApp ID + phone number
        'END:VCARD';

      const njabuloai = `
     *🎆 Welcome to *Njabulo Jb*
     *👤Owner number* 77821911
     
🌐owner bot *➥ sir Njabulo Jbメ*`,

    await zk.sendMessage(dest, {
  image: { url: randomNjabulourl },
    caption: njabuloai,
    contextInfo: {
      externalAdReply: {
          title: "Message owner dev Tech",
           mediaType: 1,
          previewType: 0,
              renderLargerThumbnail: false,
              thumbnailUrl: randomNjabulourl,
      }
    }
 }, { quoted: m });   

   zk.sendMessage(dest, {
        contacts: {
            displayName: conf.OWNER_NAME,
            contacts: [{ vcard }],
        },
    },{quoted:ms});


 // Send the audio as a voice note after the ping message
      const audioUrl = 'https://files.catbox.moe/4ufunx.mp3';
       zk.sendMessage(chatId, {
        audio: { url: audioUrl },
        mimetype: 'audio/mp4',
        ptt: true
      }, { quoted: m });
        }
 });
