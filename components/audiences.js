// The site's audiences and the home route that belongs to each. Shared by the
// provider, the switcher, and the pre-paint script in the root layout, so a new
// audience only has to be added here (plus its page and switcher styling).
export const AUDIENCE_HOMES = {
  business: "/for-business",
  agency: "/for-agencies",
  org: "/for-organizations",
};

export function audienceForPath(pathname) {
  return Object.keys(AUDIENCE_HOMES).find((a) => AUDIENCE_HOMES[a] === pathname) || null;
}
