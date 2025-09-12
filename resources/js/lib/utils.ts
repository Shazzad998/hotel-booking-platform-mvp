import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}


export function slugify(text:string) {
    return text
        .toString()                     // cast to string
        .normalize("NFD")                // normalize accents
        .replace(/[\u0300-\u036f]/g, "") // remove diacritics
        .toLowerCase()                   // to lowercase
        .trim()                          // remove whitespace
        .replace(/[^a-z0-9\s-]/g, "")    // remove invalid chars
        .replace(/\s+/g, "-")            // replace spaces with -
        .replace(/-+/g, "-");            // collapse multiple -
}
