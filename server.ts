import "dotenv/config";
import express from "express";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";
import { z } from "zod";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT ?? 3000;
const isDev = process.env.NODE_ENV !== "production";
const CRM_URL = process.env.CRM_API_URL ?? "http://localhost:3002";

app.use(express.json());

const leadsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Demasiadas solicitudes. Intenta en 15 minutos." },
});

const leadSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().max(2000).optional(),
});

app.post("/api/leads", leadsLimiter, async (req, res) => {
  try {
    const data = leadSchema.parse(req.body);
    const correlationId = crypto.randomUUID();

    // Forward to HD-CRM
    const crmRes = await fetch(`${CRM_URL}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, correlationId }),
    }).catch(() => null);

    if (!crmRes || !crmRes.ok) {
      console.error(`[HD-WEB] CRM forward failed correlationId=${correlationId}`);
      return res.status(502).json({ error: "No se pudo procesar la solicitud. Intenta de nuevo." });
    }

    return res.status(201).json({ ok: true, correlationId });
  } catch {
    return res.status(400).json({ error: "Datos inválidos." });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", platform: "HD-WEB", timestamp: new Date().toISOString() });
});

if (!isDev) {
  const clientDist = path.join(__dirname, "dist");
  app.use(express.static(clientDist));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`HD-WEB server running on port ${PORT}`);
});
