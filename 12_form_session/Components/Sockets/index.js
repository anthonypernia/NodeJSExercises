



module.exports = (io) => {

    io.on('connection', (socket)=>{
        console.log(`a user connected ${socket.id}`);
    
        // socket.on('add_product', async (data)=>{
            
        //     await ProductsService.insertProducts(data);
        //     io.emit('products_all', {"update":"yes"});
        // });
    
        // socket.on('send_msg', async (message)=>{
    
        //     await ChatService.insertMessage(message);
        //     io.emit('msg_all', {"update":"yes"});
        // });
    
    })
}