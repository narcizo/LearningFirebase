let functions = require("firebase-functions");
functions = functions.region('southamerica-east1');

const admin = require('firebase-admin');
admin.initializeApp();

const firestore = admin.firestore();

/*
    Triggers: Funções com triggers são chamadas em reação a alguma operação em algum lugar, tipos:
    onCreate,
    onUpdate,
    onDelete,
    onWrite.

    Documentação: https://firebase.google.com/docs/functions/firestore-events?hl=pt-br&gen=1st
*/

exports.alteraData = functions.firestore.document('transacoes/{docId}').onUpdate(async (change, context) => {
    console.log("AFTER: ", change.after.data());
    console.log("BEFORE: ", change.before.data());
    const novaData = new Date();

    await firestore.collection('log').add({
        acao: 'alterou',
        daa: novaData,
        antes: JSON.stringify(change.before.data()),
        depois: change.after.data(),
    });
    await change.after.ref.set({
        data: novaData
    }, {merge: true});

    return null;
});

exports.novoUser = functions.auth.user().onCreate(async (user) => {
    await firestore.collection('user').doc(user.uid).set({
        uid: user.uid
    }, {merge: true});
});

exports.excluirUser = functions.auth.user().onDelete( async (user) => {
    await firestore.collection('user').doc(user.uid).delete();

    return null;
});
