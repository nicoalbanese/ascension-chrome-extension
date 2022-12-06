import { useState } from "react";
import "./App.css";
import SearchResult from "./components/SearchResult";
import { searchForBusiness } from "./utils/Airtable";
import Back from "./fa-icons/back";
import Pipelines from "./components/Pipelines";

function App() {
  const [searchStatus, setSearchStatus] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [pipelineURL, setPipelineURL] = useState(null);
  const [route, setRoute] = useState("home");
  const [query, setQuery] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());

    if (formData.searchQuery.length > 2) {
      setSearchResults(null);
      setSearchStatus("loading...");
      setQuery(formData.searchQuery);
      const res = await searchForBusiness(formData.searchQuery);
      if (res == "No businesses found...") {
        setSearchResults(null);
        setSearchStatus("No results found...");
      } else {
        setSearchResults(res);
      }
      event.target.reset();
    } else {
      alert("Search query must be more than 2 character long.");
    }
  };

  const handleRouteChange = () => {
    console.log("route change");
    if (route === "home") {
      setRoute("pipelines");
    } else {
      setRoute("home");
    }
  };

  return (
    <div className="App">
      {route === "home" && (
        <div id="home">
          <div id="home-header">
            <h1>Ascension Dealflow</h1>
          </div>
          <div id="search">
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="company name..."
                  name="searchQuery"
                />
                <input type="submit" value="Search" />
              </div>
            </form>
            {searchStatus &&
              (searchResults ? (
                <div id="search-results-container">
                  {searchResults.length > 0 &&
                    searchResults.map((result) => {
                      return <SearchResult result={result} key={result.id} />;
                    })}
                </div>
              ) : (
                <div className="searchStatus">
                  {searchStatus == "No results found..." ? (
                    <div>
                      <strong>no results</strong>
                      <br />
                      <a
                        id="addToPipelineFailedSearch"
                        href={`https://airtable.com/shrUB5NNy0PGzPjQT?prefill_Company=${query}`}
                      >
                        add "{query}" to pipeline
                      </a>
                    </div>
                  ) : (
                    "loading..."
                  )}
                </div>
              ))}
          </div>
          <div id="navigation">
            <button className="navigation-links" onClick={handleRouteChange}>
              Pipelines
            </button>
            <a
              className="navigation-links"
              href="https://airtable.com/shrUB5NNy0PGzPjQT"
            >
              Add Company
            </a>
            <a
              className="navigation-links"
              href="https://airtable.com/shrJsjMXUJtKADz11"
            >
              New Note
            </a>
            <a
              className="navigation-links"
              href="https://scoresheet-form-july-2022.vercel.app/"
            >
              New Score
            </a>
            <a
              className="navigation-links"
              href="https://airtable.com/shrJpMPqeurEpxWoh"
            >
              New Rejection
            </a>
          </div>
        </div>
      )}
      {route === "pipelines" && (
        <div id="pipelines">
          <div id="pipeline-header">
            <div id="cog-wrapper" onClick={handleRouteChange}>
              <Back />
            </div>
            <h1>Select Pipeline</h1>
          </div>
          <Pipelines />
        </div>
      )}
    </div>
  );
}

export default App;
