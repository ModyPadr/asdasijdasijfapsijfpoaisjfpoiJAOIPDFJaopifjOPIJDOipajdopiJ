//======================================[Const]======================================
const Discord = require("discord.js");
const client = new Discord.Client();
const bot = new Discord.Client();
const ms = require("ms");
const fs = require('fs');
const moment = require('moment');
const request = require('request');
const dateFormat = require('dateformat');
const r1 = require('snekfetch');
const Canvas = require("canvas");
const jimp = require('jimp')
const weather = require('weather-js');
const prefix = "of!";
const adminprefix = "of!";
const admin = "of!";
const developers = ["316324088865882142","442762370448883720","200644160179535872"]

  



//======================================[Client]======================================

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', member=> {
  var guild = '502713112730796033';
    member.addRole(member.guild.roles.find("name","➡ Costumer 💵"));
    });
    
    client.on('message', function(message) {
    if (message.channel.type === "dm") {
        if (message.author.id === client.user.id) return;
        var iiMo = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTimestamp()
            .setTitle('``` New Dm Mesage ```')
            .setThumbnail(`${message.author.avatarURL}`)
            .setDescription(`\n\n\`\`\`${message.content}\`\`\``)
            .setFooter(`From : (@${message.author.tag})  |  (${message.author.id})`)
        client.channels.get("502728977513971743").send({ embed: iiMo });
    }
});
    
//======================================[Owners]======================================


client.on('message', message => {
    var argresult = message.content.split(` `).slice(1).join(' ');
      if (!developers.includes(message.author.id)) return;
      
  if (message.content.startsWith(admin + 'ply')) {
    client.user.setGame(argresult);
      message.channel.send(`** :heart:  ${argresult}**`)
  }  else  
  if (message.content.startsWith(admin + 'wt')) {
  client.user.setActivity(argresult, {type:'WATCHING'});
      message.channel.send(`** :heart:  ${argresult}**`)
  } else 
  if (message.content.startsWith(admin + 'ls')) {
  client.user.setActivity(argresult , {type:'LISTENING'});
      message.channel.send(`** :heart:  ${argresult}**`)
  } else 
  if (message.content.startsWith(admin + 'stream')) {
    client.user.setGame(argresult, "https://www.twitch.tv/idk");
      message.channel.send(`** :heart:  **`)
  }
  if (message.content.startsWith(admin + 'setname')) {
  client.user.setUsername(argresult).then
      message.channel.send(`Changing The Name To ..**${argresult}** `)
} else
if (message.content.startsWith(admin + 'setavatar')) {
  client.user.setAvatar(argresult);
    message.channel.send(`Changing The Avatar To :**${argresult}** `);
}
});  


//======================================[ Log ]======================================


client.on('message', message => {
    if(!message.channel.guild) return;
if (message.content.startsWith(prefix + 'ping')) {
if(!message.channel.guild) return;
var msg = `${Date.now() - message.createdTimestamp}`
var api = `${Math.round(client.ping)}`
if (message.author.bot) return;
let embed = new Discord.RichEmbed()
.setColor('#36393e')
.addField(' Time Taken : ',msg + " ms")
.addField(' WebSocket : ',api + " ms")
message.channel.send({embed:embed});
}
});

  client.on('messageUpdate', (message, newMessage) => {
    if (message.content === newMessage.content) return;
    if (!message || !message.id || !message.content || !message.guild || message.author.bot) return;
    const channel = message.guild.channels.find('name', 'log');
    if (!channel) return;
 
    let embed = new Discord.RichEmbed()
       .setAuthor(`${message.author.tag}`, message.author.avatarURL)
       .setColor('BLACK')
       .setDescription(`? **Message Editing
Sent By : <@${message.author.id}>                                                                                                                         Edit In :** <#${message.channel.id}>\n\nOld :\n \`${message.cleanContent}\`\n\nNew :\n \`${newMessage.cleanContent}\``)
       .setTimestamp();
     channel.send({embed:embed});
 
 
});
 
client.on('guildMemberAdd', member => {
    if (!member || !member.id || !member.guild) return;
    const guild = member.guild;
   
    const channel = member.guild.channels.find('name', 'log');
    if (!channel) return;
    let memberavatar = member.user.avatarURL
    const fromNow = moment(member.user.createdTimestamp).fromNow();
    const isNew = (new Date() - member.user.createdTimestamp) < 900000 ? '??' : '';
   
    let embed = new Discord.RichEmbed()
       .setAuthor(`${member.user.tag}`, member.user.avatarURL)
       .setThumbnail(memberavatar)
       .setColor('GREEN')
       .setDescription(`?? <@${member.user.id}> **Joined To The Server**\n\n`)
       .setTimestamp();
     channel.send({embed:embed});
});
 
