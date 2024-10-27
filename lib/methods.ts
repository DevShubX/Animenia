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

export const parseReviewData = (rawData: string) => {
  const imgRegex = /~~img\d+\((https?:\/\/[^\)]+)\)~/g; // Matches custom img tags like ~img220(url)~~
  const sectionRegex = /~(.?) - __(.?)_~/g; // Matches sections like ~~~STORY - __6.5/10_~~~
  
  // Parse image tags
  let parsedData = rawData.replace(imgRegex, (match, url) => {
    return `<div class="flex justify-center w-full">
        <img src="${url}" alt="Review Image" class="w-[500px] h-[200px] my-5 rounded-md" />
    </div>`;
  });

  // Parse section tags like STORY, CHARACTERS, etc.
  parsedData = parsedData.replace(sectionRegex, (match, sectionTitle, value) => {
    return `<h3>${sectionTitle.trim()} - ${value.trim()}</h3>`;
  });

  return parsedData;
};