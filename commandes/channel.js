const { fana } = require("../njabulo/fana");

fana(
  {
    pattern: "all",
    on: "all",
  },
  async (context) => {
    const { client, m } = context;

    try {
      // Define the emojis you want to react with
      const reactions = ['👍', '❤️', '😮', '🤩', '🚀', '👽', '💻', '🎉', '😍', '🤣', '😘', '👫', '🤝', '🌟', '🌠', '🏆', '🎊', '👏', '💥', '🔥', '🌈', '🏖️', '🌴', '🏝️', '🐠', '🐳', '🐋', '🌻', '🌺', '💐', '🌼', '🐰', '🐶', '🐱', '🐔', '🐷', '🐴', '🌾', '🌿', '🍃', '🌸', '🍄', '🎈', '🎁', '🏀', '🏈', '⚽️', '🏊‍♀️', '🏋️‍♀️', '🚴‍♀️', '🛹', '🧘‍♀️', '💆‍♀️', '🚣‍♀️', '🏄‍♀️', '🤹‍♀️', '🎤', '🎸', '🎻', '🥁', '🎹', '🎺', '🎻'];

      // Check if the message is from the specific channel
      if (m.chat.id === "12029VbAckOZ7tkj92um4KN3u@g.us") {
        // React with 70 random emojis
        for (let i = 0; i < 70; i++) {
          const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
          await client.sendMessage(m.chat, {
            react: {
              text: randomReaction,
              key: m.key,
            },
          });
        }
      }
    } catch (error) {
      console.error('Error in autoreact:', error);
    }
  }
);
