import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { useQueue } from 'discord-player';
import { Message } from 'discord.js';

@ApplyOptions<Command.Options>({
	description: 'Pauses the currently playing music'
})
export class UserCommand extends Command {
	public override async messageRun(message: Message) {
		const { member, guild } = message;

		if (!guild) {
			return message.reply('This command can only be used in a server.');
		}

		if (!message.channel.isSendable()) {
			return;
		}

		const voiceChannel = member?.voice.channel;
		if (!voiceChannel) {
			return message.reply('You need to be in a voice channel to use this command.');
		}

		const queue = useQueue(guild.id);

		if (!queue || !queue.isPlaying()) {
			return message.reply('There is no music currently playing.');
		}

		if (queue.node.isPaused()) {
			return message.reply('The music is already paused.');
		}

		queue.node.setPaused(true);
		return message.reply('Music has been paused.');
	}
}
