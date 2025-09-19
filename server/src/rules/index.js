const rules = {
  ServerRoom: {
    minAccessLevel: 2,
    openTime: "09:00",
    closeTime: "11:00",
    coolDownPeriod: 15,
  },
  Vault: {
    minAccessLevel: 3,
    openTime: "09:00",
    closeTime: "10:00",
    coolDownPeriod: 30,
  },
  "R&D Lab": {
    minAccessLevel: 1,
    openTime: "08:00",
    closeTime: "12:00",
    coolDownPeriod: 10,
  },
};

function toMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function simulateAccess(employees) {
  const accessHistory = {};
  const simulatedEmployees = [];

  for (let employee of employees) {
    const ruleApplied = rules[employee.room];
    const requestTime = toMinutes(employee.request_time);

    if (!ruleApplied) {
      simulatedEmployees.push({
        ...employee,
        status: "Denied",
        reason: "Invalid room",
      });
      continue;
    }

    if (employee.access_level < ruleApplied.minAccessLevel) {
      simulatedEmployees.push({
        ...employee,
        status: "Denied",
        reason: "Below required level",
      });
      continue;
    }

    if (
      requestTime < toMinutes(ruleApplied.openTime) ||
      requestTime > toMinutes(ruleApplied.closeTime)
    ) {
      simulatedEmployees.push({
        ...employee,
        status: "Denied",
        reason: "Room closed",
      });
      continue;
    }

    const lastAccess =
      accessHistory[`${employee.id}_${employee.room}`] ?? -9999;
    if (requestTime - lastAccess < ruleApplied.coolDownPeriod) {
      simulatedEmployees.push({
        ...employee,
        status: "Denied",
        reason: "Cooldown not finished",
      });
      continue;
    }

    accessHistory[`${employee.id}_${employee.room}`] = requestTime;
    simulatedEmployees.push({
      ...employee,
      status: "Granted",
      reason: `Access granted to ${employee.room}`,
    });
  }

  return simulatedEmployees;
}

export default simulateAccess;
