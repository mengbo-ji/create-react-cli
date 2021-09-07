
declare global {
  interface Window {
    [key: string]: any
  }
}

export interface IBreadCrumbItem {
  key: string;
  value: string;
  path: string;
  params?: { [key: string]: string | undefined | null | number }
}

