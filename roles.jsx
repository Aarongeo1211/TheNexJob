/* Shared IT / Non-IT role lists + the category-then-role picker used by both forms */

const IT_ROLES = [
  "Software Engineer / Developer",
  "Data Engineer / Scientist / Analyst",
  "DevOps / Cloud / SRE",
  "QA / Test Engineer",
  "Product Manager / Business Analyst (Tech)",
  "Other IT role",
];

const NON_IT_ROLES = [
  "Sales & Business Development",
  "Marketing",
  "HR & Talent",
  "Finance & Accounts",
  "Operations & Administration",
  "Other Non-IT role",
];

/**
 * Two-step picker: choose IT / Non-IT, then a role from that category's list.
 * Selecting "Other ..." reveals a free-text field. Reports back via onChange
 * with { category, role } where role is the free-text value when "Other" is picked.
 */
const CategoryRolePicker = ({ value, onChange, name = "role" }) => {
  const category = value.category || "";
  const role = value.role || "";
  const otherText = value.otherText || "";

  const roles = category === "IT" ? IT_ROLES : category === "Non-IT" ? NON_IT_ROLES : [];
  const isOther = role.startsWith("Other");

  const setCategory = (cat) => {
    onChange({ category: cat, role: "", otherText: "" });
  };
  const setRole = (r) => {
    onChange({ category, role: r, otherText: r.startsWith("Other") ? otherText : "" });
  };
  const setOtherText = (t) => {
    onChange({ category, role, otherText: t });
  };

  return (
    <div className="field">
      <label>
        {category === "" ? "IT or Non-IT?" : "Category"} <span className="req">*</span>
      </label>
      <div className="cat-toggle">
        <button type="button" className={`cat-btn ${category === "IT" ? "active" : ""}`} onClick={() => setCategory("IT")}>
          IT
        </button>
        <button type="button" className={`cat-btn ${category === "Non-IT" ? "active" : ""}`} onClick={() => setCategory("Non-IT")}>
          Non-IT
        </button>
      </div>

      {category !== "" && (
        <div style={{ marginTop: 12 }}>
          <label>
            {category} role <span className="req">*</span>
          </label>
          <select className="select" value={role} onChange={(e) => setRole(e.target.value)} required style={{ marginTop: 6 }}>
            <option value="" disabled>Select a role…</option>
            {roles.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      )}

      {isOther && (
        <div style={{ marginTop: 12 }}>
          <label>Please specify <span className="req">*</span></label>
          <input
            type="text"
            className="input"
            value={otherText}
            onChange={(e) => setOtherText(e.target.value)}
            placeholder={category === "IT" ? "e.g. Security Engineer" : "e.g. Legal & Compliance"}
            required
            style={{ marginTop: 6 }}
          />
        </div>
      )}

      {/* hidden fields so a plain FormData submit carries the resolved values —
          named to match what worker/index.js reads: "category" and `${name}` */}
      <input type="hidden" name="category" value={category} />
      <input type="hidden" name={name} value={isOther ? otherText : role} />
    </div>
  );
};

window.IT_ROLES = IT_ROLES;
window.NON_IT_ROLES = NON_IT_ROLES;
window.CategoryRolePicker = CategoryRolePicker;
