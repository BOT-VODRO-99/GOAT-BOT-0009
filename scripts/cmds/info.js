const os = require("os");
const { createCanvas, loadImage } = require("canvas");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const moment = require("moment-timezone");
const fs = require("fs");

module.exports = {
  config: {
    name: "info",
    aliases: ["owner"],
    version: "1.5.2",
    author: "AHMED TARIF",
    role: 0,
    noPrefix: true,
    shortDescription: {
      en: "Check bot info with image."
    },
    longDescription: {
      en: "Generates an image with info."
    },
    category: "INFORM",
    guide: {
      en: "Just type info"
    }
  },

  onStart: async function () {},

  onChat: async function ({ message, event, usersData, threadsData }) {
    const prefix = global.GoatBot.config.prefix;
    const body = (event.body || "").toLowerCase().trim();
    const triggers = [`info`, `${prefix}info`];
    if (!triggers.includes(body)) return;

    try {
      const uptimeSec = process.uptime();
      const days = Math.floor(uptimeSec / 86400);
      const hours = Math.floor((uptimeSec % 86400) / 3600);
      const minutes = Math.floor((uptimeSec % 3600) / 60);
      const seconds = Math.floor(uptimeSec % 60);
      const formattedUptime = `${days}/${hours}/${minutes}/${seconds}`;

      const osType = os.type();
      const osRelease = os.release();
      const arch = os.arch();
      const cpu = os.cpus()[0].model;
      const totalMemMB = os.totalmem() / 1024 / 1024;
      const freeMemMB = os.freemem() / 1024 / 1024;
      const usedMemMB = totalMemMB - freeMemMB;
      const loadAvg = os.loadavg()[0].toFixed(2);
      const disk = await getDiskUsage();
      const totalUsers = (await usersData.getAll()).length;
      const totalThreads = (await threadsData.getAll()).length;
      const currentTime = moment.tz("Asia/Dhaka").format("DD/MM/YYYY || HH:mm:ss");

      // Create image
      const background = await loadImage("https://drive.google.com/uc?export=download&id=1QAHE3IoQKYlmIX_O197QQxcgZEyRcIc7");
      const canvas = createCanvas(1000, 500);
      const ctx = canvas.getContext("2d");

      ctx.drawImage(background, 0, 0, 1000, 500);
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 36px Arial";
      ctx.textAlign = "center";
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.shadowBlur = 5;

      // Custom uptime text
      ctx.fillText("SYSTEM UPTIME", 500, 390);
      ctx.fillText("──────────────", 500, 430);
      ctx.fillText(`BOT UPTIME: ${days}D ${hours}H ${minutes}M ${seconds}S`, 500, 470);

      const imagePath = `${__dirname}/uptime_img.png`;
      fs.writeFileSync(imagePath, canvas.toBuffer());

      await message.reply({
        body: `╭─==>[ 𝐁𝐨𝐭 𝐀𝐧𝐝 𝐎𝐰𝐧𝐞𝐫 𝐈𝐧𝐟𝐨𝐫𝐦 ]<==
├‣ 𝐁𝐨𝐭𝐧𝐢𝐜𝐤: 𝚈𝙾𝚄𝚁 𝚅𝙾𝙳𝚁𝙾 𝙱☺︎︎𝚃
├‣ 𝐎𝐰𝐧𝐞𝐫: AHMED TARIF\___{ƑƑ}
├‣ 𝐀𝐠𝐞: [ 16+ ]
├‣ 𝐏𝐫𝐞𝐟𝐢𝐱: [ ! ]
├‣ 𝐓𝐢𝐤t𝐨𝐤: @mr_tarif_x130
├‣ 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩: 01568660030
├‣ 𝐓𝐞𝐥𝐞𝐠𝐫𝐚𝐦: @Ewr_Arafat_404
├‣ 𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦: Eorro<🔬
╰‣ 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤: m.me/ahmed.tarif.404
╭─==>[ 𝐁𝐨𝐭 𝐔𝐩𝐭𝐢𝐦𝐞 𝐈𝐧𝐟𝐨𝐫𝐦 ]<==
├‣🤖 𝐁𝐨𝐭 𝐔𝐩𝐭𝐢𝐦𝐞: ${days}D ${hours}H ${minutes}M ${seconds}S
├‣📊 𝐓𝐨𝐭𝐚𝐥 𝐔𝐬𝐞𝐫𝐬: ${totalUsers}
├‣💬 𝐓𝐨𝐭𝐚𝐥 𝐓𝐡𝐫𝐞𝐚𝐝𝐬: ${totalThreads}
╰‣🕒 𝐓𝐢𝐦𝐞: ${currentTime}`,
        attachment: fs.createReadStream(imagePath)
      });

      fs.unlinkSync(imagePath);
    } catch (e) {
      console.error(e);
      message.reply("❌ An error occurred while generating info.");
    }
  }
};

async function getDiskUsage() {
  const { stdout } = await exec("df -k /");
  const lines = stdout.split("\n");
  const diskLine = lines[1].split(/\s+/);
  const total = parseInt(diskLine[1]) * 1024;
  const used = parseInt(diskLine[2]) * 1024;
  return { total, used };
}
