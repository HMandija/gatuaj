var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// netlify/functions/paypal-capture-order.js
var paypal_capture_order_exports = {};
__export(paypal_capture_order_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(paypal_capture_order_exports);
var base = process.env.PAYPAL_ENV === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";
async function getAccessToken() {
  const client = process.env.VITE_PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  const auth = Buffer.from(`${client}:${secret}`).toString("base64");
  const res = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials"
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error_description || "PayPal token error");
  return data.access_token;
}
var handler = async (event) => {
  try {
    const { paypalOrderId } = JSON.parse(event.body || "{}");
    if (!paypalOrderId) throw new Error("Missing paypalOrderId");
    const accessToken = await getAccessToken();
    const res = await fetch(
      `${base}/v2/checkout/orders/${paypalOrderId}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "PayPal capture error");
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: e.message }) };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=paypal-capture-order.js.map
