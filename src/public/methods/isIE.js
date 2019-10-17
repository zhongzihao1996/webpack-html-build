

//检测是否为ie浏览器
function isIE() {
    if (!!window.ActiveXObject || "ActiveXObject" in window) { return true; }
    else { return false; }
}

module.exports = isIE;