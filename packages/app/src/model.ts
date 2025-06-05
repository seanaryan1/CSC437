/* Front-end in-memory model shared by all views */
import {  Comment } from "/Users/arshanaryan/CSC437/packages/server/src/models/comment.ts"; // Corrected import path

export interface Model {
    commentId?: string; // currently selected comment
    comment?: Comment;      // currently selected project
}

export const init: Model = {};
