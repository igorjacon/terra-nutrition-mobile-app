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

  // Set a key/value
  public async set(key: string, value: any): Promise<void> {
    await this.storage.set(key, value);
  }

  // Store a key/value (with encryption)
  public async store(key: string, data: any): Promise<void> {
    const encryptedData = btoa(escape(JSON.stringify(data)));
    await this.storage.set(key, encryptedData);
  }

  // Get a key/value pair (with decryption if applicable)
  public async get(key: string): Promise<any> {
    const res = await this.storage.get(key);
    if (res) {
      try {
        return JSON.parse(unescape(atob(res)));
      } catch (e) {
        // If parsing fails, return the raw value
        return res;
      }
    } else {
      return null;
    }
  }

  // Remove a single key value
  public async remove(key: string): Promise<void> {
    await this.storage.remove(key);
  }

  // // Remove a single key value (alias for remove)
  async removeItem(key: string) {
    await this.storage.remove(key);
  }

  // Clear all key/values
  async clear() {
    await this.storage.clear();
  }
}
