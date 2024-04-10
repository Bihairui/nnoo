const express = require('express');
const fs = require('fs'); // 引入文件系统模块
const app = express();
const port = 3000;


//用于解析JSON格式的body-parser中间件
app.use(express.json());


//GET接口：返回JSON数据
app.get('/api/baseJson', (req, res) => {
    fs.readFile('base.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Unable to read file');
            return;
        }
        res.status(200).json(JSON.parse(data));
    });
});


//POST接口：接收JSON数据
app.get('/api/buhkBlockImei', (req, res) => {
   // 假设客户端会发送一个包含name属性的JSON对象
    const name = req.query.name;
    if (!name) {
        res.status(400).send('Name is required');
        return;
    }
    // 读取当前存储，然后添加新数据
    fs.readFile('imei.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Unable to read file');
            return;
        }

        const submissions = JSON.parse(data);
        submissions.push({ name: name });

        // 写回文件
        fs.writeFile('imei.json', JSON.stringify(submissions, null, 2), (err) => {
            if (err) {
                res.status(500).send('Unable to write file');
                return;
            }
            res.status(200).send(`Received submission for name: ${name}`);
        });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

