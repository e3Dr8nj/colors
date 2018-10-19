exports.system={ delay_time:1000*3, roles_name:{
                 //on:false/true, colorSpeed:1..200, colorStep:1..
                
                },
        gradients:{
              rainblow:{  type:'generator',sighns:[1,-1],start_color:0xff0000,
                          colors:[0x000001,0x010000,0x000100]
                      },
          rainblowgray:{  type:'generator', max:208, sighns:[1,-1],start_color:0xcf3030,
                          colors:[0x000001,0x010000,0x000100]
                      },
              redblue:{   type:'generator',sighns:[1],start_color:0xff0000,  
                         colors:[0x000001-0x010000,0x010000-0x000001]
                    },
              yelloworange:{ type:'generator', sighns:[-1,1],start_color:0xffff00,  
                         colors:[0x000100]
                    },
              gray:{     type:'generator', sighns:[-1,1],start_color:0xffffff,
                          colors:[0x000001+0x010000+0x000100]
                      },
    mouserolecolor:{  type:'storage', colors:[
'0x2270f9','0x1b5bc0','0x3b32dd','0x6032dd','0x7732dd','0x8532dd','0x9c32dd','0xb432dd','0xb62dd6','0xc32dca','0xb82dad','0xa42cb6','0x952cb6','0x862cb6','0x9f24f3','0xd224f3','0xd11ec7','0x8d3db4','0x6f38a7'
                           ]},
     alienrolecolor:{ type:'storage',colors:[
     "0x2e0a0a", "0x2d0b0e", "0x2b0b13", "0x2a0c17", "0x280c1c", "0x270d20", "0x260e25", "0x240e29", "0x230f2e", "0x210f32", "0x201036", "0x1f113b", "0x1d113f", "0x1c1244", "0x1a1248", "0x19134d", "0x181451", "0x161456", "0x15155a", "0x13155f", "0x121663",
"0x121663", "0x131561", "0x14155f", "0x15145c", "0x16135a", "0x171358", "0x181256", "0x191153", "0x1a1151", "0x1b104f", "0x1c104c", "0x1d0f4a", "0x1e0e48", "0x1f0e46", "0x200d44", "0x210c41", "0x220c3f", "0x230b3d", "0x240a3a", "0x250a38", "0x260936",
"0x260936", "0x240935", "0x230934", "0x210934", "0x200933", "0x1e0832", "0x1c0831", "0x1b0830", "0x190830", "0x18082f", "0x16082e", "0x14082d", "0x13082c", "0x11082c", "0x10082b", "0x0e082a", "0x0c0729", "0x0b0728", "0x090728", "0x080727", "0x060726",
"0x060726", "0x080727", "0x0a0727", "0x0c0628", "0x0e0629", "0x10062a", "0x13062a", "0x15062b", "0x17052c", "0x19052c", "0x1b052d", "0x1d052e", "0x1f052e", "0x21042f", "0x230430", "0x260430", "0x280431", "0x2a0432", "0x2c0333", "0x2e0333", "0x300334",
"0x300334", "0x300332", "0x300430", "0x30042e", "0x30042c", "0x30052a", "0x2f0527", "0x2f0525", "0x2f0623", "0x2f0621", "0x2f061f", "0x2f071d", "0x2f071b", "0x2f0819", "0x2f0817", "0x2e0814", "0x2e0912", "0x2e0910", "0x2e090e", "0x2e0a0c", "0x2e0a0a"
     ]},
    blueblue:{type:'storage', colors:[
'0x0D47A1','0x#1565C0','0x1976D2','0x1E88E5','0x2196F3','0x42A5F5','0x64B5F6','0x90CAF9','0xBBDEFB','0x81D4FA','0x4FC3F7','0x29B6F6','0x03A9F4','0x039BE5','0x0288D1','0x0277BD','0x01579B'
           ]},
    redrose:{type:'storage',colors:[
'0xB71C1C','0xC62828','0xD32F2F','0x#E53935','0xF44336','0xEF5350','0xE57373','0xEF9A9A','0xFFCDD2','0xF8BBD0','0xF48FB1','0xF06292','0xEC407A','0xE91E63','0xD81B60','0xC2185B','0xAD1457','0x880E4F'
           ]}      

           },//gradients end

};//system end

