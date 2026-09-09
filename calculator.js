const form = document.getElementById('gs_calc_form'); 
const slider = document.getElementById('dynamic_slider'); 
const output = document.getElementById('sliderValue'); 

// Keep these as global numbers
let openGS = 0; 
let bays_completed = 0; 
let weeklyGS = 0; 
let daily_team_size = 0; 

slider.oninput = function() {
    // 1. Read the CURRENT value of the slider as a number
    const currentSliderVal = Number(slider.value);
    
    // 2. Perform math based on the moving slider
    const remaining = weeklyGS - currentSliderVal; 
    
    // Math logic: (Current Slider Position - Starting Position) / Step Size
    // If the slider is at the start, (bays_completed - bays_completed) / step = 0
    const count = daily_team_size > 0 
        ? Math.floor((currentSliderVal - bays_completed) / daily_team_size) 
        : 0;

    const percentage = weeklyGS > 0 ? (currentSliderVal / weeklyGS) * 100 : 0;

    // 3. Update the text elements dynamically
    const text = translations[currentLang]['baysRemaining']; 
    output.textContent = `${remaining} ${text}`; 
    document.getElementById("percent_label").innerText = `${count} | ${percentage.toFixed(2)}%`; 
}

function updateLabel(event) {
    event.preventDefault(); 
    
    // Convert text inputs to numbers immediately
    openGS = Number(document.getElementById("open_gs").value); 
    bays_completed = Number(document.getElementById("completed_bays").value); 
    daily_team_size = Number(document.getElementById("team_size").value); 

    // Calculate the total weekly goal
    weeklyGS = openGS + bays_completed; 

    // Prevent division by zero errors safely up front
    if (weeklyGS === 0 || daily_team_size === 0) { 
        document.getElementById("percent_label").innerText = "Inputs must be greater than 0."; 
        slider.disabled = true;
        slider.style.opacity = '0.5';
        return; 
    } 

    // Setup and unlock the slider
    slider.style.opacity = '1'; 
    slider.disabled = false; 
    slider.min = bays_completed; 
    slider.max = weeklyGS; 
    slider.step = daily_team_size; 
    slider.value = bays_completed; 
    
    // Trigger the slider's math immediately on form submit
    slider.oninput(); 
}

form.addEventListener("submit", updateLabel);