client.on('guildMemberRemove', member => {
    if (!member || !member.id || !member.guild) return;
    const guild = member.guild;
   
    const channel = member.guild.channels.find('name', 'log');
    if (!channel) return;
    let memberavatar = member.user.avatarURL
    const fromNow = moment(member.joinedTimestamp).fromNow();
   
    let embed = new Discord.RichEmbed()
       .setAuthor(`${member.user.tag}`, member.user.avatarURL)
       .setThumbnail(memberavatar)
       .setColor('RED')
       .setDescription(`?? <@${member.user.id}> **Leave From Server**\n\n`)
       .setTimestamp();
     channel.send({embed:embed});
});
 
client.on('messageDelete', message => {
    if (!message || !message.id || !message.content || !message.guild || message.author.bot) return;
    const channel = message.guild.channels.find('name', 'log');
    if (!channel) return;
   
    let embed = new Discord.RichEmbed()
       .setAuthor(`${message.author.tag}`, message.author.avatarURL)
       .setColor('BLACK')
       .setDescription(`??? **Deleted Message**
**Sent By : <@${message.author.id}>                                                                                                                        Deleted in :** <#${message.channel.id}>\n\n \`${message.cleanContent}\``)
       .setTimestamp();
     channel.send({embed:embed});
 
});

     
      client.on("roleDelete", role => {
  client.setTimeout(() => {
    role.guild.fetchAuditLogs({
        limit: 1,
        type: 30
      })
      .then(audit => {
        let exec = audit.entries.map(a => a.executor.username)
        try {

          let log = role.guild.channels.find('name', 'log');
          if (!log) return;
          let embed = new Discord.RichEmbed()
            .setColor('#fd0101')            
            .setTitle('? RoleDeleted')
            .addField('Role Name', role.name, true)
            .addField('Role ID', role.id, true)
            .addField('By', exec, true)
            .setTimestamp()
          log.send(embed).catch(e => {
            console.log(e);
          });
        } catch (e) {
          console.log(e);
        }
      })
  }, 1000)
})


client.on('roleCreate', role => {
  client.setTimeout(() => {
    role.guild.fetchAuditLogs({
        limit: 1,
        type: 30
      })
      .then(audit => {
        let exec = audit.entries.map(a => a.executor.username)
        try {

          let log = role.guild.channels.find('name', 'log');
          if (!log) return;
          let embed = new Discord.RichEmbed()
            .setTitle('? RoleCreated')
            .addField('Role Name', role.name, true)
            .addField('Role ID', role.id, true)
            .addField('By', exec, true)
            .setTimestamp()
          log.send(embed).catch(e => {
            console.log(e);
          });
        } catch (e) {
          console.log(e);
        }
      })
  }, 1000)
})




  client.on("guildBanAdd", (guild, member) => {
  client.setTimeout(() => {
    guild.fetchAuditLogs({
        limit: 1,
        type: 22
      })
      .then(audit => {
        let exec = audit.entries.map(a => a.executor.username);
        try {
          let log = guild.channels.find('name', 'log');
          if (!log) return;
          client.fetchUser(member.id).then(myUser => {
          let embed = new Discord.RichEmbed()
        .setAuthor("Ban Added")
	    .setColor("BLACK")
        .setThumbnail(myUser.avatarURL)
        .addField('# Banned User:',`**${myUser.username}**`,true)
        .addField('# Banned By:',`**${exec}**`,true)
        .setFooter(myUser.username,myUser.avatarURL)
            .setTimestamp();
          log.send(embed).catch(e => {
            console.log(e);
          });
          });
        } catch (e) {
          console.log(e);
        }
      });
  }, 1000);
});



    client.on("guildBanRemove", (guild, member) => {
  client.setTimeout(() => {
    guild.fetchAuditLogs({
        limit: 1,
        type: 22
      })
      .then(audit => {
        let exec = audit.entries.map(a => a.executor.username);
        try {
          let log = guild.channels.find('name', 'log');
          if (!log) return;
          client.fetchUser(member.id).then(myUser => {
          let embed = new Discord.RichEmbed()
        .setAuthor("Ban revoked !")
		.setColor("BLACK")
		 .setThumbnail(myUser.avatarURL)
        .addField('# Banned User',`**${myUser.username}**`,true)
        .addField('# Revoked By',`**${exec}**`,true)
        .setFooter(myUser.username,myUser.avatarURL)
            .setTimestamp();
          log.send(embed).catch(e => {
            console.log(e);
          });
          });
        } catch (e) {
          console.log(e);
        }
      });
  }, 1000);
});


  
  
//======================================[Commands]======================================

