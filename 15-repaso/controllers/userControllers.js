const bcrypt = require('bcrypt');
const connection = require('../config/db');

class UserControllers {
    showRegisterForm = (req, res) =>{
        res.render("formRegister")
    }

    listaUsers = (req, res) =>{
        let sql = 'select * from user where user_is_deleted = 0'
        connection.query(sql, (err, result)=>{
            if(err){
                throw err
            }else{
                res.render("lista", {result})
            }
        })
    }

    showOneUser = (req, res) =>{
        const {id} = req.params;
        let sql = 'select * from user where id_user = ? and user_is_deleted = 0'
        connection.query(sql, [id], (err, result)=>{
            if(err){
                throw err
            }else{
                res.render('oneUser', {result: result[0]})
            }
        })
    }

    register = (req, res) => {
        const {name, lastname, email, password, repPassword} = req.body;
        if(!name||!lastname||!password||!email||!repPassword){
            res.render("formRegister",{message: "algun campo vacio"})
        }else{
            if(password != repPassword){
                res.render("formRegister",{message:"contraseñas distintas"})
            }else{
                bcrypt.hash(password, 10, (err, hash)=>{
                    if(err){
                        throw err
                    }else{
                        let sql = 'insert into user (name, lastname, email, password) VALUES (?,?,?,?)'
                        let values = [name, lastname, email, hash];
                        connection.query(sql, values, (err2, result)=>{
                            if(err2){
                                throw err2
                            }else{
                                res.redirect('/')
                            }
                        })
                    }
                })
            }   
        }
    }

    showLogin = (req, res) =>{
        res.render("loginForm")
    }

    login = (req, res) => {
        console.log(req.body);
        const {email, password} = req.body;
        //1.- ver si este email existe
        let sql = 'select * from user where email = ? and user_is_deleted = 0'
        connection.query(sql, [email], (err, result)=>{
            if(err){
                throw err
            }else{
                console.log(result);
                if(result.length == 0){
                    res.render("loginForm", {message:"nop estás registrado"})
                }else{
                    //el email existe, por lo que voy a comparar si la password es correcta
                    bcrypt.compare(password, result[0].password, (err, resultCompare)=>{
                        if(err){
                            throw err
                        }else{
                            //si no son iguales
                            console.log(resultCompare);
                            
                            if(!resultCompare){
                                res.render("loginForm", {message:"la contraseña no es válida"})
                            }else{
                                res.render('profile', {result: result[0]})
                            }
                        }
                    })
                }
            }
        })
    }

    showEditForm = (req, res) =>{
        const {id} = req.params;
        let sql = 'select * from user where id_user = ? and user_is_deleted = 0'
        connection.query(sql, [id], (err, result)=>{
            if(err){throw err}else{
                console.log(result);
                
                res.render("editForm", {result:result[0]})
            }
        })
    }

edit = (req, res)=>{
    const {id} = req.params;
    const {name, lastname} = req.body;
    let sql = 'update user set name=?, lastname = ? where id_user = ?'
    let values = [name, lastname, id]
    connection.query(sql, values, (err, result)=>{
        if(err){
            throw err
        }else{
            res.redirect(`/users/profile/${id}`)
        }
    })
}

profile = (req, res) =>{
    const {id} = req.params;
    connection.query(`select * from user where id_user = ${id} `, (err, result)=>{
        if(err){
            throw err
        }else{
            res.render("profile", {result: result[0]})
        }
    })
}
}

module.exports= new UserControllers();