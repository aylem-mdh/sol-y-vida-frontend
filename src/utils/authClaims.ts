export function getCurrentUserIdFromToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    const payloadPart = token.split(".")[1];

    if (!payloadPart) {
      return null;
    }

    const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    const payload = JSON.parse(window.atob(padded)) as Record<string, unknown>;

    const candidate = [
      payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
      payload.nameid,
      payload.sub,
      payload.nameIdentifier,
      payload.nameidentifier,
      payload["nameidentifier"],
      payload["nameIdentifier"],
    ].find((value) => typeof value === "string" || typeof value === "number");

    if (typeof candidate === "number") {
      return Number.isFinite(candidate) ? candidate : null;
    }

    if (typeof candidate === "string") {
      const parsed = Number(candidate);
      return Number.isFinite(parsed) ? parsed : null;
    }
  } catch {
    return null;
  }

  return null;
}