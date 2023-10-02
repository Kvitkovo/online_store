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
