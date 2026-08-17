---
sidebar_position: 4
hide_title: true
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Admonition from '@theme/Admonition';
import DownloadBadge from '../../../download-badges.js';

### MacOS 客户端下载&教程

---
 ### 客户端下载
=== "Clash Verge Rev"

    <h2><a><img height="25px" src="https://cdn.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev@dev/src-tauri/icons/icon.png"/> Clash Verge Rev 下载</a></h2>

    | 系统架构 | 代理加速下载 | Github官方下载 |
    | --- | --- | --- |
    | Apple M 芯片 | <DownloadBadge id="ClashVerge-MacOS-m-r2" /> | <DownloadBadge id="ClashVerge-MacOS-m-github" /> |
    | Intel 芯片 | <DownloadBadge id="ClashVerge-MacOS-Intel-r2" /> | <DownloadBadge id="ClashVerge-MacOS-Intel-github" /> |

    :::tip[如果Github直连太慢的话可以尝试`代理加速下载`]

    代理加速下载：通过CF存储桶`代理加速`，`GitHub直连下载`国内无代理环境下载**不太稳定** .

    :::
    :::info

    * 与Github仓库可能存在**延迟**更新，如果想体验**最新的版本**，可以访问·[Github官方仓库↗](https://github.com/clash-verge-rev/clash-verge-rev/releases)
    * 如果上面下载列表中没有您**CUP架构的版本**，可以访问他们·[Github官方仓库↗](https://github.com/clash-verge-rev/clash-verge-rev/releases)

    :::
    ---
    ## 安装与使用教程

    <Admonition type="info" title="新手必看 · 开始前请准备好订阅链接">

    * Clash Verge Rev 只是代理工具「客户端」，本身不提供节点。
    * 配置前，请先从服务商/机场网站复制 **复制订阅/一键订阅**或兼容的订阅链接；
    * 如果还没有订阅，可以查看本站的 [订阅推荐](/docs/Clash/订阅推荐)。

    </Admonition>
    ## 安装应用
    ![mac_install](https://cdn.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/guide/quickstart/mac_install.png)

    1. 打开下载好的安装包，将 Clash Verge Rev 拖入“应用程序”文件夹。
    2. 进入“应用程序”并打开软件。
    3. 如果 macOS 提示无法确认开发者，请进入 **系统设置 → 隐私与安全性**，确认软件来源无误后选择仍要打开。

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

    平时浏览网页只需开启 **系统代理**。如果某些软件仍然无法连接，再尝试开启 **Tun 模式**；macOS 要求输入密码时，请输入电脑的开机密码并允许操作。

    <Admonition type="tip" icon="" title="代理模式">
    系统代理：（原理：通过上方开关自动修改操作系统的代理设置）能处理大部分通过浏览器的科学上网需求。

    Tun 模式：(使用前请确保你已阅读相关教程)在系统中安装虚拟网卡，以接管不支持“系统代理”的程序（例如游戏和命令行）。
    </Admonition>

    ---

    ## 常见问题 FAQ

    ### 提示“无法打开”或“无法确认开发者”怎么办？

    先确认安装包来自官方仓库，再进入 **系统设置 → 隐私与安全性**，找到相关提示并选择仍要打开。

    ### 导入订阅后没有节点怎么办？

    检查复制的是不是 Clash / Mihomo 订阅地址。也可以回到服务商后台重新生成链接，再导入一次。

    ### 已经打开系统代理，网页还是打不开？

    先更换节点，再确认当前使用的是规则模式。关闭系统代理后重新开启一次，也能解决部分临时问题。

    ### 浏览器能用，但其他软件不能用？

    部分软件不会跟随系统代理，可以尝试开启 Tun 模式，并同意 macOS 的密码和网络权限提示。

    ### 订阅更新失败怎么办？

    检查订阅是否过期、流量是否用完。订阅正常但仍然失败时，重新复制链接并导入。或检查是否开启了无效代理，请关闭代理再次尝试更新！

    ### 退出软件后 Mac 无法上网怎么办？

    重新打开 Clash Verge Rev，开启后再关闭一次系统代理。如果仍未恢复，请到 macOS 网络设置中关闭代理。

=== "其他（待添加）"