exports.help=async(client,message,args)=>{
try{
    let x_time=1000*60*5;
    let delay =(duration)=> new Promise(resolve=>setTimeout(resolve,duration));
    let msg_txt='help \n';
    msg_txt+=client.prefix+args[0]+' stop roleName -остановить смену цветов роли\n';
    msg_txt+=client.prefix+args[0]+' run roleName rolePallet changeStep changeSpeed -запустить мигание роли\n';
    msg_txt+='например: '+client.prefix+args[0]+' run colorrole rainblow 10 1\n';
    
    msg_txt+='roleName -название роли \n';
    msg_txt+='rolePallet -цветовая схема(ниже список навзнание схемы/кол-во цветов)\n';
    
     for(let key in module.exports.system.gradients){
       let colors_len=(module.exports.system.gradients[key].type!='generator')?module.exports.system.gradients[key].colors.length:'255+';
       msg_txt+='    '+ key +' / '+colors_len +'\n';
     };
    msg_txt+='changeStep -шаг изменения цвета (min:1 ,max:кол-во цветов в схеме) \n';
    msg_txt+='changeSpeed -скорость изменения цвета (1ед=3сек, min:1, max:200) \n';
    let help_msg =await  message.channel.send(msg_txt,{code:'css'});
    if(args[2]=='*'){ await delay(x_time); await help_msg.delete(); };
    return 1;
}catch(err){console.log(err);};
};//help end



exports.run =async(client,message,args)=>{
try{
    if(args[1]=='boot'){return module.exports.boot(client);};
  if(args[1]=='help'){return module.exports.help(client,message,args);
  }else  if(args[1]=='createRole'){
     await module.exports.createRole(client,message,args);
  }else if(args[1]=='run'){
       await module.exports.runColor(client,message,args);
  }else if(args[1]=='run1'){
       await module.exports.runColor_work(client,message,args);
   }else if(args[1]=='stop'){
          let roleName = args[2];
          if(module.exports.system.roles_name[roleName]){ 
                module.exports.system.roles_name[roleName].on=false;
           }else{message.reply('роль не найдена среди мигающих');};
   }else{message.reply('`'+client.prefix+args[0]+' help` -для справки');};
}catch(err){console.log(err);};
};

exports.createRole=async(client,message,role_name)=>{
try{
  
   let prmtrs=[role_name,'black'];
   let role_type='for color';
   let role_=await message.guild.createRole({
      name:prmtrs[0],
      color:prmtrs[1],
   }).then(role=>{
      message.channel.send('роль создана');
      let role_count = message.guild.roles.keyArray().length;
      let position = (role_type=='for color')?role_count-15:(role_type=='special')?Math.floor((role_count-4)/2):1;
      console.log(role_count);
      message.guild.setRolePosition(role,position,false);
      return role;
    }).catch(error=>{message.channel.send(error.message);});
    return role_;

}catch(err){console.log(err);};
};//createRole end

/*
module.exports.rainblow=async(client,message,args)=>{
try{
     
     let delay=(duration)=>new Promise( resolve => setTimeout(resolve,duration) );
      console.log('roleColor');
     let role = message.guild.roles.find(r=>r.name=='rainblow');
     console.log(args[2]);
     
    let colors = module.exports.system.rainblow.color[module.exports.system.rainblow.item_color];
     exports.system.rainblow.on=(args[2]=="off")?false:true;
     if(args[2]=='time'){exports.system.rainblow.time=(args[3])?Number(args[3]):2000};
     if(args[2]=='color'){
            exports.system.rainblow.item_color=(args[3]=='gray'||args[3]=='blue'||args[3]=='red')?args[3]:'blue';
            
      };
         let s=1;
         for(let i=0;i<colors.length;i+=s){
              colors = module.exports.system.rainblow.color[module.exports.system.rainblow.item_color];
              console.log(i);
              await delay(exports.system.rainblow.time);
             console.log(exports.system.rainblow.time);
             await   role.edit({color:colors[i]});
            
             if(i==colors.length-1){
                      
                    s=(module.exports.system.rainblow.on)?-1:s};
              
             if(i==0){
                     
                     s=(module.exports.system.rainblow.on)?1:1};
               };
      
}catch(err){console.log(err);};
  };//
*/
/*
module.exports.runColor_work=async(client,message,args)=>{
try{
    
     let delay=(duration)=>new Promise( resolve => setTimeout(resolve,duration) );
      console.log('roleColor');
     let role_name = args[2];
     let role = message.guild.roles.find(r=>r.name==role_name); 
     if(!role){
           // await module.exports.createRole(client,message,role_name)
            message.reply('Роль не найдена');
            return;
    };
     console.log(args[2]);
     let color_name = args[3];
    let change_speed=(args[4]?args[4]:1);
    let colors = module.exports.system.roles[color_name].color;
     exports.system.roles[role_name].on=(args[2]=="off")?false:true;

         let s=1; 
         let x = change_speed;
  console.log(colors.length-1);

         for(let i=0;i<colors.length+x;i+=s*x){
             
              console.log(i);
           if(i==colors.length-1||i>colors.length-1){
                      
                    //s=(module.exports.system.roles[role_name].on)?-1:s
                    s=-1;
           };
              
             if(i==0||i<0){
                    s=1;
             };
              await delay(3*1000);
             console.log(exports.system.roles[role_name].time);
             await   role.edit({color:colors[i]});
               };
   
}catch(err){console.log(err);};
  };//
*/

