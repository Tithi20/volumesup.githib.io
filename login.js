function validate(){
    var email= document.getElementById("exampleInputEmail").value;
    var password= document.getElementById("exampleInputPassword1").value;
   
    var redirect= document.querySelector("#redirect");
   
    

    if(email=="admin@gmail.com" && password=="admin"){
        alert(" You are logged in now.");
        
        return true;
    }
    else if(email!="admin@gmail.com" && password=="admin"){
        alert("wrong email or password");
        
        return false;
    }
    else{
        alert("failed");
        return false;
    }
}



