// Client Cookie Config
export const subscriptionCookieExpirationTime = 60; // in minutes
export const ServiceHomePageURL = "http://127.0.0.1:3000/";

// Service Config
export const proofCookieExpirationTime = 60; // in minutes

export const PayPalClientId = "AZZS_ZryzMyXG_fvSeyoYhBZffg5f6H7wUt7sOKoXxLIwU2cU2Ze2WvpjPomeGCKlmTcWU9fyQ5j80Hl";
export const PayPalReturnURL = "http://127.0.0.1:3000/main";
export const PayPalAuthEndPoint = "sandbox";
export const OracleBasedAPIURL = "http://127.0.0.1:3001";
export const MaximumPaymentAge = 365; // maximum days of retrieved payment data. (1 = 1 day)

// PayPalSubscriptionPlanId
export const PayPalSubscriptionPlanId = "P-1BF08962SE3742350MKRYCVQ";

// PayPalScriptConfig
export const PayPalScriptAPI =
  "https://www.paypalobjects.com/js/external/api.js";
export const PayPalSubscriptionScriptAPI = `https://www.paypal.com/sdk/js?client-id=${PayPalClientId}&vault=true&intent=subscription`; 

export const proofMaxAge = 5;
export const proofFileName="ProvePayPalSubscriptionMain";
export const payPalProofFileName="ProvePayPalSubscriptionMain";

// Interface Config
export const backgroundImage = "/background.jpeg";
export const mainBackgroundImage = "/background2.jpeg";

// Google Config
// OAuth 2.0 test Client Id for OZKi Bot testing purpose
export const googleClientID = "16403292172-pvsrdogb25iqmfe5lncnqqmu1t82mj46.apps.googleusercontent.com"
export const googleProofFileName = "ProveGoogleAuthMain";

// Game Config
export const pinCode = 7777;

// leaderboard Config
export const leaderboardURL = "http://localhost:3002";
export const leaderboardAPI = `${leaderboardURL}/api/`;

