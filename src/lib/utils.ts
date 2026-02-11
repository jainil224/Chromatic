import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts a numeric IP representation (BigInt/string) back to a standard IP string.
 * Supports both IPv4 and IPv6.
 */
export function numericToIp(numericValue: string | number | bigint): string {
  try {
    const bigIntVal = BigInt(numericValue);

    // IPv4: max value 2^32 - 1
    if (bigIntVal <= 4294967295n) {
      const octets = [];
      let tempVal = bigIntVal;
      for (let i = 0; i < 4; i++) {
        octets.unshift((tempVal & 0xFFn).toString());
        tempVal >>= 8n;
      }
      return octets.join('.');
    } else {
      // IPv6
      const parts = [];
      let tempVal = bigIntVal;
      for (let i = 0; i < 8; i++) {
        parts.unshift((tempVal & 0xFFFFn).toString(16));
        tempVal >>= 16n;
      }
      // Basic IPv6 normalization: join with colons
      // Note: Full zero-compression (::) is omitted here for simplicity 
      // as it's for admin display, but could be added if needed.
      return parts.join(':').replace(/(^|:)0(:0)+(:|$)/, '::').replace(/:+/g, ':');
    }
  } catch (e) {
    console.error('Error converting numeric IP:', e);
    return "Invalid IP";
  }
}
