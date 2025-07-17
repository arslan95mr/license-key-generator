const { v4: uuidv4 } = require('uuid');

class Utils {
    static genId() {
        const uuid = uuidv4();
        return uuid;
    }

    static genIdByDateTime() {
        const now = new Date();
        // Format date parts with leading zeros where needed
        const yy = String(now.getFullYear()).slice(-2);
        const MM = String(now.getMonth() + 1).padStart(2, '0'); // months are 0-based
        const dd = String(now.getDate()).padStart(2, '0');
        const hh = String(now.getHours()).padStart(2, '0');
        const mm = String(now.getMinutes()).padStart(2, '0');
    
        return `${yy}${MM}${dd}${hh}${mm}`;
    }
}

module.exports = Utils;