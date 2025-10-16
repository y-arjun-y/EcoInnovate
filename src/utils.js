// Utility function to create page URLs
export function createPageUrl(pageName) {
  return `/${pageName.toLowerCase().replace(/\s+/g, "-")}`;
}

// Utility function for conditional class names
export function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}
