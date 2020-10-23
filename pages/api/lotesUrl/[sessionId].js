import { getSessionDetails } from "../../../lib/db-admin";

export default async (req, res) => {
  const sessionId = req.query.sessionId;

  const sessionDetails = await getSessionDetails(sessionId);

  let lotesUrl = "";
  if (sessionDetails) {
    sessionDetails.data.lotes.map((lote) => {
      lotesUrl = lotesUrl + "/" + lote.id;
    });
  }

  return res.json(JSON.stringify(lotesUrl));
};
