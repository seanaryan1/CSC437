// packages/proto/vite.config.js
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // by default, root = process.cwd() which is packages/proto when you run `npm run dev`
  // publicDir defaults to 'public' in that same folder
  // so you actually don't _need_ to specify them unless you moved things elsewhere.

  build: {
    rollupOptions: {
      // when you do npm run build, emit all of these HTML pages:
      input: {
        index:    resolve(__dirname, 'index.html'),
        comment:  resolve(__dirname, 'comment.html'),
        post:     resolve(__dirname, 'post.html'),
        project:  resolve(__dirname, 'project.html'),
        portfolio:resolve(__dirname, 'portfolio.html'),
        user:     resolve(__dirname, 'user.html'),
      }
    }
  }
})
