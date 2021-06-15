const express = require('express');
const app = express();
const port = 3400;
//setup app sử dụng data dạng JSON 
// dự liệu gửi lên sẽ chuyển thành JSON
app.use(express.json());
/*
* method: get
* url :/ ==> http://localhost:3400/
*/
app.get('/', (req, res) => {
    //get('url',request,respone)
    res.send('<h1>hello 34 cybersoft</h1>');
})
//xây dựng API quản lý người dùng
const userList = [
    {
        id: 1,
        name: "trung anh",
        email: "trunganh@gmail.com"
    },
    {
        id: 2,
        name: "Văn Lâm",
        email: "vanlam2@gmail.com"
    },
];

// API lấy tất cả người dùng
// url: '/api/user/get-list-user'
// method : get

app.get('/api/user', (req, res) => {
    // let content ='';
    // content = userList.reduce((result,item)=>{
    //     result += `
    //     <div>
    //     <p>${item.id}</p>
    //     <p>${item.name}</p>
    //     <p>${item.email}</p>
    //     </div>
    //     `;
    //     return result;
    // },'')
    res.status(200).send(userList);
})
//lấy chi tiết người dùng
// API lấy tất cả người dùng
// url: '/api/user/get-detail-user/:id'
// method : get
app.get('/api/user/:id', (req, res) => {
    // console.log("id:",req.params.id);
    let { id } = req.params;
    let item = userList.find((items) => items.id == id);
    // console.log(index);
    if(item){
        res.status(200).send(item)
    }else{
        res.status(404).send("User not found");
    }

})
//Themuser người dùng
// API tạo user
// url: '/api/user/get-detail-user/:id'
// method : post
// data:{email,name}
app.post('/api/user', (req, res) => {
    const data = req.body;
    const {email,name} = data;
    userList.push({id:Math.floor(Math.random() * 100),name,email})
    console.log(userList);
    res.send("create-user");
})

//Xóa người dùng
// API xóa user
// url: '/api/user/delete-user/:id'
// method : delete
app.delete('/api/user/:id', (req, res) => {
    const {id}= req.params;
    const index = userList.findIndex((items)=>items.id==id);
    if(index!=-1){
        userList.splice(index,1);
        res.status(200).send("success !");
    }else{
        res.status(404).send("user not found");
    }
    
    // console.log(index);
   
})
//sửa người dùng
// API sửa người dùng
// url: '/api/user/delete-user/:id'
// method : put
app.put('/api/user/:id', (req, res) => {
    // const {id}= req.params;
    // const index = userList.findIndex((items)=>items.id==id);
    // userList.splice(index,1);
    // console.log(index);
    const {id}= req.params;
    const{name,email}= req.body;
    const index = userList.findIndex((items)=>items.id==id);

    if(index!=-1){
        let userUpdate = userList[index];
        userUpdate ={...userUpdate,name,email}
        // userList[index].name = name;
        // userList[index].email = email;
        userList[index]= userUpdate;
        res.status(200).send("success !");
    }else{
        res.status(404).send("user not found");
    }


app.listen(port, () => {
    console.log(`app run on port ${port}`);
});