function calculate_hours(event) {
    if (event) event.preventDefault();

    const hours_worked = Number(document.getElementById("hours_worked").value);
    const minutes_worked = Number(document.getElementById("minutes_worked").value);
    const clock_in_hour = Number(document.getElementById("clock_in_hour").value);
    const clock_in_minute = Number(document.getElementById("clock_in_minute").value);

    const work_week = 40;
    const hours_to_min = hours_worked * 60;
    const work_week_min = work_week * 60;
    const worked_minutes = minutes_worked + hours_to_min;
    const minutes_left = work_week_min - worked_minutes;
    const clock_in_hour_to_min = clock_in_hour * 60;
    const time_in_min = clock_in_hour_to_min + clock_in_minute;
    const clock_out = time_in_min + minutes_left;

    let quotient1 = Math.trunc(clock_out / 60);
    const remainder1 = clock_out % 60;

    // Pull localized dictionary items from espanol.js definitions
    const localizedClockOut = translations[currentLang]['clockOutAt'];
    const period = (quotient1 >= 12) ? translations[currentLang]['pm'] : translations[currentLang]['am'];

    // Adjust 24hr format to 12hr format standard display
    if (quotient1 >= 13) {
        quotient1 -= 12;
    }

    // Format minutes with leading zero if necessary
    const formattedMinutes = remainder1 <= 9 ? `0${remainder1}` : remainder1;

    // Build the final language-agnostic sentence structure
    document.getElementById("hours_result").textContent = `${localizedClockOut} ${quotient1}:${formattedMinutes} ${period}`;
}