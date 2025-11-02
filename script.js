function el(id) { return document.getElementById(id); }

async function loadSection(targetId, file) {
  const container = el(targetId);
  if (!container) {
    console.warn(`[PhenoMind] Missing container #${targetId}`);
    return;
  }
  try {
    const url = `sections/${file}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const html = await res.text();
    container.innerHTML = html;
  } catch (err) {
    console.error(`[PhenoMind] Failed to load ${file}:`, err);
    container.innerHTML = `
      <div style="padding:12px;border:1px solid #eee;border-radius:8px;color:#b00020;">
        Could not load <code>sections/${file}</code>. Check path/case in your repo.
      </div>`;
  }
}

// Ensure DOM is ready even if defer is missing
document.addEventListener("DOMContentLoaded", () => {
  [
    ["navbar","navbar.html"],
    ["hero","hero.html"],
    ["problem","problem.html"],
    ["solution","solution.html"],
    ["market","market.html"],
    ["team","team.html"],
    ["contact","contact.html"],
    ["footer","footer.html"],
  ].forEach(([id, file]) => loadSection(id, file));
});
