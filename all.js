let form = document.querySelector("#form");
let text = document.querySelector("#text");
let submitBtn = document.querySelector("#submit");
let todolist = document.querySelector("#todolist");

form.addEventListener("submit", addItem);
todolist.addEventListener('dblclick',function(e){
    let ID = e.target.id
    console.log(ID);
    confirm('确定完成事项?')?localStorage.removeItem(ID): false;
    

    getlocal();
})

getlocal(); //讀取現有loca


//新增事项进入loca
function addItem(e) {
  e.preventDefault(); //取消预设
  if (!text.value) {
    alert("请输入内容");
  } else {
    e.preventDefault(); //取消预设
    let id = getId(); //取得ID
    let str = JSON.stringify(text.value); //转字串
    localStorage.setItem(id, str); //存入loca
    text.value = ""; //清空

    getlocal();
  }
}

//取得时间 作为ID
function getId() {
  let time = new Date();
  let year = time.getFullYear().toString();
  let mon = [time.getMonth() + 1].toString();
  let day = (time.getDate().toString());
  let hours = time.getHours().toString();
  let min = time.getMinutes().toString();
  let sec = time.getSeconds().toString();
  let milsec = time.getMilliseconds().toString();


  //補0
  return year + (mon<10? '0'+ mon : mon) 
  + (day<10? '0'+ day : day) 
  + (hours<10? '0'+ hours : hours)  
  + (min<10? '0'+ min : min) 
  + (sec<10? '0'+ sec : sec) 
  + (milsec<10? '0'+ milsec : (milsec<100? '00'+ milsec : milsec));

}


//读取local 并渲染
function getlocal() {
  todolist.innerHTML = "";
  let localArr = [];

  //写入阵列
  for (let i = 0; i < localStorage.length; i++) {
    localArr.push({
      key: localStorage.key(i),
      value: JSON.parse(localStorage.getItem(localStorage.key(i)))
    });
  }
  //key排序
  localArr.sort((a,b) => a.key < b.key ? -1 : 1);

  //渲染画面
  for (let i = 0; i < localArr.length; i++) {
    let li = document.createElement("LI"); //建立li标签
    li.setAttribute('id',localArr[i].key); //写入value
    li.textContent = localArr[i].value; //写入text
    todolist.appendChild(li); //新增子节点
  }
}
