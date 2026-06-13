/* ============================================================
   Werewolf — PRE-LAUNCH TEASER behaviors
   Loaded AFTER common.js + roles.js.
   - waitlist capture (client-side, localStorage, success seal)
   - share row (copy link + intents)
   - ember particles
   - role-card marquee builder
   ============================================================ */
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  var SHARE_URL = 'https://wherewolf.app';
  var SHARE_TEXT = 'The village is waking this fall. Wherewolf — a game of deception, ritual and the long night. Join the waitlist:';

  // Kit (ConvertKit) waitlist form — public subscribe endpoint, no API key needed client-side.
  var KIT_FORM_ENDPOINT = 'https://app.kit.com/forms/9559731/subscriptions';

  ready(function () {
    /* ---------- waitlist ---------- */
    document.querySelectorAll('.waitlist').forEach(function (wl) {
      var form = wl.querySelector('.waitlist-form');
      if (!form) return;
      // restore prior signup
      try {
        if (localStorage.getItem('ww_waitlist')) wl.classList.add('done');
      } catch (e) {}
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('input');
        var btn = form.querySelector('button');
        var val = (input && input.value || '').trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          if (input) { input.focus(); form.style.borderColor = 'rgba(218,54,51,0.6)'; setTimeout(function(){ form.style.borderColor = ''; }, 1200); }
          return;
        }
        function fail() {
          if (btn) btn.disabled = false;
          if (input) input.focus();
          form.style.borderColor = 'rgba(218,54,51,0.6)';
          setTimeout(function () { form.style.borderColor = ''; }, 1600);
        }
        if (btn) btn.disabled = true;
        var body = new URLSearchParams();
        body.set('email_address', val);
        // Kit returns HTTP 200 even on failure, so branch on the JSON `status`, not res.ok.
        fetch(KIT_FORM_ENDPOINT, { method: 'POST', headers: { 'Accept': 'application/json' }, body: body })
          .then(function (res) { return res.json(); })
          .then(function (data) {
            if (!data || data.status === 'failed') { fail(); return; }
            try { localStorage.setItem('ww_waitlist', val); } catch (e) {}
            wl.classList.add('done');
          })
          .catch(fail);
      });
    });

    /* ---------- share ---------- */
    document.querySelectorAll('.share').forEach(function (row) {
      var toast = row.querySelector('.share-toast');
      function flash(msg) {
        if (!toast) return;
        toast.textContent = msg;
        toast.classList.add('show');
        clearTimeout(toast._t);
        toast._t = setTimeout(function () { toast.classList.remove('show'); }, 2200);
      }
      row.querySelectorAll('[data-share]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var kind = btn.getAttribute('data-share');
          if (kind === 'copy') {
            var done = function () { flash('Link copied — spread the word.'); };
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(SHARE_URL).then(done, done);
            } else { done(); }
          } else if (kind === 'x') {
            window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(SHARE_TEXT) + '&url=' + encodeURIComponent(SHARE_URL), '_blank', 'noopener');
          } else if (kind === 'facebook') {
            window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(SHARE_URL), '_blank', 'noopener');
          } else if (kind === 'discord') {
            var d = function () { flash('Discord invite copied.'); };
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText('https://discord.gg/wherewolf').then(d, d);
            } else { d(); }
          }
        });
      });
    });

    /* ---------- embers ---------- */
    document.querySelectorAll('.embers').forEach(function (layer) {
      var n = parseInt(layer.getAttribute('data-count') || '22', 10);
      for (var i = 0; i < n; i++) {
        var e = document.createElement('span');
        e.className = 'ember';
        var dur = 7 + Math.random() * 9;
        e.style.left = (Math.random() * 100) + '%';
        e.style.animationDuration = dur + 's';
        e.style.animationDelay = (-Math.random() * dur) + 's';
        e.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
        var s = 2 + Math.random() * 2.5;
        e.style.width = s + 'px'; e.style.height = s + 'px';
        if (Math.random() > 0.6) e.style.background = 'var(--ww-gold-soft)';
        layer.appendChild(e);
      }
    });

    /* ---------- card marquee ---------- */
    document.querySelectorAll('.deck-track[data-marquee]').forEach(function (track) {
      if (!window.WW_ROLES) return;
      var order = (track.getAttribute('data-order') || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
      var roles;
      if (order.length) {
        roles = order.map(function (id) { return window.WW_ROLES.find(function (r) { return r.id === id; }); }).filter(Boolean);
      } else {
        roles = window.WW_ROLES.slice();
      }
      var build = function () {
        roles.forEach(function (r) {
          var d = document.createElement('div');
          d.className = 'deck-card';
          var img = document.createElement('img');
          img.src = window.WW_ASSET.card(r.id);
          img.alt = r.label;
          // No lazy-loading here: these cards live in a transform-animated marquee,
          // where loading="lazy" leaves off-screen cards permanently blank in some browsers.
          img.decoding = 'async';
          d.appendChild(img);
          track.appendChild(d);
        });
      };
      build(); build(); // duplicate for seamless -50% loop
    });
  });
})();
