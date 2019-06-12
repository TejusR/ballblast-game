var cvs=document.getElementById("c");
var ctx=cvs.getContext("2d");
var bg=new Image();
var cn=new Image();
var pos=0,rock=[],bullet=[],last=0,score=0,hi,rate=150;
var rockpic=new Image();
var bulpic=new Image();
if(localStorage.hs==undefined)
 hi=0;
else
 hi=localStorage.hs;
bulpic.src="bullet-transparent-1.png";
rockpic.src="https://i.dlpng.com/static/png/192482_preview.png";
cn.src="http://www.clker.com/cliparts/T/e/d/6/r/t/red-cartoon-cannon-hi.png";
bg.src="https://i.pinimg.com/originals/72/5e/5d/725e5dc00ba49c240cd489e7b87e0496.jpg";
rock[0]={
	size:Math.floor(Math.random()*50)+50,
	y:0,
	x:350,
	vx:-1,
	vy:2,
	side:1,
	strength:0,
	flag:0,
	split:0
};
rock[0].strength=rock[0].size;
setInterval(function()
{
	rock.push({
	size:Math.floor(Math.random()*50)+50,
	y:0,
	x:0,
	vx:0,
	vy:2,
	side:Math.floor(Math.random()*2),
	strength:0,
	flag:0,
	split:0
	});
    for(var i=1;i<rock.length;i++)
    {
	  if(rock[i].flag==0)
	  {
		if(rock[i].side==0)
        {
         rock[i].x=0;
         rock[i].vx=1;
         rock[i].strength=rock[i].size;	
        }
        else
         {
         rock[i].x=400-(rock[i].size/100)*150;
         rock[i].vx=-1;
         rock[i].strength=rock[i].size;
	    }
	  }
	  rock[i].flag++;
    }
},50000);
bullet[0]={
	x:pos+15,
	y:400,
	hit:0
}
setInterval(function()
{
 bullet.push({
    x:pos+15,
    y:400,
    hit:0  
 });
},rate);
setInterval(function()
	{
	 rate--;
     score++;
	},500);
document.addEventListener("keydown",logkey);
function logkey(e)
{
 if(e.key=="a")
 {
 	if(pos>=0)
      pos-=10;
 }
 if(e.key=="d")
 {
    if(pos<=340)
      pos+=10;
 }
}
draw();
function draw()
{
	ctx.drawImage(bg,0,0,400,600);
	ctx.drawImage(cn,pos,400,50,100);
	ctx.font = "20px Arial";
    ctx.fillStyle="white";
	for(var i=0;i<rock.length;i++)
	{
		if(rock[i].strength>0)
		{
		 if (rock[i].x+(rock[i].size/100)*150<400)	{
		  ctx.drawImage(rockpic,rock[i].x,rock[i].y,(rock[i].size/100)*150,(rock[i].size/100)*150);
          ctx.fillText(rock[i].strength,rock[i].x+(rock[i].size/100)*75,rock[i].y+(rock[i].size/100)*75);
	      }
	    rock[i].x+=rock[i].vx;
	    rock[i].y+=rock[i].vy;
	    if((rock[i].vx<0&&rock[i].x<=0)||(rock[i].vx>0&&rock[i].x>=(400-(rock[i].size/100)*150)))
	    {
	    		rock[i].vx*=-1;
	    }
	     if((rock[i].vy<0&&rock[i].y<=0)||(rock[i].vy>0&&rock[i].y>=(500-(rock[i].size/100)*150)))
	    {
	          rock[i].vy*=-1;
	    }  
	    for(var j=0;j<bullet.length;j++)
	    {
	    	if(bullet[j].hit==0)
	    	{
	    		if (bullet[j].x>rock[i].x&&bullet[j].y>rock[i].y&&bullet[j].x<rock[i].x+(rock[i].size/100)*150&&bullet[j].y<rock[i].y+(rock[i].size/100)*150)
	    		{
                  rock[i].strength--;
                  bullet[j].hit++
	    		if(rock[i].strength==0&&rock[i].split==0)
	    		{
	    			rock.push({
	                size:rock[i].size/2,
    	            y:rock[i].y,
	                x:rock[i].x,
	                vx:1,
	                vy:2,
	                side:Math.floor(Math.random()*2),
	                strength:0,
                	flag:0,
	                split:1
	                });
	                rock.push({
	                size:rock[i].size/2,
    	            y:rock[i].y,
	                x:rock[i].x,
	                vx:-1,
	                vy:2,
	                side:Math.floor(Math.random()*2),
	                strength:0,
                	flag:0,
	                split:1
	                });
                    for(var k=1;k<rock.length;k++)
                    {
	                 if(rock[k].flag==0&&rock[k].split==1)
	                 {
		               rock[k].strength=rock[k].size;
	                 }
	                 rock[k].flag++;
                    }
	    		}
	    	  }
	    	}
	    } 
	    if((rock[i].x+(rock[i].size/100)*150>pos&&rock[i].y+(rock[i].size/100)*150>400&&rock[i].x+(rock[i].size/100)*150<pos+50)||((rock[i].x>pos)&&(rock[i].y+(rock[i].size/100)*150>400)&&((rock[i].x<pos+50))))
	    {
	    	if(hi<score)
	    	{
	    		hi=score;
	    		localStorage.hs=hi;
	    	}

	    	location.reload();
	    }	
	   }  
	}
    for(var i=0;i<bullet.length;i++)
    {
    	if(bullet[i].hit==0)
    	 ctx.drawImage(bulpic,bullet[i].x,bullet[i].y,20,20);
    	bullet[i].y-=3;
    }
    ctx.fillText("hi:"+hi,100,50);
    ctx.fillText("score:"+score,300,50);                                                                                
	requestAnimationFrame(draw);
}