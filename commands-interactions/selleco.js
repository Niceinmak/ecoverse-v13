const { MessageEmbed,MessageButton,MessageActionRow } = require('discord.js');
const btcValue = require('btc-value');
module.exports = {
    description: 'Sell ​​before the price drops!',
  options: [
       {
            name: 'amount',
            description: 'Select amount',
            type: 'INTEGER',
            required: true
        },
    ],
    run: async (client, interaction) => {
         let timecooldown = Math.floor(Math.random() * 200)+50;
    let playtime = await client.eco.beg(client.ecoAddUser, timecooldown,{cooldown: 5000});
    if (playtime.onCooldown) return interaction.reply(`**Take it slow,wait ${playtime.time.seconds} more seconds**`);
   let data2= client.eco.removeMoney(interaction.user.id, parseInt(timecooldown));
  btcValue().then(value => {
value = value.toString().slice(0,3);
  let authordata = client.eco.fetchMoney(`${interaction.user.id}11`) 
  let amount = interaction.options.getInteger('amount')
  if(amount=="all") amount=authordata.amount
  if(amount=="half") amount=authordata.amount/2
  if (!amount || isNaN(amount) || amount<1) return interaction.reply(`**Please enter a valid amount to sell**`)
  if(authordata.amount < amount) return interaction.reply(`**Looks like you don\'t have that much EcoCoin,Maximum amount you can sell: ${authordata.amount} EcoCoin.**`) 
  client.eco.removeMoney(`${interaction.user.id}11`, parseInt(amount));
  client.eco.addMoney(interaction.user.id, parseInt(amount*value));
  let amountformat=String(amount).replace(/(.)(?=(\d{3})+$)/g,'$1,')
  let amountformat2=String(amount*value).replace(/(.)(?=(\d{3})+$)/g,'$1,')
  return interaction.reply(`**${amountformat} EcoCoin has been sold successfully! The money you earn is ${amountformat2}💶.**`)
});
    }
};
