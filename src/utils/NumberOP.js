export default function jiujiu(val) {
    val = parseInt(val);
    if (val > 9999) {
        return "9999+"
    }
    return val + ""
}

//生成随机 GUID 数
export function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}