const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');
const Utils = require('../helper/utils');

const PRIVATE_KEY = fs.readFileSync('./license/private.key', 'utf-8');

const licensePath = path.join(__dirname, './../generated');

const getList = (req, res) => {
    try {
        const files = fs.readdirSync(licensePath);
        const list = files.map(file => {
            const token = fs.readFileSync(`${licensePath}/${file}`, 'utf-8');
            const payload = jwt.decode(token);

            return { ...payload, filename: file };
        });

        return res.status(200).json({ msg: 'Success', data: list });
    } catch(error) {
        throw Error('Error occurred');
    }
}

const download = (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(licensePath, filename);

        if (fs.existsSync(filePath)) {
            res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
            res.setHeader('Content-Type', 'application/octet-stream');

            return res.status(200).sendFile(filePath);
        } else res.status(404).send('File not found');

        return res.download;
    } catch(error) {
        throw Error('Error occurred');
    }
}

const createOne = (req, res) => {
    try {
        const { customer, type } = req.body;

        if (!customer || !type)
        return res.status(400).json({ msg: 'Missing required fields.' });
        
        const { token, payload } = generateLicense(customer, type);

        const safeCustomer = customer.replace(/[^a-z0-9]/gi, '_');

        const filename = `${Utils.genIdByDateTime()}_${safeCustomer}.key`;

        if (!fs.existsSync(licensePath)) fs.mkdirSync(licensePath, {recursive: true});

        const filePath = path.join(licensePath, '/', filename);

        fs.writeFileSync(filePath, token);

        const data = { token, filename, payload };
        return res.status(200).json({ msg: 'Success', data });
    } catch(error) {
        throw Error('Error occurred');
    }
}

const deleteOne = (req, res) => {
    try {
        const filename = req.params.filename;

        if (filename) {
            const filePath = path.join(licensePath, filename);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath); // Delete the file
        }
        
        return res.status(200).json({ msg: 'Success' });
    } catch(error) {
        throw Error('Error occurred');
    }
}

const generateLicense = (customer, type) => {
    const issuedAt = new Date();
    let expiresAt = null;

    switch(type) {
        case 'MONTHLY': expiresAt = new Date(issuedAt.getTime() + 30 * 24 * 60 * 60 * 1000); break // 1 month
        case 'YEARLY': expiresAt = new Date(issuedAt.getTime() + 365 * 24 * 60 * 60 * 1000); break; // 1 year
        case 'LIFETIME': expiresAt = new Date(issuedAt.getTime() + 100 * 365 * 24 * 60 * 60 * 1000); break; // 100 year
        default: break;
    }

    const payload = { licenseId: Utils.genId(), type, issuedAt, expiresAt, customer };

    const token = jwt.sign(payload, PRIVATE_KEY, { algorithm: 'RS256' });
    return { token, payload };
}

module.exports = { createOne, download, deleteOne, getList };