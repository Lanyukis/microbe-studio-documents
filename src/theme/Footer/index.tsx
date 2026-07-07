import React from 'react';
import Link from '@docusaurus/Link';
import {useThemeConfig} from '@docusaurus/theme-common';

type FooterItem = {
  label: string;
  to?: string;
  href?: string;
};

type FooterColumnConfig = {
  title: string;
  items: FooterItem[];
};

function FooterLink({item}: {item: FooterItem}) {
  const linkProps = item.href ? {href: item.href} : {to: item.to};

  return (
    <li className="microbe-footer__item">
      <Link className="microbe-footer__link" {...linkProps}>
        {item.label}
      </Link>
    </li>
  );
}

function FooterColumn({column}: {column: FooterColumnConfig}) {
  return (
    <nav className="microbe-footer__column" aria-label={column.title}>
      <h2 className="microbe-footer__heading">{column.title}</h2>
      <ul className="microbe-footer__list">
        {column.items.map((item) => (
          <FooterLink key={item.label} item={item} />
        ))}
      </ul>
    </nav>
  );
}

export default function Footer(): JSX.Element | null {
  const {footer} = useThemeConfig();

  if (!footer) {
    return null;
  }

  return (
    <footer className="footer microbe-footer">
      <div className="container microbe-footer__inner">
        <div className="microbe-footer__top">
          <section className="microbe-footer__brand" aria-label="Microbe Studio">
            <Link className="microbe-footer__brand-link" to="/">
              <img className="microbe-footer__logo" src="/img/app-icon.ico" alt="" />
              <span>Microbe Studio</span>
            </Link>
            <p className="microbe-footer__description">
              Tự động hóa Android trực quan, chuyên nghiệp - xây dựng, cấp phép và phân
              phối trong một nơi.
            </p>
          </section>

          <div className="microbe-footer__columns">
            {(footer.links as FooterColumnConfig[] | undefined)?.map((column) => (
              <FooterColumn key={column.title} column={column} />
            ))}
          </div>
        </div>

        {footer.copyright ? (
          <div className="microbe-footer__bottom">
            <p className="microbe-footer__copyright">{footer.copyright}</p>
          </div>
        ) : null}
      </div>
    </footer>
  );
}
