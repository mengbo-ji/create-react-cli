
declare global {
  interface Window {
    [key: string]: any
  }
}

export interface IKey {
  [key: string]: any
}

export * from './common';
