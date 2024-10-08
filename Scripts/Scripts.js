window.addEventListener("load", CargarDatosIngreso);
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



citas.addEventListener("click", () => {
    iframeTramites.src = "SolicitudDeCitas.html?Accion=solicitud" + "&Doc=" + documento
})

examenes.addEventListener("click", () => {
    iframeTramites.src = "Examenes.html?Accion=examenes" + "&Doc=" + documento
    CargarDatosResultadosExam()
})

autorizacion.addEventListener("click", () => {
    iframeTramites.src = "Autorizacion.html?Accion=autorizacion" + "&Doc=" + documento
})

historial.addEventListener("click", () => {
    iframeTramites.src = "HistorialClinico.html?Accion=historial" + "&Doc=" + documento
})

document.getElementById("consultaAuto").addEventListener("click", ()=>{
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
    //const table = document.createElement("table")
    // const tr = document.createElement("tr")
    // const td = document.createElement("td")

    // const r = table.append(tr)
    // r.append(td)

    //document.getElementById("contTable").append(table)

    console.log(datosExamenes)
}