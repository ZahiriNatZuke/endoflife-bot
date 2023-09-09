export interface AllDetailsObj {
  cycle: string;
  codename?: string;
  eol: string | boolean;
  latest: string;
  latestReleaseDate: string;
  lts: boolean | string;
  releaseDate: string;
  support: string;
  extendedSupport?: boolean;
  discontinued?: string | boolean;
}
