import { Component, ComponentInterface, Element, h, Host, Prop, Watch } from '@stencil/core';
import clsx from 'clsx';
import Fragment from '../../Fragment';
import { avatars, Profile, profiles } from '../../options';
import { DiscordTimestamp, handleTimestamp } from '../../util';
import { AuthorInfo } from '../author-info/author-info';
import Ephemeral from '../svgs/ephemeral';
import VerifiedTick from '../svgs/verified-tick';

@Component({
	tag: 'discord-message',
	styleUrl: 'discord-message.css'
})
export class DiscordMessage implements ComponentInterface {
	/**
	 * The DiscordMessage element.
	 */
	@Element()
	public el: HTMLElement;

	/**
	 * The id of the profile data to use.
	 */
	@Prop()
	public profile: string;

	/**
	 * The message author's username.
	 * @default 'User'
	 */
	@Prop()
	public author = 'User';

	/**
	 * The message author's avatar. Can be an avatar shortcut, relative path, or external link.
	 */
	@Prop()
	public avatar: string;

	/**
	 * Whether the message author is a bot or not.
	 * Only works if `server` is `false` or `undefined`.
	 */
	@Prop()
	public bot = false;

	/**
	 * Whether the message author is a server crosspost webhook or not.
	 * Only works if `bot` is `false` or `undefined`.
	 */
	@Prop()
	public server = false;

	/**
	 * Whether the bot is verified or not.
	 * Only works if `bot` is `true`
	 */
	@Prop()
	public verified = false;

	/**
	 * Whether the author is the original poster.
	 */
	@Prop()
	public op = false;

	/**
	 * Whether the message has been edited or not.
	 */
	@Prop()
	public edited = false;

	/**
	 * The message author's primary role color. Can be any [CSS color value](https://www.w3schools.com/cssref/css_colors_legal.asp).
	 */
	@Prop()
	public roleColor: string;

	/**
	 * The message author's role icon URL.
	 */
	@Prop()
	public roleIcon: string;

	/**
	 * The name of the role to use as alternative image text.
	 */
	@Prop()
	public roleName: string;

	/**
	 * Whether to highlight this message.
	 */
	@Prop()
	public highlight = false;

	/**
	 * Whether to make this message ephemeral.
	 */
	@Prop()
	public ephemeral = false;

	/**
	 * The timestamp to use for the message date.
	 */
	@Prop({ mutable: true, reflect: true })
	public timestamp: DiscordTimestamp = new Date();

	/**
	 * Whether to use 24-hour format for the timestamp.
	 */
	@Prop()
	public twentyFour = false;

	@Prop()
	public userid: number

	@Prop()
	public pronouns: string

	@Prop()
	public description: string

	@Prop()
	public msgcount: number

	@Prop()
	public roles: Array<any>

	@Watch('timestamp')
	public updateTimestamp(value: DiscordTimestamp): string | null {
		return handleTimestamp(value, this.twentyFour);
	}

	public componentWillRender() {
		this.timestamp = handleTimestamp(this.timestamp, this.twentyFour);
	}

	

