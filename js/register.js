// ? =============> Global ===============>
let inputs = document.querySelectorAll("input");

// ! =============> When Start ===============>

// * =============> Events ===============>
document.querySelector("#btnRegister").addEventListener("click",function(e){
    e.preventDefault();
    if( validation.valid(inputs[0],validation.validName) && validation.valid(inputs[1],validation.validName) && validation.valid(inputs[2],validation.validEmail) && validation.valid(inputs[3],validation.validPassword) && validation.valid(inputs[4],validation.validAge)){
        let json=
                    {
                        "first_name":inputs[0].value,
                        "last_name":inputs[1].value,
                        "email":inputs[2].value,
                        "password":inputs[3].value,
                        "age":inputs[4].value
                    };
        Register(json);
    };
});

// ========== mode ==========
if(localStorage.getItem("mode") !== null){
    document.documentElement.setAttribute("data-theme",localStorage.getItem("mode"));
 }
 document.querySelector("#mode").addEventListener('click',()=>{
    if(document.documentElement.getAttribute("data-theme") == "dark"){
        document.documentElement.setAttribute("data-theme","light");
        localStorage.setItem("mode" , "light");
    }else{
        document.documentElement.setAttribute("data-theme","dark");
        localStorage.setItem("mode" , "dark");
    }
 });


// ! =============> Functions ===============>

async function Register(userData){


    let data = await fetch("https://sticky-note-fe.vercel.app/signup",{
        method:"post",
        body:JSON.stringify(userData),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
    });
    let dataJson = await data.json();
    document.querySelector("#msg").innerHTML = dataJson.message;
    if(dataJson.message === "success"){
        location.href = "./index.html";
    }

}

//  =============> Validation ===============>

const validation = {
    validName:/^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/,
    validEmail:/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    validPassword:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    validAge:/^([1-7][0-9]|80)$/,
    valid:function(input , style){
        if(style.test(input.value) == true){
            input.classList.add("is-valid");
            input.classList.remove("is-invalid");
            return true;
        }else{
            input.classList.add("is-invalid");
            input.classList.remove("is-valid");
            return false;
        }
    }
};

inputs[0].addEventListener("input",function(){
    validation.valid(inputs[0],validation.validName);
});
inputs[1].addEventListener("input",function(){
    validation.valid(inputs[1],validation.validName);
});
inputs[2].addEventListener("input",function(){
    validation.valid(inputs[2],validation.validEmail);
});
inputs[3].addEventListener("input",function(){
    validation.valid(inputs[3],validation.validPassword);
});
inputs[4].addEventListener("input",function(){
    validation.valid(inputs[4],validation.validAge);
});