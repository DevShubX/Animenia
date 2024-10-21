import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const timeUntilAiring = (seconds:any) =>{
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
  
    let result = '';
    if (days > 0) {
        result += `${days}d `;
    }
    if (hours > 0) {
        result += `${hours}h `;
    }
    result += `${minutes}m`;
  
    return result;
  
}

export function cn(...inputs:ClassValue[]){
    return twMerge(clsx(inputs))
} 