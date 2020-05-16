
class CityManager {
    constructor() {
        this.favouriteCities = []
        this.currentCity = null
    }

    async getDataFromDB() {
        this.favouriteCities = await $.get('cities')
        const now = new Date()
        for (let city of this.favouriteCities) {
            const lastUpdate = new Date(city.updatedAt)
            const timeDiff = (new Date(now - lastUpdate)).getMinutes()
            console.log(timeDiff);
            const cityName = city.name
            if (timeDiff >= 60) {
                city = await $.ajax({
                    url: `city/${cityName}`,
                    method: "PUT"
                })
                console.log(`city/${lastUpdate} was updated to ${city.updatedAt}`)
            }
        }
        this.favouriteCities.map(c => c.temperature = Math.floor(c.temperature))
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














