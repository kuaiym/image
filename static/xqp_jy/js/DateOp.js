/**
 * @param {type} dateStr    格式1：MM/dd/YYYY 或MM/dd/YYYY HH:mm:ss
 *                           格式2：MM-dd-YYYY 或MM-dd-YYYY HH:mm:ss
 *                           格式3：YYYY/MM/dd 或YYYY/MM/dd HH:mm:ss
 *                           格式4：YYYY-MM-dd 或YYYY-MM-dd HH:mm:ss
 */
var DateOp ={};
DateOp.strToDate = function(dateStr) {
    var myDate;
    //开头数字
    var starNum = new RegExp(/^\d+/).exec(dateStr);
    switch (starNum.toString().length) {
        case 2://月
            myDate = new Date(Date.parse(dateStr));
            break;
        case 4://年
            var array = dateStr.match(/\d+(\d+)?/g);
            var len = array.length;
            if (len < 3)
                return NaN;
            var hour = len > 3 ? array[3] : 0;
            var min = len > 4 ? array[4] : 0;
            var sec = len > 5 ? array[5] : 0;
            myDate = new Date(array[0], --array[1], array[2], hour, min, sec);
            break;
        default:
            return NaN;
    }
    return myDate;
};


/**
 * 转化为h5 type=date所需的日期格式
 * @param dateStr
 * @returns {*}
 */
DateOp.strToDate2 = function(dateStr) {
    var myDate;
    //开头数字
    var starNum = new RegExp(/^\d+/).exec(dateStr);
    switch (starNum.toString().length) {
        case 2://月
            myDate = new Date(Date.parse(dateStr));
            break;
        case 4://年
            var array = da