let sw = JSON.parse(fs.readFileSync("./setWlc.json", "UTF8"))

    client.on('message', message => {

        let mothed = ['text', 'embed', 'image'];
        let sets = message.content.split(" ").slice(1).join(" ")
        let style = message.content.split(" ").slice(2).join(" ")
        let stym = message.content.split(" ").slice(3).join(" ")
        let msz = message.content.split(" ").slice(2).join(" ")
        let ch = message.content.split(" ").slice(2).join(" ")
        let r = message.content.split(" ").slice(4).join(" ")


        if(message.content.startsWith(prefix + "setWlc")) {
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("**You need `Manage Channels` permission**")
            if(!sw[message.guild.id]) sw[message.guild.id] = {
                cha: "welcome",
                msz: "Welcome Bro",
                styler: "text"
            };

            if(!sets) {
                message.channel.send(`**Usage:
            ${prefix}setWlc style <text, image, embed>
            ${prefix}setWlc msg <message>
            ${prefix}setWlc channal <channel name>**`)
            }

            if(!mothed) {
                message.channel.send(`**Usage: ${prefix}setWlc style <text, imgae, embed>**`)
            }

            if(message.content === prefix + 'setWlc style image') {
                if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("**You need `Manage Channels` permission**")
                sw[message.guild.id].styler = 'image'
                message.channel.send(`**Your server welcome mothed has been changed to ${sw[message.guild.id].styler}**`)
            }

            if(message.content === prefix + 'setWlc style embed') {
                if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("**You need `Manage Channels` permission**")
                 sw[message.guild.id].styler = 'embed'
                message.channel.send(`**Your server welcome mothed has been changed to ${sw[message.guild.id].styler}**`)            }

            if(message.content === prefix + 'setWlc style text') {
                if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("**You need `Manage Channels` permission**")
                 sw[message.guild.id].styler = 'text'
                message.channel.send(`**Your server welcome mothed has been changed to ${sw[message.guild.id].styler}**`)
            }

        }

        if(message.content.startsWith(prefix + "setWlc msg")) {
            if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**You need `Manage Messages` permission**")
            if(!msz) {
                message.channel.send("Usage: <setWlc msg <message>")
            } else {
                message.channel.send(`**Your server welcome message has been changed to __${msz}__**`)
                sw[message.guild.id].msk = msz
            }
        }

        if(message.content.startsWith(prefix + "setWlc channel")) {
            if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("**You need `Manage Channels` permission**")
            if(!ch) {
                message.channel.send("Usage: <setWlc channel <channel name>")
            }
            let chn = message.guild.channels.find("name", ch)
            if(!chn) {
                message.channel.send("**I can't find this channel**")
            }
            else {
                 sw[message.guild.id].cha = chn.name
                 message.channel.send(`**Your server welcome channel has been changed to __${chn.name}__**`)
                 }
        }

        fs.writeFile('./setWlc.json', JSON.stringify(sw), (err) => {
if (err) console.error(err);
})
})


client.on('guildMemberAdd', member => {
    let channel = member.guild.channels.find("name", sw[member.guild.id].cha)

    if(sw[member.guild.id].styler === "text") {
        channel.sendMessage(`<@${member.user.id}>, ${sw[member.guild.id].msk}`)
    }

    if(sw[member.guild.id].styler === "embed") {

        const embed = new Discord.RichEmbed()
        .setTitle("Member joind.")
        .setColor("GREEN")
        .setThumbnail(member.user.avatarURL)
        .setDescription(`**${sw[member.guild.id].msk}**`)
        .addField("**Member name**", `[<@${member.user.id}>]`,true)
        .addField("**Now we are**", `[${member.guild.memberCount}]`,true)
        channel.sendMessage(`<@${member.user.id}>`)
        channel.sendEmbed(embed)
    }

    if(sw[member.guild.id].styler === "image") {
        if (member.user.bot) return;
const w = ['./image.png'];
        let Image = Canvas.Image,
            canvas = new Canvas(749, 198),
            ctx = canvas.getContext('2d');
        ctx.patternQuality = 'bilinear';
        ctx.filter = 'bilinear';
        ctx.antialias = 'subpixel';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 2;
        ctx.stroke();
        ctx.beginPath();

        fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function (err, Background) {
            if (err) return console.log(err);
            let BG = Canvas.Image;
            let ground = new Image;
            ground.src = Background;
            ctx.drawImage(ground, 0, 0, 749, 198);

})

                let url = member.user.displayAvatarURL.endsWith(".webp") ? member.user.displayAvatarURL.slice(5, -20) + ".png" : member.user.displayAvatarURL;
                jimp.read(url, (err, ava) => {
                    if (err) return console.log(err);
                    ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                 if (err) return console.log(err);

ctx.font = '35px Aeland';
                        ctx.fontSize = '40px';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(" Welcome to " + member.guild.name , 440, 25);

                        //ur name
                        ctx.font = '40px Impact';
                        ctx.fontSize = '48px';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(member.user.username, 420, 100);

                         ctx.font = '30px Impact';
                        ctx.fontSize = '20px';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(sw[member.guild.id].msk, 410, 170);


                        //Avatar
                        let Avatar = Canvas.Image;
                              let ava = new Avatar;
                              ava.src = buf;
                              ctx.beginPath();
                              ctx.arc(115, 100, 90, 0, Math.PI*2);
                                 ctx.closePath();
                                 ctx.clip();
                                 ctx.drawImage(ava, 5, 5, 200, 200);
                                 channel.sendMessage(`<@${member.user.id}>`)
        channel.sendFile(canvas.toBuffer())



})
})

    }

})


