import React from "react";
import ReportList from "./ReportList";

const Reports = ({ userDetails, subG }) => {
  return subG.reports.length > 0 ? (
    subG.reports.map((report) => (
      <div key={report._id}>
        <ReportList userDetails={userDetails} report={report} subG={subG}/>
      </div>
    ))
  ) : (
    <div className="admin">No Reports</div>
  );
};

export default Reports;
