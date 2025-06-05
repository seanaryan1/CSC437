/**
 * Represents a user’s profile in the sewing community.
 * Adjust fields to match your actual database schema.
 */
export interface UserProfile {
    id: string;               // e.g. MongoDB ObjectId or UUID
    displayName: string;      // “Jane Doe” or “@quilthead”
    avatar?: string;          // URL to avatar image (optional)
    bio?: string;             // short “About me” text (optional)
    favoritePatterns?: string[]; // Array of Pattern IDs they’ve favorited
    // …any other fields (e.g. email, joinDate, role) …
  }
  