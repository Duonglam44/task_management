export default class StorageService {
  /* tslint:disable-next-line */
  constructor() {}

  /* tslint:disable-next-line */
  private static _instance: StorageService

  public static getInstance(): StorageService {
    if (!this._instance) {
      this._instance = new StorageService()
    }

    return this._instance
  }

  public addItem(key: string, item: string) {
    localStorage.setItem(key, item);
  }

  public getItem(key: string) {
    return localStorage.getItem(key);
  }

  public removeItem(key: string) {
    localStorage.removeItem(key);
  }

  public clearAllItem() {
    localStorage.clear();
  }
}
