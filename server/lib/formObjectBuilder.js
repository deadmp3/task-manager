import { groupBy } from 'lodash';

const buildFormErrors = ({ errors }) => {
  const groupErr = groupBy(errors, 'path');
  return Object.keys(groupErr).reduce((acc, key) => {
    const e = groupErr[key].map(({ message }) => message).join('. ');
    return { ...acc, [key]: e };
  }, {});
};

export default {
  buildFormErrors,
};
