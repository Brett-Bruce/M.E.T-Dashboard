// 1. Define the translation dictionary
const translations = {
    en: {
        welcome: "Current Time: ",
        toggleBtn: "Español",
        gs: "G.S Calculator",
        bay: "G.S Bay Counter",
        hours: "Friday",
        home: "Home",
        submit: "Submit",
        totalgs: "Enter Total G.S",
        start: "Start",
        stop: "Stop",
        reset: "Reset",
        totalgs: "Enter Total G.S",
        compbays: "Enter # of Completed Bays",
        ts: "Enter the Team Size",
        hoursW: "Hours Worked",
        minsW: "Minutes Worked",
        CIH: "Clock-in Hour",
        CIM: "Clock-in Minute",
        baysRemaining: "Bays Remaining",
        clockOutAt: "Clock out at",
        am: "AM",
        pm: "PM"
    },
    es: {
        welcome: "Hora Actual: ",
        toggleBtn: "English",
        gs: "Calculadora G.S",
        bay: "Contador de Bahías G.S",
        hours: "Viernes",
        home: "Casa",
        submit: "Entregar",
        totalgs: "Ingrese el total de G.S",
        start: "Comenzar",
        stop: "Detener",
        reset: "Reiniciar",
        totalgs: "Ingrese el total de G.S",
        compbays: "Ingrese el # de bahías completados",
        ts: "Ingrese el tamaño del equipo",
        hoursW: "Horas Trabajadas",
        minsW: "Minutos Trabajados",
        CIH: "Hora de Registro de Entrada",
        CIM: "Registrar la Hora de Entrada",
        baysRemaining: "Bahías Restantes",
        clockOutAt: "Registrar salida a las",
        am: "AM",
        pm: "PM"
    }
};

// 2. Select the button element
const langToggleBtn = document.getElementById('lang-toggle');

// 3. Track the current language (default to English or saved preference)
let currentLang = localStorage.getItem('preferredLang') || 'en';

// 4. Function to update the page content
function updateLanguage(lang) {
    // FIX: Grab the elements FRESH every time the function runs
    const translatableElements = document.querySelectorAll('[data-key]');
    
    // Update all elements with a data-key attribute
    translatableElements.forEach(element => {
        const key = element.getAttribute('data-key');
        // Safety check: only change text if the key exists in our dictionary
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // FIX: Safety check to make sure the button exists before changing its text
    if (langToggleBtn && translations[lang] && translations[lang]['toggleBtn']) {
        langToggleBtn.textContent = translations[lang]['toggleBtn'];
    }
    
    // Update the HTML global lang attribute
    document.documentElement.lang = lang;

    // Refresh slider text if the slider script is loaded and active
    const slider = document.getElementById('dynamic_slider');
    if (slider && !slider.disabled && typeof slider.oninput === 'function') {
        slider.oninput();
    }

    if (typeof calculate_hours === 'function' && document.getElementById("hours_result").textContent !== "") {
        calculate_hours(); 
    }
}

// 5. Add event listener to the toggle button
if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
        // Toggle between 'en' and 'es'
        currentLang = currentLang === 'en' ? 'es' : 'en';
        // Save selection to localStorage
        localStorage.setItem('preferredLang', currentLang);
        // Apply changes
        updateLanguage(currentLang);
    });
}

// 6. Initialize page with the correct language on load
updateLanguage(currentLang);