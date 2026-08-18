---
sidebar_position: 1
hide_title: true
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Admonition from '@theme/Admonition';
import DownloadBadge from '../../../download-badges.js';

### Windows 客户端下载&教程

---
 ### 客户端下载
=== ":/img/Clash-Verge-Rev-logo.svg: Clash Verge Rev"

    <h2><a><img height="25px" src="https://cdn.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev@dev/src-tauri/icons/icon.png"/> Clash Verge Rev 下载</a></h2>

    | 系统架构 | 代理加速下载1 | 代理加速下载2 | Github官方下载 |
    | --- | --- | --- | --- |
    | x64 | <DownloadBadge id="ClashVerge-x64-setup-r2" /> | <DownloadBadge id="ClashVerge-x64-setup-quark" /> | <DownloadBadge id="ClashVerge-x64-setup-github" /> |
    | arm64 | <DownloadBadge id="ClashVerge-Arm64-setup-r2" /> | <DownloadBadge id="ClashVerge-Arm64-setup-quark" /> | <DownloadBadge id="ClashVerge-Arm64-setup-github" /> |

    :::tip[如果Github直连太慢的话可以尝试`代理加速下载`]

    代理加速下载：通过CF存储桶`代理加速`，`GitHub直连下载`国内无代理环境下载**不太稳定** .

    :::
    :::info

    * 与Github仓库可能存在**延迟**更新，如果想体验**最新的版本**，可以访问·[Github官方仓库↗](https://github.com/clash-verge-rev/clash-verge-rev/releases)
    * 如果上面下载列表中没有您**CUP架构的版本**，可以访问他们·[Github官方仓库↗](https://github.com/clash-verge-rev/clash-verge-rev/releases)

    :::
    ---
     ## 安装与使用教程

    <Admonition type="info" title=" 新手必读 · 开始前请准备好订阅链接">

    * Clash Verge Rev 是代理工具「客户端」，本身不提供节点。
    * 开始配置前，需要配合服务商后提供的 **订阅链接**，才能正常代理境外网络。
    * 如果还没有订阅，可以查看本站的 [订阅推荐](/docs/Clash/订阅推荐)。

    </Admonition>

    ### 安装应用

    1. 双击下载好的安装包，按提示完成安装。
    2. 如果 Windows 弹出安全提醒，请先确认安装包来自上面的官方仓库，再选择继续运行。
    3. 安装完成后打开 Clash Verge Rev，看到主界面就可以继续配置。

    ### 1.复制订阅
    ##### 通过机场或者自建订阅导入节点和配置文件，以下以"良心云"订阅演示：
    ![复制订阅](https://files.seeusercontent.com/2026/08/12/5gfQ/0cf79ca5-de7e-4ec1-bcaa-a5c24ce0.png)

    复制时要选择 **Clash / Mihomo 订阅地址**。不要复制浏览器地址栏里的网站网址。

    ### 2.导入订阅
    ![verge_import](https://cdn.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/guide/quickstart/verge_import.png)

    将订阅链接粘贴到输入框并点击导入。导入成功后，页面中会出现刚刚添加的订阅。

    ### 3.选择节点和模式
    ![verge_proxy](https://cdn.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/guide/quickstart/verge_proxy.png)

    新手选择 **规则模式** 即可。可以先测试延迟，再选一个数字较小、能够正常使用的节点。

    ### 4.打开代理(或开启 Tun 模式)
    ![verge_enable_sysproxy](https://cdn.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/guide/quickstart/verge_enable_sysproxy.png)

    平时浏览网页只需开启 **系统代理**。如果某些软件或游戏仍然无法连接，再尝试开启 **Tun 模式**；首次开启时请允许系统弹出的权限请求。

    <Admonition type="tip" icon="" title="代理模式">
    系统代理：（原理：通过上方开关自动修改操作系统的代理设置）能处理大部分通过浏览器的科学上网需求。

    Tun 模式：(使用前请确保你已阅读相关教程)在系统中安装虚拟网卡，以接管不支持“系统代理”的程序（例如游戏和命令行）。
    </Admonition>

    ---

    ## 常见问题 FAQ

    ### 导入订阅后没有节点怎么办？

    先确认复制的是 Clash / Mihomo 订阅地址，然后重新导入。如果仍然没有节点，请到服务商后台重新生成订阅链接。

    ### 已经打开系统代理，网页还是打不开？

    先更换一个节点，再确认选择的是规则模式。也可以关闭系统代理后重新打开一次。

    ### 订阅更新失败怎么办？

    检查订阅是否过期、流量是否用完。如果订阅正常，重新复制链接并导入即可。或检查是否开启了无效代理，请关闭代理再次尝试更新！

    ### 浏览器能用，但游戏或其他软件不能用？

    这类软件可能不跟随系统代理，可以尝试开启 Tun 模式。首次开启时需要同意管理员权限。

    ### 关闭软件后电脑突然无法上网？

    重新打开 Clash Verge Rev，先开启再关闭一次系统代理。如果仍未恢复，请到 Windows 设置中关闭手动代理。

=== "其他（待添加）"