client.on('message', async message => {
  let args = message.content.split(" ");
  if(message.content.startsWith(prefix + "mute")) {
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply('**أنت لا تملك الخصائص اللازمة . يجب توفر خاصية `Manage Roles`**').then(msg => {
      msg.delete(3500);
      message.delete(3500);
    });

    if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.reply('**أنا لا املك الخصائص الكافية . يلزم خصائص `Manage Roles` للقيام بهذا الامر**').then(msg => {
      msg.delete(3500);
      message.delete(3500);
    });

    let mention = message.mentions.members.first();
    if(!mention) return message.reply('**منشن عضو لأسكاته ( لأعطائة ميوت ) كتابي**').then(msg => {
      msg.delete(3500);
      message.delete(3500);
    });

    if(mention.highestRole.position >= message.guild.member(message.author).highestRole.positon) return message.reply('**لا يمكنك اعطاء لميوت شخص رتبته اعلى منك**').then(msg => {
      msg.delete(3500);
      message.delete(3500);
    });
    if(mention.highestRole.positon >= message.guild.member(client.user).highestRole.positon) return message.reply('**لا يمكنني اعطاء ميوت لشخص رتبته اعلى مني**').then(msg => {
      msg.delete(3500);
      message.delete(3500);
    });
    if(mention.id === message.author.id) return message.reply('**لا يمكنك اعطاء ميوت  لنفسك**').then(msg => {
      msg.delete(3500);
      message.delete(3500);
    });

    let duration = args[2];
    if(!duration) return message.reply('**حدد وقت زمني لفك الميوت عن الشخص**').then(msg => {
      msg.delete(3500);
      message.delete(3500);
    });

    if(isNaN(duration)) return message.reply('**حدد وقت زمني صحيح**').then(msg => {
      msg.delete(3500);
      message.delete(3500);
    });

    let reason = message.content.split(" ").slice(3).join(" ");
    if(!reason) reason = "غير محدد";

    let thisEmbed = new Discord.RichEmbed()
    .setAuthor(mention.user.username, mention.user.avatarURL)
    .setTitle('تم اغطائك ميوت بسيرفر')
    .setThumbnail(mention.user.avatarURL)
    .addField('# - السيرفر',message.guild.name,true)
    .addField('# - تم اعطائك ميوت بواسطة',message.author,true)
    .addField('# - السبب',reason)

    let role = message.guild.roles.find('name', 'Muted') || message.guild.roles.get(r => r.name === 'Muted');
    if(!role) try {
      message.guild.createRole({
        name: "Muted",
        permissions: 0
      }).then(r => {
        message.guild.channels.forEach(c => {
          c.overwritePermissions(r , {
            SEND_MESSAGES: false,
            READ_MESSAGES_HISTORY: false,
            ADD_REACTIONS: false
          });
        });
      });
    } catch(e) {
      console.log(e.stack);
    }
    mention.addRole(role).then(() => {
      mention.send(thisEmbed);
      message.channel.send(`**:white_check_mark: ${mention.user.username} muted in the server ! :zipper_mouth:  **  `);
      mention.setMute(true);
    });
    setTimeout(() => {
      if(duration === 0) return;
      if(!mention.has.roles(role)) return;
      mention.setMute(false);
      mention.removeRole(role);
      message.channel.send(`**:white_check_mark: ${mention.user.username} unmuted in the server ! :neutral_face:  **  `);
    },duration * 60000);
  } else if(message.content.startsWith(prefix + "unmute")) {
    let mention = message.mentions.members.first();
    let role = message.guild.roles.find('name', 'Muted') || message.guild.roles.get(r => r.name === 'Muted');
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply('**أنت لا تملك الخصائص اللازمة . يجب توفر خاصية `Manage Roles`**').then(msg => {
      msg.delete(3500);
      message.delete(3500);
    });

    if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.reply('**أنا لا املك الخصائص الكافية . يلزم خصائص `Manage Roles` للقيام بهذا الامر**').then(msg => {
      msg.delete(3500);
      message.delete(3500);
    });

    if(!mention) return message.reply('**منشن الشخص لفك الميوت عنه**').then(msg => {
      msg.delete(3500);
      message.delete(3500);
    });

      mention.removeRole(role);
      mention.setMute(false);
      message.channel.send(`**:white_check_mark: ${mention.user.username} unmuted in the server ! :neutral_face:  **  `);
  }
});

