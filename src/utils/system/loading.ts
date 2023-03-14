import {ElLoading} from 'element-plus';
// 定义请求次数的变量，记录当前页面总共请求的次数
// 初始化loading
let loadingRequestCount = 0;
// @ts-ignore
let loadingInstance;

//显示loading的函数 并且记录请求次数 ++
const showLoading = () => {
    if (loadingRequestCount === 0) {
        //ElLoading.
        loadingInstance = ElLoading.service({
            //color:'#ff0000',
            fullscreen: true,
            lock: true,
            text: '加载中...',
            //spinner:'el-icon-loading',
            //customClass:'lb-loading-icon-cls',
            background: 'rgba(0, 0, 0, 0.3)'
        });
    }
    loadingRequestCount++
}

//隐藏loading的函数，并且记录请求次数 --
const hideLoading = () => {
    if (loadingRequestCount <= 0) return
    loadingRequestCount--
    if (loadingRequestCount === 0) {
        loadingInstance.close();
    }
}

export {
    showLoading,
    hideLoading
}