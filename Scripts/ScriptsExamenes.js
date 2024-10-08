//window.addEventListener("load", CargarDatosResultadosExam);
let datosIngreso = "";
let datosExamenes = "";
let validarIngreso = 0
let nombres = "";
let apellidos = "";
let citas = document.getElementById("citas") ? document.getElementById("citas") : "";
// let examenes = document.getElementById("examenes")
// let autorizacion = document.getElementById("autorizacion")
// let historial = document.getElementById("historial")
// let iframeTramites = document.getElementById("iframeTramites")

let ingresar = document.getElementById("ingresar") ? document.getElementById("ingresar") : ""
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const accion = params.get('Accion');
const documento = params.get('Doc');

if (ingresar != "") {
    ingresar.addEventListener("click", () => {
        var numeroDoc = document.getElementById("txtNumeroDoc").value
        var contraseña = document.getElementById("txtContraseña").value

        if (numeroDoc == "" || contraseña == "") {
            alert("por favor diligenciar todos los campos")
            return false
        }

        datosIngreso.map((datosIngresos) => {
            if (numeroDoc == datosIngresos.NumeroDocumento && contraseña == datosIngresos.Contraseña) {
                validarIngreso = 1
                window.open("PaginaDetalles.html?Accion=infGeneral" + "&Doc=" + numeroDoc, "_self")
                return false
            }
        })

        if (validarIngreso == 0) {
            alert("usuario o contraseña incorrecto")
        }
    })
}

setTimeout(() => {
    //if(accion == "infGeneral" || accion == "solicitud" || "examenes"){
    datosIngreso.map((datosIngresos) => {
        if (documento == datosIngresos.NumeroDocumento) {
            nombres = datosIngresos.Nombres
            apellidos = datosIngresos.Apellidos
            return false
        }
    })

    document.getElementById("lblUsuario") ? document.getElementById("lblUsuario").innerText = nombres + " " + apellidos : "";
    document.getElementById("lblNombreUsuario") ? document.getElementById("lblNombreUsuario").innerText = nombres + " " + apellidos : "";
    if ("infGeneral") {
        document.getElementById("iframeTramites") ? document.getElementById("iframeTramites").setAttribute("src", "SolicitudDeCitas.html?Accion=solicitud" + "&Doc=" + documento) : "";
    }
    document.getElementById("lblUsuarioExamen") ? document.getElementById("lblUsuarioExamen").innerText = nombres + " " + apellidos : "";
    document.getElementById("lblUsuAutorizacion") ? document.getElementById("lblUsuAutorizacion").innerText = nombres + " " + apellidos : "";
    document.getElementById("lblHistorial") ? document.getElementById("lblHistorial").innerText = nombres + " " + apellidos : "";

    //}

}, 500)



document.getElementById("consultaExamen").addEventListener("click", ()=>{
    document.getElementById("contTable") == "none" ? document.getElementById("contTable").style = "" : document.getElementById("contTable").style = "none"
    return false; 
})

function CargarDatosIngreso() {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', './Json/JSONDatos.json', true)
    xhttp.send()
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            datosIngreso = JSON.parse(this.responseText)
        }
    }
    CargarDatosResultadosExam()

}

function CargarDatosResultadosExam() {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', './Json/JSONExamenes.json', true)
    xhttp.send()
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            datosExamenes = JSON.parse(this.responseText)
        }
    }

    setTimeout(() => {
        // Crear la tabla
        const tabla = document.createElement("table");
        const cabecera = tabla.createTHead();
        const filaCabecera = cabecera.insertRow();
        filaCabecera.innerHTML = "<th>Año</th><th>Mes</th><th>Tipo examen</th>";

        const cuerpoTabla = tabla.createTBody();
        datosExamenes.forEach((elemento) => {
            const fila = cuerpoTabla.insertRow();
            fila.innerHTML = `<td>${elemento.Año}</td><td>${elemento.Mes}</td><td>${elemento.TipoDeExamen}</td>`;
        });

        // Agregar la tabla al DOM
        const contenedorTabla = document.getElementById("contTable");
        contenedorTabla.appendChild(tabla);
    })




    // const table = document.createElement("table")
    // const tr1 = document.createElement("tr")
    // const th1 = document.createElement("th")
    // const th2 = document.createElement("th")
    // const th3 = document.createElement("th")
    // const texto1 = document.createTextNode('Texto de');
    // const texto2 = document.createTextNode('Texto de la ');
    // const texto3 = document.createTextNode('Texto de la fila');
    // // const td = document.createElement("td")

    // table.append(tr1)
    // tr1.append(th1)
    // tr1.append(th2)
    // tr1.append(th3)
    // th1.append(texto1)
    // th2.append(texto2)
    // th3.append(texto3)
    // // const r = table.append(tr)
    // // r.append(td)



    // datosExamenes.map((datosExamenes) => {

    //     const td = document.createElement("td")
    //     const textoDesc= document.createTextNode(datosExamenes);

    //     td.append(textoDesc)
    //     tr1.append(td)
    // })

    // document.getElementById("contTable").append(table)
    // console.log(datosExamenes)
}