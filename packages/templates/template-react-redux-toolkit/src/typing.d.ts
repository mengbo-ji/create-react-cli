import { Dispatch, SetStateAction } from 'react';
declare module 'react-intl' {
  interface ResolvedIntlConfig {
    setLocale?: Dispatch<SetStateAction<string>>
  }
  interface IntlShape {
    setLocale?: any
  }
}
declare module 'react-intl-universal' {
  interface ReactIntlUniversalOptions {
    setLocale?: any;
  }
}

declare module '*.css';
declare module '*.less';
