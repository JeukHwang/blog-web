/* eslint-disable @typescript-eslint/no-explicit-any */
import * as dayjs from "dayjs";
import { bg, center, colors, fg, h, margin, w } from "../styles";

// function getPos(momentTime) {
//   const thisYearBirthday = moment(`${momentTime.year()} 05 23`);
//   let birthday;
//   if (momentTime.isBefore(thisYearBirthday)) {
//     birthday = thisYearBirthday.clone().subtract(1, `years`);
//   } else {
//     birthday = thisYearBirthday.clone();
//   }
//   const duration = moment.duration(momentTime.diff(birthday));
//   // console.log(momentTime.toISOString(), birthday.toISOString(), Math.floor(duration.asWeeks()));
//   const pos = {
//     row: birthday.year() - 2003,
//     column: Math.min(Math.floor(duration.asWeeks()), 51),
//   };
//   pos.index = pos.row * 52 + pos.column;
//   return pos;
// }

// function applyCSS(pos, css) {
//   const element = table.rows[pos.row].cells[pos.column];
//   for (const [key, value] of Object.entries(css)) {
//     element.style[key] = value;
//   }
// }

// function bg(color, alpha = 1) {
//   return { background: color, opacity: alpha };
// }

// function makeEvent(str, css) {
//   applyCSS(getPos(moment(str)), css);
// }

// function makeLongEvent(str1, str2, css) {
//   const start = getPos(moment(str1)).index;

//   const end = getPos(moment(str2)).index;
//   for (let index = start; index < end; index++) {
//     const pos = { row: Math.floor(index / 52), column: index % 52 };
//     applyCSS(pos, css);
//   }
// }

// let table;
// function main() {
//   const tableContainer = document.getElementById("table-container");
//   table = generateTable(80, 52);
//   tableContainer.appendChild(table);

//   console.log(getPos(moment("2003 05 23")));
//   console.log(getPos(moment("2004 05 22")));
//   console.log(getPos(moment("2004 05 23")));
//   console.log(getPos(moment()));

//   const KSA = "navy";
//   const KAIST = "blue";
//   const SPARCS = "yellow";
//   const MJ = "pink";

//   makeLongEvent("2003 05 23", undefined, bg("white")); // 산 날
//   makeLongEvent("2019 02 25", "2022-02-16", bg("#286086")); // KSA
//   makeLongEvent("2022 02 23", undefined, bg("aqua")); // KAIST
//   makeEvent("2003 05 23", { animation: "rainbow 1s infinite" }); // 생일
//   makeEvent("2019 02 25", bg(KSA)); // KSA 입학식
//   makeEvent("2020 01 20", bg("red")); // 국내 코로나 환자 처음 발생
//   makeEvent("2021 03 13", bg(KSA)); // IDEV 첫 OT
//   makeEvent("2022 02 23", bg(KAIST)); // KAIST 입학식
//   makeEvent("2021 12 01", bg(KAIST)); // KAIST 면접
//   makeEvent("2021 12 17", bg(KSA)); // KSA 6학기 기말 마지막
//   makeEvent("2022 01 01", bg("green")); // 성인 - 처음 술 마신 날
//   makeEvent("2022 02 28", bg(KAIST)); // KAIST 1학기 개강일
//   makeEvent("2022 12 5", bg(SPARCS)); // SPARCS 정회원
//   makeEvent("2022 02 15", bg(SPARCS)); // SPARCS 회장 임기 시작
//   makeEvent("2022 12 19", bg(MJ));
//   makeEvent("2083 05 22", bg("black")); // ?
//   makeEvent(undefined, { animation: "rainbow 5s infinite" });
// }

// main();

const birth = dayjs("2003-05-23");
function date2index(date: string) {
  const day = dayjs(date);
  const dy = day.year() - birth.year();
  const dw = day.week() - birth.week();
  return dy * 52 + dw;
}

function data() {
  const dataLife = Array(80)
    .fill(null)
    .map(() => Array(52).fill(null));
  const events: { start: string; end?: string; message: string }[] = [
    { start: "2003-05-23", message: "Birth" },
    { start: "2083-05-23", message: "KSA" },
    { start: "2083-05-23", message: "KSA" },
    { start: "2083-05-23", message: "Additional Life" },
    { start: "2103-05-23", message: "Death" },
  ];
  events.forEach((event) => {
    const start = dayjs(event.start);
    const end = dayjs(event.end);
  });
  return dataLife;
}

function LifeCalendar() {
  document.body.style.backgroundColor = colors.black;
  document.body.style.color = colors.white;

  console.log(dayjs("2022 05 23"));
  const blockSize = 10;

  return (
    <div css={[w("fill"), h("fill"), center, bg.black, fg.white]}>
      <div css={[w("hug"), h("hug"), center]}>
        <table
          css={[margin.vertical(40)]}
          style={{
            fontSize: "2px",
            border: "none",
            tableLayout: "fixed",
            width: "fit-content",
            height: "auto",
          }}
        >
          <tbody>
            {data().map((dataYear, year) => (
              <tr key={year}>
                {dataYear.map((dataWeek, week) => {
                  const color = "black";
                  return (
                    <td
                      key={week}
                      style={{
                        border: "none",
                        backgroundColor: "gray",
                        width: blockSize,
                        height: blockSize,
                        color,
                      }}
                    ></td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LifeCalendar;
