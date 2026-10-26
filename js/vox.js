/* Layout compartilhado (cabeçalho/rodapé) + formulário. Editar aqui altera todas as páginas VoxBridge. */
(function(){
  var p=location.pathname.split('/').pop()||'index.html';
  var L=[['index.html','Início'],['voxbridge.html','Produto'],['bpo-contact-center.html','Para BPOs'],['contato.html','Contato']];
  var nav=L.map(function(l){return '<a href="'+l[0]+'"'+(l[0]===p?' aria-current="page"':'')+'>'+l[1]+'</a>'}).join('');
  document.getElementById('site-header').innerHTML='<header><div class="wrap"><a class="logo" href="index.html" aria-label="VoxBridge — início"><i></i>VoxBridge <small>by CP Exec</small></a><button class="menu" aria-expanded="false" aria-controls="nv">Menu</button><nav id="nv">'+nav+'<a class="btn btn-p" href="contato.html">Agendar diagnóstico</a></nav></div></header>';
  document.getElementById('site-footer').innerHTML='<footer><div class="wrap"><div>VoxBridge é um produto da <a href="quem-somos.html">CP Exec</a> — engenharia de dados, BI, IA e automação.</div><div><a href="https://www.linkedin.com/company/cp-exec/" rel="noopener">LinkedIn</a><a href="privacidade.html">Privacidade</a><a href="termos.html">Termos</a></div></div></footer>';
  var b=document.querySelector('.menu'),n=document.getElementById('nv');
  b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
  var f=document.getElementById('leadForm'); if(!f) return;
  var ok=document.getElementById('ok'),er=document.getElementById('err'),btn=f.querySelector('button');
  f.addEventListener('submit',function(e){
    e.preventDefault(); ok.classList.remove('show'); er.classList.remove('show');
    if(f.website.value) return;                       // honeypot anti-spam
    if(!f.checkValidity()){f.reportValidity();return}
    btn.disabled=true; btn.textContent='Enviando…';
    fetch('https://formsubmit.co/ajax/cpexec.dados@gmail.com',{method:'POST',headers:{Accept:'application/json'},body:new FormData(f)})
      .then(function(r){if(!r.ok)throw 0;return r.json()})
      .then(function(){ok.classList.add('show');f.reset()})
      .catch(function(){er.classList.add('show')})
      .finally(function(){btn.disabled=false;btn.textContent='Solicitar diagnóstico'});
  });
})();
