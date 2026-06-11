/* ================================================
   Heavenly Dreams — Recruitment SPA
   Hash-based router, localStorage persistence
================================================ */

// ─── Particle canvas ───────────────────────────────────────────────────────
const canvas = document.querySelector('#particle-stage');
const ctx = canvas.getContext('2d');
let particles = [];
const pointer = { x: null, y: null };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const count = Math.min(120, Math.max(40, Math.floor((canvas.width * canvas.height) / 12000)));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width, y: Math.random() * canvas.height,
    vx: Math.random() * 0.38 - 0.19, vy: Math.random() * 0.38 - 0.19,
    r: Math.random() * 2 + 0.6,
  }));
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    if (pointer.x !== null) {
      const dx = pointer.x - p.x, dy = pointer.y - p.y;
      const d = Math.hypot(dx, dy) || 1;
      if (d < 160) { const push = (160 - d) / 160; p.x -= (dx / d) * push * 2; p.y -= (dy / d) * push * 2; }
    }
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,217,255,0.72)'; ctx.fill();
    for (let j = i + 1; j < particles.length; j++) {
      const o = particles[j], dx = p.x - o.x, dy = p.y - o.y, d2 = dx * dx + dy * dy;
      if (d2 < 9000) {
        ctx.strokeStyle = `rgba(0,113,188,${1 - d2 / 9000})`; ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(o.x, o.y); ctx.stroke();
      }
    }
  });
  requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', resizeCanvas);
window.addEventListener('mousemove', e => { pointer.x = e.clientX; pointer.y = e.clientY; });
window.addEventListener('mouseout', () => { pointer.x = null; pointer.y = null; });
resizeCanvas(); drawParticles();

