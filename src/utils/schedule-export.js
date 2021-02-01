const path = require("path");
const ExcelJS = require("exceljs");

const scheduleExport = async (date, schedule, cb) => {
  readTemplateFile((error, workbook) => {
    if (error) {
      cb(error);
    }
    generateSchedule(workbook, schedule, date);
  });
};

const readTemplateFile = async (cb) => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx
    .readFile(
      path.join(
        __dirname,
        "../assets/GenerationTemplates/Generation_Weekday_Schedule.xlsx"
      )
    )
    .then(() => {
      cb(undefined, workbook);
    })
    .catch((error) => {
      cb(error);
    });
};

const generateSchedule = (workbook, schedule, date) => {
  schedule["Power_Stations"].forEach((powerStation) => {
    workbook["_worksheets"].forEach((ws) => {
      if (powerStation.Name.includes(ws.name)) {
        fillWorkSheet(powerStation, ws, workbook, date);
      }
    });
  });
};

const fillWorkSheet = (powerStation, ws, wb, date) => {
  ws.getCell("H14").value = new Date(date);
  ws.getCell("F14").value = new Date(date);
  powerStation["Schedule"].forEach((hour, index) => {
    ws.getCell(`E${23 + index}`).value = hour.Period;
    ws.getCell(`F${23 + index}`).value = +hour.Power;
  });
  writeTampletFile(wb);
};

const writeTampletFile = async (wb) => {
  await wb.xlsx.writeFile(
    path.join(__dirname, "../assets/downloads/schedule.xlsx")
  );
};

module.exports = scheduleExport;
