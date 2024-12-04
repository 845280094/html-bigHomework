// var user = new Map([["123","123"]]);
var user = new Map(JSON.parse(localStorage.getItem('users')) || []);

function login(){
    var username = document.getElementById("login-username").value;
    var password = document.getElementById("login-password").value;

    localStorage.setItem('username', username);

    if(user.get(username) === password){
        // window.location.href = "index.html?username=" + encodeURIComponent(username);
        window.location.href="index.html";
    }else{
        alert("用户名或密码错误");
    }
}

function register(){
    var username = document.getElementById("register-username").value;
    var password = document.getElementById("register-password").value;
    var password2 = document.getElementById("register-password2").value;

    if(password != password2){
        alert("密码不一致，请检查");
    }else{
        if(validatePassword(password)==true){
            user.set(username,password);
            localStorage.setItem('users',JSON.stringify(Array.from(user.entries())));
            alert("注册成功，请登录");
            window.location.href="login.html";
        }
    }

    //清空输入
    // document.getElementById("register-username").value="";
    // document.getElementById("register-password").value="";
}

function validatePassword(password){
    const minLength = 6;
    const maxLength = 12;
    const minScore = 4;//密码强度

    if(password.length < minLength){
        alert("密码长度应大于6位");
        return false;
    }

    if(password.length > maxLength){
        alert("密码长度应小于12位");
        return false;
    }

    const score = calculatePasswordScore(password);
    // alert(score);
    if(score < minScore){
        alert("密码复杂度不够，请确保它包含大小写字母、数字和特殊符号");
        return false;
    }

    return true;
}

function calculatePasswordScore(password){
    let score = 0;
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[\W_]/;//特殊字符

    if(upperCaseRegex.test(password)) score++;
    if(lowerCaseRegex.test(password)) score++;
    if(numberRegex.test(password)) score++;
    if(specialCharRegex.test(password)) score++;

    // // 检查是否包含大写字母
    // if (upperCaseRegex.test(password)) {
    //     score += 1;
    //     alert("大写字母+1");
    // }
    // // 检查是否包含小写字母
    // if (lowerCaseRegex.test(password)){
    //     score += 1;
    //     alert("小写字母+1");
    // } 
    // // 检查是否包含数字
    // if (numberRegex.test(password)){
    //     score += 1;
    //     alert("数字+1");
    // } 
    // // 检查是否包含特殊字符
    // if (specialCharRegex.test(password)){
    //     score += 1;
    //     alert("特殊字符+1");
    // } 

    return score;
}

function changePassword(){
    var newPassword = document.getElementById('new-password').value;
    var newPassword2 = document.getElementById('check-password').value;
    console.log("人力有穷天无尽，留待有缘再出发");

    if(newPassword != newPassword2){
        alert("新密码不一致，请检查");
    }else{
        if(validatePassword(newPassword)==true){
            localStorage.setItem('user',JSON.stringify(Array.from(user.entries())));
            alert("密码修改成功！");
            window.location.href="index.html";    
        }
    }
}