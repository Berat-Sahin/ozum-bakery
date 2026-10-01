/* =====================================================
   Özüm Bakery — Ana script
   config.js, products.js ve references.js içindeki verileri sayfaya basar.
   ===================================================== */
(function () {
  "use strict";

  const cfg = typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG : {};
  const products = typeof PRODUCTS !== "undefined" ? PRODUCTS : [];
  const references = typeof REFERENCES !== "undefined" ? REFERENCES : [];

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // ---------- WhatsApp bağlantıları ----------
  function waLink(message) {
    const num = String(cfg.whatsappNumber || "").replace(/\D/g, "");
    const text = encodeURIComponent(message || cfg.whatsappMessage || "");
    return `https://wa.me/${num}${text ? "?text=" + text : ""}`;
  }
  document.querySelectorAll("[data-whatsapp]").forEach((a) => (a.href = waLink()));

  // ---------- Marka / Instagram / yıl ----------
  document.querySelectorAll("[data-brand]").forEach((el) => (el.textContent = cfg.brandName || "Özüm Bakery"));
  if (cfg.brandName) document.title = document.title.replace("Özüm Bakery", cfg.brandName);
  const ig = document.getElementById("instagramLink");
  if (ig && cfg.instagram) {
    ig.href = "https://instagram.com/" + cfg.instagram.replace(/^@/, "");
    ig.hidden = false;
  }
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // ---------- Mobil menü ----------
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("siteNav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("open")));
  }

  // ---------- Ürünler ----------
  const productGrid = document.getElementById("productGrid");
  const filterBar = document.getElementById("productFilters");

  function productCard(p) {
    const media = p.image
      ? `<img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy">`
      : `<span>Görsel eklenecek</span>`;
    const msg = `Merhaba, "${p.name}" ürünü hakkında bilgi almak istiyorum.`;
    return `
      <article class="card">
        <div class="card-media">${media}</div>
        <div class="card-body">
          ${p.category ? `<span class="card-category">${esc(p.category)}</span>` : ""}
          <h3>${esc(p.name)}</h3>
          ${p.description ? `<p class="card-desc">${esc(p.description)}</p>` : ""}
          <div class="card-footer">
            ${p.price ? `<span class="price">${esc(p.price)}</span>` : "<span></span>"}
            <a class="btn btn-primary btn-sm" href="${waLink(msg)}" target="_blank" rel="noopener">Sipariş Ver</a>
          </div>
        </div>
      </article>`;
  }

  function renderProducts(category) {
    if (!productGrid) return;
    const list = category && category !== "Tümü" ? products.filter((p) => p.category === category) : products;
    if (!products.length) {
      productGrid.innerHTML = `
        <div class="empty-state">
          <strong>Ürünlerimiz çok yakında burada</strong>
          Menümüz hazırlanıyor. Bu arada aklınızdaki pasta için bize WhatsApp'tan yazabilirsiniz.
        </div>`;
      return;
    }
    productGrid.innerHTML = list.map(productCard).join("");
  }

  if (filterBar) {
    const cats = [...new Set(products.map((p) => p.category).filter(Boolean))];
    if (cats.length > 1) {
      filterBar.hidden = false;
      filterBar.innerHTML = ["Tümü", ...cats]
        .map((c, i) => `<button type="button" class="${i === 0 ? "active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`)
        .join("");
      filterBar.addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-cat]");
        if (!btn) return;
        filterBar.querySelectorAll("button").forEach((b) => b.classList.toggle("active", b === btn));
        renderProducts(btn.dataset.cat);
      });
    }
  }
  renderProducts();

  // ---------- Referanslar ----------
  const refGrid = document.getElementById("referenceGrid");
  if (refGrid) {
    if (!references.length) {
      refGrid.innerHTML = `
        <div class="empty-state">
          <strong>Müşteri yorumları yakında</strong>
          İlk siparişlerimizin ardından mutlu müşterilerimizin yorumlarını burada paylaşacağız.
        </div>`;
    } else {
      refGrid.innerHTML = references
        .map((r) => {
          const initials = esc((r.name || "?").trim().charAt(0).toUpperCase());
          const avatar = r.image
            ? `<img class="ref-avatar" src="${esc(r.image)}" alt="${esc(r.name)}" loading="lazy">`
            : `<span class="ref-avatar" aria-hidden="true">${initials}</span>`;
          const meta = [r.location, r.event].filter(Boolean).join(" · ");
          return `
            <article class="card ref-card">
              <div class="ref-stars" aria-label="5 yıldız">★★★★★</div>
              <p class="ref-text">“${esc(r.text)}”</p>
              <div class="ref-meta">
                ${avatar}
                <div><strong>${esc(r.name)}</strong>${meta ? `<span>${esc(meta)}</span>` : ""}</div>
              </div>
            </article>`;
        })
        .join("");
    }
  }

  // ---------- Hizmet bölgeleri ----------
  const areaGrid = document.getElementById("areaGrid");
  if (areaGrid && Array.isArray(cfg.serviceAreas)) {
    const pin = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.3 7-12a7 7 0 0 0-14 0c0 5.7 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>`;
    areaGrid.innerHTML = cfg.serviceAreas
      .map(
        (a) => `
        <div class="card area-card">
          <div class="area-icon">${pin}</div>
          <h3>${esc(a.city)}</h3>
          ${a.note ? `<p class="muted small" style="margin:0">${esc(a.note)}</p>` : ""}
        </div>`
      )
      .join("");
  }
})();
