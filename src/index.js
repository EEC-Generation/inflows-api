const express = require("express");
require("./db/mongoose");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");

const app = express();
const port = process.env.PORT || 3000;

const multer = require("multer");
const upload = new multer({
  dest: "images",
});
app.post("/upload", upload.single('upload'), (req, res) => {
  res.send();
});
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});


let json = [
  {
    "faqContent": "<img alt=\"\" src=\"../img/question_upload_1.jpg\" /><br />請先在系統轉出檔案目錄，經檢測軟體檢測成功後，登入機關檔案管理資訊網https://online.archives.gov.tw），（點選「檔案目錄彙送」，展開此選單後選擇「檔案目錄上傳」，於「目錄檔位置」欄位上指向欲上傳之檔案，再按「上傳」鈕，待系統自動回覆上傳成功訊息，確認上傳檔案完成即進入檢核作業。檢核時間約需二至三天，屆時再登入此系統，點選彙送紀錄查詢，以彙送日期作為查詢條件，確認本次彙送檔案之檢核結果為成功後，請列印彙送說明表並依規定呈報上級機關或檔案管理局。",
    "faqImageFileIds": "",
    "faqOid": 1,
    "faqTopic": "彙送作業流程為何？",
    "faqType": "CatalogDelivery",
    "faqWeight": 0,
    "isCommon": "Y",
    "siteId": "2"
  },
  {
    "faqOid": 2,
  "faqTopic": "以案卷層級建回溯檔案時，有何特別需要注意的事項？",
  "faqContent": "(1)紅字欄位為必要輸入欄位，其餘請依實著錄。<br />(2)資料名稱有『*』表此欄位可作為資料查詢的條件。<br />(3)當有打標點符號時請以全形輸入。",
  "faqType": "CatalogConstruction",
  "faqWeight": 2,
  "siteId": "2",
  "isCommon": "",
  "faqImageFileIds": ""
  },
  {
    "faqContent": "請發Email至檔案資訊諮詢服務中心信箱(online@archives.gov.tw)。申請內容需註明機關代碼、機關名稱、承辦人姓名、聯絡電話、申請事由，屆時收到來信後，服務人員將儘速與您連繫。",
    "faqImageFileIds": "",
    "faqOid": 3,
    "faqTopic": "若因前任檔管承辦人未交接機關檔案管理資訊網之帳號與密碼，如何處理？",
    "faqType": "CatalogDelivery",
    "faqWeight": 0,
    "isCommon": "Y",
    "siteId": "2"
  },
  {
    "faqContent": "請登入機關檔案管理資訊網（<a href=\"https://online.archives.gov.tw\">https://online.archives.gov.tw</a>）後，點選「機關帳號設定」，展開此選單後選擇「修改個人資料」，修改現任承辦人員的基本資料後，點選「確定」按鈕即可。",
    "faqImageFileIds": "",
    "faqOid": 4,
    "faqTopic": "如何在機關檔案管理資訊網中修改現任承辦人基本資料？",
    "faqType": "CatalogDelivery",
    "faqWeight": 0,
    "isCommon": "Y",
    "siteId": "2"
  },
  {
    "faqContent": "請登入機關檔案管理資訊網（https://online.archives.gov.tw），點選「檔案目錄彙送」，展開此選單後選擇「彙送結果查詢」，彙送日期起迄皆輸入今天日期，點選查詢，即可得知有否今日彙送之紀錄。",
    "faqImageFileIds": "",
    "faqOid": 5,
    "faqTopic": "如何得知剛上傳檔案目錄是否成功？",
    "faqType": "CatalogDelivery",
    "faqWeight": 0,
    "isCommon": "Y",
    "siteId": "2"
  }]


  json = json.toString()
console.log(json);