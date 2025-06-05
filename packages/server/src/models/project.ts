/**
 * Represents a sewing project from a user.
 * Adjust fields to match your actual database/storage layer.
 */
export interface Project {
    id: string;            // e.g. MongoDB ObjectId or UUID
    patternId: string;     // which Pattern they followed
    ownerId: string;       // userId of the project’s owner
    title: string;         // e.g. “Summer Dress – cotton poplin”
    photos?: string[];     // array of URLs (or relative paths) to project photos
    notes?: string;        // any journal-style text
    status?: "planning" | "cutting" | "sewing" | "done"; 
    createdAt?: string;    // ISO date string
    updatedAt?: string;    // ISO date string
    // …any other fields (e.g. tags, rating) …
  }
  