// ─── Toast ─────────────────────────────────────────────────────────────────
const toastEl = document.getElementById('toast');
let toastTimer;
function showToast(msg, type = 'info') {
  toastEl.textContent = msg;
  toastEl.className = `toast show toast-${type}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3000);
}

// ─── Modal ─────────────────────────────────────────────────────────────────
const modalOverlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');
function openModal(html) {
  modalContent.innerHTML = html;
  modalOverlay.setAttribute('aria-hidden', 'false');
  modalOverlay.classList.add('open');
}
function closeModal() {
  modalOverlay.setAttribute('aria-hidden', 'true');
  modalOverlay.classList.remove('open');
}
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });

// ─── Data layer ────────────────────────────────────────────────────────────
const DB_CANDIDATOS = 'hd_candidatos';
const DB_ENTREVISTAS = 'hd_entrevistas';
const DB_SESSION = 'hd_admin_session';

function dbGet(key) { try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; } }
function dbSet(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

function saveCandidato(data) {
  const list = dbGet(DB_CANDIDATOS);
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const entry = { id, ...data, estado: 'nuevo', createdAt: new Date().toISOString() };
  list.unshift(entry);
  dbSet(DB_CANDIDATOS, list);
  return id;
}
function saveEntrevista(data) {
  const list = dbGet(DB_ENTREVISTAS);
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  list.unshift({ id, ...data, createdAt: new Date().toISOString() });
  dbSet(DB_ENTREVISTAS, list);
  return id;
}
function updateCandidato(id, patch) {
  const list = dbGet(DB_CANDIDATOS).map(c => c.id === id ? { ...c, ...patch } : c);
  dbSet(DB_CANDIDATOS, list);
}
function deleteCandidato(id) { dbSet(DB_CANDIDATOS, dbGet(DB_CANDIDATOS).filter(c => c.id !== id)); }
function deleteEntrevista(id) { dbSet(DB_ENTREVISTAS, dbGet(DB_ENTREVISTAS).filter(e => e.id !== id)); }

// ─── Vacantes data ─────────────────────────────────────────────────────────
const VACANTES = [
  { slug: 'ejecutivo-telecom', titulo: 'Ejecutivo de Telecomunicaciones', area: 'Comercial', tipo: 'Tiempo completo', modalidad: 'Presencial CDMX', salario: '$12,000 – $18,000 + comisiones', descripcion: 'Venta consultiva de servicios de telecomunicaciones empresariales (internet, MPLS, VoIP). Cartera de clientes asignada.', requisitos: ['Experiencia mínima 1 año en ventas', 'Excelente comunicación verbal', 'Disponibilidad para viajar en CDMX', 'Bachillerato terminado'], beneficios: ['Sueldo base + comisiones sin tope', 'Seguro IMSS desde día 1', 'Capacitación pagada', 'Bonos por metas'], urgente: true },
  { slug: 'reclutador-masivo', titulo: 'Reclutador de Personal Masivo', area: 'Recursos Humanos', tipo: 'Tiempo completo', modalidad: 'Híbrido', salario: '$10,000 – $14,000', descripcion: 'Reclutamiento y selección masivo de personal comercial y operativo. Publicación de vacantes, filtro curricular y entrevistas grupales.', requisitos: ['Lic. en Psicología, RH o afín (trunca aceptada)', 'Manejo de bolsas de trabajo digitales', 'Habilidad para trabajo bajo presión'], beneficios: ['Sueldo base', 'Prestaciones de ley', 'Ambiente dinámico', 'Crecimiento rápido'], urgente: true },
  { slug: 'supervisor-call-center', titulo: 'Supervisor de Call Center', area: 'Operaciones', tipo: 'Tiempo completo', modalidad: 'Presencial CDMX', salario: '$14,000 – $20,000', descripcion: 'Gestión de equipo de asesores de call center. Monitoreo de KPIs, coaching y reporte a dirección operativa.', requisitos: ['2+ años como supervisor o líder de equipo', 'Conocimiento de métricas AHT, NPS, FCR', 'Manejo de CRM'], beneficios: ['Sueldo base + bono mensual', 'IMSS + Infonavit', 'Comedor', 'Plan de carrera'], urgente: false },
  { slug: 'analista-rh', titulo: 'Analista de Nóminas y RRHH', area: 'Recursos Humanos', tipo: 'Tiempo completo', modalidad: 'Presencial CDMX', salario: '$11,000 – $15,000', descripcion: 'Procesamiento de nómina semanal y quincenal, altas y bajas IMSS, contratos, incidencias y trámites ante el IMSS e INFONAVIT.', requisitos: ['Experiencia 1+ año en nóminas', 'Manejo de COI/NOI o equivalente', 'Conocimiento de LFT y IMSS'], beneficios: ['Prestaciones de ley superiores', 'Caja de ahorro', 'Día libre en cumpleaños'], urgente: false },
  { slug: 'asesor-financiero', titulo: 'Asesor Financiero Comercial', area: 'Comercial', tipo: 'Por honorarios + comisiones', modalidad: 'Remoto / Field', salario: 'Comisiones del 8% al 15%', descripcion: 'Colocación de productos financieros (créditos, seguros, inversiones) a cartera de empresas Pyme. Sin límite de ingresos.', requisitos: ['Perfil comercial agresivo', 'Red de contactos empresariales', 'Responsabilidad y disciplina'], beneficios: ['Altas comisiones', 'Horario flexible', 'Sin tope de ganancias'], urgente: false },
  { slug: 'coordinador-proyectos', titulo: 'Coordinador de Proyectos TI', area: 'Tecnología', tipo: 'Tiempo completo', modalidad: 'Híbrido', salario: '$18,000 – $26,000', descripcion: 'Coordinación de proyectos de implementación tecnológica (redes, telefonía IP, ERP). Gestión de proveedores y clientes clave.', requisitos: ['Lic. en Sistemas, Ing. o afín', 'PMP o certificación similar deseable', '3+ años de experiencia en TI'], beneficios: ['Sueldo competitivo', 'Prestaciones superiores', 'Capacitación técnica pagada', 'Home office parcial'], urgente: false },
];

function getVacante(slug) { return VACANTES.find(v => v.slug === slug); }

// ─── Estado badges ─────────────────────────────────────────────────────────
const ESTADOS = {
  nuevo: { label: 'Nuevo', color: '#00d9ff' },
  revision: { label: 'En revisión', color: '#f59e0b' },
  entrevista: { label: 'Entrevista', color: '#7c3aed' },
  aprobado: { label: 'Aprobado', color: '#22c55e' },
  rechazado: { label: 'Rechazado', color: '#ef4444' },
  contratado: { label: 'Contratado', color: '#0066ff' },
  espera: { label: 'En espera', color: '#94a3b8' },
  cancelado: { label: 'Cancelado', color: '#374151' },
  seguimiento: { label: 'Seguimiento', color: '#fb923c' },
};
function estadoBadge(e) {
  const s = ESTADOS[e] || ESTADOS.nuevo;
  return `<span class="status-badge" style="background:${s.color}22;color:${s.color};border-color:${s.color}44">${s.label}</span>`;
}

// ─── Navbar + Footer ────────────────────────────────────────────────────────
function renderNavbar(active = '') {
  const links = [
    ['#/', 'Inicio'],
    ['#/quienes-somos', 'Nosotros'],
    ['#/vacantes', 'Vacantes'],
    ['#/postularme', 'Postularme'],
    ['#/contacto', 'Contacto'],
  ];
  return `
  <nav class="navbar" id="site-nav">
    <a href="#/" class="navbar-brand" aria-label="Heavenly Dreams inicio">
      <img src="assets/heavenly-dreams-logo.png" alt="Heavenly Dreams" height="36" onerror="this.style.display='none'" />
      <span>Heavenly<b>Dreams</b></span>
    </a>
    <div class="navbar-links" id="navbar-links">
      ${links.map(([href, label]) => `<a href="${href}" class="navbar-link${active === href ? ' active' : ''}">${label}</a>`).join('')}
      <a href="#/postularme" class="hd-button navbar-cta">Postularme →</a>
    </div>
    <button class="menu-button" id="menu-btn" type="button" aria-label="Menú" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </nav>`;
}

function renderFooter() {
  return `
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <img src="assets/heavenly-dreams-logo.png" alt="Heavenly Dreams" height="40" onerror="this.style.display='none'" />
        <p>Heavenly Dreams SAS de CV<br><span>Reclutamiento · Telecomunicaciones · Talento</span></p>
      </div>
      <div class="footer-links">
        <a href="#/vacantes">Vacantes</a>
        <a href="#/postularme">Postularme</a>
        <a href="#/quienes-somos">Nosotros</a>
        <a href="#/contacto">Contacto</a>
        <a href="#/admin">Admin</a>
      </div>
      <div class="footer-contact">
        <a href="https://wa.me/525667477783" target="_blank" rel="noreferrer">WhatsApp: +52 56 6747 7783</a>
        <a href="mailto:reclutamiento@heavenlydreams.com.mx">reclutamiento@heavenlydreams.com.mx</a>
        <span>CDMX, México · 2026</span>
      </div>
    </div>
    <div class="footer-bottom">© 2026 Heavenly Dreams SAS de CV · Todos los derechos reservados</div>
  </footer>`;
}

function bindNavbar() {
  const btn = document.getElementById('menu-btn');
  const links = document.getElementById('navbar-links');
  if (!btn || !links) return;
  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }));
}

// ─── Router ─────────────────────────────────────────────────────────────────
const app = document.getElementById('app');

function navigate(hash) { window.location.hash = hash; }

function route() {
  const hash = window.location.hash || '#/';
  window.scrollTo(0, 0);

  if (hash === '#/') return renderHome();
  if (hash === '#/quienes-somos') return renderQuienesSomos();
  if (hash === '#/mision-vision') return renderMisionVision();
  if (hash === '#/cultura') return renderCultura();
  if (hash === '#/aliados') return renderAliados();
  if (hash === '#/vacantes') return renderVacantes();
  if (hash.startsWith('#/vacante/')) return renderVacante(hash.replace('#/vacante/', ''));
  if (hash === '#/postularme') return renderPostularme();
  if (hash.startsWith('#/postularme')) return renderPostularme();
  if (hash === '#/agendar') return renderAgendar();
  if (hash.startsWith('#/agendar')) return renderAgendar();
  if (hash === '#/gracias') return renderGracias();
  if (hash === '#/contacto') return renderContacto();
  if (hash === '#/admin') return renderAdminLogin();
  if (hash === '#/admin/panel') return renderAdminPanel();
  if (hash === '#/admin/candidatos') return renderAdminCandidatos();
  if (hash === '#/admin/entrevistas') return renderAdminEntrevistas();
  renderHome();
}

window.addEventListener('hashchange', route);
document.addEventListener('DOMContentLoaded', route);

// ─── PAGE: Home ─────────────────────────────────────────────────────────────
function renderHome() {
  app.innerHTML = `
  ${renderNavbar('#/')}
  <main>
    <section class="hero-section">
      <div class="hero-content" data-scene>
        <div class="hd-badge">🚀 +500 candidatos colocados en 2025</div>
        <h1 class="hero-title hd-gradient-title">Tu próxima gran<br>oportunidad está aquí</h1>
        <p class="hero-sub">Conectamos talento excepcional con empresas líderes en telecomunicaciones, finanzas y tecnología en CDMX y todo México.</p>
        <div class="hero-actions">
          <a href="#/vacantes" class="hd-button hero-btn">Ver vacantes abiertas</a>
          <a href="#/quienes-somos" class="hd-button-secondary">Conoce más →</a>
        </div>
        <div class="trust-bar">
          <div class="trust-item"><span class="trust-number" data-count="500" data-suffix="+">0+</span><span>Candidatos colocados</span></div>
          <div class="trust-item"><span class="trust-number" data-count="120" data-suffix="+">0+</span><span>Empresas aliadas</span></div>
          <div class="trust-item"><span class="trust-number" data-count="6">0</span><span>Vacantes activas</span></div>
          <div class="trust-item"><span class="trust-number" data-count="98" data-suffix="%">0%</span><span>Satisfacción clientes</span></div>
        </div>
      </div>
    </section>

    <section class="section-pad" data-scene>
      <div class="section-inner">
        <div class="section-label hd-badge">¿Qué hacemos?</div>
        <h2 class="section-title">Más que una empresa de reclutamiento</h2>
        <div class="services-grid">
          ${[
            ['🎯','Reclutamiento Masivo','Gestión de procesos de selección a gran escala, con filtros precisos y entrevistas estructuradas.'],
            ['📡','Telecomunicaciones','Soluciones de conectividad empresarial: internet dedicado, MPLS, VoIP y videoconferencia.'],
            ['🧠','Desarrollo de Talento','Programas de onboarding, capacitación y retención de personal clave.'],
            ['💼','Staffing Temporal','Personal operativo y administrativo para proyectos de corta y mediana duración.'],
            ['📊','Consultoría RH','Asesoría en estructura organizacional, tabuladores y políticas de capital humano.'],
            ['🤝','Outsourcing de Nómina','Administración completa de nómina, IMSS, Infonavit y obligaciones fiscales.'],
          ].map(([icon, title, desc]) => `
          <div class="service-card hd-card" data-tilt>
            <div class="service-icon">${icon}</div>
            <h3>${title}</h3>
            <p>${desc}</p>
          </div>`).join('')}
        </div>
      </div>
    </section>

    <section class="section-pad section-dark" data-scene>
      <div class="section-inner">
        <div class="section-label hd-badge">¡Aplica hoy!</div>
        <h2 class="section-title">Vacantes urgentes</h2>
        <div class="vacantes-preview-grid">
          ${VACANTES.filter(v => v.urgente).map(v => `
          <div class="job-card hd-card">
            <div class="job-card-head">
              <div>
                <span class="job-area">${v.area}</span>
                <h3>${v.titulo}</h3>
              </div>
              <span class="urgente-badge">URGENTE</span>
            </div>
            <div class="job-meta">
              <span>📍 ${v.modalidad}</span>
              <span>⏰ ${v.tipo}</span>
              <span>💰 ${v.salario}</span>
            </div>
            <div class="job-card-actions">
              <a href="#/vacante/${v.slug}" class="hd-button-secondary">Ver detalles</a>
              <a href="#/postularme?vacante=${v.slug}" class="hd-button">Postularme</a>
            </div>
          </div>`).join('')}
        </div>
        <div style="text-align:center;margin-top:2rem">
          <a href="#/vacantes" class="hd-button">Ver todas las vacantes →</a>
        </div>
      </div>
    </section>

    <section class="cta-section" data-scene>
      <div class="cta-inner hd-card">
        <h2>¿Listo para dar el siguiente paso?</h2>
        <p>Únete a cientos de profesionales que encontraron su lugar ideal con nosotros.</p>
        <div class="cta-actions">
          <a href="#/postularme" class="hd-button">Postularme ahora</a>
          <a href="https://wa.me/525667477783" target="_blank" rel="noreferrer" class="hd-button-secondary">Hablar por WhatsApp</a>
        </div>
      </div>
    </section>
  </main>
  ${renderFooter()}`;
  bindNavbar();
  bindTilt();
  bindCounters();
  bindSceneObserver();
}

// ─── PAGE: Quiénes somos ────────────────────────────────────────────────────
function renderQuienesSomos() {
  app.innerHTML = `
  ${renderNavbar('#/quienes-somos')}
  <main>
    <section class="page-hero" data-scene>
      <div class="page-hero-inner">
        <div class="hd-badge">Sobre nosotros</div>
        <h1 class="hd-gradient-title">Heavenly Dreams SAS de CV</h1>
        <p>Empresa mexicana líder en reclutamiento, telecomunicaciones y desarrollo de talento humano desde 2018.</p>
      </div>
    </section>

    <section class="section-pad" data-scene>
      <div class="section-inner two-col">
        <div class="about-text">
          <h2>¿Quiénes somos?</h2>
          <p>Somos una empresa 100% mexicana con sede en Ciudad de México, especializada en conectar el talento correcto con las oportunidades adecuadas. Desde nuestra fundación, hemos colocado a más de 500 profesionales en empresas de los sectores de telecomunicaciones, servicios financieros, tecnología y manufactura.</p>
          <p>Nuestra metodología combina entrevistas por competencias, evaluaciones psicométricas y seguimiento post-colocación para garantizar el éxito de cada proceso.</p>
          <div class="about-metrics">
            <div class="metric-item"><span class="hd-metric" data-count="8">0</span><span>Años de experiencia</span></div>
            <div class="metric-item"><span class="hd-metric" data-count="500" data-suffix="+">0+</span><span>Candidatos colocados</span></div>
            <div class="metric-item"><span class="hd-metric" data-count="120" data-suffix="+">0+</span><span>Empresas cliente</span></div>
          </div>
        </div>
        <div class="about-visual hd-card">
          <div class="about-img-placeholder">
            <img src="assets/heavenly-dreams-logo.png" alt="Heavenly Dreams" style="width:160px;opacity:0.8" onerror="this.style.display='none'" />
            <p style="margin:1rem 0 0;color:var(--hd-text-muted)">Heavenly Dreams SAS de CV<br>CDMX · 2018–2026</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad section-dark" data-scene>
      <div class="section-inner">
        <h2 class="section-title">Nuestros valores</h2>
        <div class="values-grid">
          ${[
            ['💡','Innovación','Adoptamos tecnología y metodologías modernas para optimizar cada proceso de selección.'],
            ['🤝','Compromiso','Nos involucramos a fondo con cada candidato y cliente hasta cerrar exitosamente cada proceso.'],
            ['🎯','Precisión','Enviamos solo candidatos que realmente cumplen el perfil — cero relleno, máxima calidad.'],
            ['❤️','Humanidad','Tratamos a cada candidato con respeto, empatía y comunicación transparente en todo momento.'],
          ].map(([icon, title, desc]) => `
          <div class="value-card hd-card">
            <div class="value-icon">${icon}</div>
            <h3>${title}</h3>
            <p>${desc}</p>
          </div>`).join('')}
        </div>
      </div>
    </section>

    <section class="section-pad" data-scene>
      <div class="section-inner" style="text-align:center">
        <h2>¿Tienes talento? Queremos conocerte</h2>
        <p style="color:var(--hd-text-muted);margin:.5rem 0 2rem">Postúlate en menos de 5 minutos</p>
        <a href="#/postularme" class="hd-button">Postularme ahora →</a>
      </div>
    </section>
  </main>
  ${renderFooter()}`;
  bindNavbar(); bindCounters(); bindSceneObserver();
}

// ─── PAGE: Misión y Visión ──────────────────────────────────────────────────
function renderMisionVision() {
  app.innerHTML = `
  ${renderNavbar()}
  <main>
    <section class="page-hero" data-scene>
      <div class="page-hero-inner">
        <div class="hd-badge">Propósito</div>
        <h1 class="hd-gradient-title">Misión &amp; Visión</h1>
      </div>
    </section>
    <section class="section-pad" data-scene>
      <div class="section-inner two-col">
        <div class="mv-card hd-card">
          <div style="font-size:3rem;margin-bottom:1rem">🎯</div>
          <h2>Misión</h2>
          <p>Conectar a las personas con oportunidades que transformen sus vidas, brindando servicios de reclutamiento, telecomunicaciones y consultoría RH con excelencia, tecnología y enfoque humano.</p>
        </div>
        <div class="mv-card hd-card">
          <div style="font-size:3rem;margin-bottom:1rem">🌟</div>
          <h2>Visión</h2>
          <p>Ser la empresa de capital humano y telecomunicaciones más confiable de México para 2030, reconocida por transformar positivamente las trayectorias profesionales de miles de personas.</p>
        </div>
      </div>
    </section>
  </main>
  ${renderFooter()}`;
  bindNavbar(); bindSceneObserver();
}

// ─── PAGE: Cultura ──────────────────────────────────────────────────────────
function renderCultura() {
  app.innerHTML = `
  ${renderNavbar()}
  <main>
    <section class="page-hero" data-scene>
      <div class="page-hero-inner">
        <div class="hd-badge">Cultura</div>
        <h1 class="hd-gradient-title">Nuestra Cultura</h1>
        <p>Un ambiente donde el talento florece</p>
      </div>
    </section>
    <section class="section-pad" data-scene>
      <div class="section-inner">
        <div class="culture-grid">
          ${[
            ['🚀','Alto rendimiento','Trabajamos con metas claras, KPIs medibles y reconocemos el logro.'],
            ['🌱','Crecimiento continuo','Capacitación constante, becas de estudio y plan de carrera definido.'],
            ['🎉','Balance y bienestar','Días de descanso adicionales, actividades de integración y ambiente positivo.'],
            ['🔗','Colaboración','Equipos multidisciplinarios donde cada voz importa y se escucha.'],
            ['💬','Comunicación abierta','Puertas abiertas con liderazgo, feedback constante y reuniones 1:1.'],
            ['🏆','Reconocimiento','Bonos por desempeño, empleado del mes y celebración de logros.'],
          ].map(([icon, title, desc]) => `
          <div class="culture-card hd-card">
            <div style="font-size:2.5rem;margin-bottom:.75rem">${icon}</div>
            <h3>${title}</h3>
            <p>${desc}</p>
          </div>`).join('')}
        </div>
      </div>
    </section>
  </main>
  ${renderFooter()}`;
  bindNavbar(); bindSceneObserver();
}

// ─── PAGE: Aliados ──────────────────────────────────────────────────────────
function renderAliados() {
  app.innerHTML = `
  ${renderNavbar()}
  <main>
    <section class="page-hero" data-scene>
      <div class="page-hero-inner">
        <div class="hd-badge">Ecosistema</div>
        <h1 class="hd-gradient-title">Nuestros Aliados</h1>
        <p>Empresas de primer nivel que confían en nuestro talento</p>
      </div>
    </section>
    <section class="section-pad" data-scene>
      <div class="section-inner">
        <div class="ally-grid">
          ${['Telecomunicaciones MX','Fintech Capital','Grupo Innovatel','HR Solutions','DataCenter Pro','Cloud Empresarial','Seguros Digital','Conecta México','Nextel Business'].map(name => `
          <div class="ally-card hd-card"><span>${name}</span></div>`).join('')}
        </div>
        <p style="text-align:center;color:var(--hd-text-muted);margin-top:2rem">¿Tu empresa quiere contratar con nosotros?
          <a href="#/contacto" style="color:var(--hd-cyan);margin-left:6px">Contáctanos →</a>
        </p>
      </div>
    </section>
  </main>
  ${renderFooter()}`;
  bindNavbar(); bindSceneObserver();
}

// ─── PAGE: Vacantes ─────────────────────────────────────────────────────────
function renderVacantes() {
  app.innerHTML = `
  ${renderNavbar('#/vacantes')}
  <main>
    <section class="page-hero" data-scene>
      <div class="page-hero-inner">
        <div class="hd-badge">Oportunidades</div>
        <h1 class="hd-gradient-title">Vacantes Disponibles</h1>
        <p>Encuentra tu próximo reto profesional</p>
      </div>
    </section>
    <section class="section-pad" data-scene>
      <div class="section-inner">
        <div class="vacantes-filters">
          <input class="hd-input filter-input" id="filter-text" placeholder="Buscar vacante..." type="search" />
          <select class="hd-input filter-select" id="filter-area">
            <option value="">Todas las áreas</option>
            ${[...new Set(VACANTES.map(v => v.area))].map(a => `<option value="${a}">${a}</option>`).join('')}
          </select>
        </div>
        <div id="vacantes-list" class="vacantes-full-grid">
          ${VACANTES.map(v => jobCard(v)).join('')}
        </div>
      </div>
    </section>
  </main>
  ${renderFooter()}`;
  bindNavbar(); bindSceneObserver();
  const txtInput = document.getElementById('filter-text');
  const areaInput = document.getElementById('filter-area');
  function applyFilter() {
    const txt = txtInput.value.toLowerCase();
    const area = areaInput.value;
    const filtered = VACANTES.filter(v =>
      (!txt || v.titulo.toLowerCase().includes(txt) || v.area.toLowerCase().includes(txt)) &&
      (!area || v.area === area)
    );
    document.getElementById('vacantes-list').innerHTML = filtered.length
      ? filtered.map(v => jobCard(v)).join('')
      : '<p style="color:var(--hd-text-muted);grid-column:1/-1;text-align:center">No se encontraron vacantes con ese filtro.</p>';
  }
  txtInput.addEventListener('input', applyFilter);
  areaInput.addEventListener('change', applyFilter);
}

function jobCard(v) {
  return `
  <div class="job-card hd-card">
    <div class="job-card-head">
      <div>
        <span class="job-area">${v.area}</span>
        <h3>${v.titulo}</h3>
      </div>
      ${v.urgente ? '<span class="urgente-badge">URGENTE</span>' : ''}
    </div>
    <p class="job-desc">${v.descripcion.substring(0, 120)}…</p>
    <div class="job-meta">
      <span>📍 ${v.modalidad}</span>
      <span>⏰ ${v.tipo}</span>
      <span>💰 ${v.salario}</span>
    </div>
    <div class="job-card-actions">
      <a href="#/vacante/${v.slug}" class="hd-button-secondary">Ver detalles</a>
      <a href="#/postularme?vacante=${v.slug}" class="hd-button">Postularme</a>
    </div>
  </div>`;
}

// ─── PAGE: Detalle vacante ───────────────────────────────────────────────────
function renderVacante(slug) {
  const v = getVacante(slug);
  if (!v) { navigate('#/vacantes'); return; }
  app.innerHTML = `
  ${renderNavbar('#/vacantes')}
  <main>
    <section class="page-hero" data-scene>
      <div class="page-hero-inner">
        <a href="#/vacantes" style="color:var(--hd-cyan);font-size:.9rem">← Todas las vacantes</a>
        <div class="hd-badge" style="margin:.75rem 0">${v.area} ${v.urgente ? '· URGENTE' : ''}</div>
        <h1 class="hd-gradient-title" style="margin:.5rem 0">${v.titulo}</h1>
        <div class="job-meta" style="justify-content:center;gap:1.5rem;margin-top:1rem">
          <span>📍 ${v.modalidad}</span><span>⏰ ${v.tipo}</span><span>💰 ${v.salario}</span>
        </div>
      </div>
    </section>
    <section class="section-pad" data-scene>
      <div class="section-inner two-col">
        <div>
          <h2>Descripción del puesto</h2>
          <p style="color:var(--hd-text-muted);line-height:1.8">${v.descripcion}</p>
          <h3 style="margin-top:2rem">Requisitos</h3>
          <ul class="req-list">
            ${v.requisitos.map(r => `<li>${r}</li>`).join('')}
          </ul>
        </div>
        <div>
          <div class="hd-card benefits-card">
            <h3>🎁 Beneficios</h3>
            <ul class="req-list">
              ${v.beneficios.map(b => `<li style="color:var(--hd-cyan)">${b}</li>`).join('')}
            </ul>
            <div style="margin-top:1.5rem;display:flex;flex-direction:column;gap:.75rem">
              <a href="#/postularme?vacante=${v.slug}" class="hd-button">Postularme a esta vacante</a>
              <a href="https://wa.me/525667477783?text=Hola,%20me%20interesa%20la%20vacante%20de%20${encodeURIComponent(v.titulo)}" target="_blank" rel="noreferrer" class="hd-button-secondary">Consultar por WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  ${renderFooter()}`;
  bindNavbar(); bindSceneObserver();
}

// ─── PAGE: Postularme (wizard 4 pasos) ─────────────────────────────────────
let formData = {};

function renderPostularme() {
  const params = new URLSearchParams(window.location.hash.includes('?') ? window.location.hash.split('?')[1] : '');
  const preVacante = params.get('vacante') || '';
  formData = { vacante: preVacante };

  app.innerHTML = `
  ${renderNavbar('#/postularme')}
  <main>
    <section class="page-hero" style="padding-bottom:2rem" data-scene>
      <div class="page-hero-inner">
        <div class="hd-badge">Formulario de aplicación</div>
        <h1 class="hd-gradient-title">¡Postúlate hoy!</h1>
        <p>Proceso rápido · Respuesta en 24–48 hrs</p>
      </div>
    </section>
    <section class="section-pad" style="padding-top:0" data-scene>
      <div class="section-inner" style="max-width:680px">
        <div class="step-wizard">
          <div class="step-item active" data-step="1"><span>1</span>Datos personales</div>
          <div class="step-item" data-step="2"><span>2</span>Perfil profesional</div>
          <div class="step-item" data-step="3"><span>3</span>Vacante</div>
          <div class="step-item" data-step="4"><span>4</span>Confirmación</div>
        </div>
        <div id="form-step-content" class="hd-card form-card">
          ${renderFormStep1(preVacante)}
        </div>
      </div>
    </section>
  </main>
  ${renderFooter()}`;
  bindNavbar(); bindSceneObserver();
  bindFormStep(1);
}

function renderFormStep1(preVacante) {
  return `
  <h2 class="form-step-title">Paso 1 — Datos personales</h2>
  <div class="form-group">
    <label>Nombre completo *</label>
    <input class="hd-input" id="f-nombre" placeholder="Ej: María García López" value="${formData.nombre || ''}" />
    <span class="field-error" id="e-nombre"></span>
  </div>
  <div class="form-row">
    <div class="form-group">
      <label>Correo electrónico *</label>
      <input class="hd-input" id="f-email" type="email" placeholder="tu@correo.com" value="${formData.email || ''}" />
      <span class="field-error" id="e-email"></span>
    </div>
    <div class="form-group">
      <label>Teléfono / WhatsApp *</label>
      <input class="hd-input" id="f-tel" type="tel" placeholder="55 1234 5678" value="${formData.tel || ''}" />
      <span class="field-error" id="e-tel"></span>
    </div>
  </div>
  <div class="form-row">
    <div class="form-group">
      <label>Ciudad de residencia *</label>
      <input class="hd-input" id="f-ciudad" placeholder="Ej: CDMX, Ecatepec…" value="${formData.ciudad || ''}" />
      <span class="field-error" id="e-ciudad"></span>
    </div>
    <div class="form-group">
      <label>Edad</label>
      <input class="hd-input" id="f-edad" type="number" min="18" max="70" placeholder="25" value="${formData.edad || ''}" />
    </div>
  </div>
  <div class="form-actions">
    <button class="hd-button" id="btn-next-1" type="button">Siguiente paso →</button>
  </div>`;
}

function renderFormStep2() {
  return `
  <h2 class="form-step-title">Paso 2 — Perfil profesional</h2>
  <div class="form-group">
    <label>Escolaridad *</label>
    <select class="hd-input" id="f-escolaridad">
      ${['','Secundaria','Preparatoria / Bachillerato','Técnico / Carrera técnica','Licenciatura (trunca)','Licenciatura terminada','Maestría o superior'].map(o => `<option value="${o}" ${formData.escolaridad===o?'selected':''}>${o||'-- Selecciona --'}</option>`).join('')}
    </select>
    <span class="field-error" id="e-escolaridad"></span>
  </div>
  <div class="form-group">
    <label>Años de experiencia laboral *</label>
    <select class="hd-input" id="f-exp">
      ${['','Sin experiencia','Menos de 1 año','1–2 años','3–5 años','6–10 años','Más de 10 años'].map(o => `<option value="${o}" ${formData.exp===o?'selected':''}>${o||'-- Selecciona --'}</option>`).join('')}
    </select>
    <span class="field-error" id="e-exp"></span>
  </div>
  <div class="form-group">
    <label>Área de experiencia principal</label>
    <input class="hd-input" id="f-area-exp" placeholder="Ej: Ventas, Call center, RH…" value="${formData.areaExp || ''}" />
  </div>
  <div class="form-group">
    <label>Expectativa salarial mensual (bruto)</label>
    <input class="hd-input" id="f-salario" placeholder="Ej: $12,000" value="${formData.salarioEsp || ''}" />
  </div>
  <div class="form-group">
    <label>¿Cuándo puedes empezar?</label>
    <select class="hd-input" id="f-inicio">
      ${['','Inmediatamente','En 1 semana','En 2 semanas','En 1 mes','En más de 1 mes'].map(o => `<option value="${o}" ${formData.inicio===o?'selected':''}>${o||'-- Selecciona --'}</option>`).join('')}
    </select>
  </div>
  <div class="form-actions">
    <button class="hd-button-secondary" id="btn-back-2" type="button">← Atrás</button>
    <button class="hd-button" id="btn-next-2" type="button">Siguiente paso →</button>
  </div>`;
}

function renderFormStep3() {
  return `
  <h2 class="form-step-title">Paso 3 — Vacante de interés</h2>
  <div class="form-group">
    <label>¿A qué vacante te postulas? *</label>
    <select class="hd-input" id="f-vacante">
      <option value="">-- Selecciona una vacante --</option>
      ${VACANTES.map(v => `<option value="${v.slug}" ${formData.vacante===v.slug?'selected':''}>${v.titulo}</option>`).join('')}
      <option value="general" ${formData.vacante==='general'?'selected':''}>Postulación general (cualquier área)</option>
    </select>
    <span class="field-error" id="e-vacante"></span>
  </div>
  <div class="form-group">
    <label>¿Cómo te enteraste de nosotros?</label>
    <select class="hd-input" id="f-fuente">
      ${['','LinkedIn','Facebook','Instagram','WhatsApp','Recomendación de un conocido','Bolsa de trabajo (Indeed, OCC…)','Google','Otro'].map(o => `<option value="${o}" ${formData.fuente===o?'selected':''}>${o||'-- Selecciona --'}</option>`).join('')}
    </select>
  </div>
  <div class="form-group">
    <label>¿Tienes carta de recomendación o referencias?</label>
    <select class="hd-input" id="f-refs">
      ${['','Sí, tengo referencias laborales','Sí, tengo carta de recomendación','No, pero puedo conseguirlas','No tengo'].map(o => `<option value="${o}" ${formData.refs===o?'selected':''}>${o||'-- Selecciona --'}</option>`).join('')}
    </select>
  </div>
  <div class="form-group">
    <label>Mensaje adicional (opcional)</label>
    <textarea class="hd-input" id="f-mensaje" rows="3" placeholder="Cuéntanos algo sobre ti o por qué te interesa esta oportunidad…">${formData.mensaje || ''}</textarea>
  </div>
  <div class="form-group">
    <label style="display:flex;align-items:flex-start;gap:.75rem;cursor:pointer">
      <input type="checkbox" id="f-aviso" style="margin-top:3px;accent-color:var(--hd-cyan)" ${formData.aviso?'checked':''} />
      <span style="font-size:.88rem;color:var(--hd-text-muted)">Acepto el aviso de privacidad y que mis datos sean usados para procesos de reclutamiento por Heavenly Dreams SAS de CV *</span>
    </label>
    <span class="field-error" id="e-aviso"></span>
  </div>
  <div class="form-actions">
    <button class="hd-button-secondary" id="btn-back-3" type="button">← Atrás</button>
    <button class="hd-button" id="btn-next-3" type="button">Revisar y enviar →</button>
  </div>`;
}

function renderFormStep4() {
  const vacObj = getVacante(formData.vacante);
  const vacLabel = vacObj ? vacObj.titulo : formData.vacante === 'general' ? 'Postulación general' : formData.vacante;
  return `
  <h2 class="form-step-title">Paso 4 — Confirma tu postulación</h2>
  <div class="step-summary">
    <div class="summary-row"><span>Nombre</span><strong>${formData.nombre}</strong></div>
    <div class="summary-row"><span>Correo</span><strong>${formData.email}</strong></div>
    <div class="summary-row"><span>Teléfono</span><strong>${formData.tel}</strong></div>
    <div class="summary-row"><span>Ciudad</span><strong>${formData.ciudad}</strong></div>
    <div class="summary-row"><span>Escolaridad</span><strong>${formData.escolaridad}</strong></div>
    <div class="summary-row"><span>Experiencia</span><strong>${formData.exp}</strong></div>
    <div class="summary-row"><span>Vacante</span><strong>${vacLabel}</strong></div>
    <div class="summary-row"><span>Disponibilidad</span><strong>${formData.inicio || 'No indicada'}</strong></div>
  </div>
  <p style="color:var(--hd-text-muted);font-size:.9rem;margin:1rem 0">Al confirmar, tu solicitud quedará registrada y un reclutador se pondrá en contacto contigo en 24–48 hrs.</p>
  <div class="form-actions">
    <button class="hd-button-secondary" id="btn-back-4" type="button">← Editar datos</button>
    <button class="hd-button" id="btn-submit" type="button">✅ Enviar postulación</button>
  </div>`;
}

function bindFormStep(step) {
  setWizardStep(step);
  if (step === 1) {
    document.getElementById('btn-next-1').addEventListener('click', () => {
      const nombre = document.getElementById('f-nombre').value.trim();
      const email = document.getElementById('f-email').value.trim();
      const tel = document.getElementById('f-tel').value.trim();
      const ciudad = document.getElementById('f-ciudad').value.trim();
      let ok = true;
      if (!nombre) { setErr('e-nombre', 'El nombre es obligatorio'); ok = false; } else clearErr('e-nombre');
      if (!email || !email.includes('@')) { setErr('e-email', 'Ingresa un correo válido'); ok = false; } else clearErr('e-email');
      if (!tel || tel.length < 8) { setErr('e-tel', 'Teléfono inválido'); ok = false; } else clearErr('e-tel');
      if (!ciudad) { setErr('e-ciudad', 'Indica tu ciudad'); ok = false; } else clearErr('e-ciudad');
      if (!ok) return;
      formData = { ...formData, nombre, email, tel, ciudad, edad: document.getElementById('f-edad').value };
      document.getElementById('form-step-content').innerHTML = renderFormStep2();
      bindFormStep(2);
    });
  } else if (step === 2) {
    document.getElementById('btn-back-2').addEventListener('click', () => {
      document.getElementById('form-step-content').innerHTML = renderFormStep1(formData.vacante);
      bindFormStep(1);
    });
    document.getElementById('btn-next-2').addEventListener('click', () => {
      const esc = document.getElementById('f-escolaridad').value;
      const exp = document.getElementById('f-exp').value;
      let ok = true;
      if (!esc) { setErr('e-escolaridad', 'Selecciona tu escolaridad'); ok = false; } else clearErr('e-escolaridad');
      if (!exp) { setErr('e-exp', 'Selecciona tu experiencia'); ok = false; } else clearErr('e-exp');
      if (!ok) return;
      formData = { ...formData, escolaridad: esc, exp, areaExp: document.getElementById('f-area-exp').value, salarioEsp: document.getElementById('f-salario').value, inicio: document.getElementById('f-inicio').value };
      document.getElementById('form-step-content').innerHTML = renderFormStep3();
      bindFormStep(3);
    });
  } else if (step === 3) {
    document.getElementById('btn-back-3').addEventListener('click', () => {
      document.getElementById('form-step-content').innerHTML = renderFormStep2();
      bindFormStep(2);
    });
    document.getElementById('btn-next-3').addEventListener('click', () => {
      const vacante = document.getElementById('f-vacante').value;
      const aviso = document.getElementById('f-aviso').checked;
      let ok = true;
      if (!vacante) { setErr('e-vacante', 'Selecciona una vacante'); ok = false; } else clearErr('e-vacante');
      if (!aviso) { setErr('e-aviso', 'Debes aceptar el aviso de privacidad'); ok = false; } else clearErr('e-aviso');
      if (!ok) return;
      formData = { ...formData, vacante, fuente: document.getElementById('f-fuente').value, refs: document.getElementById('f-refs').value, mensaje: document.getElementById('f-mensaje').value, aviso: true };
      document.getElementById('form-step-content').innerHTML = renderFormStep4();
      bindFormStep(4);
    });
  } else if (step === 4) {
    document.getElementById('btn-back-4').addEventListener('click', () => {
      document.getElementById('form-step-content').innerHTML = renderFormStep3();
      bindFormStep(3);
    });
    document.getElementById('btn-submit').addEventListener('click', () => {
      const id = saveCandidato(formData);
      navigate(`#/agendar?id=${id}`);
    });
  }
}

