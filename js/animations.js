/* =========================================================
   CP EXEC — animations.js
   Canvas de rede animada no hero + parallax leve
   ========================================================= */
(function(){
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- hero network canvas — nodes / connectivity / data flow ---------- */
  var canvas = document.getElementById('net');
  if(canvas){
    var ctx = canvas.getContext('2d');
    var W, H, nodes = [];
    var NODE_COUNT_BASE = 46;

    function resize(){
      var hero = canvas.parentElement.getBoundingClientRect();
      W = canvas.width = hero.width;
      H = canvas.height = hero.height;
      var count = Math.min(NODE_COUNT_BASE, Math.floor((W*H)/26000));
      nodes = Array.from({length: count}, function(){
        return {
          x: Math.random()*W, y: Math.random()*H,
          vx: (Math.random()-0.5)*0.28, vy: (Math.random()-0.5)*0.28,
          r: Math.random()*1.6 + 0.8
        };
      });
    }

    function step(){
      ctx.clearRect(0,0,W,H);
      for(var i=0;i<nodes.length;i++){
        var n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if(n.x < 0 || n.x > W) n.vx *= -1;
        if(n.y < 0 || n.y > H) n.vy *= -1;
      }
      for(var a=0;a<nodes.length;a++){
        for(var b=a+1;b<nodes.length;b++){
          var p1 = nodes[a], p2 = nodes[b];
          var d = Math.hypot(p1.x-p2.x, p1.y-p2.y);
          if(d < 150){
            ctx.strokeStyle = 'rgba(56,189,248,' + ((1 - d/150) * 0.22) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p1.x,p1.y); ctx.lineTo(p2.x,p2.y); ctx.stroke();
          }
        }
      }
      for(var k=0;k<nodes.length;k++){
        var node = nodes[k];
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(148,197,255,0.75)';
        ctx.fill();
      }
      requestAnimationFrame(step);
    }

    resize();
    window.addEventListener('resize', resize);
    if(!reduceMotion){ requestAnimationFrame(step); }
  }

  /* ---------- parallax leve em blobs decorativos (cta / results) ---------- */
  if(!reduceMotion){
    var parallaxEls = document.querySelectorAll('.cta::after, .parallax');
    window.addEventListener('scroll', function(){
      var y = window.scrollY;
      document.querySelectorAll('.parallax').forEach(function(el){
        el.style.transform = 'translateY(' + (y * 0.04) + 'px)';
      });
    }, { passive:true });
  }

})();
