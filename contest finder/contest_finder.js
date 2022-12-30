const prompt = require ("prompt-sync")({sigint: true})

function fetchContestSoon(){
    const searchURL = new URL("https://kontests.net/api/v1/all");
    return fetch(searchURL.toString())
        .then(res => res.json())
        .then(json => json.filter(comp => comp.in_24_hours === 'Yes').reduce((names,n) =>{names.push(n.name); return names;}, []))
}

function fetchContestMonth(input){
    const searchURL = new URL("https://kontests.net/api/v1/all");
    return fetch(searchURL.toString())
        .then(res => res.json())
        .then(json => json.filter(comp => {
            if(comp.status === 'CODING'){
                if((new Date(comp.end_time)).getFullYear() === input.y){return (new Date(comp.end_time)).getMonth() >= input.m;}
                else if((new Date(comp.end_time)).getFullYear() > input.y){return true}
                else{return false}
            }
            else{
                if((new Date(comp.start_time)).getFullYear() > input.y){return false}
                else if((new Date(comp.start_time)).getFullYear() === input.y && (new Date(comp.start_time)).getMonth() <= input.m){
                    if((new Date(comp.end_time)).getFullYear() === input.y){return (new Date(comp.end_time)).getMonth() >= input.m}
                    else{return true}
                }
                else if((new Date(comp.start_time)).getFullYear() === input.y && (new Date(comp.start_time)).getMonth() > input.m){return false}
                else{return false}
            }
        }).reduce((names,n) =>{names.push(n.name); return names;}, []))
}

let soon = prompt("Are you looking for a competition beginning in the next 24 hours?('Yes' or 'No') : ").toLowerCase();;
while(soon !== 'y' && soon !== 'yes' && soon !== 'n' && soon !== 'no'){
    soon = prompt("Please enter 'Yes'(Y) or 'No'(N)").toLowerCase();;
}

if(soon === 'y' || soon === 'yes'){
    fetchContestSoon().then(x => {console.log(x)})
}
else{
    let monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

    let year = prompt("Specify which year you are looking for a competition in : ");
    let boolY = false;
    function fYear(){
        if(isNaN(Number(year))){boolY = true}
        else if(Number(year) >= (new Date()).getFullYear()){
            boolY = false;
        }
        else {
            boolY = true;
        }
    }
    fYear();
    
    while(boolY){
        year = prompt("The year has to be the current year or future years : ");
        fYear();
    }

    let pos = 0;
    if((new Date()).getFullYear === year){
        pos = (new Date()).getMonth;
    }

    let month = prompt("Specify which month you are looking for a competition in (Provide the name or number of the month) : ").toLowerCase();
    let boolM = false;

    function fMonth(){
        if(Number(month) >= pos + 1 && Number(month) <= 12){
            boolM = false;
        }
        else {
            boolM = true;
        }
    }
    fMonth();


    while(boolM && !monthNames.includes(month, pos)){
        month = prompt("Provide the name or number of the month (If the provided year is the current year then the month has to be from the current month to December) : ").toLowerCase();
        fMonth(); 
    }
    month = isNaN(Number(month)) ? monthNames.indexOf(month) : Number(month) - 1;

    fetchContestMonth({y: Number(year), m: month}).then(x => x.length > 0 ? console.log(x) : console.log('No competitions found'))

}

