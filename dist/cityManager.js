class CityManager {
    constructor() {
        this.favouriteCities = []
        this.currentCity = null
    }

    /*  async getDataFromDB() {
         $.get('cities').then((cities) => {
             this.favouriteCities = cities
             console.log(this.favouriteCities);
         })
     } */

    async getDataFromDB() {
        this.favouriteCities = await $.get('cities')
        console.log(this.favouriteCities);
    }

    /*  getCityData(cityName) {
         $.get(`city/${cityName}`, function (city) {
             console.log(city);
             this.currentCity = city
         })
     } */
    async getCityData(cityName) {
        this.currentCity = await $.get(`city/${cityName}`)
    }

    saveCity(city) {
        $.post('city', city, function (response) {
            console.log(response)
        })
    }
    /* async saveCity(city) {
        await $.post('city', city)
    } */

    /* async removeCity(cityName) {
        await $.ajax({
            url: `city/${cityName}`,
            method: "DELETE",
            success: function (updatedCities) {
                this.favouriteCities = updatedCities
                console.log(this.favouriteCities)
            }
        })
    } */
    async removeCity(cityName) {
        this.favouriteCities = await $.ajax({
            url: `city/${cityName}`,
            method: "DELETE"
        })
    }
}














