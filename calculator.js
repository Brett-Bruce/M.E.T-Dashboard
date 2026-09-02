const form = document.getElementById('gs_calc_form');
const slider = document.getElementById('dynamic_slider');
const output = document.getElementById('sliderValue');

let weeklyGS = 0;
let bays_completed = 0;
let daily_team_size = 0;

slider.oninput = function() {
    const currentBays = Number(this.value); 
    const count = (currentBays - bays_completed) / daily_team_size; 
    const percentage = (currentBays / weeklyGS) * 100;
    
    const remaining = weeklyGS - currentBays;
    
    // Safely reads from the global variables initialized in espanol.js
    const text = translations[currentLang]['baysRemaining'];
    
    output.textContent = `${remaining} ${text}`;
    document.getElementById("percent_label").innerText = `${count} | ${percentage.toFixed(2)}%`;
}

function updateLabel(event) {
    event.preventDefault();
    weeklyGS = document.getElementById("total_gs").value;
    bays_completed = document.getElementById("completed_bays").value;
    daily_team_size = document.getElementById("team_size").value;
    const percentage = (bays_completed / weeklyGS) * 100;
    const count = 0;

    if (Number.isNaN(percentage)) {
        document.getElementById("percent_label").innerText = "Please enter valid numbers";
    } else if (!Number.isFinite(percentage)) {
        document.getElementById("percent_label").innerText = "Inputs must be greater than 0.";
        return;
    } else {
        document.getElementById("percent_label").innerText = count + "|" + percentage.toFixed(2) + "%";
        slider.style.opacity = '1';
        slider.disabled = false;
        slider.min = bays_completed;
        slider.max = weeklyGS;
        slider.step = daily_team_size;
        slider.value = bays_completed;
        slider.oninput();
    }
}

form.addEventListener("submit", updateLabel);
