// FRONT-END JS For Rnp view
const loginBtn = document.querySelector("#loginaccount");
const loginForm = document.forms.loginForm;


loginBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);


    console.log('login');
    const myObj = { 
        username: formData.get("username"),
        password: formData.get("password"),
    };
    console.log(myObj);
    const jString = JSON.stringify(myObj);
    console.log(jString);
    

    try {

        const response = await fetch("/login", {
            method: 'POST',
            body: jString,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log(response);
            
        const result = await response.json();
        
        if (response.status === 200) {

            window.location.href = '/admin/news';
           
            
        } else {

            document.getElementById('errorMessage').textContent = result.message;

        }
   
    } catch (err) {
        console.error(err);
    }
});
