import fs from 'fs';
import https from 'https';
import path from 'path';

// Output from the mcp_stitch_list_screens tool earlier.
const screens = [
  {"id": "e431b1e4d53e45f1b0cdd98229e8bda7", "title": "Sign Up Page", "url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sX2I1ZWU4NWFkMGIxZDQ3ODlhYWFhZjFlOTE4NjRhNDBiEgsSBxC_55LG0gIYAZIBIgoKcHJvamVjdF9pZBIUQhIzMjc4Mzg5NDc1ODkzMDg3OTg&filename=&opi=89354086"},
  {"id": "f54a55dd86594349acef8b77a9ce132b", "title": "User Dashboard", "url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzdkNzIzNTUzYjZkNTQ0NmQ5OTMzM2NhMDE0ODgxZDBiEgsSBxC_55LG0gIYAZIBIgoKcHJvamVjdF9pZBIUQhIzMjc4Mzg5NDc1ODkzMDg3OTg&filename=&opi=89354086"},
  {"id": "d3c31beb33164c60bb25551f6b3e02be", "title": "Forgot Password Page", "url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzM2MGE0MjgyMTVlYjRlZGI4MWI2NDk5OTg0OTc0OGZjEgsSBxC_55LG0gIYAZIBIgoKcHJvamVjdF9pZBIUQhIzMjc4Mzg5NDc1ODkzMDg3OTg&filename=&opi=89354086"},
  {"id": "af63bfcd13e34f98bbaa13475c0c6bb5", "title": "Profile & Settings", "url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzc1MWRlMjMwYTYwYjQzYTQ4MmJkMjIxZGFlNTA1Yjk3EgsSBxC_55LG0gIYAZIBIgoKcHJvamVjdF9pZBIUQhIzMjc4Mzg5NDc1ODkzMDg3OTg&filename=&opi=89354086"},
  {"id": "70171705e81343c7ac41c54ae0a2be35", "title": "About Us Page", "url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzNiNDI5N2QyMDAyNjQ5YWM5NWE1OTdlZjlmYTY2NDNkEgsSBxC_55LG0gIYAZIBIgoKcHJvamVjdF9pZBIUQhIzMjc4Mzg5NDc1ODkzMDg3OTg&filename=&opi=89354086"},
  {"id": "ca6a4ace19e144d4bfc8b4a9015c3061", "title": "Card Management", "url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzM4ZjExY2UwZGYxOTQ2NWU4MjdhMjQ1NmI5MjFmODk3EgsSBxC_55LG0gIYAZIBIgoKcHJvamVjdF9pZBIUQhIzMjc4Mzg5NDc1ODkzMDg3OTg&filename=&opi=89354086"},
  {"id": "2a2728c101914cd2845359b04f59311b", "title": "Features Page", "url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzZhZTNkMjA4ZjY2YjRjMmQ5MjJhMGNiOGQwOGNmMDc4EgsSBxC_55LG0gIYAZIBIgoKcHJvamVjdF9pZBIUQhIzMjc4Mzg5NDc1ODkzMDg3OTg&filename=&opi=89354086"},
  {"id": "37c4f1b92c754f36a62890c10f566d0e", "title": "Transfer Funds", "url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzY0ZjM3YzdjNjdlNzRiZDBhZjdiNDE1MmIyYzBmZDU2EgsSBxC_55LG0gIYAZIBIgoKcHJvamVjdF9pZBIUQhIzMjc4Mzg5NDc1ODkzMDg3OTg&filename=&opi=89354086"},
  {"id": "3761eeb0eb4342dd81e16a48d04a979d", "title": "Contact & Support Page", "url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzE4OGQzNGQxYmM0ZjQ5OTE5ZmM1Zjc2MDE4NWQ0MWE3EgsSBxC_55LG0gIYAZIBIgoKcHJvamVjdF9pZBIUQhIzMjc4Mzg5NDc1ODkzMDg3OTg&filename=&opi=89354086"},
  {"id": "1c0bbc560ea04f9ab7eb6d2ff973c133", "title": "Transactions History", "url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzJmYTMwYTFkMzc5OTQyMWZhNmJlMWU2ZDI2NTIzMTdiEgsSBxC_55LG0gIYAZIBIgoKcHJvamVjdF9pZBIUQhIzMjc4Mzg5NDc1ODkzMDg3OTg&filename=&opi=89354086"},
  {"id": "1ad510238aa84ec6a92a8f1dd2e9d4d8", "title": "Login Page", "url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzM0MTc5OTc1MjUzNzQzZWViYzcyZjNkMWI4Y2E4MjkwEgsSBxC_55LG0gIYAZIBIgoKcHJvamVjdF9pZBIUQhIzMjc4Mzg5NDc1ODkzMDg3OTg&filename=&opi=89354086"},
  {"id": "71f1ec6228ee4f6f987293765a35a717", "title": "Home Page", "url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzc4YmU1NzM2YTZkNTRjM2JiNjNhZDg5Y2RiZGM2YmExEgsSBxC_55LG0gIYAZIBIgoKcHJvamVjdF9pZBIUQhIzMjc4Mzg5NDc1ODkzMDg3OTg&filename=&opi=89354086"},
  {"id": "e8f8f182cf1d48fe97e32292ffbba8af", "title": "Blog Page", "url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sX2MxNGY1ZDZiMzQ1YzRiYjBiZTlhNDU1OWE1MWNiNDM5EgsSBxC_55LG0gIYAZIBIgoKcHJvamVjdF9pZBIUQhIzMjc4Mzg5NDc1ODkzMDg3OTg&filename=&opi=89354086"}
];

const downloadDir = path.join(process.cwd(), 'stitch_screens');
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir);
}

function download(item) {
  return new Promise((resolve) => {
    https.get(item.url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const safeTitle = item.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        fs.writeFileSync(path.join(downloadDir, `${safeTitle}.html`), data);
        console.log(`Downloaded ${safeTitle}`);
        resolve();
      });
    });
  });
}

async function run() {
  for (const screen of screens) {
    await download(screen);
  }
}

run();
