
const tasks = [
  { id: 1, title: "Learn Express", completed: false },
  { id: 2, title: "Build API", completed: false }
]

// GET
const getTasks = (req, res) => {
    res.json(tasks)
}

// POST
const createTask = (req, res) => {
    const taskTitle = req.body.title;

    const newTask = {
        id: tasks.length + 1,
        title: taskTitle,
        completed: false
    }

    tasks.push(newTask)

    res.status(201).json(newTask)
}

// DELETE
const deleteTask = (req, res) => {
    const taskId = parseInt(req.params.id);

    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({
            message: "Task not found"
        })
    }

    tasks.splice(taskIndex, 1)

    res.json({ message: "Task deleted successfully" })
}

// PATCH
const updateTask = (req, res) => {
    const taskId = parseInt(req.params.id);

    const task = tasks.find(task => task.id === taskId)

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        })
    }

    if (req.body.title !== undefined) {
        task.title = req.body.title
    }

    if (req.body.completed !== undefined) {
        task.completed = req.body.completed
    }

    res.json(task)
}

module.exports = {
    getTasks,
    createTask,
    deleteTask,
    updateTask
}