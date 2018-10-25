exports.phrases={
 enter_phrase: 'Для доступа ко все каналам нажмите на реакцию соответствующую тому что изображено на картинке \n Успейте нажать в течении 5 минут\n Нажатие на другие реакции лишит вас возможности получить доступ.',
 wrong_phrase:' Выбрана неверная реакция.',
 timeout_phrase:' Время ожидания реакции истекло.',
 waitingForRole_phrase:' Через 5 минут доступ будет открыт.\nА пока почитайте правила сервера <#301319871981944834>',
 tryAgain_phrase:' Попробуй пройти тест еще раз',
 ifFail_phrase:' Перезайди или напиши что-нибудь в этот канал',
 fail_phrase:[
            'По твоему это #wrong_answer ?..(Правильный ответ: #right_answer) <:40:402137819314651137>',
             'Ты нормальный? #wrong_answer с #right_answer спутал'  
              ],
  ifFail_phrase:' Перезайди на сервер (инавайт отправлен в лс)',
  dm_msg:'Вы не прошли проверку на бота для доступа ко всем каналам сервера, перезайдите и попробуйте еще раз.\n https://discord.gg/3Q8ZVhH'
};
exports.delay={
 waitingForRole_minutes:1,
 waitingReactions_minutes:1
};

exports.secret_arr=[


['http://pre09.deviantart.net/a9f9/th/pre/i/2013/081/8/2/moon_sun_yin_yang_by_de3euk-d5yuhrc.jpg','☯','инь-янь'],
['https://www.vladtime.ru/uploads/posts/2018-01/1515478436_tmpqhxuel.jpeg','👽','инопланетянен'],
['http://foto-babochek.ru/images/clipart-babochka_13.png','🦋','бабочка'],
['https://www.astromeridian.ru/assets/images/sonnik/ogon.jpg','🔥','огонь'],
['http://earth-chronicles.ru/News_5/m4/2f6d813fb35408ccaa28df1fcbd44983_cropped_aed64e3ec.jpg','🍄','гриб'],
['https://coubsecure-s.akamaihd.net/get/b53/p/coub/simple/cw_timeline_pic/d701ec61ac9/085bc72104c888279bb41/med_1486059184_image.jpg','😭','маленькая бедняжка'],
['http://2.bp.blogspot.com/-cLupwTzC-cw/VeBDKkcgb6I/AAAAAAAADwU/rU3xXCVx8gM/s1600/heart%2Bfire.jpg','❤','сердце'],
['https://moredobra.com.ua/wp-content/uploads/img/p/2/5/5/1/6/25516-thickbox_default.jpg','👣','следы'] ,
['https://avatanplus.com/files/resources/original/59fcac9bbc61a15f8302407c.png','💀','череп'],
['http://www.wallpapers13.com/wp-content/uploads/2016/04/Unicorn-galloping-sky-clouds-full-moon-Desktop-Wallpaper-HD-for-mobile-phones-and-laptops-1280x1024.jpg','🦄','единорог']
/*
['unicorn/r1.jpg','🦄'],
['unicorn/r1.jpg','🦄'],
['unicorn/r1.jpg','🦄'],
['unicorn/r1.jpg','🦄'],
['unicorn/r1.jpg','🦄'],
['unicorn/r1.jpg','🦄']
*/
];//secret_arr

exports.system={
  ROLE_TIME_NAME:'Временная роль',
  ROLE_NAME:'Кто все эти люди',
 GUEST_CHANNEL_ID:'488840569674530816',
 SERVER_ID:'301063859702071316'
};//

exports.run = async(client, member) => {
try{
          if(member.guild.id!=module.exports.system.SERVER_ID) return;

//-----check if member has roles 
        let delay=(duration)=>new Promise( resolve => setTimeout(resolve,duration) );
        await delay(5*1000); 
        if( member.roles.keyArray().length>2) {
           await   member.removeRole(member.guild.roles.find(r=>r.name==module.exports.system.ROLE_TIME_NAME));
           await member.guild.channels.get(module.exports.system.GUEST_CHANNEL_ID).send(member.user.username+' Уже есть роли доступа');
           return;
        }else if(member.roles.keyArray().length==2){
           if (!member.roles.find(r=>r.name==module.exports.system.ROLE_TIME_NAME)){
              await member.guild.channels.get(module.exports.system.GUEST_CHANNEL_ID).send(member.user.username+' Уже есть роль доступа');
              return;
             };
        };
//-----

          await module.exports.check(client,member);
 }catch(err){console.log(err);}
};//exports.end

