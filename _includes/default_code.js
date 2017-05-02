// User defined variables //////////////////////////////////////////////////////
// Each distinct label for one patient (without patient id) followed by the
// number of repetitions:
var labels = {"-W04-OGT-P-pre" : 10,
              "-W04-OGT-S-pre" : 4,
              "-W04-OGT-P-+30" : 9,
              "-W04-OGT-S-+30" : 4,
              "-W04-OGT-P-+60" : 7,
              "-W04-OGT-S-+60" : 4,
              "-W04-OGT-P-+120": 7,
              "-W04-OGT-S-+120": 4,
              "-W04-OGT-P-+180": 7,
              "-W04-OGT-S-+180": 4,
              "-W04-OGT-P-+240": 7,
              "-W04-OGT-S-+240": 4};

// Number of patients
var n_patients = 20;

// Number of cells to leave empty (if you want to print the labels on a sheet
// where some labels were already used)
var n_empty = 0;

////////////////////////////////////////////////////////////////////////////////
// Leading zeros in patient ID
var pad_length = n_patients.toString().length;
function pad (str, max) {
  return str.length < max ? pad("0" + str, max) : str;
}

// Set column header, use "Name" because it works with MS Word's Mailing tool
var csv = "Name\n";

// Create empty cells, these have to filled with a tilde (or any other
// character), otherwise the microsoft word labelling tool removes those cells
for (i=0; i < n_empty; i++) {
	csv += "~\n";
}

// Loop to create and export the labels
for (i = 1; i < n_patients+1; i++) {
    for (j in labels) {
        for (k = 0; k < labels[j];k++) {
            csv += pad(i.toString(),pad_length)+j+"\n";
        }
    }
}

// Function to download the data to a file
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

download(csv, "labels.csv", "text/csv")
