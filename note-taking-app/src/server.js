import fs from 'node:fs/promises'
import http from 'node:http'
import open from 'open'

export const interpolate = (html, data) => {
  return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, placeholder) => {
    return data[placeholder] || '';
  });
}


const formatNotes = (notes) => {
    return notes.map(note => {
      return `
        <div class="note">
          <p>${note.content}</p>
          <div class="tags">
            ${note.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
        </div>
      `
    }).join('\n')
  }


export const createServer = (notes) => {
    return http.createServer(async (request, response) => {
        const html_path = new URL('./template.html', import.meta.url).pathname
        const template = await fs.readFile(html_path, 'utf-8')
        const html = interpolate(template, {notes: formatNotes(notes)})
    
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.end(html)
    })
}

export const start = (port, notes) => {
    const server = createServer(notes)
    server.listen(port, () => {
        const address = `http://localhost:${port}`;
        console.log(`hi from port ${address}`);
        open(address)
    })
}
