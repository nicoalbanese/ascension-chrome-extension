var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${import.meta.env.VITE_AIRTABLE_API_KEY}`);
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Cookie", "brw=brwy1TrDiZyNAsU5u");


export const searchForBusiness = async (name) => {
  console.log("search function called for", name);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const res = await fetch(
    `https://api.airtable.com/v0/apptcOM65nkIWJy1l/Pipeline?filterByFormula=SEARCH("${name.toLowerCase()}", lower({Company}))`,
    requestOptions
  );
  console.log("res", res);
  const data = await res.json();
  console.log("data", data);

  const formattedData = data.records.map((company) => {
    return formatBusiness(company);
  });

  if (data.records.length < 1) {
    return "No businesses found...";
  }
  return formattedData;
};

const formatBusiness = (rawBusiness) => {
  const fields = rawBusiness.fields;
  return {
    name: fields["Company"],
    description: fields["Description"],
    website: fields["Website (for extension)"],
    amountRaising: fields["Amount Raising"],
    fund: fields["Fund"],
    status: fields["Status"],
    statusChris: fields["Status (Chris)"],
    recordUrl: `https://airtable.com/apptcOM65nkIWJy1l/tblltzjPiwy7gOkKE/viwg63PSZQ8mWWeID/${rawBusiness["id"]}?blocks=hide`,
    deck: fields["Link to Deck"],
    lastStatusChange: fields["Last Status Change"].error ? null : fields["Last Status Change"] ,
  };
};