client.on('message', message => {
  if (message.author.x5bz) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "kick") {
               if(!message.channel.guild) return message.reply('** This command only for servers**');
         
  if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply("**You Don't Have ` KICK_MEMBERS ` Permission**");
  if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.reply("**I Don't Have ` KICK_MEMBERS ` Permission**");
  let user = message.mentions.users.first();
  let reason = message.content.split(" ").slice(2).join(" ");
  /*let b5bzlog = client.channels.find("name", "5bz-log");

  if(!b5bzlog) return message.reply("I've detected that this server doesn't have a 5bz-log text channel.");*/
  if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
  if(!reason) return message.reply ("**اكتب سبب الطرد**");
  if (!message.guild.member(user)
  .kickable) return message.reply("**لايمكنني طرد شخص اعلى من رتبتي يرجه اعطاء البوت رتبه عالي**");

  message.guild.member(user).kick();

  const kickembed = new Discord.RichEmbed()
  .setAuthor(`KICKED!`, user.displayAvatarURL)
  .setColor("RANDOM")
  .setTimestamp()
  .addField("**User:**",  '**[ ' + `${user.tag}` + ' ]**')
  .addField("**By:**", '**[ ' + `${message.author.tag}` + ' ]**')
  .addField("**Reason:**", '**[ ' + `${reason}` + ' ]**')
  message.channel.send({
    embed : kickembed
  })
}
});



client.on('message', async message => {
    let args = message.content.split(" ");
    let command = args[0];

    if(command === prefix + 'ban') {
      if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply('انت لا تملك الصلاحيات اللازمة').then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });

      if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.reply('انا لا املك الصلاحيات اللازمة. يحب توفر صلاحيات `Ban Members , Embed Links`').then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });

      let mention = message.mentions.members.first();
      if(!mention) return message.reply('**منشن عضو لطرده**').then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });
      if(mention.highestRole.position >= message.guild.member(message.author).highestRole.positon) return message.reply('**لا يمكنك طرد شخص رتبته اعلى منك**').then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });
      if(mention.highestRole.positon >= message.guild.member(client.user).highestRole.positon) return message.reply('**لا يمكنني طرد شخص رتبته اعلى مني**').then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });
      if(mention.id === message.author.id) return message.reply('**لا يمكنك طرد  نفسك**').then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });

       let duration = args[2];
       if(!duration) return message.reply('**حدد وقت زمني لفك البان عن الشخص**').then(msg => {
         msg.delete(3500);
         message.delete(3500);
       });
       if(isNaN(duration)) return message.reply('**حدد وقت زمني صحيح**').then(msg => {
         msg.delete(3500);
         message.delete(3500);
       });

       let reason = message.content.split(" ").slice(3).join(" ");
       if(!reason) reason = 'غير محدد';

       let thisEmbed = new Discord.RichEmbed()
       .setAuthor(mention.user.username , mention.user.avatarURL)
       .setTitle('لقد تبندت من سيرفر')
       .setThumbnail(mention.avatarURL)
       .addField('# - السيرفر:',message.guild.name,true)
       .addField('# - تم طردك بواسطة',message.author,true)
       .addField('# - السبب',reason)
       .setFooter(message.author.tag,message.author.avatarURL);
       mention.send(thisEmbed).then(() => {
       mention.ban({
         reason: reason,
       });
       message.channel.send(`**:white_check_mark: ${mention.user.username} banned from the server ! :airplane: **  `)
       setTimeout(() => {
         if(duration === 0) return;
         message.guild.unban(mention);
       },duration * 60000);
     });
   }
});
    



client.on('message', eyad => {
  if (eyad.content.startsWith('vb')) {
if (!eyad.member.hasPermission("MOVE_MEMBERS")) return eyad.channel.send("**انت لا تمتلك الخاصيه المطلوبه** | ❎ ");
let men = eyad.mentions.users.first()
let mas = eyad.author
if(!men) return eyad.channel.send('`منشن شخص `');
eyad.guild.channels.forEach(c => {
c.overwritePermissions(men.id, {
          CONNECT: false
})
    })
const embed = new Discord.RichEmbed()
.setColor("RANDOM")
.setDescription(`**
 <@${men.id}>
لقد تم منع من دخول الرومات الصوتيه 
بواسطة : <@${eyad.author.id}> **`)
.setThumbnail("https://cdn.discordapp.com/attachments/408952032112803850/452090205793681419/fd684707fc14f41663f15ecebf089f06.png")
          
client.users.get(men.id).sendEmbed(embed)
const Embed11 = new Discord.RichEmbed()
.setColor("RANDOM")
.setAuthor(eyad.guild.name, eyad.guild.iconURL)
.setDescription(`          <@${men.id}>
لقد تم منع من دخول الرومات الصوتيه 
بواسطة : <@${eyad.author.id}> `)
.setThumbnail("https://cdn.discordapp.com/attachments/408952032112803850/452090205793681419/fd684707fc14f41663f15ecebf089f06.png")
eyad.channel.sendEmbed(Embed11).then(eyad => {eyad.delete(10000)})
    }
})// نهايه كود الباند الفويس


