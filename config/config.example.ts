// VKL's Client Cookie Config
export const subscriptionCookieExpirationTime = 60; // in minutes
export const VKLBasedURL = "http://127.0.0.1:3000/";

// VKL's Service Config
export const proofCookieExpirationTime = 60; // in minutes
export const proofFileName = "is_subscription_good";

// Oracle Config
export const OracleBasedAPIURL = "http://127.0.0.1:3001";

// PayPal Config
export const PayPalClientId = "PayPal Client Id";
export const PayPalReturnURL = "PayPal Return URL";
export const PayPalAuthEndPoint = "PapPal AuthEndPoint[sandbox/production]";
export const MaximumPaymentAge = 2; // > 1 (minimum 2 days). Maximum days of retrieved payment data. (1 = 1 day)

// PayPalSubscriptionPlanId
export const PayPalSubscriptionPlanId = "PayPal Subscription Plan Id";

// PayPalScriptConfig
export const PayPalScriptAPI =
  "https://www.paypalobjects.com/js/external/api.js";
export const PayPalSubscriptionScriptAPI = `https://www.paypal.com/sdk/js?client-id=${PayPalClientId}&vault=true&intent=subscription`;
