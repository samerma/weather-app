const renderer = new Render()
const cityManager = new CityManager()

const loadPage = async function () {
    await cityManager.getDataFromDB()
    renderer.renderCities(cityManager.favouriteCities, 'cities-template')
}
loadPage()

const handleSearch = async function (cityName) {
    await cityManager.getCityData(cityName)
    renderer.renderCities(cityManager.currentCity, 'city-search-result-template')
}

$('#search-btn').on('click', function () {
    const cityName = $('input').val()
    handleSearch(cityName)
})

$('#cities').on('click', '.save-btn', function () {
    cityManager.saveCity(cityManager.currentCity)
})

$('#cities').on('click', '.remove-btn', async function () {
    const cityName = $(this).closest('.city').data('name')
    await cityManager.removeCity(cityName)
    renderer.renderCities(cityManager.favouriteCities, 'cities-template')
})