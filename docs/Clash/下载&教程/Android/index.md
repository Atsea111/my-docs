---
sidebar_position: 2
hide_title: true
title: Android
sidebar_label: Android
slug: /Clash/下载&教程/Android
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Admonition from '@theme/Admonition';
import DownloadBadge from '../../../../download-badges.js';

### Android 客户端下载&教程

---
 ### 客户端下载
=== ":/img/CMFA-logo.svg: Clash Meta for Android"

    <h2><a><img height="25px" src="/img/CMFA-logo.svg"/> Clash Meta for Android 下载</a></h2>

    | 系统架构 | 代理加速下载1 | 代理加速下载2 | Github下载 |
    | --- | --- | --- | --- |
    | ARMv8大多机型 | <DownloadBadge id="CMFA-Arm64-v8a-r2" /> | <DownloadBadge id="CMFA-Arm64-v8a-quark" /> | <DownloadBadge id="CMFA-Arm64-v8a-github" /> |
    | ARMv7老旧机型 | <DownloadBadge id="CMFA-Arm64-v7a-r2" /> | <DownloadBadge id="CMFA-Arm64-v7a-quark" /> | <DownloadBadge id="CMFA-Arm64-v7a-github" /> |

    :::tip[如果Github直连太慢的话可以尝试`代理加速下载`]

    代理加速下载：通过CF存储桶`代理加速`，`GitHub直连下载`国内无代理环境下载**不太稳定** .

    :::
    :::info

    * 与Github仓库可能存在**延迟**更新，如果想体验**最新的版本**，可以访问·[Github官方仓库↗](https://github.com/MetaCubeX/ClashMetaForAndroid/releases)
    * 如果上面下载列表中没有您**CUP架构的版本**，可以访问他们·[Github官方仓库↗](https://github.com/MetaCubeX/ClashMetaForAndroid/releases)

    :::
    ---
    ## 安装与使用教程

    <Admonition type="info" title=" 新手必读 · 开始前请准备好订阅链接">

    * Clash Meta for Android 是代理工具「客户端」，本身不提供节点。
    * 开始配置前，需要配合服务商后提供的 **订阅链接**，才能正常代理境外网络。
    * 如果还没有订阅，可以查看本站的 [订阅推荐](/docs/Clash/订阅推荐)。

    </Admonition>

    ### 1. 安装应用

    1. 下载与手机架构对应的 APK 文件，然后点击安装。
    2. 如果系统提示禁止安装未知应用，请进入当前浏览器或文件管理器的权限设置，临时允许安装。
    3. 安装完成后打开 **Clash Meta for Android**；通知权限可以按需授予，VPN 连接权限会在首次启动代理时申请。

    :::note[系统要求]

    官方要求 Android 5.0 及以上，推荐 Android 7.0 或更高版本。HarmonyOS 4 及以下通常仍可安装安卓 APK；HarmonyOS NEXT 不兼容安卓 APK，需要改用原生鸿蒙客户端。

    :::

    ### 2. 获取订阅链接

    登录订阅服务商/机场的网站，在仪表盘或订阅详情页面找到 **Clash 订阅**/**Mihomo 订阅**或“一键订阅”，然后复制订阅地址，良心云为例。
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem'}}>
      <img
        src="https://files.seeusercontent.com/2026/08/12/5gfQ/0cf79ca5-de7e-4ec1-bcaa-a5c24ce0.png"
        alt="进入 Clash Meta 配置页面"
        loading="lazy"
        style={{width: '100%', maxWidth: '800px', height: 'auto'}}
      />
    </div>


    :::warning[不要公开订阅链接]

    订阅地址通常包含个人凭证，请勿将它发送到公开群聊、论坛或截图中。链接一旦泄露，应立即在服务商后台重置。

    :::

    ### 3. 导入订阅配置

    1. 打开客户端，点击主界面的 **配置（Profiles）**。
    2. 点击右上角的 **加号**，选择 **从 URL 导入**。
    3. 在“名称”中填写便于识别的名称，例如“我的订阅”。
    4. 将复制的订阅地址粘贴到 URL 输入框，然后点击右上角的保存按钮。
    5. 等待配置下载完成，再点击刚添加的配置。圆形标记亮起，表示它已经被选中。

    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem'}}>
      <img
        src={require('./1-CMFA.png').default}
        alt="进入 Clash Meta 配置页面"
        loading="lazy"
        style={{width: '100%', maxWidth: '800px', height: 'auto'}}
      />
    </div>


    ### 4. 选择节点和代理模式

    进入 **代理（Proxies）** 页面，找到主要策略组：

    1. 点击延迟测试按钮，等待节点显示延迟。
    2. 选择一个延迟正常的节点，或者选择服务商提供的“自动选择”策略。
    3. 新手建议使用 **规则（Rule）** 模式，让配置文件按照访问目标自动决定直连或代理。

    <Admonition type="tip" title="常见代理模式">

    - **规则（Rule）**：按照配置规则分流，适合日常使用。
    - **全局（Global）**：大部分流量都使用当前节点，适合临时测试。
    - **直连（Direct）**：所有流量直接连接，不经过代理。

    </Admonition>

    ### 5. 启动代理

    1. 返回应用首页，点击顶部的 **已停止**。
    2. 首次启动时，Android 会弹出 VPN 连接请求，请选择 **确定/允许**。
    3. 首页状态变为 **运行中**，系统状态栏出现钥匙或 VPN 图标后，代理服务即已启动。
    4. 打开浏览器访问目标网站，检查连接是否正常。

    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem'}}>
      <img
        src={require('./2-CFMA.png').default}
        alt="点击已停止以启动 Clash Meta 代理"
        loading="lazy"
        style={{width: '100%', maxWidth: '800px', height: 'auto'}}
      />
    </div>
    :::info

    切换节点时通常不必关闭代理。选择新节点后等待几秒，再重新加载网页即可；如果连接没有恢复，可以停止服务后重新启动。

    :::
    

    ### 6. 更新订阅

    服务商增加节点或修改配置后，需要手动同步：

    1. 进入 **配置（Profiles）**。
    2. 找到正在使用的配置，打开右侧菜单并选择 **更新**。
    3. 更新完成后确认配置仍处于选中状态，再回到代理页面选择节点。

    若更新失败，请检查套餐是否过期、流量是否耗尽以及订阅地址是否完整。必要时从服务商后台重新复制地址并再次导入。

    ### 7. 可选：设置分应用代理

    如果只想让部分应用使用代理，可进入 **设置 → 网络 → 访问控制（Access Control）**：

    1. 开启访问控制。
    2. 选择“仅允许已选择的应用”一类的白名单模式。
    3. 勾选需要代理的应用，保存后重新启动代理服务。

    不同手机系统的名称可能略有差异。若应用列表不完整，请为 Clash Meta 授予“获取应用列表”权限，并检查列表筛选是否隐藏了系统应用。

    --- 
    ## 常见问题 FAQ

    ### 安装时提示“解析软件包失败

    请确认 APK 已完整下载，并检查 Android 版本和 CPU 架构是否匹配。无法判断架构时，可以从官方发布页选择 Universal 通用安装包。

    ### 订阅无法导入或导入后没有节点

    确认复制的是 Clash / Mihomo 格式的订阅地址，而不是服务商首页、通用分享链接或其他客户端专用链接。仍无法使用时，请在服务商后台重新生成 Clash 订阅。

    ### 显示运行中，但网页无法打开

    依次尝试更新订阅、更换节点、切换回规则模式并重启服务。如果所有节点都无法连接，请检查套餐状态或联系订阅服务商。

    ### 锁屏后容易断开

    在系统设置中关闭 Clash Meta 的电池优化，并允许后台运行和自启动。小米、华为、OPPO、vivo 等系统可能还需要在手机管家中单独放行。

    :::info[参考资料]

    - [Clash Meta for Android 官方仓库](https://github.com/MetaCubeX/ClashMetaForAndroid)

    :::

=== "其他（待添加）"
