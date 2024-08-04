new Dialog({
    title:'Scorching Ray',
    content:`
      <form>
        <div class="form-group">
          <label>Number of Rays</label>
          <input type='number' name='inputField'></input>
        </div>
      </form>`,
    buttons:{
      yes: {
        icon: "<i class='fas fa-check'></i>",
        label: `Cast`,
        callback: html =>{
            let result = html.find('input[name=\'inputField\']');
            let numShots = parseInt(result.val());
            scorching(numShots);
        }
      }},
    default:'yes'
  }).render(true);

function scorching(num) {
  num++;
  const results_html = `<h2>Scorching Ray</h2>`;

  ChatMessage.create({
      user: game.user._id,
      speaker: ChatMessage.getSpeaker({token: actor}),
      content: results_html
  });

  for (let i = 1; i < num; i++) {
      let shot = 'Shot ' + i;
      ChatMessage.create({
          user: game.user._id,
          speaker: ChatMessage.getSpeaker({token: actor}),
          content: shot
      });
      let toHit = new Roll("1d20+12").evaluate({async: false});   //Change attack modifier here
      toHit.toMessage({
      rollMode: 'roll',
      speaker: {alias: name}
      });
      let roll = new Roll("{1d6, 2}kh1 + {1d6, 2}kh1").evaluate({async: false});  //Change damage calculation here
      roll.toMessage({
      rollMode: 'roll',
      speaker: {alias: name}
      }); 
  }
}