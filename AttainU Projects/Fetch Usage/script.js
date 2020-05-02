/// for the show all Users
var allUserBtn = document.querySelector('#allUser')
allUserBtn.addEventListener('click',function(event){
    event.preventDefault();
    
    var parent = document.querySelector('#data')
    var child = parent.querySelectorAll('div')
    for(i=0;i<child.length;i++){
        parent.removeChild(child[i])
    }
   
    fetch('https://reqres.in/api/users?page=2')
    .then(function(responce){
        return responce.json()
    }).then(function(responceObject){
        return responceObject.data;
    }).then(function(data){
        var selectWhere = document.querySelector('#data')
       for(var index=0;index<data.length;index++){
            var newElement = document.createElement('div')
            newElement.innerHTML = 'id:'+data[index].id+'<br/>'+'email: '+data[index].email+'<br/> '+data[index].first_name+' '+data[index].last_name+'<br/>'+'<img src="'+data[index].avatar+'"/>'
            selectWhere.appendChild(newElement)
        } 
    }).catch(function(err){
        console.log(err)
    })
})

// get single user data
var singleUserBtn = document.querySelector('#singleUser')
singleUserBtn.addEventListener('click',function(event){
    event.preventDefault();

    var parent = document.querySelector('#data')
    var child = parent.querySelectorAll('div')
    for(i=0;i<child.length;i++){
        parent.removeChild(child[i])
    }

    fetch('https://reqres.in/api/users/2')
    .then(function(responce){
        return responce.json()
    }).then(function(responceObject){
        return responceObject.data;
    }).then(function(data){
        console.log(data.id)
    
       var selectWhere = document.querySelector('#data')
        var newElement = document.createElement('div')
        newElement.innerHTML = 'id:'+data.id+'<br/>'+'email: '+data.email+'<br/> '+data.first_name+' '+data.last_name+'<br/>'+'<img src="'+data.avatar+'"/>'
        selectWhere.appendChild(newElement)   
    
    }).catch(function(err){
        console.log(err)
    })
})

//show all the users list
var listAllBtn = document.querySelector('#listAll')
listAllBtn.addEventListener('click',function(event){
    event.preventDefault()
    var parent = document.querySelector('#data')
    var child = parent.querySelectorAll('div')
    for(i=0;i<child.length;i++){
        parent.removeChild(child[i])
    }

    fetch('https://reqres.in/api/unknown')
    .then(function(responce){
        return responce.json()
    }).then(function(responceObject){
        return responceObject.data;
    }).then(function(data){
        console.log(data)
    
        var selectWhere = document.querySelector('#data')
        for(var index=0;index<data.length;index++){
             var newElement = document.createElement('div')
             newElement.innerHTML = '<br/>Id:'+data[index].id+'<br/>'+'Name:'+data[index].name+'<br/>'+'Year: '+data[index].year+'<br/>'+'Color: '+data[index].color+'<br/>'+'pantone_value: '+data[index].pantone_value
             selectWhere.appendChild(newElement)
         } 
    }).catch(function(err){
        console.log(err)
    }) 
})

//for create user using POST
var createBtn = document.querySelector('#createUser')
createBtn.addEventListener('click',function(){
    var parent = document.querySelector('#data')
    var child = parent.querySelectorAll('div')
    for(i=0;i<child.length;i++){
        parent.removeChild(child[i])
    }

    var userName = prompt("Type your name:")
    var jobTitle = prompt("Job Title:")

    fetch('https://reqres.in/api/users',{
        method:'POST',
        body: JSON.stringify ({
            "name": userName,
            "job": jobTitle
        }),
        headers: {                //meta info (i am sending to json data parse it on your side)
            'Content-Type': 'application/json'
        } 
    }) 
    .then(function(responce){ 
        return responce.json()
    }).then(function(responceObject){
       console.log(responceObject.name,responceObject.id,responceObject.job,responceObject.createdAt)
       
        var selectWhere = document.querySelector('#data')
             var newElement = document.createElement('div')
             newElement.innerHTML = '<br/>Id:'+responceObject.id+'<br/>'+'Name:'+responceObject.name+'<br/>'+'Job: '+responceObject.job+'<br/>'+'createdAt:'+responceObject.createdAt
             selectWhere.appendChild(newElement)
         
    }).catch(function(err){
        console.log(err)
    }) 
})

