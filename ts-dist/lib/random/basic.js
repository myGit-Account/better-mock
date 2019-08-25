// Basics
// 返回一个随机的布尔值。
export var boolean = function (min, max, cur) {
    if (cur !== undefined) {
        min = typeof min !== 'undefined' && !isNaN(min) ? parseInt(min, 10) : 1;
        max = typeof max !== 'undefined' && !isNaN(max) ? parseInt(max, 10) : 1;
        return Math.random() > 1.0 / (min + max) * min ? !cur : cur;
    }
    return Math.random() >= 0.5;
};
export var bool = function (min, max, cur) {
    return boolean(min, max, cur);
};
// 返回一个随机的自然数（大于等于 0 的整数）。
export var natural = function (min, max) {
    min = typeof min !== 'undefined' ? parseInt(min, 10) : 0;
    max = typeof max !== 'undefined' ? parseInt(max, 10) : 9007199254740992; // 2^53
    return Math.round(Math.random() * (max - min)) + min;
};
// 返回一个随机的整数。
export var integer = function (min, max) {
    min = typeof min !== 'undefined' ? parseInt(min, 10) : -9007199254740992;
    max = typeof max !== 'undefined' ? parseInt(max, 10) : 9007199254740992; // 2^53
    return Math.round(Math.random() * (max - min)) + min;
};
export var int = function (min, max) {
    return integer(min, max);
};
// 返回一个随机的浮点数。
export var float = function (min, max, dmin, dmax) {
    dmin = dmin === undefined ? 0 : dmin;
    dmin = Math.max(Math.min(dmin, 17), 0);
    dmax = dmax === undefined ? 17 : dmax;
    dmax = Math.max(Math.min(dmax, 17), 0);
    var ret = integer(min, max) + '.';
    for (var i = 0, dcount = natural(dmin, dmax); i < dcount; i++) {
        ret += ( // 最后一位不能为 0：如果最后一位为 0，会被 JS 引擎忽略掉。
        (i < dcount - 1) ? character('number') : character('123456789'));
    }
    return parseFloat(ret);
};
// 返回一个随机字符。
export var character = function (pool) {
    var lower = 'abcdefghijklmnopqrstuvwxyz';
    var upper = lower.toUpperCase();
    var number = '0123456789';
    var symbol = '!@#$%^&*()[]';
    var pools = {
        lower: lower, upper: upper, number: number, symbol: symbol, alpha: lower + upper, 'undefined': lower + upper + number + symbol
    };
    pool = pools[('' + pool).toLowerCase()] || pool;
    return pool.charAt(natural(0, pool.length - 1));
};
export var char = function (pool) {
    return character(pool);
};
// 返回一个随机字符串。
export var string = function (pool, min, max) {
    var len;
    switch (arguments.length) {
        case 0: // ()
            len = natural(3, 7);
            break;
        case 1: // ( length )
            len = pool;
            pool = undefined;
            break;
        case 2:
            // ( pool, length )
            if (typeof arguments[0] === 'string') {
                len = min;
            }
            else {
                // ( min, max )
                len = natural(pool, min);
                pool = undefined;
            }
            break;
        case 3:
            len = natural(min, max);
            break;
    }
    var text = '';
    for (var i = 0; i < len; i++) {
        text += character(pool);
    }
    return text;
};
export var str = function (pool, min, max) {
    return string(pool, min, max);
};
// 返回一个整型数组。
export var range = function (start, stop, step) {
    // range( stop )
    if (arguments.length <= 1) {
        stop = start || 0;
        start = 0;
    }
    // range( start, stop )
    step = arguments[2] || 1;
    start = +start;
    stop = +stop;
    step = +step;
    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);
    while (idx < len) {
        range[idx++] = start;
        start += step;
    }
    return range;
};