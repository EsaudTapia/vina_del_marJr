function limpiar(texto)
{
    var i;
    for (i = 0; i < texto.length; i++) {
        texto = texto.replace(")", "");
        texto = texto.replace(";", "");
        texto = texto.replace("'", "");
        texto = texto.replace('"', '');
        texto = texto.replace("*", "");
        texto = texto.replace("/", "");
        texto = texto.replace("+", "");
        texto = texto.replace("(", "");
        texto = texto.replace("%", "");
        texto = texto.replace("{", "");
        texto = texto.replace("}", "");
        texto = texto.replace("[", "");
        texto = texto.replace("]", "");
        texto = texto.replace(">", "");
        texto = texto.replace("<", "");
        texto = texto.replace("=", "");
    }
    return texto;
}

function normalizar(texto) {
    texto = texto.replace("Á", "A");
    texto = texto.replace("É", "E");
    texto = texto.replace("Í", "I");
    texto = texto.replace("Ó", "O");
    texto = texto.replace("Ú", "U");
    texto = texto.replace("á", "a");
    texto = texto.replace("é", "e");
    texto = texto.replace("í", "i");
    texto = texto.replace("ó", "o");
    texto = texto.replace("ú", "u");

    texto=MaysPrimera(texto);
    return texto;
}

  function MaysPrimera(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}
