module.exports = {
  config: {
    name: "inbox",
    aliases: ["in"],
    version: "1.0",
    author: "AHMED TARIF",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "hello goatbot inbox file enjoy the cmmand!"
    },
    longDescription: {
      en: "𝐡𝐞𝐥𝐥𝐨 𝐠𝐨𝐚𝐭𝐛𝐨𝐭 𝐢𝐧𝐛𝐨𝐱 𝐟𝐢𝐥𝐞 𝐞𝐧𝐣𝐨𝐲 𝐭𝐡𝐞 𝐜𝐦𝐦𝐚𝐧𝐝!"
    },
    category: "FUN",
    guide: {
      en: "Just tryp {p}inbox"
    }
  },
  langs: {
    en: {
      gg: ""
    },
    id: {
      gg: ""
    }
  },
  onStart: async function({ api, event, args, message }) {
    try {
      const query = encodeURIComponent(args.join(' '));
      message.reply("𝐒𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲 𝐒𝐞𝐧𝐝 𝐌𝐬𝐠\n\𝐏𝐥𝐞𝐚𝐬𝐞 𝐂𝐊 𝐘𝐨𝐮𝐫 𝐢𝐧𝐛𝐨𝐱 𝐎𝐫 𝐦𝐬𝐠 𝐑𝐞𝐪𝐮𝐞𝐬𝐭 𝐁𝐨𝐱!", event.threadID);
      api.sendMessage("𝐒𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲 𝐀𝐥𝐥𝐨𝐰\n\n𝐍𝐨𝐰 𝐘𝐨𝐮 𝐂𝐚𝐧 𝐔𝐬𝐞 𝐘𝐨𝐮𝐫 𝐕𝐨𝐝𝐫𝐨 𝐑𝐨𝐛𝐨𝐭!!", event.senderID);
    } catch (error) {
      console.error("Error bro: " + error);
    }
  }
}
