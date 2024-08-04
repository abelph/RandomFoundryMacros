let shot = game.actors.getName("Character Name").data.data.resources.primary.value;	//Change to proper character name and ensure the primary resource value is currently not being used
let sharpRoll = new Roll("1d20 + 11").evaluate({async: false});	//Change attack modifier
let damageRoll = new Roll("2d8 + 5").evaluate({async: false});	//Change damage formula if needed

switch (shot) {
	case 1:
		let ram = '<h2>Chimera</h2><b>Ram:</b> 20-foot cone, DC 16 DEX saving throw. On a fail takes 4d6 fire damage and is pushed 15 ft. away.';
		ChatMessage.create({
    			user: game.user._id,
    			speaker: ChatMessage.getSpeaker({token: actor}),
    			content: ram
		});
		let ramRoll = new Roll("4d6").evaluate({async: false});
		sharpRoll.toMessage({
			rollMode: 'roll',
			speaker: {alias: name}
		});
		damageRoll.toMessage({
			rollMode: 'roll',
			speaker: {alias: name}
		});
		ramRoll.toMessage({
			rollMode: 'roll',
			speaker: {alias: name}
		});
		break;
	case 2:
		let snake = '<h2>Chimera</h2><b>Snake:</b> If you score a critical hit against a creature, its movement speed is reduced to 0 feet until the start of your next turn. If the target is airborne, its flying speed is reduced to 0 feet until the start of your next turn and falls unless it can stop the fall.';
		ChatMessage.create({
    			user: game.user._id,
    			speaker: ChatMessage.getSpeaker({token: actor}),
    			content: snake
		});
		sharpRoll.toMessage({
			rollMode: 'roll',
			speaker: {alias: name}
		});
		damageRoll.toMessage({
			rollMode: 'roll',
			speaker: {alias: name}
		});
		break;
	default:
		let lion = '<h2>Chimera</h2><b>Lion:</b> This attack scores a critical hit on a roll of 18 to 20.';
		ChatMessage.create({
    			user: game.user._id,
    			speaker: ChatMessage.getSpeaker({token: actor}),
    			content: lion
		});
		sharpRoll.toMessage({
			rollMode: 'roll',
			speaker: {alias: name}
		});
		damageRoll.toMessage({
			rollMode: 'roll',
			speaker: {alias: name}
		});
		break;
}

if(shot == 2) {
	await game.actors.getName("Character Name").update({"data.resources.primary.value": 0});	//Update character name
} else if(shot == 1) {
	await game.actors.getName("Character Name").update({"data.resources.primary.value": (shot + 1)});	//Update character name
} else {
	await game.actors.getName("Character Name").update({"data.resources.primary.value": 1});	//Update character name
}