const functions = require('firebase-functions');
const admin = require('firebase-admin');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


admin.initializeApp(functions.config().firebase);

exports.updateSpool = functions.firestore.document('/buffer/{documentId}').onCreate(event => {
    const nroDoc = event.data.data().nroDoc;
    const fechaNacimiento = event.data.data().fechaNacimiento;
    const nombre = event.data.data().nombre;
    const institucion = event.data.data().institucion;
    const nroAfiliado = event.data.data().nroAfiliado;
    const profId = event.data.data().profId;
    const fecha = event.data.data().fecha;
    const hora = event.data.data().hora;
    const tipoIn = event.data.data().tipoIn;
    const status = 0;
    console.log("Buffer Temp ",event.params.documentId,nroDoc);
    //let spoolRef = admin.firestore().collection("spool").add(nroDoc,nombre,profId,fecha,hora,status,tipoIn);
    //let deleteDoc = event.ref.doc.deleteDoc();
    console.log("Objeto a Eliminar ",event.params.documentId);
    console.log("Data to save : ",nroDoc,nombre,profId,fecha,hora,status,tipoIn);
    //const deleteDoc = admin.firebase().collection('buffer').doc(event.params.documentId).delete();
    let documentRef = admin.firestore().collection('pacientes').where('nroDoc','==',nroDoc);
    return documentRef.get().then(ref =>{ if (!ref.exists){
        const nuevoPac = admin.firestore().collection('pacientes').doc(nroDoc).set({nroDoc,nombre,fechaNacimiento,institucion,nroAfiliado});
    }}).catch(error => {console.log("error ",error)});

});


exports.uppercasePacientes = functions.firestore.document('/pacientes/{documentId}')
    .onCreate(event => {
      const original = event.data.data().nombre;
      console.log('Uppercasing', event.params.documentId, original);
      const nombre = original.toUpperCase();
      return event.data.ref.set({nombre}, {merge: true});
});

