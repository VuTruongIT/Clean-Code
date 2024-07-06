function calculatePay(employee) {
    return new Promise((resolve, reject) => {
        try {
            switch (employee.type) {
                case 'COMMISSIONED':
                    resolve(calculateCommissionedPay(employee));
                    break;
                case 'HOURLY':
                    resolve(calculateHourlyPay(employee));
                    break;
                case 'SALARIED':
                    resolve(calculateSalariedPay(employee));
                    break;
                default:
                    reject(new InvalidEmployeeType(employee.type));
                    break;
            }
        } catch (error) {
            reject(error);
        }
    });
}