function setWizardStep(step) {
  document.querySelectorAll('.step-item').forEach(el => {
    const s = Number(el.dataset.step);
    el.classList.toggle('active', s === step);
    el.classList.toggle('done', s < step);
  });
}

function setErr(id, msg) { const el = document.getElementById(id); if (el) { el.textContent = msg; el.classList.add('visible'); } }
function clearErr(id) { const el = document.getElementById(id); if (el) { el.textContent = ''; el.classList.remove('visible'); } }

// ─── PAGE: Agendar entrevista ─────────────────────────────────────────────
function renderAgendar() {
  const params = new URLSearchParams(window.location.hash.includes('?') ? window.location.hash.split('?')[1] : '');
  const candidatoId = params.get('id') || '';

  const today = new Date();
  let calYear = today.getFullYear();
  let calMonth = today.getMonth();
  let selectedDate = null;
  let selectedTime = null;

  function buildCalendar(year, month) {
    const first = new Date(year, month, 1).getDay();
    const days = new Date(year, month + 1, 0).getDate();
    const monthName = new Date(year, month, 1).toLocaleDateString('es-MX', { month: 'long', year: 'numeric' });
    const now = new Date(); now.setHours(0,0,0,0);
    let html = `<div class="cal-header">
      <button id="cal-prev" class="cal-nav-btn" type="button">‹</button>
      <span class="cal-month">${monthName}</span>
      <button id="cal-next" class="cal-nav-btn" type="button">›</button>
    </div>
    <div class="cal-weekdays"><span>Dom</span><span>Lun</span><span>Mar</span><span>Mié</span><span>Jue</span><span>Vie</span><span>Sáb</span></div>
    <div class="cal-grid">`;
    for (let i = 0; i < first; i++) html += '<div class="cal-day empty"></div>';
    for (let d = 1; d <= days; d++) {
      const date = new Date(year, month, d);
      const isPast = date < now;
      const isSun = date.getDay() === 0;
      const disabled = isPast || isSun;
      const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const isSelected = selectedDate === dateStr;
      html += `<button type="button" class="cal-day${disabled?' disabled':''}${isSelected?' selected':''}" ${disabled?'disabled':''} data-date="${dateStr}">${d}</button>`;
    }
    html += '</div>';
    return html;
  }

  const HORARIOS = ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','14:00','15:00','16:00','16:30','17:00','17:30','18:00'];

  function renderTimePicker() {
    if (!selectedDate) return '';
    return `<div class="time-picker">
      <h4>Selecciona un horario</h4>
      <div class="time-grid">
        ${HORARIOS.map(t => `<button type="button" class="time-slot${selectedTime===t?' selected':''}" data-time="${t}">${t}</button>`).join('')}
      </div>
    </div>`;
  }

  function renderPage() {
    document.getElementById('cal-container').innerHTML = buildCalendar(calYear, calMonth);
    document.getElementById('time-container').innerHTML = renderTimePicker();
    bindCal();
    updateConfirmBtn();
  }

  function bindCal() {
    document.getElementById('cal-prev')?.addEventListener('click', () => {
      calMonth--; if (calMonth < 0) { calMonth = 11; calYear--; } renderPage();
    });
    document.getElementById('cal-next')?.addEventListener('click', () => {
      calMonth++; if (calMonth > 11) { calMonth = 0; calYear++; } renderPage();
    });
    document.querySelectorAll('.cal-day:not(.disabled):not(.empty)').forEach(btn => {
      btn.addEventListener('click', () => { selectedDate = btn.dataset.date; selectedTime = null; renderPage(); });
    });
    document.querySelectorAll('.time-slot').forEach(btn => {
      btn.addEventListener('click', () => { selectedTime = btn.dataset.time; renderPage(); });
    });
  }

  function updateConfirmBtn() {
    const btn = document.getElementById('btn-confirm-agenda');
    if (btn) btn.disabled = !(selectedDate && selectedTime);
  }

  app.innerHTML = `
  ${renderNavbar()}
  <main>
    <section class="page-hero" style="padding-bottom:2rem" data-scene>
      <div class="page-hero-inner">
        <div class="hd-badge">Agenda tu entrevista</div>
        <h1 class="hd-gradient-title">Elige fecha y hora</h1>
        <p>Entrevistas en línea vía Google Meet · Duración aprox. 30 min</p>
      </div>
    </section>
    <section class="section-pad" style="padding-top:0" data-scene>
      <div class="section-inner" style="max-width:700px">
        <div class="hd-card form-card agendar-card">
          <div class="calendar-section">
            <div id="cal-container">${buildCalendar(calYear, calMonth)}</div>
          </div>
          <div id="time-container"></div>
          <div class="agendar-actions">
            <p id="agenda-selection" style="color:var(--hd-text-muted);font-size:.9rem;min-height:1.4rem">
              Selecciona fecha y horario
            </p>
            <button class="hd-button" id="btn-confirm-agenda" type="button" disabled>Confirmar entrevista →</button>
            <a href="#/gracias" style="color:var(--hd-text-muted);font-size:.85rem;margin-top:.5rem">Omitir por ahora</a>
          </div>
        </div>
      </div>
    </section>
  </main>
  ${renderFooter()}`;

  bindNavbar(); bindSceneObserver(); bindCal();

  document.getElementById('btn-confirm-agenda').addEventListener('click', () => {
    const candidatos = dbGet(DB_CANDIDATOS);
    const cand = candidatos.find(c => c.id === candidatoId);
    saveEntrevista({
      candidatoId,
      nombre: cand?.nombre || 'Desconocido',
      fecha: selectedDate,
      hora: selectedTime,
      modalidad: 'Google Meet',
      vacante: cand?.vacante || '',
    });
    if (candidatoId) updateCandidato(candidatoId, { estado: 'entrevista' });
    navigate('#/gracias');
  });
}

