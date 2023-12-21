import { useState } from "react";
import {getData, setData, removeData } from "../../services/store";
export default function useSessionStorage(key: string, initialValue: any): [any, (key: string, value: any) => void, (key: string) => void] {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
      try {
        // Get from local storage by key
        const item = getData(key);
        // Parse stored json or if none return initialValue
        return item ? item : initialValue;
      } catch (error) {
        // If error also return initialValue
        console.log(error);
        return initialValue;
      }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (key:string ,value:any) => {
      try {
        // Allow value to be a function so we have same API as useState
        // const valueToStore =
        //   value instanceof Function ? value(storedValue) : value;
        // // Save state
        setStoredValue(value);
        // Save to local storage
        setData(key, JSON.stringify(value));
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    };

    const removeValue = (key:string) => {
        try {
            // Allow value to be a function so we have same API as useState
            // const valueToStore =
            //   value instanceof Function ? value(storedValue) : value;
            // // Save state
            setStoredValue(null);
            // Save to local storage
            removeData(key);
          } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
          }
    }
    return [storedValue, setValue, removeData];
  }