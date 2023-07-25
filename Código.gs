var SPREADSHEET_ID = "176hylIg9r_dvzA9Yl9nDPiqzKTPT4WHtJMyye7r8RMw";
var SHEET_NAME = "ParadasV4";

function doPost(e) {
  var data = JSON.parse(e.postData.contents);

  if (data.type === "iniciarParada") {
    return iniciarParada(data);
  } else if (data.type === "finalizarParada") {
    return finalizarParada(data);
  } else {
    return ContentService.createTextOutput("Erro: Tipo de requisição inválida");
  }
}

function iniciarParada(data) {
  var row = [
    data.dataHoraInicial,
    data.nomeOperador,
    data.produto,
    data.maquina,
    data.motivoParada
  ];

  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  sheet.appendRow(row);

  return ContentService.createTextOutput("Parada iniciada com sucesso!");
}

function finalizarParada(data) {
  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  var lastRow = sheet.getLastRow();
  sheet.getRange(lastRow, 2).setValue(data.dataHoraFinal);
  sheet.getRange(lastRow, 7).setValue(data.tempoDecorrido);

  return ContentService.createTextOutput("Parada finalizada e dados salvos com sucesso!");
}
