/* XENESIS X Games: per-visitor tracking + live popularity.
   Loaded by games.html and game.html (as a library) and by each games/<id>/play.html (which also counts a play).
   Everything the visitor does is kept in this browser's localStorage; the only thing sent to the server is an anonymous
   random id + the game id, so the sheet can count DIFFERENT players per game. */
(function () {
  var CFG = window.XEN_CONFIG || {};
  var K = { uid: "xen.uid", played: "xen.played", seen: "xen.seen", stats: "xen.stats" };

  function read(k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
  function write(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function uid() {
    var u = read(K.uid, "");
    if (!u) { u = Math.random().toString(36).slice(2, 10) + Date.now().toString(36); write(K.uid, u); }
    return u;
  }
  function jsonp(url, ms) {
    return new Promise(function (res) {
      var cb = "xenGm" + Date.now() + Math.floor(Math.random() * 1e4), s = document.createElement("script"), t;
      function fin(v) { clearTimeout(t); try { delete window[cb]; } catch (e) { window[cb] = undefined; } s.remove(); res(v); }
      window[cb] = fin; t = setTimeout(function () { fin(null); }, ms || 8000); s.onerror = function () { fin(null); };
      s.src = url + (url.indexOf("?") < 0 ? "?" : "&") + "callback=" + cb + "&_=" + Date.now(); document.head.appendChild(s);
    });
  }

  var X = window.XenGames = {
    /* ---- has this visitor played the game? ---- */
    hasPlayed: function (id) { return !!read(K.played, {})[id]; },
    markPlayed: function (id) {
      var p = read(K.played, {}), first = !p[id];
      if (first) { p[id] = Date.now(); write(K.played, p); }
      return first;
    },

    /* ---- NEW highlight: shown at most CFG.newTimes visits (default 5), and never once the game has been played ---- */
    isHighlighted: function (g) {
      if (!g || !g.new || X.hasPlayed(g.id)) return false;
      return (read(K.seen, {})[g.id] || 0) < (CFG.newTimes || 5);
    },
    /* call once per visit to the games list; counts one visit per browser tab session so a refresh does not burn a highlight */
    countVisit: function (games) {
      var key = "xen.visit"; try { if (sessionStorage.getItem(key)) return; sessionStorage.setItem(key, "1"); } catch (e) {}
      var seen = read(K.seen, {});
      (games || []).forEach(function (g) {
        if (g.new && !X.hasPlayed(g.id)) seen[g.id] = (seen[g.id] || 0) + 1;
      });
      write(K.seen, seen);
    },
    /* the visit that just happened is already counted, so "visit n of 5" is the stored number */
    visitNo: function (id) { return read(K.seen, {})[id] || 0; },

    /* ---- tell the sheet someone played (once per browser per game counts as a player; every launch counts as a play) ---- */
    ping: function (id) {
      if (!/^https:\/\//.test(CFG.endpoint || "")) return;
      try { new Image().src = CFG.endpoint + "?action=play&game=" + encodeURIComponent(id) + "&uid=" + encodeURIComponent(uid()) + "&_=" + Date.now(); } catch (e) {}
    },

    /* ---- live stats: { gameId: { players, plays } }, cached 10 minutes ---- */
    stats: function () {
      var c = read(K.stats, null), fresh = c && Date.now() - c.t < 10 * 60 * 1000;
      if (fresh || !/^https:\/\//.test(CFG.endpoint || "")) return Promise.resolve((c && c.d) || {});
      return jsonp(CFG.endpoint + "?action=stats", 8000).then(function (r) {
        if (r && r.status === "ok" && r.games) { write(K.stats, { t: Date.now(), d: r.games }); return r.games; }
        return (c && c.d) || {};
      });
    },
    /* ids that earn the golden HIT: enough different players AND among the most-played games (ties all win), or a manual "hit": true */
    hits: function (games, stats) {
      var hit = {}, min = CFG.hitMin == null ? 25 : CFG.hitMin, top = CFG.hitTop || 1;
      var list = (games || []).map(function (g) { return { id: g.id, n: ((stats || {})[g.id] || {}).players || 0 }; })
        .sort(function (a, b) { return b.n - a.n; });
      var cut = list.length ? list[Math.min(top, list.length) - 1].n : 0;
      list.forEach(function (x) { if (x.n >= min && x.n >= cut) hit[x.id] = true; });
      (games || []).forEach(function (g) { if (g.hit === true) hit[g.id] = true; });
      return hit;
    }
  };

  /* A game page opts in with data-game="<id>" on this script tag: it counts as played as soon as the page opens. */
  var me = document.currentScript, gid = me && me.getAttribute("data-game");
  if (gid) { X.markPlayed(gid); X.ping(gid); }
})();
