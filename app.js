const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');

const serviceAccount = require("./firebase_certificate.json");
const Routes = require("./constants/routes");
const DbCollections = require("./constants/db_collections");
const AlertMessages = require("./constants/alertMessages");
const FormParams = require("./constants/formParams");
const ValidationParams = require("./constants/validationParams");
const Utils = require("./utils");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const isAuthorized = async (req, res, next) => {
    const token = req.query.token;

    try {
        const decodedToken = await admin.app().auth().verifyIdToken(token);

        res.uid = decodedToken.uid;

        next();
    } catch (error) {
        return res.status(400).json({
            messageType: AlertMessages.messageType.ERROR,
            message: AlertMessages.AUTH_REQUIRED
        });
    }
}

app.get(Routes.PIZZA_GET_LIST, (req, res) => {
    (async () => {
        try {
            // TODO: Make proper pagination

            const pageNumber = !req.query.page ? 1 : req.query.page;
            const pageLimit = !req.query.limit ? ValidationParams.DEFAULT_PAGINATION_LIMIT : req.query.limit;

            const querySnapshot = await db.collection(DbCollections.PIZZAS).orderBy("createdAt").get();
            const resultList = querySnapshot.docs.splice((pageNumber - 1) * pageLimit, pageLimit)

            let responseData = [];

            resultList.forEach(doc => {
                responseData.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            res.status(200).send({
                pizzaList: responseData,
                lazyLoad: {
                    currentPage: pageNumber,
                    totalPages: Math.round(querySnapshot.size / pageLimit)
                }
            });

        } catch (error) {
            console.log(error);
            return res.send(500).send(error);
        }
    })();
});

app.get(Routes.INGREDIENTS_GET_LIST, (_, res) => {
    (async () => {
        try {
            const querySnapshot = await db.collection(DbCollections.INGREDIENTS).get();
            res.status(200).send(Utils.querySnapshotToList(querySnapshot));
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

app.get(Routes.ORDERS_LIST, isAuthorized, (_, res) => {
    (async () => {
        try {
            const querySnapshot = await db.collection(DbCollections.ORDERS).where('uid', '==', res.uid).get();
            res.status(200).send(Utils.querySnapshotToList(querySnapshot));
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

app.post(Routes.ORDERS_CREATE,
    isAuthorized,
    body(FormParams.placeOrder.NAME).not().isEmpty().trim().withMessage(AlertMessages.formValidation.USERNAME_REQUIRED),
    body(FormParams.placeOrder.EMAIL).isEmail().normalizeEmail().withMessage(AlertMessages.formValidation.INVALID_EMAIL),
    body(FormParams.placeOrder.ADDRESS).not().isEmpty().trim().isLength({ min: ValidationParams.MIN_ADDRESS_LENGTH }).withMessage(AlertMessages.formValidation.INVALID_ADDRESS),
    body(FormParams.placeOrder.PHONE).not().isEmpty().isNumeric().isLength({ min: ValidationParams.PHONE_LENGTH, max: ValidationParams.PHONE_LENGTH }).withMessage(AlertMessages.formValidation.INVALID_PHONE),
    (req, res) => {
        (async () => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        messageType: AlertMessages.messageType.ERROR,
                        message: errors.array()[0].msg
                    });
                }

                await db.collection(DbCollections.ORDERS).add({
                    [FormParams.placeOrder.NAME]: req.body[FormParams.placeOrder.NAME],
                    [FormParams.placeOrder.EMAIL]: req.body[FormParams.placeOrder.EMAIL],
                    [FormParams.placeOrder.ADDRESS]: req.body[FormParams.placeOrder.ADDRESS],
                    [FormParams.placeOrder.PHONE]: req.body[FormParams.placeOrder.PHONE],
                    [FormParams.placeOrder.ORDER]: req.body[FormParams.placeOrder.ORDER],
                    uid: res.uid
                })

                res.status(200).send({
                    message: AlertMessages.ORDER_PLACED,
                    messageType: AlertMessages.messageType.SUCCESS
                });
            } catch (error) {
                console.log(error);
                return res.status(500).send(error);
            }
        })();
    });

app.post(Routes.AUTH_CREATE_ACCOUNT,
    body(FormParams.auth.EMAIL).isEmail().normalizeEmail().withMessage(AlertMessages.formValidation.INVALID_EMAIL),
    body(FormParams.auth.PASSSWORD).not().isEmpty().trim().withMessage(AlertMessages.formValidation.INVALID_PASSWORD),
    (req, res) => {
        (async () => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        messageType: AlertMessages.messageType.ERROR,
                        message: errors.array()[0].msg
                    });
                }

                await admin.app().auth().createUser({
                    [FormParams.auth.EMAIL]: req.body[FormParams.auth.EMAIL],
                    [FormParams.auth.PASSSWORD]: req.body[FormParams.auth.PASSSWORD]
                });

                res.status(200).send({
                    message: AlertMessages.ACCOUNT_CREATED,
                    messageType: AlertMessages.messageType.SUCCESS
                });
            } catch (error) {
                console.log(error);
                return res.status(500).send(error);
            }
        })();
    });



app.listen(process.env.PORT || 5000, () => {
    console.log('App running');
});