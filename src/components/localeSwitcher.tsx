'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const locales = ['en', 'es'];

  return (
    <div>
      {locales.map((locale) => (
        <Link
          key={locale}
          href={pathname.replace(/^\/[a-z]{2}/, `/${locale}`) || `/${locale}`}
          style={{ marginRight: '10px' }}
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}