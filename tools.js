/**
 * 函数工具库
 * */ 

/**
 * @description: 将时间戳转换为固定日期格式
 * @param {Date} timeTamp  毫秒级时间戳
 * @return: yyyy-mm-dd
 * @Date Changed: 2020-07-31
 */
function toWorkTime(timeTamp) {
    let date = new Date(timeTamp);

    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate();

    return Y + M + D;
}

/**
 * @description: 将固定日期格式转换为时间戳
 * @param {Date} time  时间日期
 * @return: 时间戳
 * @Date Changed: 2020-07-31
 */
function toDateTamp(time) {

}


module.exports = {
    toWorkTime,
    toDateTamp
}