client.on('message', eyad => {
  if (eyad.content.startsWith('uvb')) {
if (!eyad.member.hasPermission("MOVE_MEMBERS")) return eyad.channel.send("**انت لا تمتلك الخاصيه المطلوبه** | ❎ ");
 let men = eyad.mentions.users.first()
 let mas = eyad.author
 if(!men) return eyad.channel.send('`منشن شخص `');
 eyad.guild.channels.forEach(c => {
 c.overwritePermissions(men.id, {
         CONNECT: true
 })
    })
const embed = new Discord.RichEmbed()
.setColor("RANDOM")
.setDescription(`**
 <@${men.id}>
 الان يمكنك الدخول الي الرومات الصوتيه :)
بواسطة : <@${eyad.author.id}> **`)
.setThumbnail("https://cdn.discordapp.com/attachments/408952032112803850/452093541003296788/start-button-hi.png")
          
client.users.get(men.id).sendEmbed(embed)
const Embed11 = new Discord.RichEmbed()
.setColor("RANDOM")
.setAuthor(eyad.guild.name, eyad.guild.iconURL)
.setDescription(`          <@${men.id}>
الان يمكنك الدخول الي الرومات الصوتيه
بواسطة : <@${eyad.author.id}>
`)
.setThumbnail("https://cdn.discordapp.com/attachments/408952032112803850/452093541003296788/start-button-hi.png")
eyad.channel.sendEmbed(Embed11).then(eyad => {eyad.delete(15000)})
    }
}) // نهايه كود فك الباند الفويس


client.on('message', message => {
  if(!message.channel.guild) return;
     if(message.author.id !== '419212015098134538') return;
if(message.content.startsWith(prefix +'bc')) {
if(!message.channel.guild) return message.channel.send('**هذا الأمر فقط للسيرفرات**').then(m => m.delete(5000));
if(!message.member.hasPermission('ADMINISTRATOR')) return      message.channel.send('**للأسف لا تمتلك صلاحية** `ADMINISTRATOR`' );
let args = message.content.split(" ").join(" ").slice(2 + prefix.length);
let copy = "Premuim";
let request = `Requested By ${message.author.username}`;
if (!args) return message.reply('**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**');message.channel.send(`**هل أنت متأكد من إرسالك البرودكاست؟ \nمحتوى البرودكاست:** \` ${args}\``).then(msg => {
msg.react('✅')
.then(() => msg.react('❌'))
.then(() =>msg.react('✅'))

let reaction1Filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
let reaction2Filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
reaction1.on("collect", r => {
message.channel.send(`☑ | Done ... The Broadcast Message Has Been Sent For ${message.guild.members.size} Members`).then(m => m.delete(5000));
message.guild.members.forEach(m => {
var bc = new
Discord.RichEmbed()
.setColor('RANDOM')
.setTitle('Broadcast')
.addField('Server', message.guild.name)
.addField('Sender', message.author.username)
.addField('Message', args)
.setThumbnail(message.author.avatarURL)
.setFooter(copy, client.user.avatarURL);
m.send({ embed: bc })
msg.delete();
})
})
reaction2.on("collect", r => {
message.channel.send(`**Broadcast Canceled.**`).then(m => m.delete(5000));
msg.delete();
})
})
}
});
  
  client.on('message', msg => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;
  let command = msg.content.split(" ")[0];
  command = command.slice(prefix.length);
  let args = msg.content.split(" ").slice(1);

    if(command === "clear") {
        const emoji = client.emojis.find("name", "wastebasket")
    let textxt = args.slice(0).join("");
    if(msg.member.hasPermission("MANAGE_MESSAGES")) {
    if (textxt == "") {
        msg.delete().then
    msg.channel.send("Error : `` Type a Value To Delete ``").then(m => m.delete(3000));
} else {
    msg.delete().then
    msg.delete().then
    msg.channel.bulkDelete(textxt);
        msg.reply("Cleared : ``" + textxt + "``").then(m => m.delete(3000));
        }    
    }
}
});


client.on('message', message => {
    if (message.content.startsWith( prefix + "avatar")) {
        if(message.author.bot) return;
        if(!message.channel.guild) return message.reply(' Error : \` Guild Command \`');
        var mentionned = message.mentions.users.first();

 if (mentionned) return;
          var x5bzm = message.author;
      
        const embed = new Discord.RichEmbed()
        .setColor("BLACK")
        .setImage(`${x5bzm.avatarURL}`)
      message.channel.sendEmbed(embed);
    }
});

client.on('message', message => {
    if(message.content === prefix + 'guild'){
            const millis = new Date().getTime() - message.member.user.createdAt.getTime();
    const now = new Date();
    const createdAt = millis / 1000 / 60 / 60 / 24;
    var heg = message.guild;

        const embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .addField('GuidlOwner',message.guild.owner,true)
        .addField('Guild ID', message.guild.id,true)
        .addField('Guild MemberCount', `${message.guild.memberCount}`+` [Online : ${message.guild.members.filter(m=>m.presence.status == 'online').size}]`)
        .addField('Guild Channels',`\`??\` ${message.guild.channels.filter(m => m.type === 'text').size} | `+`\`#\`${message.guild.channels.filter(m => m.type === 'voice').size} `)
        .addField('Guild RolesCount',` ${message.guild.roles.size} `,true)
        .addField('Created',`\`${moment(heg.createdTimestamp).fromNow()}\`` ,true)
        .addField('Guild Region',message.guild.region,true)
        
        
        message.channel.send(embed)
    }
})

