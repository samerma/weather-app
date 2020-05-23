const renderer = new Render()
const cityManager = new CityManager()

const loadPage = async function () {
    await cityManager.getDataFromDB()
    renderer.renderCities(cityManager.favouriteCities, 'cities-template')
}
loadPage()

const handleSearch = async function (cityName) {
    const res = await cityManager.getCityData(cityName)
    if (res !== 'error')
        renderer.renderCities(cityManager.currentCity, 'city-search-result-template')
}

$('#search-btn').on('click', function () {
    const cityName = $('input').val()
    console.log(cityName)
    if (cityName)
        handleSearch(cityName)
})

$('#cities').on('click', '.save-btn', async function () {
    await cityManager.saveCity(cityManager.currentCity)
    cityManager.currentCity.isSaved = true
    renderer.renderCities(cityManager.currentCity, 'city-search-result-template')
})

$('#cities').on('click', '.remove-btn', async function () {
    const cityName = $(this).closest('.cities').data('name')
    await cityManager.removeCity(cityName)
    renderer.renderCities(cityManager.favouriteCities, 'cities-template')
})

$('.fa-chevron-left').on('click', function () {
    loadPage()
    $('input').val('')
})