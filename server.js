const express = require('express');
const app = express();
const port = 3000;


//用于解析JSON格式的body-parser中间件
app.use(express.json());


//GET接口：返回JSON数据
app.get('/api/baseJson', (req, res) => {
    res.json({
        users: [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" },
            { id: 3, name: "Carol" }
        ]
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
    res.status(200).send(`Received submission for name: ${name}`);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

