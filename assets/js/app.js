async function loadVideos() {
  const res = await fetch("videos.json");
  const videos = await res.json();

  const app = document.getElementById("app");

  // Agrupar por categoría y subcategoría
  const grouped = {};

  videos.forEach(video => {
    if (!grouped[video.categoria]) {
      grouped[video.categoria] = {};
    }

    if (!grouped[video.categoria][video.subcategoria]) {
      grouped[video.categoria][video.subcategoria] = [];
    }

    grouped[video.categoria][video.subcategoria].push(video);
  });

  app.innerHTML = "";

  // Renderizar categorías
  Object.entries(grouped).forEach(([categoria, subcategorias]) => {
    const categoryEl = document.createElement("section");
    categoryEl.className = "category";

    // SOLO una vez el nombre de la categoría
    categoryEl.innerHTML = `<h2 class="section-title">${categoria}</h2>`;

    // Renderizar subcategorías
    Object.entries(subcategorias).forEach(([subcategoria, items]) => {
      const subEl = document.createElement("div");
      subEl.className = "subcategory";

      const grid = items.map(v => `
        <a class="video-card" href="/video/?v=${v.slug}">
          <div class="video-thumb"></div>

          <div class="video-content">
            <div class="video-title">${v.titulo}</div>
          </div>
        </a>
      `).join("");

      // SOLO la subcategoría
      subEl.innerHTML = `
        <h3 class="sub-title">${subcategoria}</h3>
        <div class="video-grid">${grid}</div>
      `;

      categoryEl.appendChild(subEl);
    });

    app.appendChild(categoryEl);
  });
}

loadVideos();
