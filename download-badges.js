import React from 'react';

const badges = {
  //Clash.Verge 英特尔 芯片
  'ClashVerge-MacOS-Intel-r2': {
    href: '/d/ClashVerge-MacOS-Intel',
    src: 'https://img.shields.io/badge/Dmg-v2.5.2-8BB2E5?logo=apple&logoColor=white',
    alt: '安装包 Intel芯片',
    newTab: true,
  },
  'ClashVerge-MacOS-Intel-github': {
    href: 'https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.5.2/Clash.Verge_2.5.2_x64.dmg',
    src: 'https://img.shields.io/badge/github-v2.5.2-8BB2E5?logo=github',
    alt: '安装包 Intel芯片',
  },
  //Clash.Verge M 芯片
  'ClashVerge-MacOS-m-r2': {
    href: '/d/ClashVerge-MacOS-m',
    src: 'https://img.shields.io/badge/Dmg-v2.5.2-0078D7?logo=apple&logoColor=white',
    alt: 'Apple M 芯片',
    newTab: true,
  },
  'ClashVerge-MacOS-m-github': {
    href: 'https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.5.2/Clash.Verge_2.5.2_aarch64.dmg',
    src: 'https://img.shields.io/badge/github-v2.5.2-0078D7?logo=github',
    alt: 'Apple M 芯片',
  },
  //Clash.Verge windows-x64安装包
  'ClashVerge-x64-setup-r2': {
    href: '/d/ClashVerge-x64-setup',
    src: 'https://img.shields.io/badge/安装包-v2.5.2-0078D7',
    alt: '安装包 x64',
    newTab: true,
  },
  'ClashVerge-x64-setup-github': {
    href: 'https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.5.2/Clash.Verge_2.5.2_x64-setup.exe',
    src: 'https://img.shields.io/badge/github-v2.5.2-0078D7?logo=github',
    alt: '安装包 x64',
  },
  //Clash.Verge windows-arm架构安装包
  'ClashVerge-Arm64-setup-r2': {
    href: '/d/ClashVerge-Arm64-setup',
    src: 'https://img.shields.io/badge/安装包-v2.5.2-8BB2E5',
    alt: '安装包 arm64',
    newTab: true,
  },
  'ClashVerge-Arm64-setup-github': {
    href: 'https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.5.2/Clash.Verge_2.5.2_arm64-setup.exe',
    src: 'https://img.shields.io/badge/github-v2.5.2-8BB2E5?logo=github',
    alt: '安装包 x64',
  },
  //------------Clash Meta for Android--------------
  //Clash Meta for Android ARMv8
  'CMFA-Arm64-v8a-r2': {
    href: '/d/cmfa-arm64-v8a',
    src: 'https://img.shields.io/badge/APK-v2.11.33-3DDC84?logo=android&logoColor=3DDC84',
    alt: '安装包 arm64',
    newTab: true,
  },
  'CMFA-Arm64-v8a-github': {
    href: 'https://github.com/MetaCubeX/ClashMetaForAndroid/releases/download/v2.11.33/cmfa-2.11.33-meta-arm64-v8a-release.apk',
    src: 'https://img.shields.io/badge/github-v2.11.33-3DDC84?logo=github',
    alt: '安装包 x64',
  },

  //Clash Meta for Android ARMv7
  'CMFA-Arm64-v7a-r2': {
    href: '/d/cmfa-arm64-v7a',
    src: 'https://img.shields.io/badge/APK-v2.11.33-ACFAD1?logo=android&logoColor=3DDC84',
    alt: '安装包 arm64',
    newTab: true,
  },
  'CMFA-Arm64-v7a-github': {
    href: 'https://github.com/MetaCubeX/ClashMetaForAndroid/releases/download/v2.11.33/cmfa-2.11.33-meta-armeabi-v7a-release.apk',
    src: 'https://img.shields.io/badge/github-v2.11.33-ACFAD1?logo=github',
    alt: '安装包 x64',
  },

};

export default function DownloadBadge({ id }) {
  const badge = badges[id];

  if (!badge) {
    throw new Error(`未知的下载徽章 ID：${id}`);
  }

  return (
    <a
      href={badge.href}
      target={badge.newTab ? '_blank' : undefined}
      rel={badge.newTab ? 'noopener' : undefined}
      referrerPolicy={badge.newTab ? 'origin' : undefined}>
      <img src={badge.src} alt={badge.alt} />
    </a>
  );
}
