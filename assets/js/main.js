/* ============================================================
 * 通用渲染脚本：导航 / 页脚 / 产品卡片（数据来自 site-config.js）
 * 页面只需挂 <div data-mount="header"></div> 等挂载点即可。
 * ============================================================ */
(function () {
  "use strict";

  var SITE = window.SITE;
  // 根据当前页面相对路径计算到站点根的相对前缀（子目录页面回 "../"）
  var root = (function () {
    var path = location.pathname.replace(/\\/g, "/");
    var depth = (path.match(/\/[^/]+\/[^/]*\.html?$/i) || []).length ? path.split("/").length - 2 : 0;
    // 页面在 /products/ 子目录时需要回一级
    return /\/products\/[^/]*\.html?$/i.test(path) ? "../" : "";
  })();

  /* ---------- 头部导航 ---------- */
  function renderHeader() {
    var host = document.querySelector('[data-mount="header"]');
    if (!host) return;
    var current = location.pathname.split("/").pop() || "index.html";
    var inSub = root === "../";
    var links = SITE.nav
      .map(function (item) {
        var href = inSub ? "../" + item.href : item.href;
        var target = item.href.replace(/^.*\//, "");
        var active = current === target || (current === "" && target === "index.html");
        return '<a class="nav-link' + (active ? " active" : "") + '" href="' + href + '">' + item.label + "</a>";
      })
      .join("");

    host.innerHTML =
      '<div class="container nav-wrap">' +
      '<a class="brand" href="' + root + 'index.html">' +
      '<span class="brand-mark">CY</span><span class="brand-name">' + SITE.owner.name + '</span>' +
      "</a>" +
      '<nav class="nav-links" id="navLinks">' + links + "</nav>" +
      '<button class="nav-toggle" id="navToggle" aria-label="菜单">☰</button>' +
      "</div>";

    var btn = document.getElementById("navToggle");
    var nl = document.getElementById("navLinks");
    if (btn && nl) {
      btn.addEventListener("click", function () {
        nl.classList.toggle("open");
      });
    }
  }

  /* ---------- 页脚 ---------- */
  function renderFooter() {
    var host = document.querySelector('[data-mount="footer"]');
    if (!host) return;
    var links = SITE.nav
      .map(function (item) { return '<a href="' + root + item.href + '">' + item.label + "</a>"; })
      .join('<span class="sep">·</span>');
    host.innerHTML =
      '<div class="container footer-wrap">' +
      '<div class="footer-brand">' + SITE.owner.name + " — " + SITE.owner.title + "</div>" +
      '<div class="footer-links">' + links + "</div>" +
      '<div class="footer-meta">© <span id="year"></span> ' + SITE.owner.name +
      ' · <a href="mailto:' + SITE.owner.email + '">' + SITE.owner.email + "</a>" +
      icpHtml() + "</div>" +
      "</div>";
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------- 备案号（占位或未填写则不显示） ---------- */
  function icpHtml() {
    var icp = (SITE.owner.icp || "").trim();
    if (!icp || icp.indexOf("【") >= 0) return "";
    return ' · <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener nofollow">' + icp + "</a>";
  }

  /* ---------- 产品卡片 ---------- */
  function productCard(p, featured) {
    var cls = "card product-card" + (featured ? " product-featured" : "");
    var href = p.detailUrl && p.detailUrl !== "#" ? root + p.detailUrl : null;
    var title = href
      ? '<a class="card-title" href="' + href + '">' + p.icon + " " + p.name + "</a>"
      : '<span class="card-title">' + p.icon + " " + p.name + "</span>";
    var cta = href
      ? '<a class="btn btn-ghost btn-sm" href="' + href + '">了解详情 →</a>'
      : '<span class="badge badge-muted">敬请期待</span>';
    var feats = (p.features || []).slice(0, 3).map(function (f) { return "<li>" + f + "</li>"; }).join("");
    return (
      '<article class="' + cls + '">' +
      '<div class="card-head"><span class="product-icon" style="background:' + p.accent + '1a;color:' + p.accent + '">' + p.icon + "</span>" +
      '<span class="badge" style="background:' + p.accent + '1a;color:' + p.accent + '">' + p.badge + "</span></div>" +
      title +
      '<p class="card-tagline">' + p.tagline + "</p>" +
      (feats ? '<ul class="card-list">' + feats + "</ul>" : "") +
      '<div class="card-foot"><span class="meta">' + p.version + " · 更新 " + p.updated + "</span>" + cta + "</div>" +
      "</article>"
    );
  }

  function renderProductGrids() {
    var featHost = document.querySelector('[data-mount="featured-products"]');
    if (featHost) {
      featHost.innerHTML = SITE.products
        .filter(function (p) { return p.featured; })
        .map(function (p) { return productCard(p, true); })
        .join("");
    }
    var allHost = document.querySelector('[data-mount="all-products"]');
    if (allHost) {
      allHost.innerHTML = SITE.products
        .map(function (p) { return productCard(p, false); })
        .join("");
    }
  }

  /* ---------- 关于页数据 ---------- */
  function renderAbout() {
    var o = SITE.owner;
    var set = function (sel, text) {
      var el = document.querySelector(sel);
      if (el) el.textContent = text;
    };
    set("[data-about=name]", o.name);
    set("[data-about=title]", o.title);
    set("[data-about=bio]", o.bio);
    set("[data-about=avatar]", o.avatarText);
    set("[data-about=email]", o.email);
    set("[data-about=location]", o.location);
    var gh = document.querySelector("[data-about=github]");
    if (gh) { gh.href = o.github; gh.textContent = o.github.replace(/^https?:\/\//, ""); }
    set("[data-about=wechat]", o.wechat);
    var mail = document.querySelector("[data-about=mail-link]");
    if (mail) mail.href = "mailto:" + o.email;
  }

  /* ---------- 产品操作视频 ---------- */
  function initTutorials() {
    var nav = document.querySelector(".tutorial-nav-list");
    var player = document.querySelector(".tutorial-player");
    var empty = document.querySelector(".tutorial-empty");
    var step = document.querySelector(".tutorial-current-step");
    var title = document.querySelector(".tutorial-current-title");
    var description = document.querySelector(".tutorial-current-description");
    var count = document.querySelector(".tutorial-count");
    if (!nav || !player || !empty || !step || !title || !description) return;

    if (count) count.textContent = nav.querySelectorAll(".tutorial-nav-item").length + " 个视频";

    function selectTutorial(item) {
      Array.prototype.forEach.call(nav.querySelectorAll(".tutorial-nav-item"), function (navItem) {
        var active = navItem === item;
        navItem.classList.toggle("active", active);
        navItem.setAttribute("aria-pressed", active ? "true" : "false");
      });

      step.textContent = "第 " + item.querySelector("span").textContent + " 步";
      title.textContent = item.getAttribute("data-title");
      description.textContent = item.getAttribute("data-description");

      var videoSrc = item.getAttribute("data-video-src");
      player.pause();
      if (videoSrc) {
        player.src = videoSrc;
        player.hidden = false;
        empty.hidden = true;
        player.load();
      } else {
        player.removeAttribute("src");
        player.load();
        player.hidden = true;
        empty.hidden = false;
      }
    }

    nav.addEventListener("click", function (event) {
      var target = event.target;
      var item = target.closest ? target.closest(".tutorial-nav-item") : null;
      if (!item || !nav.contains(item)) return;
      selectTutorial(item);
    });

    var activeItem = nav.querySelector(".tutorial-nav-item.active") || nav.querySelector(".tutorial-nav-item");
    if (activeItem) selectTutorial(activeItem);
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderHeader();
    renderFooter();
    renderProductGrids();
    renderAbout();
    initTutorials();
  });
})();
