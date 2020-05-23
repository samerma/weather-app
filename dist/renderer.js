class Render {
    renderCities(data, templateId) {
        if (templateId == 'cities-template')
            $('.fa-chevron-left').hide()
        else
            $('.fa-chevron-left').show()
        $("#cities").empty()
        const source = $('#' + templateId).html()
        const template = Handlebars.compile(source)
        let newHTML
        if (Array.isArray(data))
            newHTML = template({ cities: data })
        else
            newHTML = template(data)
        $("#cities").append(newHTML)
    }
}