export function renderApiPlayground(): string {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Equipments API Playground</title>
    <style>
      :root {
        color-scheme: dark;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: #0f172a;
        color: #e2e8f0;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        min-height: 100vh;
        background:
          radial-gradient(circle at top left, rgba(14, 165, 233, 0.18), transparent 28%),
          radial-gradient(circle at top right, rgba(96, 165, 250, 0.18), transparent 22%),
          #0f172a;
      }

      main {
        width: min(1200px, calc(100vw - 32px));
        margin: 0 auto;
        padding: 24px 0 40px;
      }

      .hero {
        display: grid;
        gap: 8px;
        margin-bottom: 20px;
      }

      h1 {
        margin: 0;
        font-size: clamp(2rem, 5vw, 3.25rem);
        line-height: 1;
      }

      .subtitle {
        margin: 0;
        color: #94a3b8;
        max-width: 70ch;
      }

      .layout {
        display: grid;
        grid-template-columns: minmax(260px, 320px) minmax(0, 1fr);
        gap: 20px;
      }

      .panel {
        background: rgba(15, 23, 42, 0.82);
        border: 1px solid rgba(148, 163, 184, 0.18);
        border-radius: 20px;
        box-shadow: 0 24px 70px rgba(2, 6, 23, 0.35);
        backdrop-filter: blur(16px);
      }

      .panel-body {
        padding: 18px;
      }

      .catalog {
        display: grid;
        gap: 12px;
      }

      .catalog-group {
        display: grid;
        gap: 8px;
      }

      .catalog-group h2,
      .workspace h2 {
        margin: 0 0 10px;
        font-size: 0.95rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #7dd3fc;
      }

      button,
      select,
      input,
      textarea {
        font: inherit;
      }

      .preset {
        width: 100%;
        padding: 12px 14px;
        border: 1px solid rgba(148, 163, 184, 0.14);
        border-radius: 14px;
        background: rgba(30, 41, 59, 0.65);
        color: inherit;
        text-align: left;
        cursor: pointer;
      }

      .preset:hover,
      .preset.active {
        border-color: rgba(125, 211, 252, 0.55);
        background: rgba(14, 165, 233, 0.16);
      }

      .preset strong {
        display: block;
        margin-bottom: 4px;
      }

      .preset span {
        color: #94a3b8;
        font-size: 0.9rem;
      }

      .workspace {
        display: grid;
        gap: 16px;
      }

      .request-grid {
        display: grid;
        grid-template-columns: 140px minmax(0, 1fr) 120px;
        gap: 12px;
      }

      label {
        display: grid;
        gap: 6px;
        color: #cbd5e1;
        font-size: 0.92rem;
      }

      select,
      input,
      textarea {
        width: 100%;
        padding: 12px 14px;
        border-radius: 14px;
        border: 1px solid rgba(148, 163, 184, 0.16);
        background: rgba(15, 23, 42, 0.8);
        color: inherit;
      }

      textarea {
        min-height: 250px;
        resize: vertical;
        font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
        line-height: 1.5;
      }

      .editor-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 16px;
      }

      .send {
        align-self: end;
        padding: 12px 16px;
        border: 0;
        border-radius: 14px;
        background: linear-gradient(135deg, #38bdf8, #2563eb);
        color: white;
        cursor: pointer;
        font-weight: 700;
      }

      .send:hover {
        filter: brightness(1.08);
      }

      .meta {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        color: #94a3b8;
        font-size: 0.92rem;
      }

      .pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 999px;
        background: rgba(30, 41, 59, 0.65);
      }

      .status-ok {
        color: #86efac;
      }

      .status-error {
        color: #fda4af;
      }

      @media (max-width: 900px) {
        .layout,
        .editor-grid,
        .request-grid {
          grid-template-columns: 1fr;
        }

        .send {
          width: 100%;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <section class="hero">
        <p class="pill">Local tooling for manual API calls</p>
        <h1>Equipments API Playground</h1>
        <p class="subtitle">
          Load a common workflow, tweak the path or JSON body, and send requests directly to the running service.
        </p>
      </section>

      <section class="layout">
        <aside class="panel panel-body catalog" aria-label="Request presets">
          <div class="catalog-group">
            <h2>Catalog</h2>
            <button class="preset" data-preset="health"><strong>Health Check</strong><span>GET /health</span></button>
            <button class="preset" data-preset="listTypes"><strong>List Equipment Types</strong><span>GET /equipment-types</span></button>
            <button class="preset" data-preset="createType"><strong>Create Equipment Type</strong><span>POST /equipment-types</span></button>
          </div>

          <div class="catalog-group">
            <h2>Containers</h2>
            <button class="preset" data-preset="registerContainer"><strong>Register Container</strong><span>POST /containers</span></button>
            <button class="preset" data-preset="listContainers"><strong>List Containers</strong><span>GET /containers</span></button>
            <button class="preset" data-preset="overrideStatus"><strong>Override Status</strong><span>PATCH /containers/{id}/status</span></button>
            <button class="preset" data-preset="pickup"><strong>Pickup Container</strong><span>POST /containers/{id}/pickup</span></button>
            <button class="preset" data-preset="return"><strong>Return Container</strong><span>POST /containers/{id}/return</span></button>
          </div>

          <div class="catalog-group">
            <h2>Reservations</h2>
            <button class="preset active" data-preset="availability"><strong>Availability</strong><span>GET /availability</span></button>
            <button class="preset" data-preset="reserve"><strong>Create Reservation</strong><span>POST /reservations</span></button>
            <button class="preset" data-preset="release"><strong>Release Reservation</strong><span>DELETE /reservations/{bookingReference}</span></button>
            <button class="preset" data-preset="event"><strong>Send Event</strong><span>POST /events</span></button>
          </div>
        </aside>

        <section class="panel panel-body workspace">
          <div>
            <h2>Request</h2>
            <div class="request-grid">
              <label>
                Method
                <select id="method">
                  <option>GET</option>
                  <option>POST</option>
                  <option>PUT</option>
                  <option>PATCH</option>
                  <option>DELETE</option>
                </select>
              </label>
              <label>
                Path
                <input id="path" type="text" spellcheck="false" />
              </label>
              <button id="send" class="send" type="button">Send Request</button>
            </div>
          </div>

          <div class="editor-grid">
            <label>
              JSON request body
              <textarea id="requestBody" spellcheck="false"></textarea>
            </label>
            <label>
              Response
              <textarea id="responseBody" spellcheck="false" readonly></textarea>
            </label>
          </div>

          <div class="meta">
            <div id="responseStatus" class="pill">Status: waiting</div>
            <div id="responseTime" class="pill">Duration: -</div>
            <div class="pill">Tip: placeholders like <code>{id}</code> can be edited directly in the path field.</div>
          </div>
        </section>
      </section>
    </main>

    <script>
      const presets = {
        health: { method: 'GET', path: '/health', body: '' },
        listTypes: { method: 'GET', path: '/equipment-types', body: '' },
        createType: {
          method: 'POST',
          path: '/equipment-types',
          body: JSON.stringify({ code: '45HC', description: '45-foot High Cube', nominalLength: "45'", maxPayloadKg: 29500 }, null, 2)
        },
        registerContainer: {
          method: 'POST',
          path: '/containers',
          body: JSON.stringify({ containerNumber: 'MSKU1234567', equipmentType: '20FT', currentDepot: 'NLRTM-01' }, null, 2)
        },
        listContainers: { method: 'GET', path: '/containers?status=AVAILABLE', body: '' },
        overrideStatus: {
          method: 'PATCH',
          path: '/containers/{id}/status',
          body: JSON.stringify({ status: 'DISPATCHED' }, null, 2)
        },
        pickup: { method: 'POST', path: '/containers/{id}/pickup', body: '' },
        return: { method: 'POST', path: '/containers/{id}/return', body: '' },
        availability: { method: 'GET', path: '/availability?depotCode=CNSHA-01', body: '' },
        reserve: {
          method: 'POST',
          path: '/reservations',
          body: JSON.stringify({ bookingReference: 'BKG-2026-00042', originDepot: 'CNSHA-01', equipment: [{ type: '20FT', quantity: 2 }] }, null, 2)
        },
        release: { method: 'DELETE', path: '/reservations/BKG-2026-00042', body: '' },
        event: {
          method: 'POST',
          path: '/events',
          body: JSON.stringify({ eventType: 'booking.cancelled', payload: { bookingReference: 'BKG-2026-00042' } }, null, 2)
        }
      };

      const methodInput = document.getElementById('method');
      const pathInput = document.getElementById('path');
      const requestBodyInput = document.getElementById('requestBody');
      const responseBodyInput = document.getElementById('responseBody');
      const responseStatus = document.getElementById('responseStatus');
      const responseTime = document.getElementById('responseTime');

      function loadPreset(name) {
        const preset = presets[name];
        if (!preset) {
          return;
        }

        methodInput.value = preset.method;
        pathInput.value = preset.path;
        requestBodyInput.value = preset.body;

        document.querySelectorAll('.preset').forEach((button) => {
          button.classList.toggle('active', button.dataset.preset === name);
        });
      }

      async function sendRequest() {
        const method = methodInput.value;
        const path = pathInput.value.trim();
        const rawBody = requestBodyInput.value.trim();

        if (!path) {
          responseStatus.textContent = 'Status: missing path';
          responseStatus.className = 'pill status-error';
          return;
        }

        const headers = {};
        const options = { method, headers };

        if (rawBody) {
          try {
            options.body = JSON.stringify(JSON.parse(rawBody));
            headers['content-type'] = 'application/json';
          } catch (error) {
            responseStatus.textContent = 'Status: invalid JSON body';
            responseStatus.className = 'pill status-error';
            responseBodyInput.value = String(error);
            return;
          }
        }

        const startedAt = performance.now();

        try {
          const response = await fetch(path, options);
          const duration = Math.round(performance.now() - startedAt);
          const contentType = response.headers.get('content-type') || '';
          const payload = contentType.includes('application/json')
            ? JSON.stringify(await response.json(), null, 2)
            : await response.text();

          responseStatus.textContent = 'Status: ' + response.status + ' ' + response.statusText;
          responseStatus.className = 'pill ' + (response.ok ? 'status-ok' : 'status-error');
          responseTime.textContent = 'Duration: ' + duration + ' ms';
          responseBodyInput.value = payload;
        } catch (error) {
          responseStatus.textContent = 'Status: request failed';
          responseStatus.className = 'pill status-error';
          responseTime.textContent = 'Duration: -';
          responseBodyInput.value = String(error);
        }
      }

      document.querySelectorAll('.preset').forEach((button) => {
        button.addEventListener('click', () => loadPreset(button.dataset.preset));
      });
      document.getElementById('send').addEventListener('click', sendRequest);

      loadPreset('availability');
    </script>
  </body>
</html>`;
}
