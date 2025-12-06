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

async function scorching(num) {
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
      let toHit = await new Roll("1d20+12").evaluate({async: true});   //Change attack modifier here
      await toHit.toMessage({
        rollMode: 'roll'
      });
      let roll = await new Roll("{1d6, 2}kh1 + {1d6, 2}kh1").evaluate({async: true});  //Change damage calculation here
      await roll.toMessage({
        rollMode: 'roll'
      }); 
  }
}