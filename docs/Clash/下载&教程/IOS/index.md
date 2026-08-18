---
sidebar_position: 3
hide_title: true
title: IOS/iPad
sidebar_label: IOS/iPad
slug: /Clash/下载&教程/IOS
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Admonition from '@theme/Admonition';
import DownloadBadge from '../../../../download-badges.js';

### IOS/iPad 客户端下载&教程

---
 ### 客户端下载
=== ":/img/shadowrocket-icon-round.svg: Showadrocket"

    <h2><a><img height="25px" src="/img/shadowrocket-icon-round.svg"/> Showadrocket 下载</a></h2>

    | 系统架构 | 下载地址 | 
    | --- | --- |
    | iOS/ipadOS | [![前往App Store下载↗](https://img.shields.io/badge/前往AppStore下载-BDBDBD?logo=apple&logoColor=white)](https://apps.apple.com/us/app/showadrecket/id932747118)| 

    :::info

    在**国内 App Store 无法搜索到**，您需要准备国外 Apple ID 账号购买使用权（$2.99）。**可淘宝购买**，或自行注册美区账号购买。建议直接购买已购账号更便捷，也可参考[**Apple ID 注册教程**](/docs/Clash/常见问题FAQ/外区%20Apple%20ID%20注册教程（2026）) 自行注册。
    :::

    :::
    ---
    ## 安装与使用教程

    <Admonition type="info" title="新手必看 · 开始前请准备好订阅链接">

    * Shadowrocket（小火箭）只是代理工具「客户端」，本身不提供节点。
    * 配置前，请先从服务商/机场网站复制 **Shadowrocket 一键订阅**或兼容的订阅链接；
    * 如果还没有订阅，可以查看本站的 [订阅推荐](/docs/Clash/订阅推荐)。

    </Admonition>

    ### 1. 安装应用

    1. 使用已经购买 Shadowrocket 的外区 Apple ID 登录 App Store。
    2. 搜索并安装 **Shadowrocket**，安装完成后即可切回自己的 Apple ID，通常不会影响已经安装的应用。
    3. 建议保留购买所用账号，以便以后更新或重新下载。

    :::tip[找不到应用怎么办？]

    * 中国大陆区 App Store 通常无法搜索到 Shadowrocket。
    * 请确认 App Store 当前登录的是除「中国大陆区」以外的地区账号，而不只是 iCloud 登录了外区账号。

    :::

    ### 2. 导入订阅

    推荐优先使用服务商提供的“一键导入 Shadowrocket”；如果没有一键导入按钮，也可以手动添加。

    **方法一：一键导入**

    1. 使用 Safari 登录服务商后台，找到“一键订阅”。
    2. 选择 **导入 Shadowrocket**。
    3. 系统询问是否打开 Shadowrocket 时选择允许。
    4. 回到应用，确认订阅已经出现在节点列表中。

    **方法二：手动添加订阅地址**

    1. 复制服务商提供的 Shadowrocket 订阅链接。
    2. 打开 Shadowrocket，点击右上角的 **加号**。
    3. 将类型选择为 **Subscribe（订阅）**。
    4. 在 URL 中粘贴订阅地址，并填写一个容易识别的备注。
    5. 点击右上角的 **完成**，等待节点列表加载。

    :::warning[保护订阅链接]

    订阅地址通常包含个人凭证，不要把它发布到公开群聊、论坛或截图中。如果链接已经泄露，请及时到服务商后台重置。

    :::

    ### 3. 选择节点

    1. 在首页节点列表中选择一个节点。
    2. 可以先运行连通性或延迟测试，再选择响应正常的节点。
    3. 如果订阅提供“自动选择”或“故障转移”策略，也可以优先使用这些策略。

    延迟只代表节点响应时间，不完全等于实际下载速度。某个节点无法使用时，先换一个节点测试，不必立即删除整个订阅。

    ### 4. 开启代理

    1. 打开首页顶部的连接开关。
    2. 首次连接时，iOS 会请求添加 VPN 配置，点击 **允许**，并根据提示输入锁屏密码或完成 Face ID / Touch ID 验证。
    3. 顶部状态变为“已连接”，并且系统状态栏或控制中心显示 VPN 标志后，即表示代理已经启动。
    4. 打开浏览器访问目标网站，确认连接是否正常。

    <div style={{display: 'flex', justifyContent: 'flex-start'}}>
      <img
        src={require('./install2.webp').default}
        alt="Shadowrocket 连接开关与节点列表界面"
        loading="lazy"
        style={{width: '100%', maxWidth: '320px', height: 'auto'}}
      />
    </div>

    ### 5. 选择路由模式

    日常使用建议将 **全局路由**设置为 **配置（Config）**，由订阅规则决定哪些连接直连、哪些连接使用代理。

    - **配置（Config）**：按照配置文件规则分流，推荐日常使用。
    - **代理（Proxy）**：大部分流量使用当前代理节点，适合临时测试。
    - **直连（Direct）**：所有流量直接连接，不经过代理。

    全局代理可能使国内应用也经过节点，增加延迟并消耗订阅流量，因此不建议长期启用。

    ### 6. 更新订阅

    服务商添加节点或修改配置后，需要同步订阅：

    1. 回到 Shadowrocket 首页。
    2. 找到订阅分组，使用订阅更新或刷新功能。
    3. 更新完成后重新选择节点，再测试连接。

    如果更新失败，请检查订阅是否过期、流量是否耗尽以及链接是否完整。必要时从服务商后台重新复制链接并再次导入。

    ## 常见问题

    **开启开关后仍然无法访问**

    先更换节点，再检查全局路由是否为配置模式。如果所有节点都不可用，请更新订阅并确认套餐状态。

    **提示无法安装 VPN 配置**

    进入 iOS 的 **设置 → 通用 → VPN 与设备管理 → VPN**，删除失效或重复的旧配置后，返回 Shadowrocket 重新授权。若设备受企业或学校管理，请联系设备管理员。

    **订阅导入后没有节点**

    确认复制的是 Shadowrocket 支持的订阅链接，而不是服务商首页地址。也可以回到服务商后台使用专门的 Shadowrocket 一键订阅入口。

    **更换 Apple ID 后无法更新**

    App Store 应用通常需要使用最初购买它的 Apple ID 更新。重新登录购买账号完成更新后，再切回自己的账号即可。

    :::info[参考资料]

    - [Shadowrocket App Store 页面](https://apps.apple.com/us/app/shadowrocket/id932747118)

    :::

=== "其他（待添加）"