// ─── PAGE: Gracias ──────────────────────────────────────────────────────────
function renderGracias() {
  app.innerHTML = `
  ${renderNavbar()}
  <main>
    <section class="page-hero" style="min-height:80vh;display:flex;align-items:center" data-scene>
      <div class="page-hero-inner" style="text-align:center">
        <div style="font-size:5rem;margin-bottom:1rem">🎉</div>
        <h1 class="hd-gradient-title">¡Gracias por postularte!</h1>
        <p style="font-size:1.1rem;color:var(--hd-text-muted);max-width:480px;margin:1rem auto">
          Tu solicitud fue recibida exitosamente. Un reclutador de Heavenly Dreams revisará tu perfil y te contactará en las próximas <strong style="color:var(--hd-cyan)">24–48 horas</strong>.
        </p>
        <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-top:2rem">
          <a href="#/vacantes" class="hd-button">Ver más vacantes</a>
          <a href="https://wa.me/525667477783?text=Hola!%20Acabo%20de%20postularme%20en%20su%20sitio" target="_blank" rel="noreferrer" class="hd-button-secondary">Contactar por WhatsApp</a>
        </div>
        <div style="margin-top:3rem;padding:1.5rem;background:rgba(0,217,255,0.06);border-radius:16px;border:1px solid rgba(0,217,255,0.15);max-width:400px;margin-left:auto;margin-right:auto">
          <p style="font-size:.9rem;color:var(--hd-text-muted);margin:0">📧 Recibirás un correo de confirmación. Revisa tu bandeja de spam si no aparece.<br><br>📱 También puedes escribirnos directamente por WhatsApp.</p>
        </div>
      </div>
    </section>
  </main>
  ${renderFooter()}`;
  bindNavbar(); bindSceneObserver();
}

