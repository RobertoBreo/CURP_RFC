
const fechaActual = new Date(Date.now());
let spanCurp = document.getElementById('spanCurp');
let spanRfc = document.getElementById('spanRFC');
let spanEdad = document.getElementById('spanEdad');
let spanResultado = document.getElementById('spanResultado');
let spanCoincidencia = document.getElementById('spanCoincidencia');

const codigosE = ["AS", "BC", "BS", "CC", "CS", "CH", "DF", "CL", "CM", "DG",
    "GT", "GR", "HG", "JC", "MC", "MN", "MS", "NT", "NL", "OC", "PL",
    "QO", "QR", "SP", "SL", "SR", "TC", "TS", "TL", "VZ", "YN", "ZS"];

let meses30 = [4, 6, 8, 11];

document.getElementById("btncurp").addEventListener("click", e => {

    let curp = document.getElementById('curp').value;
    let rfc = document.getElementById('rfc').value;
    spanCurp.innerHTML = "";
    spanEdad.innerHTML = "";
    spanResultado.innerHTML = "";
    spanCoincidencia.innerHTML = "";

    if (curp.substring(0, 10) !== rfc.substring(0, 10)) {
        spanCoincidencia.appendChild(document.createTextNode("Los primeros 10 caracteres de la CURP y RFC no coinciden"));
    } else {

        if (curp.length != 18) {
            spanCurp.appendChild(document.createTextNode("La CURP debe contener 18 caracteres\n"))
            spanCurp.appendChild(document.createElement("br"))
        }

        let regex = /[a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z]/i;
        primeros4curp = curp.substring(0, 5);
        if (!regex.test(primeros4curp)) {
            spanCurp.appendChild(document.createTextNode("Los primeros 4 caracteres deben de ser letras"))
            spanCurp.appendChild(document.createElement("br"))
        }

        sexoCurp = curp.substring(10, 11).toUpperCase();
        if (sexoCurp != "M" && sexoCurp != "H") {
            spanCurp.appendChild(document.createTextNode("El identificador del sexo en la CURP no es válido"))
            spanCurp.appendChild(document.createElement("br"))
        }

        estadoCurp = curp.substring(11, 13).toUpperCase();
        if (!codigosE.includes(estadoCurp)) {
            spanCurp.appendChild(document.createTextNode("El identificador del estado en la CURP no es válido"))
            spanCurp.appendChild(document.createElement("br"))
        }

        let year = parseInt(curp.substring(4, 6));
        let mes = parseInt(curp.substring(6, 8));
        let dia = parseInt(curp.substring(8, 10));
        let flagA = validateYear(year);
        let flagM = validateMonth(mes);
        let flagD = validateDay(dia, mes, year);
        let yearF = 0;
        if (year >= 50) {
            yearF = 1900 + (year * 1);
        } else if (year <= 22) {
            yearF = 2000 + (year * 1);
        }
        const fecha = new Date(Date.parse(yearF + "-" + mes + "-" + dia));
        if (fechaActual.getTime() >= fecha.getTime()) {
            if (flagA && flagM && flagD) {
                let edad = fechaActual.getFullYear() - yearF;
                if ((mes >= (fechaActual.getMonth() + 1)) && (dia >= (fechaActual.getDate() + 1))) {
                    edad--;
                }
                spanEdad.style.setProperty('color', 'green');
                spanEdad.appendChild(document.createTextNode(edad));
//                spanResultado.style.setProperty('color', 'green');
//                spanResultado.appendChild(document.createTextNode("Todo es correcto"));
            } else {
                spanEdad.style.setProperty('color', 'red');
                spanEdad.appendChild(document.createTextNode("No se ha podido calcular la edad"));
            }
        } else {
            spanEdad.style.setProperty('color', 'red');
            spanEdad.appendChild(document.createTextNode("Fecha fuera de rango"));
            spanEdad.appendChild(document.createElement("br"));
        }
    }
});

document.getElementById("btnrfc").addEventListener("click", e => {

    let curp = document.getElementById('curp').value;
    let rfc = document.getElementById('rfc').value;
    spanRfc.innerHTML = "";
    spanEdad.innerHTML = "";
    spanResultado.innerHTML = "";
    spanCoincidencia.innerHTML = "";

    if (curp.substring(0, 10) !== rfc.substring(0, 10)) {
        spanCoincidencia.appendChild(document.createTextNode("Los primeros 10 caracteres de la CURP y RFC no coinciden"));
    } else {

        if (rfc.length != 12) {
            spanRfc.appendChild(document.createTextNode("El RFC debe contener 12 caracteres\n"))
            spanRfc.appendChild(document.createElement("br"))
        }

        let regex = /[a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z]/i;
        primeros4RFc = rfc.substring(0, 5);
        if (!regex.test(primeros4RFc)) {
            spanRfc.appendChild(document.createTextNode("Los primeros 4 caracteres deben de ser letras"))
            spanRfc.appendChild(document.createElement("br"))
        }


        let year = parseInt(curp.substring(4, 6));
        let mes = parseInt(curp.substring(6, 8));
        let dia = parseInt(curp.substring(8, 10));
        let flagA = validateYearR(year);
        let flagM = validateMonthR(mes);
        let flagD = validateDayR(dia, mes, year);
        let yearF = 0;
        if (year >= 50) {
            yearF = 1900 + (year * 1);
        } else if (year <= 22) {
            yearF = 2000 + (year * 1);
        }
        const fecha = new Date(Date.parse(yearF + "-" + mes + "-" + dia));
        if (fechaActual.getTime() >= fecha.getTime()) {
            if (flagA && flagM && flagD) {
                let edad = fechaActual.getFullYear() - yearF;
                if ((mes >= (fechaActual.getMonth() + 1)) && (dia >= (fechaActual.getDate() + 1))) {
                    edad--;
                }
                spanEdad.style.setProperty('color', 'green');
                spanEdad.appendChild(document.createTextNode(edad));
//                spanResultado.style.setProperty('color', 'green');
//                spanResultado.appendChild(document.createTextNode("Todo es correcto"));
            } else {
                spanEdad.appendChild(document.createTextNode("No se ha podido calcular la edad"));
            }
        } else {
            spanEdad.style.setProperty('color', 'red');
            spanEdad.appendChild(document.createTextNode("Fecha fuera de rango"));
            spanEdad.appendChild(document.createElement("br"));
        }
    }
});

