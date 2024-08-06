// FRONT-END JS For Events view
const submitBtn = document.querySelector("#createEvents");
const confirmeditBtn = document.querySelector('#confirmeditEvents');
const createeventsForm = document.forms.createEventsForm;
const editeventsForm = document.forms.createEventsForm;

submitBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    const formData = new FormData(eventsForm);
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
        const response = await fetch("/events", {
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
    const formData = new FormData(editeventsForm);
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
    const eventsid = parts[parts.length - 1]; // assuming the id is at the end of the URL

    try {
        const response = await fetch("/events/" + eventsid, {
            method: 'PUT',
            body: jString,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log(response);
        window.location.href = '/admin/events';  
        if (response.status === 200) {
            window.location.href = '/admin/events';   
        } else {
            console.log("Status code received: " + response.status);
        }
    } catch (err) {
        console.error(err);
    }
});