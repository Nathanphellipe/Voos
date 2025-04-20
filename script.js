document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("searchForm");
  const addFlightForm = document.getElementById("addFlightForm");
  const flightsTable = document
    .getElementById("flightsTable")
    .getElementsByTagName("tbody")[0];
  const statusFilter = document.getElementById("statusFilter");

  // Função para adicionar um novo voo
  addFlightForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const destination = document.getElementById("destinationInput").value;
    const date = document.getElementById("dateInput").value;
    const time = document.getElementById("timeInput").value;
    const status = document.getElementById("statusInput").value;

    const newRow = flightsTable.insertRow();
    newRow.innerHTML = `
            
            <td>${destination}</td>
            <td>${date}</td>
            <td>${time}</td>
            <td>${status}</td>
            <td><button class="removeBtn">Remover</button></td>
        `;

    // Adiciona evento de remoção ao botão
    newRow.querySelector(".removeBtn").addEventListener("click", removeFlight);

    // Limpa o formulário
    addFlightForm.reset();
  });

  // Função para remover um voo
  function removeFlight(event) {
    const row = event.target.closest("tr");
    flightsTable.deleteRow(row.rowIndex - 1); // -1 porque o índice da tabela começa em 0
  }

  // Função para buscar voos
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const searchInput = document
      .getElementById("searchInput")
      .value.toLowerCase();
    const rows = flightsTable.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
      const destination = rows[i].cells[1].textContent.toLowerCase();
      if (destination.includes(searchInput)) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    }
  });

  // Função para filtrar voos por status
  statusFilter.addEventListener("change", function () {
    const selectedStatus = this.value;
    const rows = flightsTable.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
      const status = rows[i].cells[4].textContent;
      if (selectedStatus === "" || status === selectedStatus) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    }
  });
});
