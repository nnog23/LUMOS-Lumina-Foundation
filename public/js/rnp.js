// FRONT-END JS For Rnp view
const submitBtn = document.querySelector("#createRnp");
const confirmeditBtn = document.querySelector('#confirmeditRnp');
const creaternpForm = document.forms.createRnpForm;
const editrnpForm = document.forms.editRnpForm;

submitBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    const formData = new FormData(creaternpForm);
    
    /*
    console.log('submit');
    const myObj = { 
        title: formData.get("title"),
        body: formData.get("body"),
        date: formData.get("date"),
        published: 0

    };
    console.log(myObj);
    const jString = JSON.stringify(myObj);
    console.log(jString);
    */

    try {
        const response = await fetch("/rnp", {
            method: 'POST',
         // body: jString,
            body: formData,
         /*
            headers: {
                'Content-Type': 'application/json'
            }
         */
        
        });
        
        console.log(response);
        if (response.status === 200) {
            // Check for redirect
            if (response.redirected) {
                window.location.href = response.url;
            } else {
                location.reload();
            }
        } else {
            console.log("Status code received: " + response.status);
        }
    } catch (err) {
        console.error(err);
    }
});

confirmeditBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    const formData = new FormData(editrnpForm);
    console.log('submit');

    const url = window.location.pathname;
    const parts = url.split('/');
    const rnpid = parts[parts.length - 1]; // assuming the id is at the end of the URL

    try {
        const response = await fetch("/rnp/" + rnpid, {
            method: 'PUT',
            body: formData,
        });
        
        console.log(response);
        window.location.href = '/admin/rnp';  
        if (response.status === 200) {
            window.location.href = '/admin/rnp';   
        } else {
            console.log("Status code received: " + response.status);
        }
    } catch (err) {
        console.error(err);
    }
});