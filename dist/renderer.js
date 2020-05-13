class Render {
    renderCities(data, templateId) {
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