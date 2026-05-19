import fs from 'fs';
import https from 'https';

const fileUrl = 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzdkNzIzNTUzYjZkNTQ0NmQ5OTMzM2NhMDE0ODgxZDBiEgsSBxC_55LG0gIYAZIBIgoKcHJvamVjdF9pZBIUQhIzMjc4Mzg5NDc1ODkzMDg3OTg&filename=&opi=89354086';

https.get(fileUrl, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        fs.writeFileSync('C:\\Users\\Admin\\Desktop\\Banking_Website\\downloaded_dashboard.html', data);
        console.log('done');
    });
});
