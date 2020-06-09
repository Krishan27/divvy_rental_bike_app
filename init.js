var csv = require("csvtojson");
var axios = require("axios");

const STATION_URL = 'https://gbfs.divvybikes.com/gbfs/en/station_information.json';
const TRIP_FILE_PATH = './resources/Divvy_Trips_2019_Q2'


async function init_trips() {
    try {
        console.log("init trips");
        const jsonArray=await csv().fromFile(TRIP_FILE_PATH);
        return  jsonArray;

    } catch (e) {
        console.log(e)
        return [];
    }

}

async function init_stations() {
    try {
        console.log("init station")
        let res = await axios.get(STATION_URL);

        let data = res.data;
        return data.data.stations;
    } catch (e) {
        console.log(e)
        return []
    }
}

module.exports = {
    init_stations,  init_trips
};