import React from "react";
import {
  BarChart,
  Bar,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const Stats = ({ userDetails, subG }) => {
  const data = [
    {
      name: "data",
      reportCount: subG.reportCount,
      deletedPostCount: subG.deletedPostCount,
    },
  ];
  return (
    <div>
      <div class="row">
        <div class="col-lg-6">
          <div class="card">
            <LineChart
              height={400}
              width={400}
              data={subG.stats}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
               <Legend tick={{ fontSize: "1rem" }} />
              <Line type="monotone" dataKey="newJoined" stroke="black" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="date" tick={{ fontSize: "1rem" }} />
              <YAxis tick={{ fontSize: "1rem" }} />
              <Tooltip />
            </LineChart>
          </div>
        </div>
        <div class="col-lg-6">
          <div class='card'>
            <LineChart
              height={400}
              width={400}
              data={subG.stats}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <Legend tick={{ fontSize: "1rem" }} />
              <Line type="monotone" dataKey="newPosts" stroke="black" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="date" tick={{ fontSize: "1rem" }} />
              <YAxis tick={{ fontSize: "1rem" }} />
              <Tooltip />
            </LineChart>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6">
          <div class='card'>
            <LineChart
              height={400}
              width={400}
              data={subG.stats}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <Legend tick={{ fontSize: "1rem" }} />
              <Line type="monotone" dataKey="Visitors" stroke="black" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="date" tick={{ fontSize: "1rem" }} />
              <YAxis tick={{ fontSize: "1rem" }} />
              <Tooltip />
            </LineChart>
          </div>
        </div>
        <div class="col-lg-6">
          <div class='card'>
            <BarChart
              height={400}
              width={400}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: "1rem" }} />
              <YAxis tick={{ fontSize: "1rem" }} />
              <Tooltip />
              <Legend tick={{ fontSize: "1rem" }} />
              <Bar dataKey="reportCount" fill="blue" />
              <Bar dataKey="deletedPostCount" fill="orange" />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