// ─── PAGE: Contacto ──────────────────────────────────────────────────────────
function renderContacto() {
  app.innerHTML = `
  ${renderNavbar('#/contacto')}
  <main>
    <section class="page-hero" data-scene>
      <div class="page-hero-inner">
        <div class="hd-badge">¿Hablamos?</div>
        <h1 class="hd-gradient-title">Contáctanos</h1>
        <p>Reclutamiento · Staffing · Telecomunicaciones · Consultoría RH</p>
      </div>
    </section>
    <section class="section-pad" data-scene>
      <div class="section-inner two-col">
        <div>
          <div class="contact-info-block">
            <div class="contact-item">
              <span class="contact-icon">📱</span>
              <div>
                <strong>WhatsApp</strong>
                <a href="https://wa.me/525667477783" target="_blank" rel="noreferrer">+52 56 6747 7783</a>
              </div>
            </div>
            <div class="contact-item">
              <span class="contact-icon">📧</span>
              <div>
                <strong>Correo electrónico</strong>
                <a href="mailto:reclutamiento@heavenlydreams.com.mx">reclutamiento@heavenlydreams.com.mx</a>
              </div>
            </div>
            <div class="contact-item">
              <span class="contact-icon">📍</span>
              <div>
                <strong>Ubicación</strong>
                <span>Ciudad de México, México</span>
              </div>
            </div>
            <div class="contact-item">
              <span class="contact-icon">⏰</span>
              <div>
                <strong>Horario de atención</strong>
                <span>Lunes–Viernes 9:00–18:00</span>
              </div>
            </div>
          </div>
        </div>
        <div class="hd-card form-card">
          <h3>Envíanos un mensaje</h3>
          <form id="contact-form">
            <div class="form-group">
              <label>Nombre completo *</label>
              <input class="hd-input" id="ct-nombre" placeholder="Tu nombre" required />
            </div>
            <div class="form-group">
              <label>Correo electrónico *</label>
              <input class="hd-input" id="ct-email" type="email" placeholder="tu@correo.com" required />
            </div>
            <div class="form-group">
              <label>Asunto</label>
              <select class="hd-input" id="ct-asunto">
                <option value="">-- Selecciona --</option>
                <option>Postulación a vacante</option>
                <option>Contratar personal</option>
                <option>Servicios de telecomunicaciones</option>
                <option>Consultoría RH</option>
                <option>Otro</option>
              </select>
            </div>
            <div class="form-group">
              <label>Mensaje *</label>
              <textarea class="hd-input" id="ct-msg" rows="4" placeholder="¿En qué podemos ayudarte?" required></textarea>
            </div>
            <button class="hd-button" type="submit" style="width:100%">Enviar mensaje →</button>
          </form>
        </div>
      </div>
    </section>
  </main>
  ${renderFooter()}`;
  bindNavbar(); bindSceneObserver();
  document.getElementById('contact-form').addEventListener('submit', e => {
    e.preventDefault();
    showToast('¡Mensaje enviado! Te contactaremos pronto.', 'success');
    e.target.reset();
  });
}

