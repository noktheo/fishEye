/*******************get data****************************/
//get json data
export async function getData() {
    //get json
    const response = await fetch('../../data/photographers.json', {
        method: 'GET',
        headers: {
            'Accept': 'application/JSON'
        }
    });
    const data = await response.json();

    return data;
}