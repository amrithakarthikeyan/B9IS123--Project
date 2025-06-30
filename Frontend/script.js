const form = document.getElementById('assetForm');
const tableBody = document.querySelector('#assetTable tbody');
const cancelEditBtn = document.getElementById('cancelEdit');

const API_URL = 'https://expert-space-dollop-wrxjwq5xrwj4c5vw6-3000.app.github.dev/';

console.log("Script loaded");

function loadAssets() {
  fetch(API_URL + 'assets')
    .then(res => res.json())
    .then(data => {
      tableBody.innerHTML = '';
      data.forEach(asset => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${asset['Asset-ID']}</td>
          <td>${asset['Asset-Type']}</td>
          <td>${asset.Brand}</td>
          <td>${asset.Model}</td>
          <td>${asset['Serial-Number']}</td>
          <td>${asset.Purchase_Date}</td>
          <td>${asset.Status}</td>
          <td>
            <button onclick="editAsset(${asset['Asset-ID']})">Edit</button>
            <button onclick="deleteAsset(${asset['Asset-ID']})">Delete</button>
          </td>`;
        tableBody.appendChild(row);
      });
    });
}


