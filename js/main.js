/* Radar chart design created by Nadieh Bremer - VisualCinnamon.com */

////////////////////////////////////////////////////////////// 
//////////////////////// Set-Up ////////////////////////////// 
////////////////////////////////////////////////////////////// 

var margin = { top: 100, right: 100, bottom: 100, left: 100 },
    width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
    height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

d3.csv('data/HORAS_X_TIPO_EQUIPO_TIPO_ORDEN.csv', function (data) {
    ////////////////////////////////////////////////////////////// 
    ////////////////////////// Data ////////////////////////////// 
    ////////////////////////////////////////////////////////////// 
    var misdatos = [];
    var propiedadMes = d3.nest();
    propiedadMes.key(function (d) { return d.mes });
    var listaMes = propiedadMes.entries(data);
    var listaMes_X_equipo = listaMes.filter(fecha => fecha.key == '2013-12')[0].values.filter(equipo => equipo.tipo_equipo == 'TEQ-77');
    var arreglo = [];
    listaMes_X_equipo.forEach(function (d) {
        //console.log(d.tipo_equipo);
        row = {};
        row.axis = d.tipo_orden;
        row.value = +d.trabajo_real || 0;
        arreglo.push(row);
    });
    misdatos.push(arreglo);
    console.log(arreglo);
    ////////////////////////////////////////////////////////////// 
    //////////////////// Draw the Chart ////////////////////////// 
    ////////////////////////////////////////////////////////////// 
    var color = d3.scale.ordinal()
        .range(["#EDC951", "#CC333F", "#00A0B0"]);

    var radarChartOptions = {
        w: width,
        h: height,
        margin: margin,
        maxValue: 1000,
        levels: 5,
        roundStrokes: true,
        color: color
    };
    //Call function to draw the Radar chart
    RadarChart(".radarChart", misdatos, radarChartOptions);
});