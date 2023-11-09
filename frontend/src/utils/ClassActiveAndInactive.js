export const inActive = (available, classNameActive, classNameInActive) => {
  if (available === 'UNAVAILABLE')
    return classNameActive + ' ' + classNameInActive;
  else return classNameActive;
};
