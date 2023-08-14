const mapping: Record<string, string> = {
  businesses: 'business',
  'shirt-designs': 'shirt_design',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