// ─── PAGE: Admin Login ───────────────────────────────────────────────────────
function renderAdminLogin() {
  if (sessionStorage.getItem(DB_SESSION) === 'ok') { navigate('#/admin/panel'); return; }
  app.innerHTML = `
  ${renderNavbar()}
  <main>
    <section class="page-hero" style="min-height:80vh;display:flex;align-items:center" data-scene>
      <div class="page-hero-inner">
        <div class="hd-badge">Acceso restringido</div>
        <h1 class="hd-gradient-title">Panel Administrativo</h1>
        <div class="hd-card form-card" style="max-width:380px;margin:2rem auto 0">
          <h3>Iniciar sesión</h3>
          <div class="form-group">
            <label>Contraseña</label>
            <input class="hd-input" id="admin-pwd" type="password" placeholder="••••••••••" />
            <span class="field-error" id="admin-err"></span>
          </div>
          <button class="hd-button" id="admin-login-btn" type="button" style="width:100%">Entrar →</button>
        </div>
      </div>
    </section>
  </main>
  ${renderFooter()}`;
  bindNavbar(); bindSceneObserver();
  const pwd = document.getElementById('admin-pwd');
  document.getElementById('admin-login-btn').addEventListener('click', () => {
    if (pwd.value === 'HeavenlyAdmin2026') {
      sessionStorage.setItem(DB_SESSION, 'ok');
      navigate('#/admin/panel');
    } else {
      setErr('admin-err', 'Contraseña incorrecta');
      pwd.value = '';
    }
  });
  pwd.addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('admin-login-btn').click(); });
}

