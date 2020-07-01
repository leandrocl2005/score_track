const express = require('express')
const nunjucks = require('nunjucks')
const {questions} = require("./data")

const server = express()

server.use(express.static("public"))
server.use(express.urlencoded({extended: true}))
server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false, /* to render html as data, see about.work */
    nocache: true 
})

server.get("/", function(req, res) {
    return res.render("index.njk")
})

server.post("/", function(req, res) {
    const {student_registration, question_id} = req.body
    const foundedQuestion = questions.find( 
        (question) => question.id == question_id
    )
    const {content} = foundedQuestion
    return res.render("question.njk", {
        question_id,
        student_registration,
        content
    })
})

server.post("/result", function(req, res) {
    const {student_registration, question_id, answer} = req.body
    const foundedQuestion = questions.find( 
        (question) => question.id == question_id
    )
    const {solution} = foundedQuestion
    if (solution == answer) {
        return res.render("success.njk")
    } else {
        return res.render("fail.njk")
    }
})

server.listen(5000, function(){
    console.log("server is run!")
})