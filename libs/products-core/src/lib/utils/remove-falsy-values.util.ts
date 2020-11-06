import identity from 'lodash.identity';
import pickBy from 'lodash.pickby';

export const removeFalsyValues = (obj: any): any => {

  return pickBy(obj, identity);

};

export const removeNullValues = (obj: any): any => {

  return Object.keys(obj).reduce((acc: any, o) => {

    if (obj[o] !== null && obj[o] !== undefined) {
      acc[o] = obj[o];
    }

    return acc;
  }, { });

};

export const replaceFalsyValuesWithNull = (obj: any): any => {

  return Object.keys(obj).reduce((acc: any, o) => {

    acc[o] = !obj[o] ? null : obj[o];

    return acc;
  }, { });

};
