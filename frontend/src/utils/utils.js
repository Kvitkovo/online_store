export const getLogoutUrl = () => {
  let redirectPath = process?.env?.REACT_APP_BASE_URL || '';
  redirectPath = redirectPath.concat(process?.env?.REACT_APP_LOGOUT_URL || '');
  return window.location.origin + redirectPath;
};

export const preparedUrl = (paths, params = {}) => {
  const urlPath = paths.join('/');

  const filterParams = Object.entries(params).reduce(
    (acc, [key, value]) => (
      value || typeof value === 'number' ? (acc[key] = value) : acc, acc
    ),
    {},
  );

  const urlParams = new URLSearchParams(filterParams).toString();
  return urlPath.concat(urlParams && '?', urlParams);
};

export function getRemainingDays(targetDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);
  const diffTime = target - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function getDayWord(day) {
  if (day > 4) return 'днів';
  if (day > 1) return 'дні';
  return 'день';
}
