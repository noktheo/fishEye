//event button
button.addEventListener('click', function () {
    if (value) value = false;
    else value = true;
})

// sort by date
const datesArray1 = ["2022-03-14", "2022-04-14", "2022-01-14"];
const datesArray2 = ["2022-03-14", "2022-04-14", "2022-01-14"];

const ascDates = datesArray1.sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
});
const descDates = datesArray2.sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime();
});
console.log(ascDates);
console.log(descDates);

