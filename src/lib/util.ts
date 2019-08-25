export const each = function (obj, iterator, context?) {
  let i, key
  if (type(obj) === 'number') {
    for (i = 0; i < obj; i++) {
      iterator(i, i)
    }
  } else if (obj.length === +obj.length) {
    for (i = 0; i < obj.length; i++) {
      if (iterator.call(context, obj[i], i, obj) === false) break
    }
  } else {
    for (key in obj) {
      if (iterator.call(context, obj[key], key, obj) === false) break
    }
  }
}

export const type = function (obj) {
  return obj === null || obj === undefined
    ? String(obj)
    : Object.prototype.toString.call(obj).match(/\[object (\w+)\]/)![1].toLowerCase()
}

export const isString = function (value) {
  return type(value) === 'string'
}

export const isObject = function (value) {
  return type(value) === 'object'
}

export const isArray = function (value) {
  return type(value) === 'array'
}

export const isRegExp = function (value) {
  return type(value) === 'regexp'
}

export const isFunction = function (value) {
  return type(value) === 'function'
}

export const isObjectOrArray = function (value) {
  return isObject(value) || isArray(value)
}

export const isNumeric = function (value) {
  return !isNaN(parseFloat(value)) && isFinite(value)
}

export const keys = function (obj: object) {
  const keys: string[] = []
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      keys.push(key)
    }
  }
  return keys
}

export const values = function (obj: object) {
  const values: any[] = []
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      values.push(obj[key])
    }
  }
  return values
}

/**
 * ### Mock.heredoc(fn)
 *
 * 以直观、安全的方式书写（多行）HTML 模板。
 *
 * 使用示例如下所示：
 *
 * const tpl = Mock.heredoc(function () {
   *
   * })
 *
 * 相关阅读:
 *
 * [Creating multiline strings in JavaScript](http://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript)
 */
export const heredoc = function (fn) {
  // 1. 移除起始的 function(){ /*!
  // 2. 移除末尾的 */ }
  // 3. 移除起始和末尾的空格
  return fn
    .toString()
    .replace(/^[^\/]+\/\*!?/, '')
    .replace(/\*\/[^\/]+$/, '')
    .replace(/^[\s\xA0]+/, '')
    .replace(/[\s\xA0]+$/, '') // .trim()
}

export const noop  = function () {}