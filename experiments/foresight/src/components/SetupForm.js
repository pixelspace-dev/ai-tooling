import "./setup-form.css";

export default function SetupForm() {
  return (
    <form className="form-box">
      <div className="all-fields">
        <div>
          <h2 className="article-date-title">Article Date</h2>
          <input
            className="date-input"
            type="text"
            name="username"
            id="username"
            placeholder="MM/DD/YYYY"
          />
        </div>

        <div>
          <h2 className="hypothesis-title">Hypothesis</h2>
          <textarea readonly placeholder="Has promising..."></textarea>
        </div>

				<div>
          <h2 >Company Background</h2>
          <textarea readonly placeholder="Information about company..." className="company-background-text-area"></textarea>
        </div>
      </div>
    </form>
  );
}
