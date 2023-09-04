const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())


app.listen(5000, () => {

    console.log("\n\nservidor rodando\n\n")
})

//objeto onde sera salvo tudo como se fosse o banco de dados
let db = [{
    id: 1,
    nome: "Dev Herbert",
    avatar: "https://media.licdn.com/dms/image/D4D03AQEfmgbvNWkd3w/profile-displayphoto-shrink_200_200/0/1679201623285?e=1699488000&v=beta&t=QBM-31rP2oKllGye8MIba4_e5END4TbnC9k0BQQ0dFg",
    coment: "Seja bem vindo(a), Ao chat Desenvolvido por mim para praticar meus conhecimentos e aperfeisoar minhas habilidades espero que goste",
    date: "1/09/2023"
}];

let users = [
    {
        id: 1,
        nome: "herbert",
        avatar: "https://media.licdn.com/dms/image/D4D03AQEfmgbvNWkd3w/profile-displayphoto-shrink_200_200/0/1679201623285?e=1699488000&v=beta&t=QBM-31rP2oKllGye8MIba4_e5END4TbnC9k0BQQ0dFg",
        date: "1/09/2023"
    }
]

app.route("/").get((req, res) => {

    res.json(db)
})

app.route("/").post((req, res) => {

    const data = new Date()
    const nUser = db[db.length - 1] === undefined ? 0 : db[db.length - 1].id
    let img = req.body.avatar
    let nome = req.body.nome
    let Coment = req.body.coment

    db.push({
        id: nUser + 1,
        nome: nome,
        avatar: img,
        coment: Coment,
        date: `${data.getMonth() + 1}/${data.getDate()}/${data.getUTCFullYear()}`
    })

    res.json(db)
})
app.route("/:id").delete((req, res) => {
    let nUser = req.params.id

    db = db.filter((dado) => Number(dado.id) !== Number(nUser))

    res.json("Arquivo deletado com sucesso")
})

//caso seja pedido uma rota de users sera enviado todos os usuarios 

app.route("/users").get((req, res) => {

    res.json(users)
})

app.route("/users").post((req, res) => {

    let data = new Date()
    const nUser = users[users.length - 1] === undefined ? 0 : users[users.length - 1].id
    let nome = req.body.nome
    let avatar = req.body.avatar

    //sera criado um objeto e sera adicionado a um array users
    users.push({
        id: nUser + 1,
        nome: nome,
        avatar: avatar === "" ? "https://live.staticflickr.com/2165/3536355889_2b22105055_b.jpg" : avatar,
        date: `${data.getMonth() + 1}/${data.getDate()}/${data.getUTCFullYear()}`
    })
    res.send("Sucesso")


})