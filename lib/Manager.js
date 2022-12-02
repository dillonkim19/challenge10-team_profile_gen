
const Employee = require("./Employee");

class Manager extends Employee {
    constructor (name, id, email, officeNumber) {
        super (name, id, email, 'Manager')
        this.officeNumber = officeNumber;
    }

    // getRole() {
    //     this.role
    // }

    getOfficeNumber() {
        return this.officeNumber;
    }
}

module.exports = Manager;
