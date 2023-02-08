/*
Variable myWallet: Số tiền có trong tài khoản người chơi
variable choosenCharacter: Mảng chức các nhân vật được chọn không trùng lặp
*/
let playerWallet = 2000000;
let playerName = "Quách Diệu Khánh";
let choosenCharacter = [];
let betCharacter = [];
let inputValue = 0;
let sumPaidMoney;
let gameStarted = false;

const renderPlayerInfo = function () {
  let playerStatus = " ";
  playerStatus += ` <tr>
  <th>Tên</th>
  <th>${playerName}</th>
</tr>
<tr>
  <th>E-Wallet</th>
  <th>${playerWallet.toLocaleString()} VND</th>
</tr>`;
  document.getElementById("player__info").innerHTML = playerStatus;
};
renderPlayerInfo();

/*
caculatingBetMoney
Chức năng: Tính toán tổng số tiền cược
Handle: Không
Tham số: Không
Trả về: 
-sumBetMoney: Tổng số tiền cược
*/
const caculatingBetMoney = function () {
  let sumBetMoney = 0;
  for (let i in betCharacter) {
    sumBetMoney += betCharacter[i];
  }
  return sumBetMoney;
};
/*
renderBetMoney
Chức năng: Xuất tổng tiền cược ra table result
Handle: Không
Tham số: 
-sum: Tổng số tiền cược
Trả về: Không
*/
const renderBetMoney = function (sum) {
  let resultPaidUI = "";
  resultPaidUI += `<tr id="sumBetMoney">
<th>Tổng</th>
  <td></td>
  <td>${sum.toLocaleString()} VND</td>
</tr>`;
  document.getElementById("sum__payment").innerHTML = resultPaidUI;
};
/*
handleDice
Chức năng: Tung xúc xắc và render UI hình ảnh nhân vật kết quả trận đấu
Handle: Button class="character__dice-result"
Tham số: Không
Trả về: Không
*/
const handleDice = function () {
  if (gameStarted === true) {
    console.log("game da bat dau, reset");
    return;
  }
  gameStarted = true;
  let dice = ["cop", "bau", "ga", "tom", "ca", "cua"];
  let result = [];
  let diceId = ["dice1", "dice2", "dice3"];
  let kq;
  result.push(dice[Math.floor(Math.random() * dice.length)]);
  result.push(dice[Math.floor(Math.random() * dice.length)]);
  result.push(dice[Math.floor(Math.random() * dice.length)]);
  for (let i in result) {
    diceValue(diceId[i], result[i]);
  }
  calculatingIncom(result);
  renderPlayerInfo();
};
/*
diceValue
Chức năng: Render img nhan vat ra UI
Handle: không
Tham số: 
-diceId: Id của quả xúc xắc
-value: Gia tri sau khi tung xuc xac
Trả về: Không
*/
const diceValue = function (diceId, value) {
  switch (value) {
    case "cop": {
      document.getElementById(diceId).setAttribute("src", "./img/1-cop.jpg");
      break;
    }
    case "bau": {
      document.getElementById(diceId).setAttribute("src", "./img/2-bau.jpg");
      break;
    }
    case "ga": {
      document.getElementById(diceId).setAttribute("src", "./img/3-ga.jpg");
      break;
    }
    case "tom": {
      document.getElementById(diceId).setAttribute("src", "./img/4-tom.jpg");
      break;
    }
    case "ca": {
      document.getElementById(diceId).setAttribute("src", "./img/5-ca.jpg");
      break;
    }
    case "cua": {
      document.getElementById(diceId).setAttribute("src", "./img/6-cua.jpg");
      break;
    }
  }
};
/*
characterValidation
Chức năng: Kiem tra nhan vat vua them co trong danh sach choosenCharacter[] không         
Handle: không
Tham số: 
-value: Gia tri nhan vat duoc chon
Trả về: 
-characterAdded(bool)
*/
const characterValidation = function (value) {
  let characterAdded = false;
  for (let i in choosenCharacter) {
    if (value === choosenCharacter[i]) {
      characterAdded = true;
      break;
    } else {
      characterAdded = false;
    }
  }
  return characterAdded;
};
/*
addCharacter
Chức năng: thêm nhân vật vào choosenCharacter[]     
Handle: không
Tham số: 
-value: Gia tri nhân vậy được thêm
Trả về: Không
*/
const addCharacter = function (value) {
  let htmlContent = "";
  choosenCharacter.push(value);
  document.getElementById(value).classList.add("active");
  htmlContent += `<option value="${value}">${value}</option>`;
  document.getElementById("character__selector").innerHTML += htmlContent;
  betCharacter.push(0);
};
/*
deleteCharacter
Chức năng: Xóa nhân vật trong choosenCharacter[]     
Handle: không
Tham số: 
-value: Gia tri nhân vậy được thêm
Trả về: Không
*/
const deleteCharacter = function (value) {
  for (let i in choosenCharacter) {
    if (value === choosenCharacter[i]) {
      choosenCharacter.splice(i, 1);
      betCharacter.splice(i, 1);
      //xoá active trên nút nhân vật
      document.getElementById(value).classList.remove("active");
      //Xóa khỏi selector cược tiền
      let characterSelector = document.getElementById("character__selector");
      for (let i in characterSelector) {
        if (characterSelector.options[i].value == value) {
          //Xóa nhân vật khỏi selector chọn
          characterSelector.remove(i);
          // Xóa nhân vật khỏi table result
          let resultTableCharacterId = "row" + value;
          document.getElementById(resultTableCharacterId).remove();
          break;
        }
      }
    }
  }
  sumPaidMoney = caculatingBetMoney();
  renderBetMoney(sumPaidMoney);
};
/*
handleChooseCharacter
Chức năng: Thêm, xóa nhân vật khỏi choosenCharacter[]    
Handle: 
Button class="cop"
Button class="bau"
Button class="ga"
Button class="tom"
Button class="ca"
Button class="cua"
Tham số: 
-value: Gia tri nhân vật thêm, xóa trong choosenCharacter[]
Trả về: Không
*/
const handleChooseCharacter = function (value) {
  let checkCharacter = characterValidation(value);
  if (checkCharacter === false) {
    addCharacter(value);
  } else {
    deleteCharacter(value);
  }
  console.log(betCharacter);
  console.log(choosenCharacter);
};
/*
handleChoosingDenomination
Chức năng: Chọn mệnh giá tiền cho vào input
Handle: 
-button id="money10"
-button id="money20"
-button id="money50"
-button id="money100"
-button id="money200"
-button id="money500"
Tham số: 
-denomination: Mệnh giá cược lấy từ value button
Trả về: Không
*/
const handleChoosingDenomination = function (denomination) {
  let choosenDenomination = +denomination;
  inputValue += choosenDenomination;
  document.getElementById("inputBetMoney").value = inputValue;
  console.log(inputValue);
};
/*
characterBetDenomination
Chức năng: Lưu mệnh giá từng con vật vào betCharacter[] và xuất danh sách data vào result table
Handle: Không
Tham số: Không
Trả về: Không
*/
const characterBetDenomination = function () {
  inputValue = 0;
  let paidMoney = document.getElementById("inputBetMoney").value;
  paidMoney = +paidMoney;
  let paidCharacter = document.getElementById("character__selector").value;
  if (paidCharacter === "none") {
    alert("Vui lòng chọn nhân vật cược");
  } else {
    for (let i in choosenCharacter) {
      if (paidCharacter === choosenCharacter[i]) {
        betCharacter[i] = paidMoney;
      }
    }
  }
};
/*
resultPaid
Chức năng: Xuất danh sách con vật và cược vào result table
Handle: Không
Tham số: Không
Trả về: Không
*/
const resultPaid = function () {
  let resultPaidUI = "";
  sumBetMoney = 0;
  for (let i in choosenCharacter) {
    resultPaidUI += `<tr id="row${choosenCharacter[i]}">
<th>${+i + 1}</th>
  <td>${choosenCharacter[i]}</td>
  <td>${betCharacter[i].toLocaleString()} VND</td>
</tr>`;
  }
  sumPaidMoney = caculatingBetMoney();
  renderBetMoney(sumPaidMoney);
  document.getElementById("result__payment").innerHTML = resultPaidUI;
};
/*
handleSubmitPaid
Chức năng: Khởi động button xử lí tiền cược và xuất ra UI result table
Handle: Không
Tham số: Không
Trả về: Không
*/
const handleSubmitPaid = function () {
  characterBetDenomination();
  resultPaid();
};
/*
calculatingIncom
Chức năng: Tính và lưu lại số tiền sau mỗi ván chơi
Handle: Không
Tham số: 
-result: mảng kết quả của xúc sắc từ function handleDice 
Trả về: Không
*/
const calculatingIncom = function (result) {
  let incomeMoney = 0;
  for (let i in choosenCharacter) {
    let checkCurrentChoosenCharacter = choosenCharacter[i];
    let haveCharacterInDices = false;
    for (let j in result) {
      if (checkCurrentChoosenCharacter == result[j]) {
        incomeMoney += betCharacter[i];
        haveCharacterInDices = true;
      }
    }
    if (haveCharacterInDices == false) {
      incomeMoney -= betCharacter[i];
    }
  }
  playerWallet += incomeMoney;
  console.log("income" + incomeMoney);
  console.log("wallet" + playerWallet);
};
/*
resetGame
Chức năng: reset lại tất cả element và tài nguyên ván chơi trước về nguyên gốc
Handle: Không
Tham số: Không
Trả về: Không
*/
const resetGame = function () {
  gameStarted = false;
  for (let i in choosenCharacter) {
    document.getElementById(choosenCharacter[i]).classList.remove("active");
  }
  document.getElementById("dice1").setAttribute("src", "");
  document.getElementById("dice2").setAttribute("src", "");
  document.getElementById("dice3").setAttribute("src", "");
  betCharacter = [];
  choosenCharacter = [];
  let htmlContent = ' '
  document.getElementById("character__selector").innerHTML = htmlContent;
  document.getElementById("result__payment").innerHTML = htmlContent;
  document.getElementById('sum__payment').innerHTML = htmlContent;
};
