export const inActive = (status, classNameActive, classNameInActive) => {
  if (status === 'NO_ACTIVE') return classNameActive + ' ' + classNameInActive;
  else return classNameActive;
};
