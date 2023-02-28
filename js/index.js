// ? =============> Global ===============>
let inputs = document.querySelectorAll("input");

// ! =============> When Start ===============>

// * =============> Events ===============>
document.querySelector("#btnLogin").addEventListener("click",function(e){
    e.preventDefault();
    if( validation.valid(inputs[0],validation.validEmail) && validation.valid(inputs[1],validation.validPassword)){
        let json=
                    {
                        "email":inputs[0].value,
                        "password":inputs[1].value,
                    };
        SignIn(json);
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

async function SignIn(userData){


    let data = await fetch("https://sticky-note-fe.vercel.app/signin",{
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
        localStorage.setItem("token",dataJson.token);
        location.href = "./home.html";
    }

}

//  =============> Validation ===============>

const validation = {
    validEmail:/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    validPassword:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
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
    },
    validreturn:function(input , style){
        if(style.test(input.value) == true){
            return true;
        }else{
            return false;
        };
    }
};

inputs[0].addEventListener("input",function(){
    validation.valid(inputs[0],validation.validEmail);
    vv();
});
inputs[1].addEventListener("input",function(){
    validation.valid(inputs[1],validation.validPassword);
    vv();
});

function vv(){
    if(validation.validreturn(inputs[0],validation.validEmail) && validation.validreturn(inputs[1],validation.validPassword)){
        document.querySelector("#btnLogin").removeAttribute("disabled");
    }else{
    document.querySelector("#btnLogin").setAttribute("disabled" , "true");
    }
}