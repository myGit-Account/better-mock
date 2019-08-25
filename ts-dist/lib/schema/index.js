// 把 Mock.js 风格的数据模板转换成 JSON Schema。
// http://json-schema.org
import constant from '../constant';
import * as util from '../util';
import * as parser from '../parser';
function toJSONSchema(template, name, path /* Internal Use Only */) {
    // type rule properties items
    path = path || [];
    var result = {
        name: typeof name === 'string' ? name.replace(constant.RE_KEY, '$1') : name,
        template: template,
        type: util.type(template),
        rule: parser.parse(name)
    };
    result.path = path.slice(0);
    result.path.push(name === undefined ? 'ROOT' : result.name);
    switch (result.type) {
        case 'array':
            result.items = [];
            util.each(template, function (value, index) {
                result.items.push(toJSONSchema(value, index, result.path));
            });
            break;
        case 'object':
            result.properties = [];
            util.each(template, function (value, name) {
                result.properties.push(toJSONSchema(value, name, result.path));
            });
            break;
    }
    return result;
}
export default toJSONSchema;