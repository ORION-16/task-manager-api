const http = require('http');
const tasks = [
                { id: 1, title: "Learn Node", completed: false },
                { id: 2, title: "Build API", completed: false }
            ];

const server = http.createServer((req, res) => {
    const reqUrl = req.url;

    if(reqUrl === '/'){
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify({
            message: "API running"
        }))
    }
    else if(reqUrl==="/about"){
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.end("Welcome to About Page") 
    }
    else if(reqUrl==="/tasks" && req.method === "GET"){
        
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(tasks));
    }
    else if(reqUrl==="/tasks" && req.method === "POST"){
        let body = "";
        req.on("data", chunk => {
            body += chunk.toString();
        });
        req.on("end",  () => {
            const data = JSON.parse(body);
            const newTask = {
                id: tasks.length + 1,
                title: data.title,
                completed: false
            };
            tasks.push(newTask);
            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(newTask));
            
        });
    }
    else if(req.method ==="DELETE" && reqUrl.startsWith("/tasks/")){
        const parts = reqUrl.split("/");
        const id = parseInt(parts[2]);
        const index = tasks.findIndex(task => task.id === id);
        if(index !== -1){
            tasks.splice(index, 1);
        }
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({message: "Task deleted"}));
        
    }
    else{
        res.statusCode = 404;   
        res.setHeader("Content-Type", "text/html")
        res.end("404 Not Found")
    }
})
server.listen(3000,()=>{
    console.log("Server running on port 3000");
});
