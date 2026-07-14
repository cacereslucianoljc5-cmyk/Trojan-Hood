(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Scroll reveal ---------- */
  (function () {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach(function (e) { e.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (e) { io.observe(e); });
  })();

  /* ---------- One-tap copy for the contract address ---------- */
  (function () {
    var box = document.querySelector('.ca');
    var btn = document.getElementById('ca-copy');
    if (!box || !btn) return;
    var label = btn.querySelector('.ca__btn-txt');
    var reset;
    function flash(text, ok) {
      if (label) label.textContent = text;
      btn.classList.toggle('is-ok', !!ok);
      clearTimeout(reset);
      reset = setTimeout(function () { if (label) label.textContent = 'Copy'; btn.classList.remove('is-ok'); }, 1600);
    }
    function copy() {
      var value = box.getAttribute('data-ca') || (document.getElementById('ca-value') || {}).textContent || '';
      value = value.trim();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(function () { flash('Copied!', true); }).catch(function () { legacy(value); });
      } else { legacy(value); }
    }
    function legacy(value) {
      try {
        var t = document.createElement('textarea');
        t.value = value; t.setAttribute('readonly', '');
        t.style.position = 'absolute'; t.style.left = '-9999px';
        document.body.appendChild(t); t.select();
        document.execCommand('copy'); document.body.removeChild(t);
        flash('Copied!', true);
      } catch (e) { flash('Copy failed', false); }
    }
    btn.addEventListener('click', function (ev) {
      copy();
      burstAt(ev.clientX, ev.clientY, getComputedStyle(document.documentElement).getPropertyValue('--mint').trim() || '#4f8f6c');
    });
  })();

  /* ---------- Spec strip: duplicate content for a seamless loop ---------- */
  (function () {
    var track = document.getElementById('specTrack');
    if (!track) return;
    track.innerHTML += track.innerHTML;
  })();

  /* ---------- Magnetic buttons ---------- */
  (function () {
    if (reduceMotion || matchMedia('(hover: none)').matches) return;
    document.querySelectorAll('.magnetic').forEach(function (el) {
      var strength = 0.35;
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var x = e.clientX - (r.left + r.width / 2);
        var y = e.clientY - (r.top + r.height / 2);
        el.style.transform = 'translate(' + (x * strength) + 'px,' + (y * strength) + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  })();

  /* ---------- Tilt cards ---------- */
  (function () {
    if (reduceMotion || matchMedia('(hover: none)').matches) return;
    document.querySelectorAll('.tilt').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        var rx = (0.5 - py) * 7;
        var ry = (px - 0.5) * 7;
        el.style.transform = 'perspective(700px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-4px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  })();

  /* ---------- Click burst (used by tap-to-copy + generic clicks) ---------- */
  var burstParticles = [];
  function burstAt(x, y, color) {
    for (var i = 0; i < 18; i++) {
      var angle = (Math.PI * 2 * i) / 18 + Math.random() * 0.3;
      var speed = 2 + Math.random() * 3;
      burstParticles.push({
        x: x, y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        color: color
      });
    }
  }

  /* ---------- Interactive particle field ---------- */
  (function () {
    var canvas = document.getElementById('field');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w, h, particles = [];
    var mouse = { x: -9999, y: -9999, active: false };
    var palette = ['79,143,108', '231,154,104', '169,155,214'];

    function resize() {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.round((w * h) / 26000);
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: 1 + Math.random() * 1.6,
          c: palette[i % palette.length]
        });
      }
    }

    function onMove(e) {
      var t = e.touches ? e.touches[0] : e;
      mouse.x = t.clientX; mouse.y = t.clientY; mouse.active = true;
    }
    function onLeave() { mouse.active = false; }
    function onClick(e) {
      burstAt(e.clientX, e.clientY, palette[Math.floor(Math.random() * palette.length)]);
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('click', onClick);
    resize();

    if (reduceMotion) {
      // Draw a single static, calm frame and stop — no animation loop.
      draw();
      return;
    }

    var linkDist = 130;
    function draw() {
      ctx.clearRect(0, 0, w, h);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (mouse.active) {
          var dx = p.x - mouse.x, dy = p.y - mouse.y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120 && d > 0.01) {
            var f = (120 - d) / 120 * 0.35;
            p.x += (dx / d) * f; p.y += (dy / d) * f;
          }
        }
        if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + p.c + ',0.5)';
        ctx.fill();

        for (var j = i + 1; j < particles.length; j++) {
          var q = particles[j];
          var ddx = p.x - q.x, ddy = p.y - q.y;
          var dist = Math.sqrt(ddx * ddx + ddy * ddy);
          if (dist < linkDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = 'rgba(' + p.c + ',' + (0.14 * (1 - dist / linkDist)) + ')';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      for (var k = burstParticles.length - 1; k >= 0; k--) {
        var b = burstParticles[k];
        b.x += b.vx; b.y += b.vy; b.vx *= 0.94; b.vy *= 0.94; b.life -= 0.02;
        if (b.life <= 0) { burstParticles.splice(k, 1); continue; }
        ctx.beginPath();
        ctx.arc(b.x, b.y, 2.2 * b.life, 0, Math.PI * 2);
        var col = /,/.test(b.color) ? b.color : '79,143,108';
        ctx.fillStyle = 'rgba(' + col + ',' + b.life + ')';
        ctx.fill();
      }

      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  })();
})();
