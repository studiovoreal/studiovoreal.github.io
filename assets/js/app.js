async function loadVideos() {
  try {
    // Ruta absoluta correcta para GitHub Pages
    const res = await fetch('/videos.json');

    if (!res.ok) {
      throw new Error('No se pudo cargar videos.json');
    }

    const videos = await res.json();

    const app = document.getElementById('app');

    // Limpiar contenido inicial
    app.innerHTML = '';

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

    // Renderizar categorías
    Object.entries(grouped).forEach(([categoria, subcategorias]) => {
      const categoryEl = document.createElement('section');
      categoryEl.className = 'category';

      categoryEl.innerHTML = `<h2>${categoria}</h2>`;

      // Renderizar subcategorías
      Object.entries(subcategorias).forEach(([subcategoria, items]) => {
        const subEl = document.createElement('div');
        subEl.className = 'subcategory';

        const grid = items.map(v => `
          <a class="video-card" href="/video/${v.slug}">
            <div class="video-thumb"></div>

            <div class="video-content">
              <div class="video-title">${v.titulo}</div>

              <div class="video-desc">
                ${v.descripcion || ''}
              </div>
            </div>
          </a>
        `).join('');

        subEl.innerHTML = `
          <h3>${subcategoria}</h3>
          <div class="video-grid">${grid}</div>
        `;

        categoryEl.appendChild(subEl);
      });

      app.appendChild(categoryEl);
    });

  } catch (error) {
    console.error(error);

    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="empty">
        Error cargando videos.
        <br>
        Revisa videos.json
      </div>
    `;
  }
}

loadVideos();
