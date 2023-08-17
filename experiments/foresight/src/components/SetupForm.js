import { useCallback } from "react";
import "./setup-form.css";

export default function SetupForm() {
  // change hypothesis section
  const handleChangeHypothesis = useCallback((evt) => {
    const hypothesis = evt.target.value;
    localStorage.setItem("hypothesis", hypothesis);
  }, []);

  // change in company information section
  const handleChangeCompanyInformation = useCallback((evt) => {
    const companyInformation = evt.target.value;
    localStorage.setItem("companyInformation", companyInformation);
  }, []);

  // change to date section
  const handleChangeDate = useCallback((evt) => {
    const date = evt.target.value;
    localStorage.setItem("date", date);
  }, []);

  // change to company name section
  const handleChangeName = useCallback((evt) => {
    const companyName = evt.target.value;
    localStorage.setItem("companyName", companyName);
  }, []);

  // set values so they stay when page is reloaded
  let hypothesisText =
    localStorage.getItem("hypothesis") !== null
      ? localStorage.getItem("hypothesis")
      : "";
  let companyBackgroundText =
    localStorage.getItem("companyInformation") !== null
      ? localStorage.getItem("companyInformation")
      : "";
  let dateText =
    localStorage.getItem("date") !== null ? localStorage.getItem("date") : "";
  let companyNameText =
    localStorage.getItem("companyName") !== null
      ? localStorage.getItem("companyName")
      : "";

  return (
    <div className="form-box">
      <div className="all-fields">
        <div className="name-and-date">
          <div>
            <h2 className="article-date-title">Company Name</h2>
            <textarea
              onChange={handleChangeName}
              className="date-input"
              type="text"
              placeholder="Unnamed Company"
            >
              {companyNameText}
            </textarea>
          </div>
          <div>
            <h2 className="article-date-title">Article Date</h2>
            <textarea
              onChange={handleChangeDate}
              className="date-input"
              type="text"
              name="username"
              id="username"
              placeholder="MM/DD/YYYY"
            >
              {dateText}
            </textarea>
          </div>
        </div>

        <div>
          <h2 className="hypothesis-title">Hypothesis</h2>
          <textarea
            onChange={handleChangeHypothesis}
            readOnly
            readonly
            placeholder="Has promising..."
          >
            {hypothesisText}
          </textarea>
        </div>

        <div>
          <h2>Company Background</h2>
          <textarea
            onChange={handleChangeCompanyInformation}
            readOnly
            readonly
            placeholder="Information about company..."
            className="company-background-text-area"
          >
            {companyBackgroundText}
          </textarea>
        </div>
      </div>
    </div>
  );
}
