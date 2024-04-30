
const { v4: uuidv4 } = require('uuid');

let users=[
    {
        id: uuidv4(),
        username:" Mir arfan",
        email: "arfan@gmail.com",
    },
    {
        id: uuidv4(),
        username:"Ajoy nath",
        email: "Ajoy@gmail.com",
    },
]

module.exports=users;