module.exports.runColor=async(client,message,args)=>{
try{
   
     let  roleName = args[2];
       let role_name = roleName.replace(/&/g,' ');
       let role = message.guild.roles.find(r=>r.name==role_name); 
       if(!role){await message.reply('Роли с таким названием не существует '); return;};
     

     let colorPallet = args[3];
       if(!module.exports.system.gradients[colorPallet]){message.reply('Цветовая схема не найдена '+colorPallet); return;};

     
     let colorStep = (args[4])?args[4]:0;
        if(typeof Number(colorStep)!='number'){message.reply('параметр colorStep должен быть целым числом');return 0;};
        
        if(module.exports.system.gradients[colorPallet].type!='generator'){
            if( Number(colorStep)>=module.exports.system.gradients[colorPallet].colors.length){
             message.reply('параметр colorStep должен быть меньше колличества цветов в схеме'); return 0;
              };
        };
   
     let colorSpeed = (args[5])?args[5]:1;
         if(typeof Number(colorSpeed)!='number'){message.reply('параметр colorSpeed должен быть целым числом');return 0;};
         if(Number(colorSpeed)>=201){message.reply('параметр colorSpeed должен быть не более 200'); return 0;};
  
     let delay=(duration)=>new Promise( resolve => setTimeout(resolve,duration) );
      console.log('roleColor');
    

    await module.exports.systemRole(client,role,colorPallet,colorStep,colorSpeed);
    if(module.exports.system.gradients[colorPallet].type=='storage'){
          await module.exports.runStorage(client,role,colorPallet,colorStep,colorSpeed);
     };
    if(module.exports.system.gradients[colorPallet].type=='generator'){
       console.log('run generator');
       await module.exports.runGenerator(client,role,colorPallet,colorStep,colorSpeed);
    };//if generator end
     message.reply('мигание цветов для роли ' +roleName+ ' запущено');
}catch(err){console.log(err);};//-
  };//runColor end


module.exports.runGenerator=async(client,role,colorPallet,colorStep,colorSpeed)=>{
try{

      let delay=(duration)=>new Promise( resolve => setTimeout(resolve,duration) );
      console.log('roleColor');
      let roleName = role.name;
      module.exports.system.roles_name[roleName].on=true;

      let i=0;
       
        if(!module.exports.system.gradients[colorPallet]){console.log('this color shema do not exist');return;};
        let obj=module.exports.system.gradients[colorPallet];
        let item_color = obj.start_color;
        let increase=obj.colors.slice();
        let sighns = obj.sighns.slice();
        let inc=0;
        let sighn_pos=0;
        let max=(obj.max)?obj.max:256;
        let bool = true;
         while (module.exports.system.roles_name[roleName].on){
                   console.log(module.exports.system.roles_name[roleName]);
                   let speed = 1000*3*module.exports.system.roles_name[roleName].colorSpeed;
                   //let step=Math.pow(2,module.exports.system.roles_name[roleName].colorStep);
                     let step=module.exports.system.roles_name[roleName].colorStep;
                   console.log(i);
                   item_color+=increase[inc]*step.toString(16)*sighns[sighn_pos];
                   console.log('delay '+ speed);
                   
                   await   role.edit({color:item_color});
                   console.log(item_color.toString(16));
                   i+=Number(step);
               
              if(i>=max-step){ 
                   i=0;
                   sighn_pos = (sighn_pos==sighns.length-1)?0:sighn_pos+1;
                   console.log(inc);
                   inc=(inc==increase.length-1)?0:inc+1;
                };
               if(module.exports.system.roles_name[roleName].on) {await delay(speed); }else{console.log('interrupted');};
          };//while
        console.log('color stop');
        return 1;
}catch(err){console.log(err);};
};//runRainblow end

