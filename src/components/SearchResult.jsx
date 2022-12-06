import React from "react";

const SearchResult = ({ result }) => {
  return (
    <div id="Wrapper">
      {result.fund && (
        <div className="funds">
          <div>
            {result.fund.map((fund, idx) => {
              if (result.fund.length > 1) {
                return (
                  <span key={idx} className="fund fund-smaller">
                    {fund}
                  </span>
                );
              }
              return (
                <span key={idx} className="fund">
                  {fund}
                </span>
              );
            })}
          </div>
          {result.status ? (
            <div>{result.status}</div>
          ) : (
            result.statusChris && <div>{result.statusChris}</div>
          )}
        </div>
      )}
      <div className="header">
        {result.name && <h3>{result.name}</h3>}
        {result.amountRaising && (
          <div className="raising-container">
            <div className="raising-text">Raising</div>
            {result.amountRaising >= 1000000 ? (
              <p>£{(result.amountRaising / 1000000).toLocaleString()}m</p>
            ) : (
              <p>£{result.amountRaising / 1000}k</p>
            )}
          </div>
        )}
      </div>
      <div className="quick-links">
        {result.website && (
          <a href={result.website} rel="noreferrer">
            Website
          </a>
        )}
        {result.deck && (
          <>
            <div>{" | "}</div>
            <a href={result.deck} rel="noreferrer">
              Deck
            </a>
          </>
        )}
      </div>
      <p>{result.description}</p>
      <a className="airtable-link" rel="noreferrer" href={result.recordUrl}>
        open in airtable
      </a>
      {result.lastStatusChange  && <p id="statusChange">Last status change: {result.lastStatusChange}</p>}
    </div>
  );
};

export default SearchResult;

// const SearchResult = ({ result }) => {
//   return (
//     <div className="result">
//       <a
//         className="airtable-link"
//         rel="noreferrer"
//         target="_blank"
//         href={result.recordUrl}
//       >
//         {result.name}
//       </a>
//     </div>
//   );
// };

// export default SearchResult;
