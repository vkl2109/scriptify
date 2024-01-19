const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require('firebase-admin/firestore');
const logger = require("firebase-functions/logger");
const { HttpsError } = require("firebase-functions/v2/https");

initializeApp();
const db = getFirestore();

module.exports = {
    db,
    logger,
    HttpsError
}