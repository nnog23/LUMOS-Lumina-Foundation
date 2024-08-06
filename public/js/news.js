// FRONT-END JS For News view
const submitBtn = document.querySelector("#createNews");
const confirmeditBtn = document.querySelector('#confirmeditNews');
const createnewsForm = document.forms.createNewsForm;
const editnewsForm = document.forms.editNewsForm;

submitBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    const formData = new FormData(createnewsForm);
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

    try {
        const response = await fetch("/news", {
            method: 'POST',
            body: jString,
            headers: {
                'Content-Type': 'application/json'
            }
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
    const formData = new FormData(editnewsForm);
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

    const url = window.location.pathname;
    const parts = url.split('/');
    const newsid = parts[parts.length - 1]; // assuming the id is at the end of the URL

    try {
        const response = await fetch("/news/" + newsid, {
            method: 'PUT',
            body: jString,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log(response);
        window.location.href = '/admin/news';  
        if (response.status === 200) {
            window.location.href = '/admin/news';   
        } else {
            console.log("Status code received: " + response.status);
        }
    } catch (err) {
        console.error(err);
    }
});