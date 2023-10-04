parseCSV = (csv) => {
    let rows = csv.split("\n");
    console.log(rows)
    let tableHTML = "<thead><tr>";

    // Assuming the first row contains headers
    let headers = rows[0].split(",");
    // Generate table headers
    for (let i = 0; i < headers.length; i++) {
        tableHTML += "<th>" + headers[i] + "</th>";
    }

    tableHTML += "</tr></thead><tbody>";

    // Generate table rows
    console.log(rows[1])
    for (let i = 1; i < rows.length; i++) {
        let cells = rows[i].split(",");
        tableHTML += "<tr>";

        for (let j = 0; j < cells.length; j++) {
            tableHTML += "<td>" + cells[j] + "</td>";
        }

        tableHTML += "</tr>";
    }

    tableHTML += "</tbody>";

    return tableHTML;
};

doTable2 = (csv) => {
    categories = { alpha: [5, 20, "add"], beta: [15, 7, "divide"], charlie: [13, 12, "mult"] }
    values = []
    let rows = csv.split("\n");
    let tableHTML =
        "<thead><tr><th>Category</th><th>Value</th></tr></thead><tbody>";
    for (let i = 1; i < rows.length; i++) {
        let cells = rows[i].split(",");
        values.push(parseInt(cells[1]))
    }
    for (key in categories) {
        let category_data = categories[key]
        let value;
        let operand1 = values[category_data[0] - 1]
        let operand2 = values[category_data[1] - 1]
        if (category_data[2] == "add") {
            value = operand1 + operand2;
        } else if (category_data[2] == "divide") {
            value = operand1 / operand2;
        } else {
            value = operand1 * operand2;
        }

        tableHTML += "<tr><td>" + key[0].toUpperCase() + key.substring(1) + "</td><td>" + value + "</td></tr>"
    }

    tableHTML += "</tbody>"

    return tableHTML
}

fetch("Table_Input.csv") // Replace 'data.csv' with your CSV file path
    .then((response) => {
        return response.text();
    })
    .then((data) => {
        let table = document.getElementById("csvTable");
        let table2 = document.getElementById("table2");
        table.innerHTML = parseCSV(data);
        table2.innerHTML = doTable2(data);
    })
    .catch((error) => console.error("Error:", error));