exports.check = async(client, member) => {
try{
   let delay=(duration)=>new Promise( resolve => setTimeout(resolve,duration) );
   let channel=client.channels.get(module.exports.system.GUEST_CHANNEL_ID);
    if (member.guild.id!=exports.system.SERVER_ID) return; 
   let roleTime=await channel.guild.roles.find(r=>r.name==module.exports.system.ROLE_TIME_NAME);
   if(roleTime) await member.addRole(roleTime);
  let obj={};
   async function checkBot(){  
         let secret_arr=module.exports.secret_arr.slice();
         let new_arr = [];
         for (let i = 0;i<10;i++){
         let xrnd_ = Math.ceil(Math.random() * secret_arr.length-2);
         new_arr.push(secret_arr.splice(xrnd_,1));
         };

      secret_arr=new_arr; console.log(new_arr);
      secret_arr=secret_arr.map(e=>e[0]);
//---------
      let obj_={};
      await secret_arr.map(e=>obj_[e[1]]=e);
      console.log(obj_);
      obj=obj_;
//----
      let xrnd = Math.ceil(Math.random() * secret_arr.length-1);
      let desc=secret_arr[xrnd][0];
      let emo=secret_arr[xrnd][1];
    let desc_msg = module.exports.phrases.enter_phrase;
    let file_name = desc;
     let check_msg = await channel.send({embed: {
            description: member+ " "+desc_msg,
            image: {
                //url: "attachment://"+'r1.jpg'
                 url: "attachment://r1.jpg"
            }
        },
        files: [{ attachment: file_name,name:'r1.jpg' }] 
     });
     
//--
//--------
  for(let i=0;i<secret_arr.length;i++){
       let emoji_name=  secret_arr[i][1]; 
      let emoji= await client.guilds.get(module.exports.system.SERVER_ID).emojis.find(e=>e.name==emoji_name);
       emoji=(emoji)?emoji.id:emoji_name;
       check_msg.react(emoji);
  };     
//-----------

  let filter=(reaction,user)=>(user.id==member.user.id);
  let waiting_time=module.exports.delay.waitingReactions_minutes*60*1000;
  let resolve = await check_msg.awaitReactions(filter,{max:1,time:waiting_time,errors:['time']}).then(collection=>{
              if (collection.first().emoji.name==emo) {
          
           return true;}else{
                  console.log(obj);
                 let random = Math.ceil(Math.random() * module.exports.phrases.fail_phrase.length-1);
                 let wrong_answer=obj[collection.first().emoji.name][2];
                 let str = module.exports.phrases.fail_phrase[0].replace('#wrong_answer',wrong_answer);
                 let right_answer=obj[emo][2];
                 str = str.replace('#right_answer',right_answer);
                channel.send(member+str);  
                channel.send(member+module.exports.phrases.wrong_phrase);   
                return false;
                };
      
           }).catch(err=>{console.log(err); channel.send(member+module.exports.phrases.timeout_phrase); return false;});
    console.log(resolve);
  
   return resolve;
   
};//checkBot end;

 async function giveRole(){
    await channel.send(member+module.exports.phrases.waitingForRole_phrase);
    await delay(module.exports.delay.waitingForRole_minutes*60*1000);
    let roleTime=await channel.guild.roles.find(r=>r.name==module.exports.system.ROLE_TIME_NAME);
    if(roleTime) await member.removeRole(roleTime);
    let roleA=channel.guild.roles.find(r=>r.name==module.exports.system.ROLE_NAME);
    if(roleA) await member.addRole(roleA);
    return 1;
};//end giveRole 
 let resolve = await checkBot();
   console.log('resolve '+resolve);
   if(resolve){
     await giveRole(); 
   };//resolve true

//---------------
  if( !member.guild.members.get(member.user.id)) return;
 if( !member.roles.has(member.guild.roles.find(r=>r.name==module.exports.system.ROLE_TIME_NAME).id) ) return;
//--------------------------

  if(!resolve){
    await delay(2*1000);
    await channel.send(member+module.exports.phrases.tryAgain_phrase);
    await delay(2*1000);
   resolve = await checkBot();
   if(resolve){
     await delay(2*1000);
     await giveRole();
   };
    if(!resolve){
      await delay(2*1000);
      await channel.send(member+module.exports.phrases.ifFail_phrase);
       let mmb = member.guild.members.get(member.user.id);
       if(mmb){mmb.user.send(module.exports.phrases.dm_msg)};
     // await delay(2*1000);
     // await channel.send(member+module.exports.phrases.ifFail_phrase);
    };
return;
  };

}catch(err){console.log(err);};
};//run end


