import React, {useEffect, useRef, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {mergeSearchStrings, useHistorySelector} from '@docusaurus/theme-common';
import {useAlternatePageUtils} from '@docusaurus/theme-common/internal';
import type {Props} from '@theme/NavbarItem/LocaleDropdownNavbarItem';

import styles from './styles.module.css';

type LocaleMeta = {
  flag: string;
  shortLabel: string;
  label: string;
};

const LOCALE_META: Record<string, LocaleMeta> = {
  en: {
    flag: '🇬🇧',
    shortLabel: 'EN',
    label: 'English',
  },
  vi: {
    flag: '🇻🇳',
    shortLabel: 'VI',
    label: 'Tiếng Việt',
  },
  'zh-Hans': {
    flag: '🇨🇳',
    shortLabel: '中文',
    label: '简体中文',
  },
};

function persistLocalePreference(locale: string) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('microbe-docs-locale', locale);
  }
}

function GlobeIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function CaretIcon() {
  return (
    <svg
      className={styles.caret}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className={styles.check}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true">
      <path d="m20 6-11 11-5-5" />
    </svg>
  );
}

function useLocaleDropdownUtils() {
  const {
    siteConfig,
    i18n: {localeConfigs},
  } = useDocusaurusContext();
  const alternatePageUtils = useAlternatePageUtils();
  const search = useHistorySelector((history) => history.location.search);
  const hash = useHistorySelector((history) => history.location.hash);

  const getLocaleConfig = (locale: string) => {
    const localeConfig = localeConfigs[locale];
    if (!localeConfig) {
      throw new Error(`No locale config found for locale=${locale}`);
    }
    return localeConfig;
  };

  const getBaseURLForLocale = (locale: string) => {
    const localeConfig = getLocaleConfig(locale);
    if (localeConfig.url === siteConfig.url) {
      return `pathname://${alternatePageUtils.createUrl({
        locale,
        fullyQualified: false,
      })}`;
    }
    return alternatePageUtils.createUrl({
      locale,
      fullyQualified: true,
    });
  };

  return {
    getURL: (locale: string, options: {queryString: string | undefined}) => {
      const finalSearch = mergeSearchStrings(
        [search, options.queryString],
        'append',
      );
      return `${getBaseURLForLocale(locale)}${finalSearch}${hash}`;
    },
    getLabel: (locale: string) => {
      return LOCALE_META[locale]?.label ?? getLocaleConfig(locale).label;
    },
  };
}

export default function LocaleDropdownNavbarItem({
  mobile = false,
  queryString,
}: Props): ReactNode {
  const utils = useLocaleDropdownUtils();
  const {
    i18n: {currentLocale, locales},
  } = useDocusaurusContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentMeta = LOCALE_META[currentLocale] ?? {
    flag: '',
    shortLabel: currentLocale.toUpperCase(),
    label: utils.getLabel(currentLocale),
  };

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (mobile) {
    return (
      <li className="menu__list-item">
        <span className={`menu__link ${styles.mobileTitle}`}>Language</span>
        <ul className="menu__list">
          {locales.map((locale) => {
            const meta = LOCALE_META[locale] ?? {
              flag: '',
              shortLabel: locale.toUpperCase(),
              label: utils.getLabel(locale),
            };
            const isActive = locale === currentLocale;
            return (
              <li className="menu__list-item" key={locale}>
                <Link
                  className={`menu__link ${styles.mobileLocale} ${
                    isActive ? 'menu__link--active' : ''
                  }`}
                  lang={locale}
                  to={utils.getURL(locale, {queryString})}
                  target="_self"
                  autoAddBaseUrl={false}
                  onClick={() => persistLocalePreference(locale)}>
                  <span className={styles.flag}>{meta.flag}</span>
                  <span>{meta.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </li>
    );
  }

  return (
    <div
      className={`navbar__item dropdown dropdown--right ${styles.localeDropdown}`}
      ref={dropdownRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Language"
        onClick={() => setIsOpen((open) => !open)}>
        <GlobeIcon />
        <span className={styles.shortLabel}>{currentMeta.shortLabel}</span>
        <CaretIcon />
      </button>
      <div className={`dropdown__menu ${styles.menu} ${isOpen ? styles.menuOpen : ''}`}>
        <div className={styles.menuTitle}>Language</div>
        <div className={styles.divider} />
        {locales.map((locale) => {
          const meta = LOCALE_META[locale] ?? {
            flag: '',
            shortLabel: locale.toUpperCase(),
            label: utils.getLabel(locale),
          };
          const isActive = locale === currentLocale;
          return (
            <Link
              key={locale}
              className={`dropdown__link ${styles.localeLink} ${
                isActive ? `dropdown__link--active ${styles.localeLinkActive}` : ''
              }`}
              lang={locale}
              to={utils.getURL(locale, {queryString})}
              target="_self"
              autoAddBaseUrl={false}
              onClick={() => {
                persistLocalePreference(locale);
                setIsOpen(false);
              }}>
              <span className={styles.flag}>{meta.flag}</span>
              <span className={styles.localeName}>{meta.label}</span>
              {isActive && <CheckIcon />}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
