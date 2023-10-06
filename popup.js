// /******/ (() => { // webpackBootstrap
// var __webpack_exports__ = {};
// /*!**********************!*\
//   !*** ./src/popup.js ***!
//   \**********************/
// const map = new Map()

// const send_message = (tabs) => {
//   document.querySelector('p').textContent = 'Solving....'

//   const tab = tabs[0];
//   let input_ele = document.querySelector('input[type=number]').valueAsNumber

//   if(!input_ele || input_ele < 2) {
//     input_ele = 2
//     document.querySelector('input[type=number]').value = 2
//   }
//   chrome.tabs.sendMessage(tab.id, {type: "start", ms: input_ele * 1000})
// }
// document.querySelector('button').addEventListener('click', () => { 
//   document.querySelector('p').textContent = 'Solving....'
//   document.querySelector('tbody').innerHTML = ''
  
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs)=>{
//     send_message(tabs)
//   })
// })

// document.addEventListener('DOMContentLoaded', async () => {
//   console.log("MIT");
//   const {checked} = await chrome.storage.sync.get()
//   console.log(checked);
//   const span = document.querySelector('span') 
//   span.setAttribute('data-toggle', checked ? 'ON' : 'OFF')
//   document.querySelector('input[type=checkbox]').checked = checked
//   if(checked) {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs)=>{
//       send_message(tabs)
//     });
//   }
// })


// document.querySelector('input[type=checkbox]').addEventListener('change', async e => {
//   const checked = e.target.checked
//   await chrome.storage.sync.set({checked})
//   document.querySelector('span').setAttribute('data-toggle', checked ? 'ON' : 'OFF')

//   if(checked) {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs)=>{
//       send_message(tabs)
//     });
//   }
 
// })




// chrome.runtime.onMessage.addListener((req, sender, res) => {
//   if(req.type === 'answer') {
//     document.querySelector('p').textContent = 'Solved. Please check the answer'
//     let answer = ''
//     for(let i of req.data){
//       const [ii,j] = Object.entries(i)[0]
//       if(!map.has(ii)){
//         map.set(ii, j)
//         answer += `<tr><td>${ii}</td><td>${j}</td></tr>`
//       }
//     }

//     document.querySelector('tbody').innerHTML += answer
//   }

// })

// /******/ })()
// ;
// //# sourceMappingURL=popup.js.map