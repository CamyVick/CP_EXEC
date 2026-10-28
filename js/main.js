/* =========================================================
   CP EXEC — main.js
   Navegação, menu mobile, reveal on scroll, FAQ, contadores, formulário
   ========================================================= */
(function(){
  'use strict';

  /* ---------- header background on scroll ---------- */
  var header = document.getElementById('siteHeader');
  function onScrollHeader(){
    if(!header) return;
    if(window.scrollY > 20){ header.classList.add('scrolled'); }
    else{ header.classList.remove('scrolled'); }
  }
  window.addEventListener('scroll', onScrollHeader, { passive:true });
  onScrollHeader();

  /* ---------- mobile menu ---------- */
  var toggle = document.getElementById('navToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  if(toggle && mobileMenu){
    toggle.addEventListener('click', function(){
      var open = mobileMenu.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        mobileMenu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- indicador de página ativa na navbar ---------- */
  (function markActive(){
    var current = (location.pathname.split('/').pop() || 'index.html');
    if(current === '') current = 'index.html';
    document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function(a){
      var href = a.getAttribute('href');
      if(!href) return;
      var page = href.split('#')[0];
      if(page === current || (page === 'index.html' && current === '')){
        a.classList.add('active');
      }
    });
  })();

  /* ---------- reveal on scroll ---------- */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.14 });
  document.querySelectorAll('.reveal, .reveal-stagger, .fade-in, .slide-left, .slide-right, .scale-in, .dash-panel').forEach(function(el){
    io.observe(el);
  });

  /* ---------- contadores animados (resultados) ---------- */
  function animateCounter(el){
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals'),10) : 0;
    var duration = 1400;
    var start = null;
    function step(ts){
      if(!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = target * eased;
      el.textContent = decimals ? value.toFixed(decimals).replace('.', ',') : Math.floor(value);
      if(progress < 1){ requestAnimationFrame(step); }
      else { el.textContent = decimals ? target.toFixed(decimals).replace('.', ',') : target; }
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('[data-count]');
  if(counters.length){
    var cio = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ animateCounter(e.target); cio.unobserve(e.target); }
      });
    }, { threshold:0.5 });
    counters.forEach(function(c){ cio.observe(c); });
  }

  /* ---------- FAQ accordion (contato) ---------- */
  document.querySelectorAll('.faq-q').forEach(function(btn){
    btn.addEventListener('click', function(){
      var item = btn.closest('.faq-item');
      var wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(function(i){ i.classList.remove('open'); });
      if(!wasOpen){ item.classList.add('open'); }
    });
  });

  /* ---------- tech marquee content (home) ---------- */
  var row1 = document.getElementById('row1');
  var row2 = document.getElementById('row2');
  if(row1 && row2){
    var techs1 = ["Python","SQL Server","Power BI","Azure","AWS","Docker","Airflow","Spark","Databricks"];
    var techs2 = ["BigQuery","PostgreSQL","Git","GitHub","Pandas","FastAPI","Kafka","DBT","Cloud"];
    [techs1, techs1].flat().forEach(function(t){ var s=document.createElement('span'); s.className='pill'; s.textContent=t; row1.appendChild(s); });
    [techs2, techs2].flat().forEach(function(t){ var s=document.createElement('span'); s.className='pill'; s.textContent=t; row2.appendChild(s); });
  }

  /* ---------- formulário de contato (validação + feedback, sem backend) ---------- */
  var form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if(!form.checkValidity()){
        form.reportValidity();
        return;
      }
      var successBox = document.getElementById('formSuccess');
      var submitBtn = form.querySelector('button[type="submit"]');
      if(submitBtn){ submitBtn.setAttribute('disabled', 'disabled'); submitBtn.textContent = 'Enviando...'; }
      setTimeout(function(){
        if(successBox){ successBox.classList.add('show'); }
        form.reset();
        if(submitBtn){ submitBtn.removeAttribute('disabled'); submitBtn.textContent = 'Enviar mensagem'; }
      }, 700);
    });
  }

})();
