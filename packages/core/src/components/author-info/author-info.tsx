import { FunctionalComponent, h } from '@stencil/core';
import Fragment from '../../Fragment';
import VerifiedTick from '../svgs/verified-tick';

interface AuthorInfoProps {
	/**
	 * The name of the author
	 */
	author: string;
	/**
	 * Whether this author is a bot. Only works if `server` is `false` or `undefined`.
	 */
	bot: boolean;
	/**
	 * Whether this author is a `server` crosspost webhook. Only works if `bot` is `false` or `undefined`.
	 */
	server: boolean;
	/**
	 * Whether this author is the original poster.
	 */
	op: boolean;
	/**
	 * The colour of the author, which comes from their highest role
	 */
	roleColor: string;
	/**
	 * The role icon of the author, which comes from their highest role
	 */
	roleIcon: string;
	/**
	 * The role name of the author, which comes from their highest role
	 */
	roleName: string;
	/**
	 * Whether this bot is verified by Discord. Only works if `bot` is `true`
	 */
	verified: boolean;
	/**
	 * Whether to reverse the order of the author info for compact mode.
	 */
	compact: boolean;
	avatar: string | undefined;
	isRemix?: boolean;
}

export const AuthorInfo: FunctionalComponent<AuthorInfoProps> = ({ author, bot, server, op, roleColor, roleIcon, roleName, verified, compact,avatar, isRemix }) => {

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
			const a = document.getElementById(`dropDown-${author}-${id}`);
			const b = document.getElementById(`dropDown1-${author}-${id}`);
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
	<span class="discord-author-info">
		{!compact && (
			<Fragment>
				<span class="discord-author-username" style={{ color: roleColor }}>
					{author}
				</span>
				
				{roleIcon && <img class="discord-author-role-icon" src={roleIcon} height="20" width="20" alt={roleName} draggable={false} />}
				
			</Fragment>
			
		)}
		

		{compact && (
			<span >
				<span id={`dropDown-${author}-${id}`} class="discord-author-username" style={{ color: roleColor }}>{author}</span>
				<div id={`dropDown1-${author}-${id}`} class="discord-dropdown-avatar" style={{ display: 'none' }}>
						<div class="discord-dropdown-avater-banner" style={{backgroundColor: "black"}}>
						</div>
						<div class="discord-dropdown-avater-avatar">
						<img src={avatar} alt={author} />		
						</div>		<br></br>
						<div class="discord-dropdown-avatar-desc">
						<h2> {author} {bot && !server && (
					<span class="discord-application-tag1">
						{/* If verified is true then a verified checkmark should be prefixed */}
						{verified && <VerifiedTick />}
						<h4>Bot</h4>
					</span>
				)} {!bot && isRemix && (
					<span class="discord-application-tag1">
					<h4>Remix</h4>
					</span>
				)}
				
				</h2>	
<h5><b>Message Count:</b></h5>
<br></br>
<h5><b>Member Info:</b></h5>
<br></br>
<h5><b>Roles:</b></h5>
						</div>
							
						</div>
			</span>
			
		)}
		{
			<Fragment>
				{/* If bot is true then we need to render a Bot tag */}
				{bot && !server && (
					<span class="discord-application-tag">
						{/* If verified is true then a verified checkmark should be prefixed */}
						{verified && <VerifiedTick />}
						Bot
					</span>
				)}
				{server && !bot && <span class="discord-application-tag">Server</span>}
				{op && <span class="discord-application-tag discord-application-tag-op">OP</span>}
			</Fragment>
		}
	</span>
	)
}
