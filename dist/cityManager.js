class CityManager {
    constructor() {
        this.favouriteCities = []
        this.currentCity = null
    }

    async getDataFromDB() {
        this.favouriteCities = await $.get('cities')
        this.favouriteCities.map(c => c.temperature = Math.floor(c.temperature))
        console.log(this.favouriteCities);
    }

    async getCityData(cityName) {
        this.currentCity = await $.get(`city/${cityName}`)
        this.currentCity.temperature = Math.floor(this.currentCity.temperature)
        const i = this.favouriteCities.findIndex(c => c.name == this.currentCity.name)
        if (i !== -1)
            this.currentCity.isSaved = true
        else
            this.currentCity.isSaved = false
    }

    /* saveCity(city) {
        $.post('city', city, function (response) {
            console.log(response)
        })
    } */
    async saveCity(city) {
        await $.post('city', city)
    }

    async removeCity(cityName) {
        console.log(cityName);

        this.favouriteCities = await $.ajax({
            url: `city/${cityName}`,
            method: "DELETE"
        })
    }
}














