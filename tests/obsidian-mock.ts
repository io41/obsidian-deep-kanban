export class TFile {
  path: string;
  basename: string;

  constructor(path: string) {
    this.path = path;
    const filename = path.split('/').pop() ?? path;
    this.basename = filename.replace(/\.md$/, '');
  }
}

export class TFolder {
  path: string;

  constructor(path: string) {
    this.path = path;
  }
}

export class App {
  vault: any;
  metadataCache: any;

  constructor(vault: any) {
    this.vault = vault;
    this.metadataCache = null;
  }
}

export class Modal {}
export class Setting {}
export class Vault {}
