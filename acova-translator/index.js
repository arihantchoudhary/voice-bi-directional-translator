require('dotenv').config();
const { VapiClient } = require('@vapi-ai/server-sdk');

const vapi = new VapiClient({ token: process.env.VAPI_API_KEY });
const OUTBOUND_ID = process.env.PHONE_NUMBER_ID;

/**
 * Dial two parties and bridge them into one conference.
 * @param {string} custNum  – The customer’s phone (e.g. "+1…")
 * @param {string} techNum  – The technician’s phone ("+15109895404")
 */
async function conferenceCall(custNum, techNum) {
  // 1) Dial the technician first
  const techLeg = await vapi.calls.create({
    phoneNumberId: OUTBOUND_ID,
    customer: { number: techNum }
  });
  console.log('Tech leg started:', techLeg.id);

  // 2) Grab the new conferenceId
  const confId = techLeg.conferenceId;

  // 3) Now dial the customer into that same conference
  const custLeg = await vapi.calls.create({
    conferenceId: confId,
    phoneNumberId: OUTBOUND_ID,
    customer: { number: custNum }
  });
  console.log('Customer leg added:', custLeg.id);

  console.log(`✅ Conference ${confId} is live with both parties`);
}

// Replace with real numbers in E.164 format
conferenceCall('+1YOURCUSTOMERNUMBER', '+15109895404')
  .catch(err => console.error('Error creating conference:', err));
