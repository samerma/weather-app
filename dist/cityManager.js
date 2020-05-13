class CityManager {
    constructor() {
        this.cityData = []
    }

    getDataFromDB() {
        $.get('cities', function (cities) {
            this.cityData = cities
            console.log(this.cityData);
        })
    }

    getCityData(cityName) {
        $.get(`city/${cityName}`, function (city) {
            console.log(city);

        })
    }
}
cm = new CityManager()
cm.getDataFromDB()
cm.getCityData('london')