client.on('message', message => {
    if (message.content.startsWith(prefix + "stats")) {
               if(message.author.bot) return;
        if(!message.channel.guild) return message.reply(' Error : \` Guild Command \`');
    message.channel.send({
        embed: new Discord.RichEmbed()
            .setColor('BLACK')
            .addField('Ping' , [`${Date.now() - message.createdTimestamp}` + 'MS'], true)
            .addField('RAM Usage', `[${(process.memoryUsage().rss / 1048576).toFixed()}MB]`, true)
            .addField('ID' , `[ ${client.user.id} ]` , true)
            .addField('Prefix' , `[ ${prefix} ]` , true)
            
    })
}
});
      
      const arraySort = require('array-sort'),
          table = require('table');

client.on('message' , async (message) => {

    if(message.content.startsWith(prefix + "invites")) {
                 if(message.author.bot) return;
        if(!message.channel.guild) return message.reply(' Error : \` Guild Command \`');

  var invites = await message.guild.fetchInvites();

    invites = invites.array();

    arraySort(invites, 'uses', { reverse: true });

    let possibleInvites = ['User Invited |  Uses '];
    invites.forEach(i => {
        if (i.uses === 0) { 
            return;
            
        }
      possibleInvites.push(['\n\ ' +'<@'+ i.inviter.id +'>' + '  :  ' +   i.uses]);
       
      if (i.uses === 20) {
          message.member.addRole(message.member.guild.roles.find("name","Clients"));
      }
     
    })
    
    const embed = new Discord.RichEmbed()
    .setColor('BLACK')
    .addField("Top Invites." ,`${(possibleInvites)}`)

    message.channel.send(embed)
    }
});



 client.on('message', message => {
    if (message.content.startsWith("رابط")) {
        message.channel.createInvite({
        thing: true,
        maxUses: 5,
        maxAge: 3600,
    }).then(invite =>
      message.author.sendMessage(invite.url)
    )
    const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
          .setDescription("تم أرسال الرابط برسالة خاصة")
           .setAuthor(client.user.username, client.user.avatarURL)
                 .setAuthor(client.user.username, client.user.avatarURL)
                .setFooter('طلب بواسطة:' + message.author.tag)

      message.channel.sendEmbed(embed).then(message => {message.delete(10000)})
              const Embed11 = new Discord.RichEmbed()
        .setColor("RANDOM")
        
    .setDescription("** مدة الرابط : ساعه | عدد استخدامات الرابط : 5 **")
      message.author.sendEmbed(Embed11)
    }
}); 


client.on("guildMemberAdd", member => {
  member.createDM().then(function (channel) {
  return channel.send(`** :hearts: ولكم نورت السيرفر :hearts:
  :grinning:  أسم العضو --> __${member}__ :grinning: 
  :bust_in_silhouette:  انت عضو رقم --> __${member.guild.memberCount}__ :bust_in_silhouette:
  :airplane: __${moment().format('HH:mm:ss A')}__ <-- تاريخ دخولك السيرفر ** :airplane: `)
}).catch(console.error)
})



      bot.on('guildMemberAdd', member => {
      const welcomer =  member.guild.channels.find('name', 'welcome-goodbye'); //اسم الروم

      var Canvas = require('canvas')
      var jimp = require('jimp')

      const w = ['./imgs/w1.png',
      './imgs/w1.png',];

              let Image = Canvas.Image,
                  canvas = new Canvas(401, 202),
                  ctx = canvas.getContext('2d');
              ctx.patternQuality = 'bilinear';
              ctx.filter = 'bilinear';
              ctx.antialias = 'subpixel';
              ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
              ctx.shadowOffsetY = 2;
              ctx.shadowBlur = 2;
              fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function (err, Background) {
                  if (err) return console.log(err)
                  let BG = Canvas.Image;
                  let ground = new Image;
                  ground.src = Background;
                  ctx.drawImage(ground, 0, 0, 401, 202);

      })

                      let url = member.user.displayAvatarURL.endsWith(".webp") ? member.user.displayAvatarURL.slice(5, -20) + ".gif" : member.user.displayAvatarURL;
                      jimp.read(url, (err, ava) => {
                          if (err) return console.log(err);
                          ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                              if (err) return console.log(err);

                              //AVATAR�
                              let Avatar = Canvas.Image;
                              let ava = new Avatar;
                              ava.src = buf;
                              ctx.drawImage(ava, 152, 27, 95, 95);

                                                      //wl
                              ctx.font = '20px Arial Bold';
                              ctx.fontSize = '15px';
                              ctx.fillStyle = "#f20000";
                              ctx.textAlign = "center";
                                                         ctx.fillText(member.user.username, 200, 154);

                              //NAME�
                              ctx.font = '20px Arial';
                              ctx.fontSize = '28px';
                              ctx.fillStyle = "#f20000";
                              ctx.textAlign = "center";
                                    ctx.fillText(`انت العضو رقم ${member.guild.memberCount} `
                              , 200, 190);

 welcomer.sendFile(canvas.toBuffer())



      })
      })
      });





