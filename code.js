(function () {
    const app = document.querySelector(".app");
    const socket = io();

    var audio= new Audio('ting.mp3');
    var audio1= new Audio('text.mp3')

    let uname;

    app.querySelector(".join-screen #join-user").addEventListener("click",function(){
        let username = app.querySelector(".join-screen #username").value;
        if (username.length == 0) {
            return;
        }
        socket.emit("newuser",username);
        uname = username;
        app.querySelector(".join-screen").classList.remove("active");
        app.querySelector(".chat-screen").classList.add("active");
        audio.play();
    });
    app.querySelector(".chat-screen #send-message").addEventListener("click",function(){
        let message = app.querySelector(".chat-screen #message-input").value;
        if(message.length==0){
            return;
        }
        rendermessage("my",{
            username:uname,
            text:message
        });
        socket.emit("chat",{
            username:uname,
            text:message
        })
    app.querySelector(".chat-screen #message-input").value= "";
    });
    app.querySelector(".chat-screen #exit-chat").addEventListener("click",function(){
        socket.emit("exituser",uname);
        window.location.href=window.location.href;
    });
    socket.on("update",function(update){
        rendermessage("update",update);
    });
    socket.on("chat",function(message){
        rendermessage("other",message);
    });
    function rendermessage (type,message){
        let messagecontainer = app.querySelector(".chat-screen .messages");
        if(type=="my"){
            let el= document.createElement("div");
            el.setAttribute("class","message my-message");
            el.innerHTML=`
              <div>
                   <div class="name">you</div>
                   <div class="text">${message.text}</div>
              </div>  
            `;
            messagecontainer.appendChild(el);
        }
        else if(type=="other"){
            let el= document.createElement("div");
            el.setAttribute("class","message other-message");
            el.innerHTML=`
              <div>
                   <div class="name">${message.username}</div>
                   <div class="text">${message.text}</div>
              </div>  
            `;
            messagecontainer.appendChild(el);
            audio1.play();

        }else if(type=="update"){
            let el= document.createElement("div");
            el.setAttribute("class","update");
            el.innerText=message;
            messagecontainer.appendChild(el);
        }
        messagecontainer.scrollTop= messagecontainer .scrollHeight - messagecontainer .clientHeight;
    };
    confirm('If You Are Under Age 18 Please Avoid!!');
})();