	public render() {
		const parent: HTMLDiscordMessagesElement = this.el.parentElement as HTMLDiscordMessagesElement;

		if (parent.tagName.toLowerCase() !== 'discord-messages') {
			throw new Error('All <discord-message> components must be direct children of <discord-messages>.');
		}

		const resolveAvatar = (avatar: string): string => avatars[avatar] ?? avatar ?? avatars.default;

		const defaultData: Profile = {
			author: this.author,
			bot: this.bot,
			verified: this.verified,
			server: this.server,
			op: this.op,
			roleColor: this.roleColor,
			roleIcon: this.roleIcon,
			roleName: this.roleName,
			userid: this.userid,
			pronouns: this.pronouns,
			description:  this.description,
			msgcount: this.msgcount

		};
		const profileData: Profile = Reflect.get(profiles, this.profile) ?? {};
		const profile: Profile = { ...defaultData, ...profileData, ...{ avatar: resolveAvatar(profileData.avatar ?? this.avatar) } };

		const highlightMention: boolean =
			// @ts-expect-error ts doesn't understand this
			Array.from(this.el.children).some((child: HTMLDiscordMentionElement): boolean => {
				return child.tagName.toLowerCase() === 'discord-mention' && child.highlight && ['user', 'role'].includes(child.type);
			}) || this.highlight;

		const hasThread: boolean =
			// @ts-expect-error ts doesn't understand this
			Array.from(this.el.children).some((child: HTMLDiscordThreadElement): boolean => {
				return child.tagName.toLowerCase() === 'discord-thread';
			});


			function idgen(length: number) {
				let result = '';
				const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
				const charactersLength = characters.length;
				let counter = 0;
				while (counter < length) {
				  result += characters.charAt(Math.floor(Math.random() * charactersLength));
				  counter += 1;
				}
				return result;
			}

			const id = idgen(16);

			function clickViewAvProfile(event: any) {
				if (typeof document !== 'undefined') {
					const a = document.getElementById(`dropDown-${profile.author}-${id}`);
					const b = document.getElementById(`dropDown1-${profile.author}-${id}`);
					event.preventDefault();
					
					if (a !== null && b !== null) {

						if(b.matches(":hover")) return;

						if (a.matches(':hover')) {
						b.style.display = 'block';
						var x = a.style.left+35;
						var y = Number(a.style.top)-25;
						b.style.left = x+'px';
						b.style.top = y+'px';
						} else {
						b.style.display = 'none';
						}
					}
		
					
				}
			}

			document.addEventListener("click", clickViewAvProfile)

		return (
			<Host
				class={clsx('discord-message', {
					'discord-highlight-mention': highlightMention,
					'discord-message-has-thread': hasThread,
					'discord-highlight-ephemeral': this.ephemeral
				})}
			>
				<slot name="reply"></slot>
				<div class="discord-message-inner">
					{parent.compactMode && <span class="discord-message-timestamp">{this.timestamp}</span>}
					<style>{`
@media only screen and (max-width: 768px) {
	/* For mobile phones: */
	.discord-dropdown-avatar {
	  width: 65%;
	}

  }

  @media only screen and (min-width: 600px) {
	.discord-dropdown-avatar {
		width: 55%;
	  }
  }

   /* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {

	.discord-dropdown-avatar {
		width: 75%;
	  }

}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
	.discord-dropdown-avatar {
		width: 35%;
	  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
	.discord-dropdown-avatar {
		width: 30%;
	  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
	.discord-dropdown-avatar {
		width: 20%;
	  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
	.discord-dropdown-avatar {
		width: 20%;
	  }
} 
`}</style>
					<div class="discord-author-avatar">
				<img id={`dropDown-${profile.author}-${id}`} src={profile.avatar} alt={profile.author} />
						<div id={`dropDown1-${profile.author}-${id}`} class="discord-dropdown-avatar" style={{ display: 'none' }}>
						{ profile.bot !== true ? <div class="discord-dropdown-avater-banner" style={{backgroundColor: "black"}}>
						</div> : <div></div>}
						<div class="discord-dropdown-avater-avatar">
						<img style={{ width: "64px", height: "64px"}} src={profile.avatar} alt={profile.author} />		
						</div>		<br></br><br></br>
						<div class="discord-dropdown-avatar-desc">
						<div class="discord-dropdown-avatar-desc-ud">
						<h2> {profile.author}  {profile.bot && !profile.server && (
					<span class="discord-application-tag1">
						{/* If verified is true then a verified checkmark should be prefixed */}
						{profile.verified && <VerifiedTick />}
						<h4>Bot</h4>
					</span>
				)}</h2>	
				<h3>{profile.userid}</h3>
				<h4>{profile.pronouns}</h4>
							</div>	
				
<h5><b>Message Count:</b></h5>
<p>{profile.msgcount}</p>
<h5><b>Member Info:</b></h5>
<p>{profile.description}</p>
<h5><b>Roles:</b></h5>
<p>{profile.roles?.map((rl) => (
	<div class={"rl"}>
	 <span class={"rl-circle"} style={{backgroundColor: rl.color || "grey"}}></span>{rl.icon ? <img src={rl.icon} style={{height: "16px", width: "16px"}} class={"rl-icon"}></img> : <div></div>}<span class={"rl-name"}>{`${rl.name}`}</span>
	</div>
))}</p>
<br></br>
						</div>
							
						</div>
					</div>
					<div class="discord-message-content">
						{!parent.compactMode && (
							<Fragment>
								<AuthorInfo
									author={profile.author ?? ''}
									bot={profile.bot ?? false}
									server={profile.server ?? false}
									verified={profile.verified ?? false}
									op={profile.op ?? false}
									roleColor={profile.roleColor ?? ''}
									roleIcon={profile.roleIcon ?? ''}
									roleName={profile.roleName ?? ''}
									compact={parent.compactMode}
									avatar={profile.avatar}
								/>
								<span class="discord-message-timestamp">{this.timestamp}</span>
							</Fragment>
						)}
						<div class="discord-message-body">
							{parent.compactMode && (
								<AuthorInfo
									author={profile.author ?? ''}
									bot={profile.bot ?? false}
									server={profile.server ?? false}
									verified={profile.verified ?? false}
									op={profile.op ?? false}
									roleColor={profile.roleColor ?? ''}
									roleIcon={profile.roleIcon ?? ''}
									roleName={profile.roleName ?? ''}
									compact={parent.compactMode}
									avatar={profile.avatar}
								/>
							)}
							<span class="discord-message-markup">
								<slot></slot>
							</span>
							{this.edited ? <span class="discord-message-edited">(edited)</span> : ''}
						</div>
						<div class="discord-message-compact-indent">
							<slot name="embeds"></slot>
							<slot name="attachments"></slot>
							<slot name="components"></slot>
							<slot name="reactions"></slot>
							<slot name="thread"></slot>
							{this.ephemeral && (
								<div class="discord-message-ephemeral">
									<Ephemeral class="discord-message-ephemeral-icon" />
									Only you can see this • <span class="discord-message-ephemeral-link">Dismiss message</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</Host>
		);
	}
}
