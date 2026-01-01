
const express=require("express");
const app=express();
const PORT=process.env.PORT||3000;
app.use(express.static("public"));

let history=[];
let result=null;

function IST(){
  return new Date(new Date().toLocaleString("en-US",{timeZone:"Asia/Kolkata"}));
}

function getGameBase(){
  const ist=IST();
  let base=new Date(ist);
  if(ist.getHours()<5 || (ist.getHours()==5 && ist.getMinutes()<30)){
    base.setDate(base.getDate()-1);
  }
  base.setHours(5,30,0,0);
  return base;
}

function getPeriod(){
  const base=getGameBase();
  const ist=IST();
  const minutes=Math.floor((ist-base)/60000);
  const ymd=base.toISOString().slice(0,10).replace(/-/g,'');
  return ymd + "100010000" + String(Math.max(0,minutes)).padStart(4,"0");
}

setInterval(()=>{
  const sec=IST().getSeconds();
  if(sec===30){
    result=Math.floor(Math.random()*10);
  }
  if(sec===0 && result!==null){
    history.unshift({period:getPeriod(), result});
    history=history.slice(0,10);
  }
},1000);

app.get("/data",(req,res)=>{
  res.json({ period:getPeriod(), result, history });
});

app.listen(PORT,()=>console.log("FINAL server running"));
