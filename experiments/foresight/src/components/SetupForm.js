import { useCallback } from "react";
import "./setup-form.css";

export default function SetupForm() {
  const handleChangeHypothesis = useCallback((evt) => {
    //create new node
    const hypothesis = evt.target.value;
    localStorage.setItem("hypothesis", hypothesis);
  }, []);

  const handleChangeCompanyInformation = useCallback((evt) => {
    //create new node
    const companyInformation = evt.target.value;
    localStorage.setItem("companyInformation", companyInformation);
  }, []);

  const handleChangeDate = useCallback((evt) => {
    //create new node
    const date = evt.target.value;
    localStorage.setItem("date", date);
  }, []);

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

  return (
    <div className="form-box">
      <div className="all-fields">
        <div>
          <h2 className="article-date-title">Article Date</h2>
          <textarea
            onChange={handleChangeDate}
            className="date-input"
            type="text"
            name="username"
            id="username"
            placeholder="MM/DD/YYYY"
            value={dateText}
          />{" "}
        </div>

        <div>
          <h2 className="hypothesis-title">Hypothesis</h2>
          <textarea
            onChange={handleChangeHypothesis}
            readOnly
            readonly
            placeholder="Has promising..."
            value={hypothesisText}
          />
        </div>

        <div>
          <h2>Company Background</h2>
          <textarea
            onChange={handleChangeCompanyInformation}
            readOnly
            readonly
            placeholder="Information about company..."
            className="company-background-text-area"
            value={companyBackgroundText}
          />
        </div>
      </div>
    </div>
  );
}
