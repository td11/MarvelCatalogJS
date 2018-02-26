/* 
+
+
Me falta el tema de votar, la paginacion y 
peticion de personajes, ya que estuve con lo 
de el examen de recuperacion
+
+/
*/

var votos = [];
var tituloComics = [];
var descripcionComics = [];
var id = "";
var enlacecomic = $("#cabecero #comicsenlace");
var enlacepersonaje = $("#cabecero #personajesenlace");
var cajacomics = $("#comics");
var cajapersonajes = $("#personajes");
var contenedorvacio = $('<div></div>');
var paginacion = $('<div></div>');
//<div class="pagination-holder clearfix" id="paginacioncomics"><div id="light-pagination" class="pagination light-theme simple-pagination"></div> </div>

/* Inicio */
$(function () {

    //Cargamos los comics y los personajes
    cargarComics();

    cajapersonajes.hide();
    cajacomics.show();

    /* Modales */
    eventosVentanaModal();

    /* Para elegir personajes o comics */
    enlacecomic.on("click", function () {
        enlacepersonaje.removeClass('activecabecero');
        enlacecomic.addClass('activecabecero');
        cajapersonajes.hide();
        cajacomics.show();

    })

    enlacepersonaje.on("click", function () {
        enlacecomic.removeClass('activecabecero');
        enlacepersonaje.addClass('activecabecero');
        cajacomics.hide();
        cajapersonajes.show();
    })

    //Paginacion
    $("#paginacioncomics").pagination({
        items: 100,
        itemsOnPage: 10,
        cssStyle: 'light-theme'
    });

    $("#paginacionpersonajes").pagination({
        items: 100,
        itemsOnPage: 10,
        cssStyle: 'light-theme'
    });


});



function cargarComics() {
    var cantidadItems = 0;
    var consultaComics = 'https://gateway.marvel.com:443/v1/public/comics?limit=100&offset=0&apikey=d26310aa64bd024c14efa9c7d0dfa3f2';

    $.ajax({
            url: consultaComics,
            dataType: 'json',
            type: 'GET',

            success: function (response) {
                var results = response.data.results;
                var resultsLen = results.length;
                cantidadItems = results.length;
                var output = '<ul>';
                var contenedor = $('#contenedorComics');

                for (var i = 0; i < resultsLen; i++) {
                    votos[i] = 1;
                    contenedor.attr('class', i);
                    if (results[i].images.length > 0) {
                        tituloComics[i] = results[i].title;
                        descripcionComics[i] = results[i].description;
                        var imgPath = results[i].images[0].path + '/standard_xlarge.' + results[i].images[0].extension;
                        output += '<li class="loscomicslista"><img id="' + i + '"src="' + imgPath + '" onclick="ventanaModal(this)" ><br></li>';
                    }
                }
                output += '</ul>'
                contenedor.append(output);

                cargarPaginacionComics(cantidadItems);

            },
            error: function (jqXHR, status) {
                alert('Hubo un error al cargar los datos.');
            },
            beforeSend: function () {
                $('#spinner').html('<img src="img/spinnerloading.gif />"');
            },
            complete: function () {
                $('#spinner').html('');
            }
    });
}

function cargarPersonajes() {

}


/* Ventana modal */
/* Cargar ventana modal */
function ventanaModal(elemento) {
    limpiarVentanaModal();
    id = $(elemento).attr("id");
    $("body .modal").css('display', 'block');
    $(".modal-header #tituloComic").append("<span>" + tituloComics[parseInt(id)] + "</span>");
    $(".modal-body").append("<p>" + descripcionComics[parseInt(id)] + "</p>");
}

function eventosVentanaModal() {
    // When the user clicks on <span> (x), close the modal
    $("div .close").onclick = function () {
        $(".modal").style.display = 'none';
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == $("#modalpeliculas")) {
            $("body .modal").css('display', 'none');
        }
    }

    $('img').keyup(function (e) {
        if (e.keyCode == 13) {
            ventanaModal(this);
        }
    });

    $('.close').keyup(function (e) {
        if (e.keyCode == 13) {
            cerrarModal();
        }
    });
}

