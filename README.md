# 游戏官网集合

统一维护各游戏的独立官网。公开发布目录为 `docs/`，每个游戏有自己的页面、样式、脚本和宣传素材。

| 游戏 | 目录 | 访问入口 |
|---|---|---|
| 我做玉帝那些事 | docs/yudi/ | https://xxxzzzfff2020.github.io/game-official-sites/yudi/ |
| 算力大亨 | docs/compute-tycoon/ | https://xxxzzzfff2020.github.io/game-official-sites/compute-tycoon/ |
| 过载余波 | docs/overload-aftershock/ | https://xxxzzzfff2020.github.io/game-official-sites/overload-aftershock/ |
| 剑出无名 | docs/sword_no_name/ | https://xxxzzzfff2020.github.io/game-official-sites/sword_no_name/ |

统一入口：https://xxxzzzfff2020.github.io/game-official-sites/

## 维护

修改对应游戏目录中的文件，然后运行 `npm run build && npm run check`，提交并推送到 main。无需安装依赖。GitHub Pages 设置为 Deploy from a branch → main → /docs。

本地预览：`npm run preview`，打开 http://localhost:4173/ 。原来的三个仓库和访问地址继续保留；本仓库是独立副本，后续修改不会自动回写原仓库。

## 添加新游戏

1. 在 docs 下创建新的英文目录，例如 docs/new-game/，放入官网 index.html 和素材。使用相对资源路径。
2. 在 sites.json 的 sites 数组加入 slug、name、description、image（相对于游戏目录）和来源信息。
3. 将官网 canonical、分享图片地址设为新访问入口。游戏下载与源码链接使用明确的外部地址。
4. 运行 npm run build 和 npm run check，检查本地预览，提交推送。入口页与 sitemap 自动更新。

## 来源与边界

sites.json 记录首次复制的仓库、目录和提交。只复制官网文件和宣传素材；算力大亨在线试玩继续连接原游戏站，过载余波源码链接继续连接原开源仓库。剑出无名官网素材来自官方宣传物料包，试玩与社区入口连接其 TapTap 页面。
各站原有视觉、视频、二维码及游戏入口保持。素材权利归原权利人；公开访问不代表获得素材再发行许可。没有为原素材增加新的开源授权。

若转移仓库或更换域名，更新 sites.json 的 baseUrl、各官网的 canonical/分享图片 URL，然后重新 build。每个游戏目录可独立复制到其他静态托管服务。
