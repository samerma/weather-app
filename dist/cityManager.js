
class CityManager {
    constructor() {
        this.favouriteCities = []
        this.currentCity = null
    }

    async getDataFromDB() {
        this.favouriteCities = await $.get('cities')
        let now = new Date().toUTCString()
        now = new Date(now)
        for (let city of this.favouriteCities) {
            const ua = city.updatedAt
            const lastUpdate = new Date(city.updatedAt)
            const timeDiff = new Date(now - lastUpdate).getUTCHours()
            const cityName = city.name
            if (timeDiff >= 2) {
                city = await $.ajax({
                    url: `city/${cityName}`,
                    method: "PUT"
                })
                console.log(`city/${ua} was updated to ${city.updatedAt}`)
            }
        }
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
        this.favouriteCities = await $.ajax({
            url: `city/${cityName}`,
            method: "DELETE"
        })
    }
}