function cargarPaginacionComics(cantidadItems) {

    paginate({
        itemSelector: "#contenedorResultados div",
        paginationSelector: "#paginadorComics",
        itemsPerPage: 10
    });

}

function cargarPaginacionPersonajes(cantidadItems) {
    paginate({
        itemSelector: "#contenedorResultados div",
        paginationSelector: "#paginadorPersonajes",
        itemsPerPage: 10
    });
}

/* control de votos */
function votar() {
    var elecciongrafico = $('#contenido #eleccion').find('option:selected').text();
    votos[parseInt(id)]++;
    switch (elecciongrafico) {
        case 'Original':
            cargarGraficoNormal();
            mostrarGraficoOriginal();
            break;
        case 'Donut':
            cargarGraficoDonut();
            mostrarGraficoDonut();
            break;
    }

}






/* Cerrar modal */
function cerrarModal() {
    $("body .modal").css('display', 'none');
    $('#contenido #chart_div').css('display', 'none');
    $('#contenido #donutchart').css('display', 'none');
    $("#contenido form").css('display', 'block');
}

/* Vaciar ventana modal */
function limpiarVentanaModal() {
    $("#tituloComic span").remove();
    $("#contenido p").remove();
}


/* Paginador */
function paginate(options) {
    var items = $(options.itemSelector);
    var numItems = items.length;
    var perPage = options.itemsPerPage;
    items.slice(perPage).hide();
    $(options.paginationSelector).pagination({
        items: numItems,
        itemsOnPage: perPage,
        cssStyle: "dark-theme",
        onPageClick: function (pageNumber) {
            var showFrom = perPage * (pageNumber - 1);
            var showTo = showFrom + perPage;
            items.hide()
                .slice(showFrom, showTo).show();
            return false;
        }
    });
}
/* Fin Paginador */

/* Graficos */

function mostrarGraficoOriginal() {
    $("#contenido p").css('display', 'none');
    $("#contenido form").css('display', 'none');
    $("body .modal").css('display', 'block');
    $('#contenido #chart_div').css('display', 'block');
}

function mostrarGraficoDonut() {
    $("#contenido p").css('display', 'none');
    $("#contenido form").css('display', 'none');
    $("body .modal").css('display', 'block');
    $('#contenido #donutchart').css('display', 'block');
}


/* Cargar google chart*/
function cargarGraficoNormal() {
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(drawChart);

}

/* Cargar grafico donut */
function cargarGraficoDonut() {

    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(drawDonut);

}

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
          ['Blade Runner 2049', votos[0]],
          ['John Wick 2', votos[1]],
          ['Jumanji', votos[2]],
          ['La Liga de la Justicia', votos[3]],
          ['El Rey Arturo', votos[4]],
          ['Logan', votos[5]],
          ['Mazinger Z', votos[6]],
          ['Star Wars TLJ', votos[7]],
          ['Thor Ragnarok', votos[8]],
          ['Valerian', votos[9]]
    ]);

    // Set chart options
    var options = {
        'title': 'Votaciones Mejor Pelicula del año',
        'width': 400,
        'height': 300
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

// dibujar grafico donut
function drawDonut() {
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
          ['Blade Runner 2049', votos[0]],
          ['John Wick 2', votos[1]],
          ['Jumanji', votos[2]],
          ['La Liga de la Justicia', votos[3]],
          ['El Rey Arturo', votos[4]],
          ['Logan', votos[5]],
          ['Mazinger Z', votos[6]],
          ['Star Wars TLJ', votos[7]],
          ['Thor Ragnarok', votos[8]],
          ['Valerian', votos[9]]
    ]);

    var options = {
        title: 'Votos mejor pelicula del año segundo grafico',
        pieHole: 0.4,
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
}
