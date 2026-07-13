export async function getSiteViews() {
  const url = import.meta.env.VITE_ABACUS_URL;
  if (!url) return { count: null, error: null };

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Counter failed: ${response.status}`);
    const data = await response.json();
    const count = Number(data.value ?? data.count ?? data.visits);
    return { count: Number.isFinite(count) ? count : null, error: null };
  } catch (error) {
    return { count: null, error: error.message };
  }
}
