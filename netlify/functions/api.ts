import type { Config, Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import { SEED_DATA } from "./seed";

// ── BLOB STORE HELPERS ──────────────────────────────────────────────────────

function getDbStore() {
  return getStore({
    name: "framekatha_cloud_db",
    consistency: "strong"
  });
}

function getUploadStore() {
  return getStore({
    name: "framekatha_cloud_uploads",
    consistency: "strong"
  });
}

async function getCollection<T>(key: string, defaultVal: T): Promise<T> {
  try {
    const store = getDbStore();
    const data = await store.get(key, { type: "json" });
    if (data !== null && data !== undefined) {
      return data as T;
    }
  } catch (e) {
    console.warn(`[FrameKatha DB] Read warning for ${key}:`, e);
  }
  return defaultVal;
}

async function setCollection<T>(key: string, val: T): Promise<void> {
  try {
    const store = getDbStore();
    await store.setJSON(key, val);
  } catch (e) {
    console.error(`[FrameKatha DB] Write error for ${key}:`, e);
  }
}

// Ensure database is initialized with seed data on first run
let isInitialized = false;
async function ensureDbInitialized() {
  if (isInitialized) return;
  try {
    const store = getDbStore();
    const existing = await store.get("projects", { type: "json" });
    if (existing === null || existing === undefined) {
      console.log("[FrameKatha DB] Initializing cloud database with seed data...");
      await store.setJSON("projects", SEED_DATA.projects || []);
      await store.setJSON("categories", SEED_DATA.categories || []);
      await store.setJSON("settings", SEED_DATA.settings || {});
      await store.setJSON("testimonials", SEED_DATA.testimonials || []);
      await store.setJSON("client_galleries", SEED_DATA.client_galleries || []);
      await store.setJSON("messages", SEED_DATA.messages || []);
      await store.setJSON("analytics", SEED_DATA.analytics || {});
    }
    isInitialized = true;
  } catch (e) {
    console.warn("[FrameKatha DB] Initialization check notice:", e);
  }
}

// ── RESPONSE HELPERS WITH CORS & ANTI-CACHE HEADERS ─────────────────────────

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, Cache-Control, Pragma, X-Requested-With",
  "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
  "Pragma": "no-cache",
  "Expires": "0"
};

function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...CORS_HEADERS
    }
  });
}

function handleCorsOptions() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS
  });
}

// ── MAIN ROUTER ─────────────────────────────────────────────────────────────

