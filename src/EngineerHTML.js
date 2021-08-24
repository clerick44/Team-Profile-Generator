const engineerCard = function (employee) {
  return `
      <div class="col-4 mt-4">
          <div class="card h-100">
              <div class="card-header">
                  <h3>${employee.name}</h3>
                  <h4>Engineer</h4><i class="material-icons">laptop_mac</i>
              </div>
              <div class="card-body">
                  <p class="id">ID: ${employee.id}</p>
                  <p class="email">Email: <a href="mailto:${employee.email}">${employee.email}</a></p>
                  <p class="github">Github: <a href="https://github.com/${employee.github}">${employee.github}</a></p>
              </div>
          </div>
      </div>
      `;
};

module.exports = engineerCard;
