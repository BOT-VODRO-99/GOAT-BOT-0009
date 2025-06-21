module.exports = {
  config: {
    name: "album2",
    version: "1.0",
    author: "AHMED TARIF",
    countDown: 10,
    role: 0,
    shortDescription: "useless album",
    longDescription: "Play media based on the specified category",
    category: "MEDIA",
    guide: "{pn} <category>"
  },

  onStart: async function ({ message, args }) {
    const categories = {
      anime: [
        "https://i.imgur.com/lyRI0nD.mp4",
        "https://i.imgur.com/7ZByQ5K.mp4",
        "https://i.imgur.com/jpoKusB.mp4",
        "https://i.imgur.com/zD0v0CV.mp4",
        "https://i.imgur.com/SNeKJ1E.mp4",
        "https://i.imgur.com/VVeISk9.mp4"
      ],
      love: [
        "https://i.imgur.com/vhhuvjw.mp4",
        "https://i.imgur.com/OXsViIM.mp4"
      ],
      couple: [
        "https://example.com/couple1.mp4",
        "https://example.com/couple2.mp4"
      ],
      funny: [
        "https://example.com/funny1.mp4",
        "https://example.com/funny2.mp4"
      ],
      "free fire": [
        "https://example.com/freefire1.mp4",
        "https://example.com/freefire2.mp4"
      ],
      girl: [
        "https://i.imgur.com/95ruyWS.mp4",
        "https://i.imgur.com/sYDn95i.mp4"
      ],
      sad: [
        "https://example.com/sad1.mp4",
        "https://example.com/sad2.mp4"
      ],
      football: [
        "https://drive.google.com/uc?export=download&id=15f7AmLDDVBOUrIC1EaIUESLb-X2difn8",
        "https://drive.google.com/uc?export=download&id=1a6Ko1aKxU0S2f_ulzhFTltYbxixMuieg",
        "https://drive.google.com/uc?export=download&id=1YcjGL-1XBbdwrNYJ4xnM9-qaLvFkZVc6",
        "https://drive.google.com/uc?export=download&id=1r14y4Hf0GknYemm64mtbe_k1ZJPAOUer",
        "https://drive.google.com/uc?export=download&id=1aGaFIRfa3FikBY3LsrLoamG6BajihAzB",
        "https://drive.google.com/uc?export=download&id=1kqzlIcTGtv6QSf5DEHOTs_HdT2DxRCyI",
        "https://drive.google.com/uc?export=download&id=1a_B8K9cVbnEp4lEtKioXV_Fw3SEOKq4M",
        "https://drive.google.com/uc?export=download&id=18eFN49G1s8nVjE5rdfobL3ibWJZXjy-m",
        "https://drive.google.com/uc?export=download&id=17w_gBLWK1ULXRKHBB7vbo780tIthP-mA",
        "https://drive.google.com/uc?export=download&id=1z1M-Re9Su1t6-NMigDuVj-9qYvHL7pI8"
      ],
      car: [
        "https://i.imgur.com/0mAedKY.mp4",
        "https://i.imgur.com/exHwxax.mp4",
        "https://i.imgur.com/fjFHcnY.mp4",
        "https://i.imgur.com/KiubkIW.mp4"
      ]
      // Add more categories and links as needed
    };

    const category = args[0]; 

    
    if (!category || !categories[category]) {
      const availableCategories = Object.keys(categories)
        .map((cat) => `🎥 | ${cat.toUpperCase()} 𝐕𝐢𝐝𝐞𝐨<⚙`)
        .join("\n");

      return message.reply({
        body: `𝐏𝐥𝐞𝐚𝐬𝐞 𝐜𝐡𝐨𝐨𝐬𝐞 𝐚 𝐜𝐚𝐭𝐞𝐠𝐨𝐫𝐲<🍺\n𐙚━━━━━━━━━━━━𐙚\n${availableCategories}\n\𐙚━━━━━━━━━━━━𐙚\n𝐄𝐱𝐚𝐦𝐩𝐥𝐞< !𝐚𝐥𝐛𝐮𝐦 𝐚𝐧𝐢𝐦𝐞`,
        attachment: null
      });
    }
    
    const mediaLinks = categories[category];
    const randomMedia = mediaLinks[Math.floor(Math.random() * mediaLinks.length)];

    message.send({
      body: `𝘏𝘌𝘙𝘌 𝘠𝘖𝘜𝘙 ${category.toUpperCase()} 𝘝𝘐𝘋𝘌𝘖<👨🏿‍🌾\n\n`,
      attachment: await global.utils.getStreamFromURL(randomMedia)
    });
  }
};
