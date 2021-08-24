const managerCard = async function (employee) {
  return `
      <div class="col-4 mt-4">
          <div class="card h-100">
              <div class="card-header">
                  <h3>${employee.name}</h3>
                  <h4>Manager</h4><i class="material-icons">content_paste</i>
              </div>
              <div class="card-body">
                  <p class="id">ID: ${employee.id}</p>
                  <p class="email">Email: <a href="mailto:${employee.email}">${employee.email}</a></p>
                  <p class="office">Office Number: ${employee.officeNumber}</p>
              </div>
          </div>
      </div>
      `;
};

module.exports = managerCard;
