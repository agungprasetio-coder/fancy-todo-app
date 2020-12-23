const { Todo, User } = require('../models')

class Controller {
    static todos(req, res, next){
        const { id } = req.loggedInUser // didapat dari middleware authentication
        Todo.findAll({
            where: {
                UserId: id // cari semua todo berdasar UserId = id yang didapat dari req.loggedInUser
            },
            order: [["id", "ASC"]]
        })
        .then(data=>{
            res.status(200).json({data}) // kirim data ke client berupa { data: array of data}
        })
        .catch(err=>{
            next(err)
        })
    }

    static postTodo(req, res, next){
        const { id } = req.loggedInUser // didapat dari middleware authentication
        const { title, description, status, due_date } = req.body // dapat dari ajax/client (data)
        let newTodo = {
            title,
            description,
            status,
            due_date,
            UserId : id
        }
        Todo.create(newTodo)
        .then(data=>{
            res.status(201).json({data})
        })
        .catch(err=>{
            next(err)
        })
    }

    static findById(req, res, next){
        const id = req.params.id
        Todo.findByPk(id,{
            include:[User]
        })
        .then(data=>{
            let todo = {
                id: data.id,
                title: data.title,
                description: data.description,
                status: data.status,
                due_date: data.due_date,
                UserId: data.UserId,
                email: data.User.email
            }
            res.status(200).json({data: todo})
        })
        .catch(err=>{
            next(err)
        })
    }

    static putTodo(req, res, next){
        const id = req.params.id
        const { title, description, status, due_date } = req.body
        const updateTodo = {
            title,
            description,
            status,
            due_date,
        }
        Todo.update(updateTodo, {
            where:{id},
            returning : true
        })
        .then(data=>{
            res.status(200).json(data[1][0])
        })
        .catch(err=>{
            next(err)
        })
    }

    static patchTodo(req, res, next){
        const id = req.params.id
        const { status } = req.body
        const updateStatus = {
            status
        }
        Todo.update(updateStatus, {
            where:{id},
            returning : true
        })
        .then(data=>{
            res.status(200).json(data[1][0])
        })
        .catch(err=>{
            next(err)
        })
    }

    static deleteTodo(req, res, next){
        const id = req.params.id
        Todo.destroy({where:{id}})
        .then(data=>{
            res.status(200).json({message: 'todo success to delete'})
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = Controller