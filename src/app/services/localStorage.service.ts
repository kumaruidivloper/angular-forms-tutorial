// localStorage.service.ts
import { Injectable } from '@angular/core';

export interface StorageItem {
  value: any;
  expiry: number;
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  
  /**
   * Store item in localStorage with expiration time
   * @param key Storage key
   * @param value Data to store
   * @param hours Hours until expiration (default: 1 hour)
   */
  setItem(key: string, value: any, hours: number = 1): void {
    try {
      const now = new Date();
      const expiryTime = now.getTime() + (hours * 60 * 60 * 1000); // Convert hours to milliseconds
      
      const item: StorageItem = {
        value: value,
        expiry: expiryTime
      };
      
      localStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }
  
  /**
   * Get item from localStorage and check if it's expired
   * @param key Storage key
   * @returns Stored value or null if expired/not found
   */
  getItem(key: string): any {
    try {
      const itemStr = localStorage.getItem(key);
      
      if (!itemStr) {
        return null;
      }
      
      const item: StorageItem = JSON.parse(itemStr);
      const now = new Date();
      
      // Check if item has expired
      if (now.getTime() > item.expiry) {
        // Item has expired, remove it
        this.removeItem(key);
        return null;
      }
      
      return item.value;
    } catch (error) {
      console.error('Error getting from localStorage:', error);
      return null;
    }
  }
  
  /**
   * Remove item from localStorage
   * @param key Storage key
   */
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
  
  /**
   * Clear all expired items from localStorage
   */
  clearExpiredItems(): void {
    try {
      const keys = Object.keys(localStorage);
      const now = new Date();
      
      keys.forEach(key => {
        try {
          const itemStr = localStorage.getItem(key);
          if (itemStr) {
            const item: StorageItem = JSON.parse(itemStr);
            if (item.expiry && now.getTime() > item.expiry) {
              localStorage.removeItem(key);
            }
          }
        } catch (error) {
          // If parsing fails, it might not be our format, skip it
        }
      });
    } catch (error) {
      console.error('Error clearing expired items:', error);
    }
  }
}