// ─── PAGE: Admin Panel ───────────────────────────────────────────────────────
function renderAdminPanel() {
  if (sessionStorage.getItem(DB_SESSION) !== 'ok') { navigate('#/admin'); return; }
  const candidatos = dbGet(DB_CANDIDATOS);
  const entrevistas = dbGet(DB_ENTREVISTAS);
  const byEstado = {};
  candidatos.forEach(c => { byEstado[c.estado] = (byEstado[c.estado] || 0) + 1; });
  app.innerHTML = `
  ${renderNavbar()}
  <main>
    <section class="page-hero" style="padding-bottom:2rem">
      <div class="page-hero-inner">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem">
          <div>
            <div class="hd-badge">Panel de Administración</div>
            <h1 class="hd-gradient-title" style="margin:.5rem 0">Dashboard RH</h1>
          </div>
          <button class="hd-button-secondary" id="admin-logout" type="button">Cerrar sesión</button>
        </div>
      </div>
    </section>
    <section class="section-pad" style="padding-top:0">
      <div class="section-inner">
        <div class="admin-metrics">
          <div class="hd-card admin-metric-card"><span class="hd-metric">${candidatos.length}</span><span>Total candidatos</span></div>
          <div class="hd-card admin-metric-card"><span class="hd-metric" style="color:var(--hd-cyan)">${byEstado.nuevo || 0}</span><span>Nuevos</span></div>
          <div class="hd-card admin-metric-card"><span class="hd-metric" style="color:#7c3aed">${byEstado.entrevista || 0}</span><span>En entrevista</span></div>
          <div class="hd-card admin-metric-card"><span class="hd-metric" style="color:#22c55e">${byEstado.aprobado || 0}</span><span>Aprobados</span></div>
          <div class="hd-card admin-metric-card"><span class="hd-metric" style="color:#0066ff">${byEstado.contratado || 0}</span><span>Contratados</span></div>
          <div class="hd-card admin-metric-card"><span class="hd-metric" style="color:#f59e0b">${entrevistas.length}</span><span>Entrevistas agendadas</span></div>
        </div>
        <div class="admin-nav-cards">
          <a href="#/admin/candidatos" class="admin-nav-card hd-card"><span style="font-size:2rem">👥</span><strong>Candidatos</strong><span>${candidatos.length} registros</span></a>
          <a href="#/admin/entrevistas" class="admin-nav-card hd-card"><span style="font-size:2rem">📅</span><strong>Entrevistas</strong><span>${entrevistas.length} agendadas</span></a>
        </div>
      </div>
    </section>
  </main>
  ${renderFooter()}`;
  document.getElementById('admin-logout').addEventListener('click', () => {
    sessionStorage.removeItem(DB_SESSION);
    navigate('#/admin');
  });
}

// ─── PAGE: Admin Candidatos ──────────────────────────────────────────────────
function renderAdminCandidatos() {
  if (sessionStorage.getItem(DB_SESSION) !== 'ok') { navigate('#/admin'); return; }

  function renderTable() {
    const list = dbGet(DB_CANDIDATOS);
    return list.length === 0
      ? '<p style="color:var(--hd-text-muted);padding:2rem;text-align:center">No hay candidatos registrados aún.</p>'
      : `<div class="admin-table-wrap"><table class="admin-table">
        <thead><tr><th>Nombre</th><th>Vacante</th><th>Estado</th><th>Fecha</th><th>Acciones</th></tr></thead>
        <tbody>
          ${list.map(c => {
            const vObj = getVacante(c.vacante);
            const vLabel = vObj ? vObj.titulo : c.vacante === 'general' ? 'General' : (c.vacante || '—');
            return `<tr data-id="${c.id}">
              <td><strong>${c.nombre}</strong><span style="display:block;font-size:.8rem;color:var(--hd-text-muted)">${c.email}</span><span style="display:block;font-size:.8rem;color:var(--hd-text-muted)">${c.tel}</span></td>
              <td>${vLabel}</td>
              <td><select class="estado-select hd-input" style="padding:4px 8px;font-size:.8rem;width:auto" data-id="${c.id}">${Object.entries(ESTADOS).map(([k,v]) => `<option value="${k}" ${c.estado===k?'selected':''}>${v.label}</option>`).join('')}</select></td>
              <td style="font-size:.8rem;color:var(--hd-text-muted)">${new Date(c.createdAt).toLocaleDateString('es-MX')}</td>
              <td><button class="btn-view-cand hd-button-secondary" style="padding:4px 10px;font-size:.8rem" data-id="${c.id}">Ver</button><button class="btn-del-cand" style="padding:4px 10px;font-size:.8rem;background:none;border:1px solid #ef4444;color:#ef4444;border-radius:8px;margin-left:4px;cursor:pointer" data-id="${c.id}">✕</button></td>
            </tr>`;
          }).join('')}
        </tbody>
      </table></div>`;
  }

  app.innerHTML = `
  ${renderNavbar()}
  <main>
    <section class="page-hero" style="padding-bottom:2rem">
      <div class="page-hero-inner">
        <a href="#/admin/panel" style="color:var(--hd-cyan);font-size:.9rem">← Dashboard</a>
        <h1 class="hd-gradient-title" style="margin:.5rem 0">Candidatos</h1>
      </div>
    </section>
    <section class="section-pad" style="padding-top:0">
      <div class="section-inner">
        <div id="cand-table-wrap">${renderTable()}</div>
      </div>
    </section>
  </main>
  ${renderFooter()}`;

  function rebindTable() {
    document.querySelectorAll('.estado-select').forEach(sel => {
      sel.addEventListener('change', () => { updateCandidato(sel.dataset.id, { estado: sel.value }); showToast('Estado actualizado', 'success'); });
    });
    document.querySelectorAll('.btn-del-cand').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!confirm('¿Eliminar este candidato?')) return;
        deleteCandidato(btn.dataset.id);
        document.getElementById('cand-table-wrap').innerHTML = renderTable();
        rebindTable();
      });
    });
    document.querySelectorAll('.btn-view-cand').forEach(btn => {
      btn.addEventListener('click', () => {
        const c = dbGet(DB_CANDIDATOS).find(x => x.id === btn.dataset.id);
        if (!c) return;
        const vObj = getVacante(c.vacante);
        openModal(`
          <h3 style="margin:0 0 1rem">${c.nombre}</h3>
          <div class="step-summary">
            <div class="summary-row"><span>Email</span><strong>${c.email}</strong></div>
            <div class="summary-row"><span>Tel</span><strong>${c.tel}</strong></div>
            <div class="summary-row"><span>Ciudad</span><strong>${c.ciudad}</strong></div>
            <div class="summary-row"><span>Escolaridad</span><strong>${c.escolaridad}</strong></div>
            <div class="summary-row"><span>Experiencia</span><strong>${c.exp}</strong></div>
            <div class="summary-row"><span>Vacante</span><strong>${vObj ? vObj.titulo : c.vacante}</strong></div>
            <div class="summary-row"><span>Estado</span><strong>${estadoBadge(c.estado)}</strong></div>
            ${c.mensaje ? `<div class="summary-row"><span>Mensaje</span><strong>${c.mensaje}</strong></div>` : ''}
          </div>
          <div style="margin-top:1rem;display:flex;gap:.75rem;flex-wrap:wrap">
            <a href="mailto:${c.email}" class="hd-button" style="font-size:.85rem">Enviar correo</a>
            <a href="https://wa.me/${c.tel.replace(/\D/g,'')}" target="_blank" class="hd-button-secondary" style="font-size:.85rem">WhatsApp</a>
          </div>`);
      });
    });
  }
  rebindTable();
}

