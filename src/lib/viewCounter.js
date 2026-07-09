export async function getSiteViews() {
  const url = import.meta.env.VITE_ABACUS_URL;
  if (!url) return { count: null, error: null };

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Counter failed: ${response.status}`);
    const data = await response.json();
    return { count: Number(data.value ?? data.count ?? data.visits) || null, error: null };
  } catch (error) {
    return { count: null, error: error.message };
  }
}
