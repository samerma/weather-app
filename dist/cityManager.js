
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
        const res = await $.get(`city/${cityName}`)
        if (res == '')
            return 'error'
        this.currentCity = res
        this.currentCity.temperature = Math.floor(this.currentCity.temperature)
        const i = this.favouriteCities.findIndex(c => c.name == this.currentCity.name)
        if (i !== -1)
            this.currentCity.isSaved = true
        else
            this.currentCity.isSaved = false
    }

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














