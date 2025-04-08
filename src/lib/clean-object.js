import { omitBy, isNil } from 'lodash'

export function cleanObject(obj) {
  return omitBy(obj, (v) => isNil(v) || v === '')
}
