import {
  defaultsDeep as _defaultsDeep,
  isEmpty as _isEmpty,
  uniqBy as _uniqBy,
  groupBy as _groupBy,
  chain as _chain,
  orderBy as _orderBy,
  filter as _filter,
  union as _union,
} from 'lodash';

export const defaultsDeep = _defaultsDeep;

export const isEmpty = _isEmpty;

export const isNotEmpty = (object?: Object) => !_isEmpty(object);

export const uniqBy = _uniqBy;

export const getUrlParameter = (url: string, name: string) => {
  name = name.replace(/\\[[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&#]' + name + '=([^&#]*)');
  var results = regex.exec(url);
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

export const groupBy = _groupBy;

export const chain = _chain;

export const orderBy = _orderBy;

export const filter = _filter;

export const union = _union;