// For register the user
var registerBtn = document.querySelector('#register')
registerBtn.addEventListener('click',function(){
    var parent = document.querySelector('#data')
    var child = parent.querySelectorAll('div')
    for(i=0;i<child.length;i++){
        parent.removeChild(child[i])
    }

    var mail = prompt("Type your email(eve.holt@reqres.in):")
    var pwd = prompt("type your passord(pistol):")
    console.log(mail,pwd)
    
    fetch("https://reqres.in/api/register",{
        method:'POST',
        body: JSON.stringify({
            "email": mail,
            "password": pwd
        }),
        headers: {                //meta info (i am sending to json data parse it on your side)
            'Content-Type': 'application/json'
        }
    }) 
    .then(function(responce){ 
        return responce.json()
    }).then(function(responceObject){
        var selectWhere = document.querySelector('#data')
             var newElement = document.createElement('div')
             newElement.innerHTML = '<br/>Id:'+responceObject.id+'<br/>'+'Token:'+responceObject.token
             selectWhere.appendChild(newElement)  
    })
    .catch(function(err){
        console.log(err)
    }) 
    
}) 

//Login User
var loginBtn = document.querySelector('#login')
loginBtn.addEventListener('click',function(){
    var parent = document.querySelector('#data')
    var child = parent.querySelectorAll('div')
    for(i=0;i<child.length;i++){
        parent.removeChild(child[i])
    }
    var mail = prompt("Type your email(eve.holt@reqres.in):")
    var pwd = prompt("type your passord(cityslicka):")
    console.log(mail,pwd)

        fetch("https://reqres.in/api/login",{
            method:'POST',
            body: JSON.stringify({
                "email": mail,
                "password": pwd
            }),
            headers: {                //meta info (i am sending to json data parse it on your side)
                'Content-Type': 'application/json'
            }
        }) 
        .then(function(responce){ 
            return responce.json()
        }).then(function(responceObject){
            var selectWhere = document.querySelector('#data')
                 var newElement = document.createElement('div')
                 if(responceObject.token != undefined){
                    newElement.innerHTML = 'User User Logged In<br/>Token:'+responceObject.token
                    selectWhere.appendChild(newElement)  
                 }else{
                    newElement.innerHTML = 'User Id or Password Incorrect<br/>Token :'+responceObject.token
                    selectWhere.appendChild(newElement)  
                 }    
        })
        .catch(function(err){
            console.log(err)
        }) 
}) 

// For update the user
var updateBtn =document.querySelector('#update')
updateBtn.addEventListener('click',function(){
    var parent = document.querySelector('#data')
    var child = parent.querySelectorAll('div')
    for(i=0;i<child.length;i++){
        parent.removeChild(child[i])
    }
    var updateName = prompt("Type new name for update:")
    var updateJob = prompt("type new job for update:")

    fetch('https://reqres.in/api/users/2',{
        method:'PUT',
        body: JSON.stringify ({
            "name": updateName,
            "job": updateJob
        }),
        headers: {                //meta info (i am sending to json data parse it on your side)
            'Content-Type': 'application/json'
        } 
    }) 
    .then(function(responce){ 
        return responce.json()
    }).then(function(responceObject){
            var selectWhere = document.querySelector('#data')
            var newElement = document.createElement('div')
            newElement.innerHTML ='<br/>'+'Name:'+responceObject.name+'<br/>'+'Job: '+responceObject.job+'<br/>'+'UpdatedAt:'+responceObject.updatedAt
            selectWhere.appendChild(newElement)
    }).catch(function(err){
        console.log(err)
        }) 
})


//For Delete the user
var deleteBtn =document.querySelector('#delete')
deleteBtn.addEventListener('click',function(){
    var parent = document.querySelector('#data')
    var child = parent.querySelectorAll('div')
    for(i=0;i<child.length;i++){
        parent.removeChild(child[i])
    }
    var wantToDelete = prompt("Type id which u want to delete(2):")

    fetch('https://reqres.in/api/users/2',{
        method:'DELETE'
    }) 
    .then(function(responce){ 
        return responce.json()
    }).then(function(responceObject){
            console.log(responseObj)
    }).catch(function(err){
        console.log(err)
    }) 
})


//for Delay
var delayBtn = document.querySelector('#delay')
delayBtn.addEventListener('click',function(){
    var parent = document.querySelector('#data')
    var child = parent.querySelectorAll('div')
    for(i=0;i<child.length;i++){
        parent.removeChild(child[i])
    }
    var time = prompt("Type seconds how much u want to delay:")
    
    fetch('https://reqres.in/api/users?delay=3')
    .then(function(responce){
        return responce.json()
    }).then(function(responceObject){
        return responceObject.data;
    }).then(function(data){

        function delay(){  // create a function for delay
            var selectWhere = document.querySelector('#data')
       for(var index=0;index<data.length;index++){
            var newElement = document.createElement('div')
            newElement.innerHTML = 'id:'+data[index].id+'<br/>'+'email: '+data[index].email+'<br/> '+data[index].first_name+' '+data[index].last_name+'<br/>'+'<img src="'+data[index].avatar+'"/>'
            selectWhere.appendChild(newElement)
        } 
        } 
        setTimeout(delay ,time*1000)
    }).catch(function(err){
        console.log(err)
    })
})

