const base =
  process.env.PAYPAL_ENV === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

async function getAccessToken() {
  const client = process.env.VITE_PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;

  const auth = Buffer.from(`${client}:${secret}`).toString("base64");

  const res = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error_description || "PayPal token error");
  return data.access_token;
}

export const handler = async (event) => {
  try {
    const { orderId, totalEur } = JSON.parse(event.body || "{}");
    if (!orderId) throw new Error("Missing orderId");
    if (!totalEur) throw new Error("Missing totalEur");

    const accessToken = await getAccessToken();

    const res = await fetch(`${base}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            reference_id: orderId,
            amount: {
              currency_code: "EUR",
              value: String(Number(totalEur).toFixed(2)),
            },
          },
        ],
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "PayPal create order error");

    return {
      statusCode: 200,
      body: JSON.stringify({ paypalOrderId: data.id }),
    };
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: e.message }) };
  }
};
