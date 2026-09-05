export function generateSlug(text) {
  return text
    .toString()                           // Ensure input is a string
    .toLowerCase()                        // Convert to lowercase
    .trim()                               // Remove whitespace from both ends
    .normalize('NFD')                     // Decompose accents into baseline characters + diacritics
    .replace(/[\u0300-\u036f]/g, '')     // Remove diacritics (accents)
    .replace(/[^a-z0-9\s-]/g, '')         // Remove all non-alphanumeric characters except spaces and hyphens
    .replace(/[\s_]+/g, '-')              // Replace spaces and underscores with a single hyphen
    .replace(/-+/g, '-');                 // Replace multiple consecutive hyphens with a single hyphen
}