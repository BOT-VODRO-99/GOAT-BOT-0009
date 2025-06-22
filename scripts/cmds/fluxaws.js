module.exports = {
  config: {
    name: "fluxaws",
    aliases: ["awsgen", "faws"],
    version: "1.1.0",
    author: "Dipto",
    countDown: 5,
    role: 0,
    shortDescription: "Generate an AI image with FluxAWS",
    longDescription: "Generate a high-quality AI image using the FluxAWS API (Powered by Arch2Devs).",
    category: "IMAGE",
    guide: "{pn} <prompt>\nReply to a message with {pn} to use it as a prompt."
  },

  onStart: async function ({ api, event, args }) {
    const startTime = Date.now();
    let prompt = args.join(" ");

    // Use replied message as prompt if available
    if (event.type === "message_reply" && event.messageReply?.body) {
      prompt = event.messageReply.body;
    }

    if (!prompt) {
      return api.sendMessage("📛 Please provide a prompt to generate an image.", event.threadID, event.messageID);
    }

    const imageUrl = `http://www.arch2devs.ct.ws/api/fluxaws?query=${encodeURIComponent(prompt)}`;

    try {
      // React with 🎨 while processing
      api.setMessageReaction("🎨", event.messageID, () => {}, true);

      const imageStream = await global.utils.getStreamFromURL(imageUrl);
      const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);

      api.sendMessage({
        body: `🎨| 𝐅𝐥𝐮𝐱𝐀𝐖𝐒 𝐈𝐦𝐚𝐠𝐞 𝐟𝐨𝐫:\n 𐙚━━━━━━━━━━𐙚\n📜| 𝐏𝐫𝐨𝐦𝐩𝐭: "${prompt}"\n⏳ Time Taken: ${timeTaken}s`,
        attachment: imageStream
      }, event.threadID, event.messageID);

      // React with 🚸 after successful generation
      api.setMessageReaction("🪄", event.messageID, () => {}, true);
      
    } catch (error) {
      api.sendMessage("⛔ Failed to fetch the image. Please try again later.", event.threadID, event.messageID);

      // React with ⛔ if an error occurs
      api.setMessageReaction("🔰", event.messageID, () => {}, true);
    }
  }
};
