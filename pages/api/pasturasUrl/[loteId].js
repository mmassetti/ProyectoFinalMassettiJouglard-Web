import { getLoteDetails } from "../../../lib/db-admin";

export default async (req, res) => {
  const loteId = req.query.loteId;
  const loteDetails = await getLoteDetails(loteId);
  const data = loteDetails.data;

  let pasturasUrl = "";

  if (data.pasturas && data.pasturas.length > 0) {
    data.pasturas.map((pastura) => {
      pasturasUrl = pasturasUrl + "/" + pastura.id;
    });
  }

  return res.json(JSON.stringify(pasturasUrl));
};