function validateYear(year) {
    let flag = true;
    if (isNaN(year)) {
        spanCurp.appendChild(document.createTextNode("Año no válido"))
        spanCurp.appendChild(document.createElement("br"));
        flag = false;
    } else if (!(year >= 50 || year <= 22)) {
        spanCurp.appendChild(document.createTextNode("Año no válido"))
        spanCurp.appendChild(document.createElement("br"));
        flag = false;
    }
    return flag;
}

function validateMonth(mes) {
    let flag = true;
    if (isNaN(mes)) {
        spanCurp.appendChild(document.createTextNode("Mes no válido"))
        spanCurp.appendChild(document.createElement("br"));
        flag = false;
        return false;
    } else if (!(mes >= 1 && mes <= 12)) {
        spanCurp.appendChild(document.createTextNode("Mes no válido"))
        spanCurp.appendChild(document.createElement("br"));
        flag = false;
    }
    return flag;
}

function validateDay(dia, mes, year) {
    let flag = true;
    if (isNaN(dia)) {
        spanCurp.appendChild(document.createTextNode("Día no válido"))
        spanCurp.appendChild(document.createElement("br"));
        flag = false;
    } else if (meses30.includes(mes)) {
        if (!(dia >= 1 && dia <= 30)) {
            spanCurp.appendChild(document.createTextNode("Día no válido"))
            spanCurp.appendChild(document.createElement("br"));
            flag = false;
        }
    } else if (mes == 2) {
        if (year % 4 == 0) {
            if (!(dia >= 1 && dia <= 29)) {
                spanCurp.appendChild(document.createTextNode("Día no válido"))
                spanCurp.appendChild(document.createElement("br"));
                flag = false;
            }
        } else {
            if (!(dia >= 1 && dia <= 28)) {
                spanCurp.appendChild(document.createTextNode("Día no válido"))
                spanCurp.appendChild(document.createElement("br"));
                flag = false;
            }
        }
    } else {
        if (!(dia >= 1 && dia <= 31)) {
            spanCurp.appendChild(document.createTextNode("Día no válido"))
            spanCurp.appendChild(document.createElement("br"));
            flag = false;
        }
    }
    return flag;
}

function validateYearR(year) {
    let flag = true;
    if (isNaN(year)) {
        spanRfc.appendChild(document.createTextNode("Año no válido"))
        spanRfc.appendChild(document.createElement("br"));
        flag = false;
    } else if (!(year >= 50 || year <= 22)) {
        spanRfc.appendChild(document.createTextNode("Año no válido"))
        spanRfc.appendChild(document.createElement("br"));
        flag = false;
    }
    return flag;
}

function validateMonthR(mes) {
    let flag = true;
    if (isNaN(mes)) {
        spanRfc.appendChild(document.createTextNode("Mes no válido"))
        spanRfc.appendChild(document.createElement("br"));
        flag = false;
        return false;
    } else if (!(mes >= 1 && mes <= 12)) {
        spanRfc.appendChild(document.createTextNode("Mes no válido"))
        spanRfc.appendChild(document.createElement("br"));
        flag = false;
    }
    return flag;
}

function validateDayR(dia, mes, year) {
    let flag = true;
    if (isNaN(dia)) {
        spanRfc.appendChild(document.createTextNode("Día no válido"))
        spanRfc.appendChild(document.createElement("br"));
        flag = false;
    } else if (meses30.includes(mes)) {
        if (!(dia >= 1 && dia <= 30)) {
            spanRfc.appendChild(document.createTextNode("Día no válido"))
            spanRfc.appendChild(document.createElement("br"));
            flag = false;
        }
    } else if (mes == 2) {
        if (year % 4 == 0) {
            if (!(dia >= 1 && dia <= 29)) {
                spanRfc.appendChild(document.createTextNode("Día no válido"))
                spanRfc.appendChild(document.createElement("br"));
                flag = false;
            }
        } else {
            if (!(dia >= 1 && dia <= 28)) {
                spanRfc.appendChild(document.createTextNode("Día no válido"))
                spanRfc.appendChild(document.createElement("br"));
                flag = false;
            }
        }
    } else {
        if (!(dia >= 1 && dia <= 31)) {
            spanRfc.appendChild(document.createTextNode("Día no válido"))
            spanRfc.appendChild(document.createElement("br"));
            flag = false;
        }
    }
    return flag;
}

