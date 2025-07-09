const form = document.getElementById('assetForm');
const tableBody = document.querySelector('#assetTable tbody');
const cancelEditBtn = document.getElementById('cancelEdit');

const API_URL = 'https://expert-space-dollop-wrxjwq5xrwj4c5vw6-3000.app.github.dev/';

// Function to load assets from the backend
async function loadAssets() {
  console.log("Load assets is here")
  try {

    // Replace with the actual API endpoint URL
    const response = await fetch(`${API_URL}assets`);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();

    console.log("Here is the data ")
    console.log(data)

    // Get the table body element
    const tableBody = document.querySelector('#assetTable tbody');
    tableBody.innerHTML = ''; // Clear any existing rows

    // Loop through the data and create table rows
    data.forEach(asset => {
      const row = document.createElement('tr');

      // Create table cells for each asset attribute
      Object.keys(asset).forEach(key => {
        const cell = document.createElement('td');
        cell.textContent = asset[key];
        row.appendChild(cell);
      });

      // Create a cell for action buttons (Edit, Delete)
      const actionCell = document.createElement('td');

      // Edit button
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.onclick = () => editAsset(asset['Asset-ID']);
      actionCell.appendChild(editBtn);

      // Delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.onclick = () => deleteAsset(asset['Asset-ID']);
      actionCell.appendChild(deleteBtn);

      row.appendChild(actionCell);

      // Append the row to the table body
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching asset data:', error);
  }
}


// Handle form submission to save data
form.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log("Form submission triggered");
  const formData = new FormData(form);
  const formDataObj = Object.fromEntries(formData.entries());
  console.log("Form Data: ", formDataObj);
  console.log("Employee-ID selected: ", formDataObj["Employee-ID"]);

  const asset = {
    "Asset-ID": formDataObj["Asset-ID"] ? parseInt(formDataObj["Asset-ID"]) : undefined, // Only use Asset-ID for updates (PUT)
    "Asset-Type": formDataObj["Asset-Type"],
    "Brand": formDataObj["Brand"],
    "Model": formDataObj["Model"],
    "Serial-Number": formDataObj["Serial-Number"] ? parseInt(formDataObj["Serial-Number"]) : undefined,
    "Purchase_Date": formDataObj["Purchase_Date"],
    "Status": formDataObj["Status"],
    "Employee_ID": formDataObj["Employee-ID"] ? parseInt(formDataObj["Employee-ID"]) : undefined  // Send Employee_ID to backend
  };

  console.log("Asset to be saved: ", asset);

  const method = asset["Asset-ID"] ? 'PUT' : 'POST';  // Use PUT for updating, POST for new assets
  const url = asset["Asset-ID"] ? `${API_URL}assets/${asset["Asset-ID"]}` : `${API_URL}assets`;

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(asset)
  })
    .then(async res => {
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save asset.");
      }
      return data;
    })
    .then(() => {
      form.reset();
      loadAssets();  // Reload the assets table after saving
    })
    .catch(err => {
      alert("Error: " + err.message);
    });
});

// Edit an asset
function editAsset(id) {
  fetch(`${API_URL}assets/${id}`)
    .then(res => res.json())
    .then(asset => {
      if (asset) {
        form.elements["Asset-ID"].value = asset["Asset-ID"];
        form.elements["Asset-Type"].value = asset["Asset-Type"];
        form.elements["Brand"].value = asset["Brand"];
        form.elements["Model"].value = asset["Model"];
        form.elements["Serial-Number"].value = asset["Serial-Number"];
        form.elements["Purchase_Date"].value = asset["Purchase_Date"];
        form.elements["Status"].value = asset["Status"];
        form.elements["Employee-ID"].value = asset["Employee_ID"] || ''; 
      }
    });
}

// Delete an asset
function deleteAsset(id) {
  if (confirm("Are you sure you want to delete this asset?")) {
    fetch(`${API_URL}assets/${id}`, { method: 'DELETE' })
      .then(() => loadAssets());
  }
}
window.onload = function () {
  console.log("Script Loaded");
  loadAssets();     // Load assets table
};