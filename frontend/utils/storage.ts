import { DEFAULT_SERVICES, DEFAULT_MESSAGES, DEFAULT_SETTINGS } from '../data/defaults';
import { Service, Message, SiteSettings } from '../context/types'; // We will define types in a central place or import

// Keys
const KEYS = {
  SERVICES: 'etmaam_db_services',
  MESSAGES: 'etmaam_db_messages',
  SETTINGS: 'etmaam_db_settings'
};

// Database Layer Class
class DB {
  // --- Generic Helpers ---
  private static get<T>(key: string, defaultValue: T): T {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error(`Error reading ${key} from DB`, e);
      return defaultValue;
    }
  }

  private static set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error writing ${key} to DB`, e);
    }
  }

  // --- Services Operations ---
  static getServices(): any[] {
    return this.get(KEYS.SERVICES, DEFAULT_SERVICES);
  }

  static saveServices(services: any[]): void {
    this.set(KEYS.SERVICES, services);
  }

  // --- CRM Operations ---
  static getMessages(): any[] {
    return this.get(KEYS.MESSAGES, DEFAULT_MESSAGES);
  }

  static saveMessages(messages: any[]): void {
    this.set(KEYS.MESSAGES, messages);
  }

  // --- Settings Operations ---
  static getSettings(): any {
    return this.get(KEYS.SETTINGS, DEFAULT_SETTINGS);
  }

  static saveSettings(settings: any): void {
    this.set(KEYS.SETTINGS, settings);
  }

  // --- Factory Reset ---
  static factoryReset(): void {
    localStorage.removeItem(KEYS.SERVICES);
    localStorage.removeItem(KEYS.MESSAGES);
    localStorage.removeItem(KEYS.SETTINGS);
    // Reload to apply changes
    window.location.reload();
  }
}

export default DB;
