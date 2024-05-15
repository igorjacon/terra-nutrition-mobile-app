import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: Storage) {
    this.init();
  }

  async init(){
    const storage = await this.storage.create();
  }

  async store(key: string, data: any) {
    const encryptedData = btoa(escape(JSON.stringify(data)));
    await this.storage.set(key, encryptedData);
  }

  async get(key: string) {
    const res = await this.storage.get(key);
    if (res) {
      return JSON.parse(unescape(atob(res)));
    } else {
      return false;
    }
  }

  async removeItem(key: string) {
    await this.storage.remove(key);
  }

  async clear() {
    await this.storage.clear();
  }
}
