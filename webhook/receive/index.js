/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

 const {onRequest} = require("firebase-functions/v2/https");
 const logger = require("firebase-functions/logger");

 // The Firebase Admin SDK to access Firestore.
 const {initializeApp} = require("firebase-admin/app");
 const {getFirestore} = require("firebase-admin/firestore");

 initializeApp();

 // Create and deploy your first functions
 // https://firebase.google.com/docs/functions/get-started

 exports.receive = onRequest(async (request, response) => {
   const url = request.url;

   logger.info("Notification Message Received!", {structuredData: true});

   const message = {
     url : url,
     status : "RECEIVED",
   };

   // Push the new message into Firestore using the Firebase Admin SDK.
   const result = await getFirestore()
       .collection("messages")
       .add(message);

   const respMsg = `Change Notification Received on URL: ${request.url}` +
       ` and saved as Message with ID: ${result.id}.`
   response.json({result: respMsg});
 });
