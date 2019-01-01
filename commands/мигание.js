exports.delay=async(duration)=>{await new Promise(resolve=>setTimeout(resolve,duration))};

exports.run =async(client,message,args)=>{try{
  
  if(args[1]=='выкл')  {
          client.colors=false; message.channel.send('мигание выключено'); 
          if(args[2]){ await module.exports.delay(Number(args[2])*1000*60); client.colors=true; message.channel.send('мигание включено'); };
  };
  if(args[1]=='вкл')  {
         client.colors=true;  message.channel.send('мигание включено');
  };
  console.log(client.colors);
   return;
}catch(err){console.log(err);};};//exports.run end
