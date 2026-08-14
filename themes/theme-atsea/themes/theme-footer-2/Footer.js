import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useThemeConfig} from '@docusaurus/theme-common';
import FooterCopyright from '@theme/Footer/Copyright';

// 社交图标：复制一个完整对象，然后修改 label、href 和 icon 即可继续添加。
const socialLinks = [
  {
    label: 'GitHub 1',
    href: 'https://github.com/Atsea111',
    icon: 'icon-github2',
  },
  {
    label: 'GitHub 2',
    href: 'https://github.com/Atsea111',
    icon: 'icon-github2',
  },
];

function flattenFooterItems(links = []) {
  return links.flatMap((group) =>
    Array.isArray(group.items) ? group.items : [group],
  );
}

function Footer2() {
  const {siteConfig} = useDocusaurusContext();
  const {footer} = useThemeConfig();
  const faviconUrl = useBaseUrl(siteConfig.favicon || '');

  if (!footer) {
    return null;
  }

  const items = flattenFooterItems(footer.links);

  return (
    <footer
      className={clsx('footer', 'footer--footer-2', {
        'footer--dark': footer.style === 'dark',
      })}>
      <div className="footer2__container">
        <div className="footer2__left">
          <div className="footer2__brand">
            {faviconUrl && (
              <img
                className="footer2__favicon"
                src={faviconUrl}
                alt=""
                aria-hidden="true"
              />
            )}
            <span className="footer2__site-title">{siteConfig.title}</span>
          </div>

          {items.length > 0 && (
            <nav className="footer2__nav" aria-label="Footer navigation">
              {items.map((item, index) => (
                <Link
                  key={`${item.href ?? item.to ?? item.label}-${index}`}
                  className="footer2__nav-link"
                  {...(item.href ? {href: item.href} : {to: item.to})}>
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>

        <div className="footer2__right">
          {socialLinks.length > 0 && (
            <div className="footer2__socials" aria-label="Social links">
              {socialLinks.map((social, index) => (
                <Link
                  key={`${social.href}-${index}`}
                  className="footer2__social-link"
                  href={social.href}
                  aria-label={social.label}
                  title={social.label}
                  target="_blank"
                  rel="noopener noreferrer">
                  <i
                    className={clsx(
                      'iconfont',
                      social.icon,
                      'footer2__social-icon',
                    )}
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          )}

          {footer.copyright && (
            <div className="footer2__copyright">
              <FooterCopyright copyright={footer.copyright} />
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer2);