//---------------------------------------
module.exports.runStorage=async(client,role,colorPallet,colorStep,colorSpeed)=>{
try{

     let delay=(duration)=>new Promise( resolve => setTimeout(resolve,duration) );
      console.log('roleColor');
      let roleName = role.name;
      module.exports.system.roles_name[roleName].on=true;
     
      let i=0;
      let obj=module.exports.system.gradients[colorPallet];
        
        let colors=module.exports.system.gradients[colorPallet].colors.slice();
        let item_color = colors[0];
        let sighn = 1;
        let bool = true;
        while (module.exports.system.roles_name[roleName].on){
                  console.log(module.exports.system.roles_name[roleName]);
                let speed = 1000*3*module.exports.system.roles_name[roleName].colorSpeed;
                let step=module.exports.system.roles_name[roleName].colorStep;
                console.log(i+' '+speed);
                item_color=colors[i];
                 await   role.edit({color:item_color});
                  i+=step*sighn;
                  if(i==colors.length||i>colors.length){console.log('cnd1');sighn=(sighn==1)?-1:1;};
                  if(i==0||i<0){console.log('cnd2');sighn=(sighn==1)?-1:1;};
               if(module.exports.system.roles_name[roleName].on) {await delay(speed); }else{console.log('interrupted');};
          };//while
        console.log('color stop');
        return 1;

}catch(err){console.log(err);};
};//runRainblow end
//---
exports.systemRole=async(client,role,colorPallet,colorStep,colorSpeed)=>{
try{ 
      let delay=(duration)=>new Promise( resolve => setTimeout(resolve,duration) );
      let roleName = role.name;
     if(!module.exports.system.roles_name[roleName]){
         console.log('for this role do not exist..creating');
          module.exports.system.roles_name[roleName]={};
          module.exports.system.roles_name[roleName].on=false;
       }else{
           console.log('already existed');
         if(module.exports.system.roles_name[roleName].on=true){
            module.exports.system.roles_name[roleName].on=false;
            await delay(module.exports.system.roles_name[roleName].colorSpeed*1000+1000);
            console.log('is runned..been stopped '+module.exports.system.roles_name[roleName].colorSpeed);
         };
       };
         
          await delay(1000);
          module.exports.system.roles_name[roleName].colorStep=colorStep;
          module.exports.system.roles_name[roleName].colorSpeed=colorSpeed;
         
    
      console.log(module.exports.system.roles_name[roleName]);
          return;
}catch(err){console.log(err);};
};//


exports.boot=async(client)=>{
try{
   
   let delay =(duration)=>new Promise(resolve=>setTimeout(resolve,duration));
   let server=client.guilds.get('301063859702071316');
   function MessageSample(){
      this.guild=server;
      this.reply=function(x){console.log(x);};
      this.channel={};
      this.channel.send=function(x){console.log(x);};
   };
     module.exports.run(client,new MessageSample(),[' ','run','Идущий В Тенях','alienrolecolor',5,1]);
   await delay(1000);
    module.exports.run(client,new MessageSample(),[' ','run','👑','mouserolecolor',1,1]);
   await delay(1000);
    module.exports.run(client,new MessageSample(),[' ','run','rainblow','rainblowgray',33,1]);
    return;
   
}catch(err){console.log(err);};

};//boot end
/*
 https://www.w3schools.com/colors/colors_mixer.asp
 arr = [];
 for(let i=0;i<$0.rows.length;i++){
    arr.push($0.rows[i].lastChild.innerText.trim().replace('#','0x'));
 };
console.log(arr);
*/