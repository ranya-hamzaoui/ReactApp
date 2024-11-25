export const setLocalStorage = (key: string, value: any) => {
  return window.localStorage.setItem(key, value);
};

export const getLocalStorage = (key: string) => {
  if (window.localStorage.getItem(key) != undefined) {
    return window.localStorage.getItem(key);
  }
};

export const canAccess = (hostRole: string[], currentRole: string): boolean => {
  const hasRole = hostRole.includes(currentRole);
  // return hasRole; pas de role en backEnd
  return true
};
