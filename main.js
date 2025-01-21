generateStyledCheckboxes(36);
//============================================================Local storage
// Function to handle content changes
let miqdarContent = JSON.parse(localStorage.getItem("miqdar")) || "من -- إلى --";

const miqdar = document.querySelector('h4')
miqdar.innerHTML = miqdarContent
miqdar.addEventListener('input', function(){
    miqdarContent = miqdar.innerHTML
    localStorage.setItem("miqdar", JSON.stringify(miqdarContent));
})

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++RECORD
 const mic_btn = document.querySelector('#mic');
 const playback = document.querySelector('.playback');
 mic_btn.addEventListener('click', ToggleMic);
 let can_record = false;
 let is_recording = false;
 let recorder = null;
 let chunks = [];
 
 function SetupAudio() {
     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
         navigator.mediaDevices
             .getUserMedia({
                 audio: true
             })
             .then(SetupStream)
             .catch(err => {
                 console.error(err);
             });
     }
 }

 SetupAudio();

 function SetupStream(stream) {
     recorder = new MediaRecorder(stream);
     recorder.ondataavailable = e => {
         chunks.push(e.data);
     };
     recorder.onstop = e => {
         const blob = new Blob(chunks, {type: "audio/ogg; codecs=opus"});
         chunks = [];
         const audioURL = window.URL.createObjectURL(blob);
         playback.src = audioURL;
     };
     can_record = true;
 }

 function ToggleMic() {
     if (!can_record) return;
     is_recording = !is_recording;
     if (is_recording) {
         recorder.start();
         mic_btn.classList.add("is-recording");
     } else {
         recorder.stop();
         mic_btn.classList.remove("is-recording");
         confirme();
     }
 }
 document.querySelector('#repeat').addEventListener('change', function() {
     const value = this.value;
     generateStyledCheckboxes(value);
     const  selectedRepeat = document.querySelector('.selectedRepeat')
    selectedRepeat.innerHTML = value
 });


//++++++++++++++++++++++++++++++++++++++++++++++ Add a 'change' event listener to each checkbox

    let currentCheckbox = 0;
 const count = document.querySelector('.checkCounter')
    // Select all checkboxes in the container
    const checkboxes = document.querySelectorAll('#checkbox-container input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        const counter = document.querySelector('.checkcounter')
        checkbox.addEventListener('change', (event) => {
            if (event.target.checked) {
                currentCheckbox = (currentCheckbox + 1) % checkboxes.length                
                count.innerHTML = currentCheckbox
                
            } else {
                currentCheckbox = (currentCheckbox - 1) % checkboxes.length
                count.innerHTML = currentCheckbox
            }
        });
    });
//++++++++++++++++++++++++++++++++++++++++++++++++++++++CHECKBOXES GENERATOR

 /* function generateStyledCheckboxes(number) {
     // Get the container
     const container = document.getElementById('checkbox-container');
     // Clear existing checkboxes
     container.innerHTML = '';
     // Generate the specified number of checkboxes
     for (let i = 1; i <= number; i++) {
         // Create the label element
         const label = document.createElement('label');
         label.className = 'circle-checkbox';
         label.id = `check-${i}`;
 
         // Create the input element
         const input = document.createElement('input');
         input.type = 'checkbox';
 
         // Create the span element
         const span = document.createElement('span');
 
         // Append input and span to label
         label.appendChild(input);
         label.appendChild(span);
 
         // Append the label to the container
         container.appendChild(label);
     }
 } */

     function generateStyledCheckboxes(number) {
        // Get the container
        const container = document.getElementById('checkbox-container');
        // Clear existing checkboxes
        container.innerHTML = '';
    
        // Get the saved checkbox states from localStorage
        const savedStates = JSON.parse(localStorage.getItem('checkboxStates')) || {};
    
        // Generate the specified number of checkboxes
        for (let i = 1; i <= number; i++) {
            // Create the label element
            const label = document.createElement('label');
            label.className = 'circle-checkbox';
            label.id = `check-${i}`;
    
            // Create the input element
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = `checkbox-${i}`;
    
            // Set the checkbox state from localStorage
            if (savedStates[input.id]) {
                input.checked = true;
            }
    
            // Add event listener to save state on change
            input.addEventListener('change', () => {
                savedStates[input.id] = input.checked;
                localStorage.setItem('checkboxStates', JSON.stringify(savedStates));
            });
    
            // Create the span element
            const span = document.createElement('span');
    
            // Append input and span to label
            label.appendChild(input);
            label.appendChild(span);
    
            // Append the label to the container
            container.appendChild(label);
        }
    }
    
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++CHECKBOXES CHECKER
function cycleCheckboxes() {
    const checkboxes = document.querySelectorAll('#checkbox-container input');
    
    // Only check the next checkbox, keep previous ones checked
    if (checkboxes[currentCheckbox]) {
        checkboxes[currentCheckbox].checked = true;
    }
    
    // Move to the next checkbox (if at the end, it loops back)
    currentCheckbox = (currentCheckbox + 1) % checkboxes.length;
    
}



 // Custom confirmation modal
 function confirme() {
     // Show the custom modal
     document.getElementById("customModal").style.display = "flex";
 }

 function handleResponse(response) {
     if (response) {
         cycleCheckboxes();
     }
     // Close the modal after the user selects an option
     document.getElementById("customModal").style.display = "none";
 }

 function cycleCheckboxes() {
     const checkboxes = document.querySelectorAll('#checkbox-container input');
     if (checkboxes[currentCheckbox]) {
         checkboxes[currentCheckbox].checked = true;
     }
     currentCheckbox = (currentCheckbox + 1) % checkboxes.length;
     count.innerHTML = currentCheckbox
 }