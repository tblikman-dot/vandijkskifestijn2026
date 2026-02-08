
const vertrek = new Date("2026-02-21T00:00:00");
const vandaagEl = document.getElementById("todayContent");
const block = document.getElementById("todayBlock");

function renderVandaag(){
  const now = new Date();

  if(now > new Date("2026-02-21T23:59:00")){
    block.style.display="none";
    return;
  }

  const diff = vertrek - now;

  if(diff <= 0){
    vandaagEl.innerHTML = "🎿 Vandaag is het zover!";
    startConfetti();
    return;
  }

  const hours = Math.floor(diff / (1000*60*60));
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  if(days <= 5){
    vandaagEl.innerHTML = `⛷️ Nog ${days} dagen en ${remainingHours} uur tot start`;
  } else {
    vandaagEl.innerHTML = `⛷️ Nog ${days} dagen tot start`;
  }
}

function startConfetti(){
  const canvas=document.getElementById("confetti");
  const ctx=canvas.getContext("2d");
  canvas.width=innerWidth; canvas.height=innerHeight;
  let pieces=[...Array(120)].map(()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*6+4,dx:Math.random()-0.5,dy:Math.random()*2+1}));
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(p=>{
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`hsl(${Math.random()*360},80%,60%)`;
      ctx.fill();
      p.y+=p.dy; p.x+=p.dx;
      if(p.y>canvas.height) p.y=0;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

renderVandaag();
