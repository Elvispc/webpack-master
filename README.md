# webpack-master
安装依赖
    npm install 
启动本地服务
    npm run dev
打包
    npm run build
说明
    本项目是使用webpack4.x配置的多页面应用，config.js配置文件可以修改本地服务启动的
端口号，本地和打包后的静态资源的地址（css,js与图片是不同的地址），开发页面目录结构固定，
view目录下创建的文件夹包含当前页面的所有资源，如修改文件结构须修改build下的entries入口
配置文件。