client.on('message', message => {
    if (message.content.startsWith(prefix + "stats")) {
    message.channel.send({
        embed: new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle('Stats Bot / Info ')
            .addField('``Uptime``', timeCon(process.uptime()), true)
            .addField('``Ping Is``' , `${Date.now() - message.createdTimestamp}` + '``Ms``', true)
            .addField('``RAM Usage``', `${(process.memoryUsage().rss / 1048576).toFixed()}MB`, true)
            .addField('``Guild Count``', client.guilds.size, true)
            .addField('``Bot In channel``' , `${client.channels.size}` , true)
            .addField('``Users rout``' ,`${client.users.size}` , true)
            .addField('``Name Bot Or tag``' , `${client.user.tag}` , true)
            .addField('``Bot Id``' , `${client.user.id}` , true)
            .setFooter('SmiLeBoT / Team')
    })
}
});


function timeCon(time) {
    let days = Math.floor(time % 31536000 / 86400)
    let hours = Math.floor(time % 31536000 % 86400 / 3600)
    let minutes = Math.floor(time % 31536000 % 86400 % 3600 / 60)
    let seconds = Math.round(time % 31536000 % 86400 % 3600 % 60)
    days = days > 9 ? days : '0' + days
    hours = hours > 9 ? hours : '0' + hours
    minutes = minutes > 9 ? minutes : '0' + minutes
    seconds = seconds > 9 ? seconds : '0' + seconds
    return `${days > 0 ? `${days}:` : ''}${(hours || days) > 0 ? `${hours}:` : ''}${minutes}:${seconds}`
}


client.on('ready', () => {
    client.user.setStatus("dnd");
 
 });


client.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);
  
 

if (command == "embed") {
    let say = new Discord.RichEmbed()
    .setDescription(args.join("  "))
    .setColor(0x23b2d6)
    message.channel.sendEmbed(say);
    message.delete();
  }


});


client.on('message', function(msg) {
if(msg.content.startsWith (prefix  + 'server')) {
 let embed = new Discord.RichEmbed()
 .setColor('RANDOM')
 .setThumbnail(msg.guild.iconURL)
 .setTitle(`Showing Details Of  **${msg.guild.name}*`)
 .addField(':globe_with_meridians:** نوع السيرفر**',`[** __${msg.guild.region}__ **]`,true)
 .addField(':medal:** __الرتب__**',`[** __${msg.guild.roles.size}__ **]`,true)
 .addField(':red_circle:**__ عدد الاعضاء__**',`[** __${msg.guild.memberCount}__ **]`,true)
 .addField(':large_blue_circle:**__ عدد الاعضاء الاونلاين__**',`[** __${msg.guild.members.filter(m=>m.presence.status == 'online').size}__ **]`,true)
 .addField(':pencil:**__ الرومات الكتابية__**',`[** __${msg.guild.channels.filter(m => m.type === 'text').size}__** ]`,true)
 .addField(':microphone:**__ رومات الصوت__**',`[** __${msg.guild.channels.filter(m => m.type === 'voice').size}__ **]`,true)
 .addField(':crown:**__ الأونـر__**',`**${msg.guild.owner}**`,true)
 .addField(':id:**__ ايدي السيرفر__**',`**${msg.guild.id}**`,true)
 .addField(':date:**__ تم عمل السيرفر في__**',msg.guild.createdAt.toLocaleString())
 msg.channel.send({embed:embed});
}
});


client.on('message', message => {
if (message.content.startsWith(prefix + "uptime")) {
   let uptime = client.uptime;

   let days = 0;
   let hours = 0;
   let minutes = 0;
   let seconds = 0;
   let notCompleted = true;

   while (notCompleted) {

       if (uptime >= 8.64e+7) {

           days++;
           uptime -= 8.64e+7;

       } else if (uptime >= 3.6e+6) {

           hours++;
           uptime -= 3.6e+6;

       } else if (uptime >= 60000) {

           minutes++;
           uptime -= 60000;

       } else if (uptime >= 1000) {
           seconds++;
           uptime -= 1000;

       }

       if (uptime < 1000)  notCompleted = false;

   }

   message.channel.send("`" + `${days} days, ${hours} hrs, ${minutes} min , ${seconds} sec` + "`");


}
});

























client.login(process.env.BOT_TOKEN);