export default async (req: Request, context: Context) => {
  if (req.method === "OPTIONS") {
    return handleCorsOptions();
  }

  await ensureDbInitialized();

  const url = new URL(req.url);
  // Normalize path by stripping trailing slashes
  let path = url.pathname.replace(/\/+$/, "");
  if (!path.startsWith("/api")) {
    path = "/api" + path;
  }
  const method = req.method.toUpperCase();

  try {
    // ── HEALTH CHECK ───────────────────────────────────────────────────────
    if (path === "/api/health" || path === "/api") {
      return jsonResponse({
        status: "healthy",
        app: "FrameKatha Serverless Cloud API",
        version: "2.0.0",
        timestamp: new Date().toISOString()
      });
    }

    // ── MEDIA FILE SERVING ─────────────────────────────────────────────────
    if (path.startsWith("/api/uploads/") && method === "GET") {
      const fileId = path.replace("/api/uploads/", "");
      try {
        const uploadStore = getUploadStore();
        const { data, metadata } = await uploadStore.getWithMetadata(fileId, { type: "arrayBuffer" });
        if (!data) {
          return new Response("Media not found", { status: 404, headers: CORS_HEADERS });
        }
        const mimeType = (metadata as any)?.mimeType || "image/jpeg";
        return new Response(data, {
          status: 200,
          headers: {
            "Content-Type": mimeType,
            "Cache-Control": "public, max-age=31536000, immutable",
            "Access-Control-Allow-Origin": "*"
          }
        });
      } catch (e: any) {
        return new Response("Error fetching media", { status: 500, headers: CORS_HEADERS });
      }
    }

    // ── FILE UPLOAD ────────────────────────────────────────────────────────
    if (path === "/api/upload" && method === "POST") {
      try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        if (!file) {
          return jsonResponse({ error: "No file provided in form data" }, 400);
        }
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const origName = file.name || "upload.jpg";
        const ext = origName.includes(".") ? origName.split(".").pop() : "jpg";
        const fileId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`;

        const uploadStore = getUploadStore();
        await uploadStore.set(fileId, buffer, {
          metadata: {
            mimeType: file.type || "image/jpeg",
            name: origName,
            size: file.size
          }
        });

        // Use absolute URL pointing to Netlify function media endpoint
        const host = req.headers.get("host") || "framekatha.netlify.app";
        const proto = host.includes("localhost") ? "http" : "https";
        const fileUrl = `${proto}://${host}/api/uploads/${fileId}`;

        return jsonResponse({
          url: fileUrl,
          filename: origName,
          size: file.size,
          mimeType: file.type || "image/jpeg"
        });
      } catch (err: any) {
        return jsonResponse({ error: "File upload processing failed: " + err.message }, 500);
      }
    }

    // ── PROJECTS CMS ALL ───────────────────────────────────────────────────
    if (path === "/api/projects/all-cms" && method === "GET") {
      const projects = await getCollection<any[]>("projects", SEED_DATA.projects || []);
      return jsonResponse(projects);
    }

    // ── PROJECTS CRUD ──────────────────────────────────────────────────────
    if (path === "/api/projects") {
      if (method === "GET") {
        let projects = await getCollection<any[]>("projects", SEED_DATA.projects || []);
        const category = url.searchParams.get("category");
        const tag = url.searchParams.get("tag");
        const year = url.searchParams.get("year");
        const featured = url.searchParams.get("featured");
        const search = url.searchParams.get("search");

        if (category && category !== "All") {
          projects = projects.filter((p) => p.category?.toLowerCase() === category.toLowerCase());
        }
        if (tag) {
          projects = projects.filter((p) => p.tags?.some((t: string) => t.toLowerCase() === tag.toLowerCase()));
        }
        if (year) {
          projects = projects.filter((p) => String(p.year) === year);
        }
        if (featured === "true") {
          projects = projects.filter((p) => p.featured === true);
        }
        if (search) {
          const q = search.toLowerCase();
          projects = projects.filter((p) =>
            p.title?.toLowerCase().includes(q) ||
            p.description?.toLowerCase().includes(q) ||
            p.tags?.some((t: string) => t.toLowerCase().includes(q))
          );
        }
        return jsonResponse(projects);
      }

      if (method === "POST") {
        const body = await req.json();
        const projects = await getCollection<any[]>("projects", SEED_DATA.projects || []);
        const newProj = {
          ...body,
          id: body.id || `proj-${Date.now().toString(36)}`,
          views: body.views || 0,
          likes: body.likes || 0,
          comments: body.comments || [],
          createdAt: body.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        projects.unshift(newProj);
        await setCollection("projects", projects);
        return jsonResponse(newProj, 201);
      }
    }

    // Project by ID or slug & Sub-routes
    if (path.startsWith("/api/projects/")) {
      const sub = path.replace("/api/projects/", "");
      const projects = await getCollection<any[]>("projects", SEED_DATA.projects || []);

      // POST /api/projects/:id/views
      if (sub.endsWith("/views") && method === "POST") {
        const id = sub.replace("/views", "");
        const proj = projects.find((p) => p.id === id || p.slug === id);
        if (proj) {
          proj.views = (proj.views || 0) + 1;
          await setCollection("projects", projects);
          return jsonResponse({ success: true, views: proj.views });
        }
        return jsonResponse({ error: "Project not found" }, 404);
      }

      // POST /api/projects/:id/like
      if (sub.endsWith("/like") && method === "POST") {
        const id = sub.replace("/like", "");
        const action = url.searchParams.get("action") || "like";
        const proj = projects.find((p) => p.id === id || p.slug === id);
        if (proj) {
          proj.likes = Math.max(0, (proj.likes || 0) + (action === "like" ? 1 : -1));
          await setCollection("projects", projects);
          return jsonResponse({ success: true, likes: proj.likes });
        }
        return jsonResponse({ error: "Project not found" }, 404);
      }

      // Comments: GET & POST /api/projects/:id/comments
      if (sub.endsWith("/comments")) {
        const id = sub.replace("/comments", "");
        const proj = projects.find((p) => p.id === id || p.slug === id);
        if (!proj) return jsonResponse({ error: "Project not found" }, 404);

        if (method === "GET") {
          return jsonResponse(proj.comments || []);
        }
        if (method === "POST") {
          const body = await req.json();
          const newComment = {
            id: `com-${Date.now()}`,
            name: body.name || "Anonymous Visitor",
            comment: body.comment,
            createdAt: new Date().toISOString()
          };
          proj.comments = proj.comments || [];
          proj.comments.unshift(newComment);
          await setCollection("projects", projects);
          return jsonResponse(newComment, 201);
        }
      }

      // DELETE /api/projects/:id/comments/:commentId
      if (sub.includes("/comments/") && method === "DELETE") {
        const [id, , commentId] = sub.split("/");
        const proj = projects.find((p) => p.id === id || p.slug === id);
        if (proj && proj.comments) {
          proj.comments = proj.comments.filter((c: any) => c.id !== commentId);
          await setCollection("projects", projects);
          return jsonResponse({ success: true });
        }
        return jsonResponse({ error: "Not found" }, 404);
      }

      const id = sub;
      const idx = projects.findIndex((p) => p.id === id || p.slug === id);

      if (method === "GET") {
        if (idx !== -1) return jsonResponse(projects[idx]);
        return jsonResponse({ error: "Project not found" }, 404);
      }

      if (method === "PUT") {
        const body = await req.json();
        if (idx !== -1) {
          projects[idx] = {
            ...projects[idx],
            ...body,
            id: projects[idx].id,
            updatedAt: new Date().toISOString()
          };
          await setCollection("projects", projects);
          return jsonResponse(projects[idx]);
        }
        return jsonResponse({ error: "Project not found" }, 404);
      }

      if (method === "DELETE") {
        if (idx !== -1) {
          projects.splice(idx, 1);
          await setCollection("projects", projects);
          return jsonResponse({ success: true, message: "Project deleted from cloud database" });
        }
        return jsonResponse({ success: true, message: "Project was already deleted" });
      }
    }

    // ── CATEGORIES CRUD ────────────────────────────────────────────────────
    if (path === "/api/categories") {
      if (method === "GET") {
        const categories = await getCollection<any[]>("categories", SEED_DATA.categories || []);
        return jsonResponse(categories);
      }
      if (method === "POST") {
        const body = await req.json();
        const categories = await getCollection<any[]>("categories", SEED_DATA.categories || []);
        const newCat = {
          ...body,
          id: body.id || `cat-${Date.now().toString(36)}`,
          count: body.count || 0
        };
        categories.push(newCat);
        await setCollection("categories", categories);
        return jsonResponse(newCat, 201);
      }
    }

    if (path.startsWith("/api/categories/")) {
      const id = path.replace("/api/categories/", "");
      const categories = await getCollection<any[]>("categories", SEED_DATA.categories || []);
      const idx = categories.findIndex((c) => c.id === id || c.slug === id);

      if (method === "PUT") {
        const body = await req.json();
        if (idx !== -1) {
          categories[idx] = { ...categories[idx], ...body };
          await setCollection("categories", categories);
          return jsonResponse(categories[idx]);
        }
        return jsonResponse({ error: "Category not found" }, 404);
      }

      if (method === "DELETE") {
        if (idx !== -1) {
          categories.splice(idx, 1);
          await setCollection("categories", categories);
          return jsonResponse({ success: true });
        }
        return jsonResponse({ success: true });
      }
    }

    // ── SITE SETTINGS CRUD ─────────────────────────────────────────────────
    if (path === "/api/settings") {
      if (method === "GET") {
        const settings = await getCollection<any>("settings", SEED_DATA.settings || {});
        return jsonResponse(settings);
      }
      if (method === "PUT") {
        const body = await req.json();
        const settings = await getCollection<any>("settings", SEED_DATA.settings || {});
        const updated = { ...settings, ...body };
        await setCollection("settings", updated);
        return jsonResponse(updated);
      }
    }

    // ── TESTIMONIALS CRUD ──────────────────────────────────────────────────
    if (path === "/api/testimonials") {
      if (method === "GET") {
        const testimonials = await getCollection<any[]>("testimonials", SEED_DATA.testimonials || []);
        return jsonResponse(testimonials);
      }
      if (method === "POST") {
        const body = await req.json();
        const testimonials = await getCollection<any[]>("testimonials", SEED_DATA.testimonials || []);
        const newTest = {
          ...body,
          id: body.id || `test-${Date.now().toString(36)}`
        };
        testimonials.unshift(newTest);
        await setCollection("testimonials", testimonials);
        return jsonResponse(newTest, 201);
      }
    }

    if (path.startsWith("/api/testimonials/")) {
      const id = path.replace("/api/testimonials/", "");
      const testimonials = await getCollection<any[]>("testimonials", SEED_DATA.testimonials || []);
      const idx = testimonials.findIndex((t) => t.id === id);

      if (method === "PUT") {
        const body = await req.json();
        if (idx !== -1) {
          testimonials[idx] = { ...testimonials[idx], ...body };
          await setCollection("testimonials", testimonials);
          return jsonResponse(testimonials[idx]);
        }
        return jsonResponse({ error: "Not found" }, 404);
      }

      if (method === "DELETE") {
        if (idx !== -1) {
          testimonials.splice(idx, 1);
          await setCollection("testimonials", testimonials);
          return jsonResponse({ success: true });
        }
        return jsonResponse({ success: true });
      }
    }

    // ── CLIENT GALLERIES CRUD ──────────────────────────────────────────────
    if (path === "/api/client-galleries") {
      if (method === "GET") {
        const galleries = await getCollection<any[]>("client_galleries", SEED_DATA.client_galleries || []);
        return jsonResponse(galleries);
      }
      if (method === "POST") {
        const body = await req.json();
        const galleries = await getCollection<any[]>("client_galleries", SEED_DATA.client_galleries || []);
        const newGal = {
          ...body,
          id: body.id || `cg-${Date.now().toString(36)}`,
          views: 0,
          selectedImages: body.selectedImages || [],
          clientNotes: body.clientNotes || "",
          isFinalized: false,
          createdAt: new Date().toISOString()
        };
        galleries.unshift(newGal);
        await setCollection("client_galleries", galleries);
        return jsonResponse(newGal, 201);
      }
    }

    if (path.startsWith("/api/client-galleries/")) {
      const sub = path.replace("/api/client-galleries/", "");
      const galleries = await getCollection<any[]>("client_galleries", SEED_DATA.client_galleries || []);

      if (sub.endsWith("/favorite") && method === "POST") {
        const id = sub.replace("/favorite", "");
        const body = await req.json();
        const gal = galleries.find((g) => g.id === id || g.slug === id);
        if (gal) {
          const imgUrl = body.imageUrl;
          gal.selectedImages = gal.selectedImages || [];
          if (gal.selectedImages.includes(imgUrl)) {
            gal.selectedImages = gal.selectedImages.filter((img: string) => img !== imgUrl);
          } else {
            gal.selectedImages.push(imgUrl);
          }
          await setCollection("client_galleries", galleries);
          return jsonResponse({ success: true, selectedImages: gal.selectedImages });
        }
        return jsonResponse({ error: "Not found" }, 404);
      }

      if (sub.endsWith("/notes") && method === "POST") {
        const id = sub.replace("/notes", "");
        const body = await req.json();
        const gal = galleries.find((g) => g.id === id || g.slug === id);
        if (gal) {
          gal.clientNotes = body.notes || "";
          await setCollection("client_galleries", galleries);
          return jsonResponse({ success: true, notes: gal.clientNotes });
        }
        return jsonResponse({ error: "Not found" }, 404);
      }

      if (sub.endsWith("/finalize") && method === "POST") {
        const id = sub.replace("/finalize", "");
        const gal = galleries.find((g) => g.id === id || g.slug === id);
        if (gal) {
          gal.isFinalized = true;
          await setCollection("client_galleries", galleries);
          return jsonResponse({ success: true, isFinalized: true });
        }
        return jsonResponse({ error: "Not found" }, 404);
      }

      const id = sub;
      const idx = galleries.findIndex((g) => g.id === id || g.slug === id);

      if (method === "GET") {
        if (idx !== -1) {
          galleries[idx].views = (galleries[idx].views || 0) + 1;
          await setCollection("client_galleries", galleries);
          return jsonResponse(galleries[idx]);
        }
        return jsonResponse({ error: "Gallery not found" }, 404);
      }

      if (method === "PUT") {
        const body = await req.json();
        if (idx !== -1) {
          galleries[idx] = { ...galleries[idx], ...body, id: galleries[idx].id };
          await setCollection("client_galleries", galleries);
          return jsonResponse(galleries[idx]);
        }
        return jsonResponse({ error: "Not found" }, 404);
      }

      if (method === "DELETE") {
        if (idx !== -1) {
          galleries.splice(idx, 1);
          await setCollection("client_galleries", galleries);
          return jsonResponse({ success: true });
        }
        return jsonResponse({ success: true });
      }
    }

    // ── MESSAGES / INQUIRIES CRUD ──────────────────────────────────────────
    if (path === "/api/messages") {
      if (method === "GET") {
        const messages = await getCollection<any[]>("messages", SEED_DATA.messages || []);
        return jsonResponse(messages);
      }
      if (method === "POST") {
        const body = await req.json();
        const messages = await getCollection<any[]>("messages", SEED_DATA.messages || []);
        const newMsg = {
          ...body,
          id: `msg-${Date.now().toString(36)}`,
          read: false,
          createdAt: new Date().toISOString()
        };
        messages.unshift(newMsg);
        await setCollection("messages", messages);
        return jsonResponse(newMsg, 201);
      }
    }

    if (path.startsWith("/api/messages/") && method === "DELETE") {
      const id = path.replace("/api/messages/", "");
      const messages = await getCollection<any[]>("messages", SEED_DATA.messages || []);
      const idx = messages.findIndex((m) => m.id === id);
      if (idx !== -1) {
        messages.splice(idx, 1);
        await setCollection("messages", messages);
        return jsonResponse({ success: true });
      }
      return jsonResponse({ success: true });
    }

    // ── ANALYTICS SUMMARY ──────────────────────────────────────────────────
    if (path === "/api/analytics/summary" && method === "GET") {
      const projects = await getCollection<any[]>("projects", SEED_DATA.projects || []);
      const totalViews = projects.reduce((acc, p) => acc + (p.views || 0), 0);
      const totalLikes = projects.reduce((acc, p) => acc + (p.likes || 0), 0);
      return jsonResponse({
        totalViews,
        uniqueVisitors: Math.max(12, Math.floor(totalViews * 0.65)),
        totalLikes,
        projectsCount: projects.length,
        categoriesCount: 6,
        topProjects: projects.slice(0, 5),
        deviceDistribution: [
          { name: "Desktop / Laptop", percentage: 55 },
          { name: "Mobile Devices", percentage: 40 },
          { name: "Tablet", percentage: 5 }
        ]
      });
    }

    // ── FALLBACK ───────────────────────────────────────────────────────────
    return jsonResponse({ error: "Endpoint not found: " + path }, 404);
  } catch (err: any) {
    console.error("[FrameKatha API] Unhandled server error:", err);
    return jsonResponse({ error: "Internal Server Error: " + err.message }, 500);
  }
};

export const config: Config = {
  path: "/api/*"
};
