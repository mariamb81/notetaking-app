console.log("viewNotes.js running");
let numOfNotes = 0;
const getNotes = () => {
    console.log("getNotes running");
    const messagesRef = firebase.database().ref();
    messagesRef.on('value', (snapshot) => {
    const data = snapshot.val();
    // console.log(data.users[googleUser.uid]);
    findMessage(data.users[googleUser.uid]);
    });
};

const findMessage = (messages) => {
    console.log("findMessages running")
    for (message in messages) {
        let label = messages[message].label.toLowerCase();
        let note = messages[message];
        console.log(label)
        console.log(note)
        
        if (label == "school") {
            renderMessageAsHTML(note,"School")
        }
        else if (label == "work") {
            renderMessageAsHTML(note,"Work")
        }
        else {
            renderMessageAsHTML(note,"Other")
        }
        
    };
};

const renderMessageAsHTML = (note, label) => {
    console.log("renderMessageAsHtml running")
    numOfNotes++;
    console.log(numOfNotes)
    // Render messageas HTML
    let i = 0;
    document.getElementById("column-" + (numOfNotes)).innerHTML = `<article class="message">
          <div class="message-header">
            <p id="title-${numOfNotes}">Hello World</p>
            <button class="delete" aria-label="delete"></button>
          </div>
          <div class="message-body" id="note-${numOfNotes}">Note</div>
          <p id="date-${numOfNotes}">Date:</p>
        </article>`

    console.log("--variable allocation started--")
    for (x in note) {
        const noteVal = note[x];
        switch(i){
            case 0: //timestamp
                const dateFormat = new Date(noteVal).toUTCString();;
                document.getElementById("date-" + (numOfNotes)).innerHTML = dateFormat;
                break;
            // case 1:
            //     break;
            case 2://text
                document.getElementById("note-" + (numOfNotes)).innerHTML = noteVal;
                break;
            case 3: //title
                document.getElementById("title-" + (numOfNotes)).innerHTML = noteVal;
                break;                
        }
        console.log(i);
        console.log(noteVal);
        i++;
    }
};
