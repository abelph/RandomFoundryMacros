const results_html = `<h2>Scorching Ray</h2>`

ChatMessage.create({
    user: game.user._id,
    speaker: ChatMessage.getSpeaker({token: actor}),
    content: results_html
});

for (let i = 1; i < 6; i++) {
 let shot = 'Shot ' + i;
 ChatMessage.create({
    user: game.user._id,
    speaker: ChatMessage.getSpeaker({token: actor}),
    content: shot
 });
 let toHit = new Roll("1d20+11").evaluate({async: false});
 toHit.toMessage({
 rollMode: 'roll',
 speaker: {alias: name}
});
 let roll = new Roll("{1d6, 2}kh1 + {1d6, 2}kh1").evaluate({async: false});
 roll.toMessage({
 rollMode: 'roll',
 speaker: {alias: name}
}); 
}