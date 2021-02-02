const path = require("path");
const ExcelJS = require("exceljs");

const scheduleExport = async (date, schedule) => {
  let workbook = await readTemplateFile(date);
  workbook = generateSchedule(workbook, schedule, date);
  await writeTampletFile(workbook);
};

const readTemplateFile = async (date) => {
  const day = new Date(date).getDay();
  const fileName = day === 6 || day === 0 ? "sat" : "weekday";
  const workbook = new ExcelJS.Workbook();
  return await workbook.xlsx.readFile(
    path.join(__dirname, `../assets/GenerationTemplates/${fileName}.xlsx`)
  );
};

const generateSchedule = (workbook, schedule, date) => {
  schedule["Power_Stations"].forEach((powerStation) => {
    workbook["_worksheets"].forEach((ws) => {
      if (powerStation.Name.includes(ws.name)) {
        fillWorkSheet(powerStation, ws, workbook, date);
      }
    });
  });
  return workbook;
};

const fillWorkSheet = (powerStation, ws, wb, date) => {
  ws.getCell("H14").value = new Date(date);
  ws.getCell("F14").value = new Date(date);
  powerStation["Schedule"].forEach((hour, index) => {
    ws.getCell(`E${23 + index}`).value = hour.Period;
    ws.getCell(`F${23 + index}`).value = +hour.Power;
  });
};

const writeTampletFile = async (wb) => {
  return await wb.xlsx.writeFile(
    path.join(__dirname, "../assets/downloads/schedule.xlsx")
  );
};

module.exports = scheduleExport;