// ─── PAGE: Admin Entrevistas ─────────────────────────────────────────────────
function renderAdminEntrevistas() {
  if (sessionStorage.getItem(DB_SESSION) !== 'ok') { navigate('#/admin'); return; }

  function renderTable() {
    const list = dbGet(DB_ENTREVISTAS);
    return list.length === 0
      ? '<p style="color:var(--hd-text-muted);padding:2rem;text-align:center">No hay entrevistas agendadas aún.</p>'
      : `<div class="admin-table-wrap"><table class="admin-table">
        <thead><tr><th>Candidato</th><th>Fecha</th><th>Hora</th><th>Modalidad</th><th>Vacante</th><th>Acciones</th></tr></thead>
        <tbody>
          ${list.map(e => {
            const vObj = getVacante(e.vacante);
            return `<tr>
              <td><strong>${e.nombre}</strong></td>
              <td>${e.fecha}</td>
              <td><strong style="color:var(--hd-cyan)">${e.hora}</strong></td>
              <td>${e.modalidad}</td>
              <td>${vObj ? vObj.titulo : (e.vacante || '—')}</td>
              <td><button class="btn-del-ent" style="padding:4px 10px;font-size:.8rem;background:none;border:1px solid #ef4444;color:#ef4444;border-radius:8px;cursor:pointer" data-id="${e.id}">✕</button></td>
            </tr>`;
          }).join('')}
        </tbody>
      </table></div>`;
  }

  app.innerHTML = `
  ${renderNavbar()}
  <main>
    <section class="page-hero" style="padding-bottom:2rem">
      <div class="page-hero-inner">
        <a href="#/admin/panel" style="color:var(--hd-cyan);font-size:.9rem">← Dashboard</a>
        <h1 class="hd-gradient-title" style="margin:.5rem 0">Entrevistas Agendadas</h1>
      </div>
    </section>
    <section class="section-pad" style="padding-top:0">
      <div class="section-inner">
        <div id="ent-table-wrap">${renderTable()}</div>
      </div>
    </section>
  </main>
  ${renderFooter()}`;

  function rebind() {
    document.querySelectorAll('.btn-del-ent').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!confirm('¿Eliminar esta entrevista?')) return;
        deleteEntrevista(btn.dataset.id);
        document.getElementById('ent-table-wrap').innerHTML = renderTable();
        rebind();
      });
    });
  }
  rebind();
}

// ─── Shared helpers ──────────────────────────────────────────────────────────
function bindTilt() {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotateX(${y * -8}deg) rotateY(${x * 10}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

function bindCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || entry.target.dataset.done) return;
      entry.target.dataset.done = 'true';
      const target = Number(entry.target.dataset.count);
      const suffix = entry.target.dataset.suffix || '';
      const started = performance.now();
      const duration = 1200;
      function tick(now) {
        const p = Math.min(1, (now - started) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        entry.target.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => obs.observe(el));
}

function bindSceneObserver() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
  }, { threshold: 0.15 });
  document.querySelectorAll('[data-scene]').forEach(el => obs.observe(el));
}

// ─── Chat widget ─────────────────────────────────────────────────────────────
const chatWidget = document.getElementById('chat-widget');
const chatToggle = document.getElementById('chat-toggle');
const chatClose = document.getElementById('chat-close');
const chatMessages = document.getElementById('chat-messages');
const chatQuick = document.getElementById('chat-quick-options');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

const chatBotResponses = {
  vacante: '¡Tenemos 6 vacantes activas! Puedes verlas en <a href="#/vacantes" style="color:var(--hd-cyan)">nuestra sección de vacantes</a>.',
  postular: 'Para postularte, ve a <a href="#/postularme" style="color:var(--hd-cyan)">Postularme</a> y completa el formulario. ¡Toma menos de 5 minutos!',
  entrevista: 'Una vez que te postules, podrás agendar tu entrevista en línea vía Google Meet. ¡Dura aprox. 30 minutos!',
  salario: 'Los salarios varían según la vacante: desde $10,000 hasta $26,000 + comisiones. Revisa cada vacante para detalles.',
  default: 'Gracias por tu mensaje. Para atención personalizada, escríbenos al <a href="https://wa.me/525667477783" target="_blank" style="color:var(--hd-cyan)">WhatsApp +52 56 6747 7783</a> o visita <a href="#/contacto" style="color:var(--hd-cyan)">Contacto</a>.',
};

const quickOptions = ['Ver vacantes', 'Postularme', 'Saber del salario', 'Agendar entrevista'];

function addChatMsg(html, who = 'bot') {
  const p = document.createElement('p');
  p.className = who;
  p.innerHTML = html;
  chatMessages.appendChild(p);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function botReply(text) {
  const lower = text.toLowerCase();
  if (lower.includes('vacan') || lower.includes('puesto') || lower.includes('trabajo')) return chatBotResponses.vacante;
  if (lower.includes('postul') || lower.includes('aplicar')) return chatBotResponses.postular;
  if (lower.includes('entrevist') || lower.includes('cita') || lower.includes('agenda')) return chatBotResponses.entrevista;
  if (lower.includes('salario') || lower.includes('sueldo') || lower.includes('pago')) return chatBotResponses.salario;
  return chatBotResponses.default;
}

chatToggle.addEventListener('click', () => {
  chatWidget.classList.toggle('open');
  if (chatWidget.classList.contains('open') && chatMessages.children.length === 0) {
    setTimeout(() => {
      addChatMsg('¡Hola! Soy el asistente de Heavenly Dreams. ¿En qué te puedo ayudar?', 'bot');
      chatQuick.innerHTML = quickOptions.map(o => `<button class="quick-opt" type="button">${o}</button>`).join('');
      chatQuick.querySelectorAll('.quick-opt').forEach(btn => {
        btn.addEventListener('click', () => {
          addChatMsg(btn.textContent, 'user');
          chatQuick.innerHTML = '';
          setTimeout(() => addChatMsg(botReply(btn.textContent), 'bot'), 400);
        });
      });
    }, 200);
  }
});

chatClose.addEventListener('click', () => chatWidget.classList.remove('open'));

chatForm.addEventListener('submit', e => {
  e.preventDefault();
  const val = chatInput.value.trim();
  if (!val) return;
  addChatMsg(val, 'user');
  chatInput.value = '';
  chatQuick.innerHTML = '';
  setTimeout(() => addChatMsg(botReply(val), 'bot'), 450);
});
