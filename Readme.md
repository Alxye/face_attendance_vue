<h1 align="center">智慧考勤管理 - 后台管理系统</h1>
<p align="center">
    <a href="./public/DepLog.md">
        开发日志
    </a>    
</p>

<p align="center">
    <a href="https://www.bilibili.com/video/BV1mh41137yS/?vd_source=9a233e677646447199a2bcdb7c74c126">
        Demo视频
    </a>
</p>

后台管理网站在线预览地址：http://101.132.152.202  登录名：1112 密码：123456

## 介绍

智慧考勤管理后台系统使用最新版本的vue3+vite+element-plus开发而成，目的是为了更好实现人脸考勤管理与员工管理。

#### 功能

- 微信网页端联动，数据协同并实时更新
- 管理系统主题配置功能，支持三种典型的后台风格，支持修改后台主题颜色、背景以及列表功能
- 封装路由配置、状态管理机制（本地存储）、axios及api管理机制
- 无路由跳转的刷新功能，支持缓存页面刷新，目前了解的多数框架都不支持缓存页面的刷新
- 交互友好，多个表格公用组件及弹窗公用组件

#### 主要技术

- Node.js：v18.14.2
- MVVM框架：vue v3
- 工程化管理：vite v2
- UI框架：element-plus
- 路由管理：vue-router v4
- 状态管理：vuex v4
- 数据请求：axios
- 实用工具库：@vueuse/core

## 代码部署

1. 获取源码资源包

   ```
   git clone https://github.com/Alxye/face_attendance_vue.git
   ```


2. 安装依赖，国内推荐使用cnpm或tyarn，国外推荐使用npm或yarn

   ```
   npm install
   ```

3. 运行
   
   服务请求配置：修改 `src/utils/system/request.ts`
   将baseURL修改为自己的服务器地址与端口

   ```angular2html
   const service: AxiosInstance = axios.create({
   baseURL: "http://101.132.152.202:5002",
   timeout: 5000
   })
   ```
   
   运行
   ```
   npm run dev 或 npm run start
   ```

4. 打包生成dist

   ```
   npm run build
   ```

## 一些预览

![Image](https://github.com/Alxye/face_attendance_vue/raw/main/public/login.png)
![Image](https://github.com/Alxye/face_attendance_vue/raw/main/public/dashboard.png)
![Image](https://github.com/Alxye/face_attendance_vue/raw/main/public/echart.png)
![Image](https://github.com/Alxye/face_attendance_vue/raw/main/public/employee.png)
