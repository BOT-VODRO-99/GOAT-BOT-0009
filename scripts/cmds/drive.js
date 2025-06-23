const axios = require('axios');

module.exports = {
	config: {
		name: "drive",
		version: "1.0.2",
		author: "IMRAN",
		countDown: 5,
		role: 0,
		description: {
			en: "Upload a video and add it to Google Drive"
		},
		category: "LINK",
		guide: {
			en: "   {pn} <link>: Add video from link to Google Drive\n   Reply to a message with media to upload"
		}
	},

	langs: {
		en: {
			missingInput: "⚠ Please provide a valid URL or reply to a message with media.",
			uploadSuccess: "{url}\n",
			albumFail: "❌ Failed to retrieve file information.",
			error: "⚠ An error occurred during upload.\nError: {error}"
		}
	},

	onStart: async function ({ message, event, args, getLang }) {
		const inputUrl = event?.messageReply?.attachments?.[0]?.url || args[0];

		if (!inputUrl)
			return message.reply(getLang("missingInput"));

		try {
			const res = await axios.get(
				`https://glowing-octo-computing-machine-seven.vercel.app/api/upload?url=${encodeURIComponent(inputUrl)}`
			);
			
			const { directLink, fileId } = res.data;

			if (directLink && fileId) {
				const successMessage = getLang("uploadSuccess")
					.replace("{url}", directLink)
					.replace("{id}", fileId);
				return message.reply(successMessage);
			}

			message.reply(getLang("albumFail"));
		} catch (error) {
			console.error("Upload Error:", error);
			message.reply(getLang("error").replace("{error}", error.message));
		}
	}
};
