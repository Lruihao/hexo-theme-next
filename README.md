<h1 align=center>hexo-theme-next</h1>

> 基于[hexo-theme-next 6.0+](https://github.com/theme-next/hexo-theme-next)的Pisces模板做的DIY扩展性设计。主要是一些custom stlye还有一些第三方的js。修改的地方太多也有点小乱就不提PR了。&emsp;官方Demo => <https://theme-next.org>    
记录一下折腾过程，修改内容以[博採眾長](https://lruihao.cn/hexo/hexo-theme-next.html)为准，以后备份恢复博客也好方便自己。本文之前的美化修改请见[hexo分类](https://lruihao.cn/categories/hexo/)。


<!--more-->
# 初步安装
主要的几个自定义文件
```xml 主要修改路径及文件
config.swig         #主题配置文件 相关账户信息自己注册替换
\layout\custom\head.swig      #在头部自定义加入标签
\layout\custom\google_adsense.swig    #谷歌广告模块，内有注释暂时弃用
\layout\_layout.swig        #主布局
\layout\_macro\post.swig      #文章布局
\layout\_macro\post-copyright.swig    #文章版权
\layout\_macro\siderbar.swig      #侧栏模板
\layout\_third-party\copy-code.swig   #复制按钮
\layout\_partials\comments.swig     #评论主模板
\layout\_partials\footer.swig     #底部模板
\layout\_third-party\custom.swig      #该模块在layout.swig引入用于在body自定义标签
\source\css\_custom\customs.styl    #主要用户自定义样式表
\source\fonts\          #引入了一些我的手写体及外部字体
```

```bash 安装整个改过的主题,然后下载相应的lib资源
cd hexo
git clone https://github.com/Lruihao/hexo-theme-next themes/next

```
![lib.png](https://i.loli.net/2019/04/03/5ca471ec93167.png)

# 更新内容

## Chat Services
> 共chatra,tidio,daovoice三个选项，三选一

```swig config.swig
# Chatra Support
# See: https://chatra.io
# Dashboard: https://app.chatra.io/settings/general
chatra:
  enable: false
  async: true
  id: # visit Dashboard to get your ChatraID
  #embed: # unfinished experimental feature for developers, See: https://chatra.io/help/api/#injectto

# Tidio Support
# See: https://www.tidiochat.com
# Dashboard: https://www.tidiochat.com/panel/dashboard
tidio:
  enable: false
  key: # Public Key, get it from Dashboard, See: https://www.tidiochat.com/panel/settings/developer

#在线客服
daovoice: true
daovoice_app_id: xxxx   # http://www.daovoice.io/
```

## pdf和Mermaid解析模块
[pdf传送门](https://lruihao.cn/hexo/next-pdf.html)
```swig config.swig
pdf:
  enable: false
  # Default height
  height: 500px
  pdfobject:
    cdn: //cdn.jsdelivr.net/npm/pdfobject@2/pdfobject.min.js
    #cdn: //cdnjs.cloudflare.com/ajax/libs/pdfobject/2.1.1/pdfobject.min.js

# Mermaid tag
mermaid:
  enable: false
  # Available themes: default | dark | forest | neutral
  theme: forest
  cdn: //cdn.jsdelivr.net/npm/mermaid@8/dist/mermaid.min.js
  #cdn: //cdnjs.cloudflare.com/ajax/libs/mermaid/8.0.0/mermaid.min.js
```

## 模仿csdn转发样式
```diff post.swig主要修改
...
   <a class="post-title-link" href="{{ url_for(post.path) }}" itemprop="url">
+    {% if post.repost %}
+      <span class="repost">转</span>
+    {% endif %}
     {{ post.title | default(__('post.untitled'))}}
   </a>
 {% else -%}
+  {% if post.repost %}
+    <span class="repost">转</span>
+  {% endif %}
   {{- post.title -}}
...
```

```css css样式
.repost {
  color: #5acc79;
  border: 1px solid #e7f4df;
  border-radius: 20px;
  padding: 2px 5px;
  font-size: 15px;
  font-weight: 500;
}
```

```xml post使用
---
title: xxxx
repost: true
---
```
[预览](https://lruihao.cn/tags/他山之石/)


## 热度页面

> 打开`hexo\themes\next\layout`新建[top.swig](https://github.com/Lruihao/hexo-theme-next/blob/master/layout/top.swig)文件，写下如下内容保存：
其中第36行改成你自己的leancloud的appid和appkey,比如我的是在主题配置文件里面的valine配置下，所以我就写成`theme.valine.appid`。和我一样就不需要修改，其他自行配置。

然后`hexo n page top`新建一个页面文章配置写下如下内容，limit表示显示篇数：
```XMl top.md
---
title: 热度
layout: top
limit: 20
---
```
## 复制按钮样式

![lightbtn.png](https://i.loli.net/2019/03/21/5c939bb23853d.png)
![nightbtn.png](https://i.loli.net/2019/03/21/5c939bb229bad.png)
![flatbtn.png](https://i.loli.net/2019/03/21/5c939bb2385c5.png)
![3dbtn.png](https://i.loli.net/2019/03/21/5c939bb238db9.png)

> 本来只想简单美化一下变成night样式的，后来写完发现3dbtn也挺喜欢的。

```java config配置
codeblock:
  # Manual define the border radius in codeblock
  # Leave it empty for the default 1
  border_radius: 5
  # Add copy button on codeblock
  copy_button:
    enable: true
    # Show text copy result
    show_result: true
    # Style: 'light,night,flat,3dbtn' is currently available, leave it empty or light is default theme
    style: night
```
