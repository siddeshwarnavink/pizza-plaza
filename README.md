
# 🍕 Pizza Plaza
React.js / Firebase app to order pizza!

### [VIEW DEMO](https://pizza-plaza-3ec87.web.app/)

---

## 🚀 Running the app

```bash
# Start the server
git clone <repo-url>
npm install
npm start

# Stat the backend
cd frontend
npm start
```

Visit ```http://localhost:3000/``` can see the app in development mode

---

## ⚙️ Deploying the app

You should be able to deploy the entire project as a Node.js/Express project. 

Make sure to change the deployed server path on ``frontend/src/constants/api.js``

```js
export const API_URL = "<path-to-production-server>"

export const FIREBASE_API_KEY = '<firebase-id>';
```

To build the React app for production


```bash
cd frontend
npm run build
```

Now deploy the ``build`` folder to a static server
