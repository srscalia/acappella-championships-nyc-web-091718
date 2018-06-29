console.log("Page loaded");

function tableRow(){
  const tableBody = document.getElementById('table-body')
  const newRow = `<tr> <td></td> <td></td> <td></td> <td></td> <td><img src="trophy.png" height="40" width="40"></td> </tr>`
  tableBody.innerHTML += newRow
}

tableRow()
