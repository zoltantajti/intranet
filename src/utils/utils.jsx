export const getElapsedTime = (time) => {
    let result = null;
    if (time) {
        const pastDate = new Date(time);
        const now = new Date();
        let eSeconds = Math.floor((now - pastDate) / 1000);
        let minutes = Math.floor(eSeconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);
        if(eSeconds > 0){
            if (minutes < 60) { result = `${minutes} perce`; }
            else if (hours < 24) { result = `${hours} órája`; }
            else if (days > 30) { result = `1+ hónapja`; }
            else { result = `${days} napja`; };
        }else{
            eSeconds = Math.abs(eSeconds);
            minutes = Math.abs(minutes);
            hours = Math.abs(hours);
            days = Math.abs(days);
            if (minutes < 60) { result = `${minutes} perc múlva`; }
            else if (hours < 24) { result = `${hours} óra múlva`; }
            else if (days > 30) { result = `1+ hónap múlva`; }
            else { result = `${days} nap múlva`; };
        };
    }
    return result;

}