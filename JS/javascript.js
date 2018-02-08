var votos = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var id = "";
var enlacecomic = $("#cabecero #comicsenlace");
var enlacepersonaje = $("#cabecero #personajesenlace");
var cajacomics = $("#comics");
var cajapersonajes = $("#personajes");


/* Inicio */
$(function () {

    cajapersonajes.hide();
    cajacomics.show();
    

    /* Modales */
    eventosVentanaModal();

    /* Para elegir personajes o comics */
    enlacecomic.on("click",function(){
        enlacepersonaje.removeClass('activecabecero');
        enlacecomic.addClass('activecabecero');
        cajapersonajes.hide();
        cajacomics.show();

    })

    enlacepersonaje.on("click",function(){
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

/*Cabecera*/
function eventosCabecera() {


}

/* Ventana modal */
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

function cargarPaginacion() {
    
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


/* Cargar ventana modal */
function ventanaModal(elemento) {
    limpiarVentanaModal();
    id = $(elemento).attr("id");
    $("body .modal").css('display', 'block');
    $.getJSON("JS/datosimagenes.json", function (json) {
        console.log(json.datosImagenes[0].titulo);
        $(".modal-header #tituloPelicula").append("<span>" + json.datosImagenes[parseInt(id)].titulo + "</span>");
        $(".modal-body").append("<p>" + json.datosImagenes[parseInt(id)].sinopsis + "</p>");
    });
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
    $(".modal-header #tituloPelicula span").remove();
    $("#contenido p").remove();
}

/* Slider */
/* var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = x.length
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex - 1].style.display = "block";
}
*/
/*Fin Slider */

/* Paginador */
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
