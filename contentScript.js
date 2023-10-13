(() => {
  let all_questions = [];
  function popup_old_issue() {
    console.log('old issue has been called')
    setTimeout(() => {
      document
        .querySelector(".css-nfm37i")
        ?.querySelector(".css-a7y86l")
        ?.click();
    }, 500);  
  }
  function solveQuestions(all_questions) {
    console.log("start solving questions");
    // 0 - click radio, 1 - click save, 2- click resert, 3 - check correct, 4 - complete all
    let flag = 2;
    let in_complete_questions = [];
    let question_number = 0;

    let interval = setInterval(() => {
      console.log("each interval with flag " + flag);
      if (flag === 2) {
        in_complete_questions = all_questions.filter(
          (question) => !question.is_answered
        );
        console.log("reamining questions " + in_complete_questions.length);
        question_number = 0;
        // in_complete_questions.push("pressReset")
        if (in_complete_questions.length === 0) {
          console.log("all questions completed");
          console.log(all_questions);
          flag = 4;
          return;
        }
        let reset_button = document.querySelector(
          "div[data-react-class=ResetMultipleChoiceQuestionsManager] button"
        );
        console.log('reset button')
        console.log(reset_button)
        console.log(reset_button.disabled)
        if (!reset_button.disabled) {
          reset_button.click();
          console.log('sent message to old issue')
          popup_old_issue();
        }
        flag = 0;
        return;
      } else if (flag === 1) {
        let question = in_complete_questions[question_number];
        // console.log('check for error')
        // console.log('question number '+ question_number + "total questions " + in_complete_questions.length)
        console.log(question.whole_tag.querySelector("button[type=submit]"));
        question.whole_tag.querySelector("button[type=submit]").click();
        flag = 0;
        question_number += 1;
        return;
      } else if (flag === 0) {
        if (question_number === in_complete_questions.length) {
          question_number = 0;
          flag = 3;
          return;
        } else {
          let question = in_complete_questions[question_number];
          question.options_tag[question.current_index].click();
        }
        flag = 1;
        return;
      } else if (flag === 3) {
        all_questions.forEach((question) => {
          if (question.is_answered) return;
          let check_correct = question.whole_tag.querySelector(".correct");
          if (check_correct) {
            question.answer = question.options[question.current_index];
            question.answer_tag = question.options_tag[question.current_index];
            question.is_answered = true;
            console.log(question.question + " completed");
          } else {
            let check_incorrect =
              question.whole_tag.querySelector(".incorrect");
            if (check_incorrect) {
              //remove top element from options tag and option
              // question.options.shift()
              // question.options_tag.shift()
              question.current_index += 1;
              console.log(question.question + " incorrect");
            }
          }
        });
        flag = 2;
      } else if (flag === 4) {
        console.log("all questions completed");
        console.log(all_questions);
        all_questions[question_number].answer_tag.click();
        all_questions[question_number].whole_tag
          .querySelector("button[type=submit]")
          ?.click();
        question_number += 1;
        if (question_number === all_questions.length) {
          clearInterval(interval);
          showAnswers();
        }
        return;
      }
    }, 1000);
  }

  function fillAnswers() {
    let all_question_tags = document.querySelectorAll(
      "div.multiple-choice-question-component"
    );
    all_questions = [];
    console.log(all_question_tags);
    // all_question_tags.foreach((question_tag) => {
    for (let i = 0; i < all_question_tags.length; i++) {
      const question_tag = all_question_tags[i];
      let question = question_tag.querySelector(
        ".webtext-question-label"
      ).textContent;
      let all_options_tag = question_tag.querySelectorAll("input[type=radio]");
      // let answer = all_options[0].parentElement.querySelector("label").textContent
      // all_options[0].checked = true
      // console.log(question, answer)
      let all_options = [];
      // all_options_tag.forEach((option) => {
      for (let j = 0; j < all_options_tag.length; j++) {
        const option = all_options_tag[j];
        all_options.push(
          option.parentElement.querySelector("label").textContent
        );
      }
      all_questions.push({
        whole_tag: question_tag,
        question: question,
        options: all_options,
        answer: "",
        options_tag: all_options_tag,
        answer_tag: "",
        is_answered: false,
        current_index: 0,
        submit_button: question_tag.querySelector("button[type=submit]"),
      });
    }

    // let all_question_deck = document.querySelectorAll("div[data-react-class=QuestionDeck]")

    console.log(all_questions);
    solveQuestions(all_questions);
  }

  function showAnswers() {
    const bottom = document.querySelector("div#lower-prev-next-links");
    // Create the main <div> for the dialog
    const dialog = document.createElement("div");
    dialog.id = "dialog";
    dialog.style.display = "none";
    dialog.style.position = "fixed";
    dialog.style.top = "0";
    dialog.style.left = "0";
    dialog.style.width = "100%";
    dialog.style.height = "100%";
    dialog.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    dialog.style.zIndex = "1000";

    // Create the inner <div> for the dialog content
    const contentDiv = document.createElement("div");
    contentDiv.style.position = "absolute";
    contentDiv.style.top = "50%";
    contentDiv.style.left = "50%";
    contentDiv.style.transform = "translate(-50%, -50%)";
    contentDiv.style.backgroundColor = "white";
    contentDiv.style.padding = "20px";
    contentDiv.style.borderRadius = "5px";

    // Create the <h2> element for the title
    const title = document.createElement("h2");
    title.textContent = "Answers";
    title.style.marginBottom = "5px";

    // Create the <table> element
    const table = document.createElement("table");
    table.border = "2";

    // Create the table header row
    const tableHeaderRow = document.createElement("tr");

    // Create the table header cells
    const questionHeader = document.createElement("th");
    questionHeader.textContent = "Question";
    const answerHeader = document.createElement("th");
    answerHeader.textContent = "Answer";

    // Append the header cells to the header row
    tableHeaderRow.appendChild(questionHeader);
    tableHeaderRow.appendChild(answerHeader);

    // Append the header row to the table
    table.appendChild(tableHeaderRow);

    // Create the "Close" button
    const closeButton = document.createElement("button");
    closeButton.id = "close-dialog";
    closeButton.textContent = "Close";
    closeButton.style.backgroundColor = "red";
    closeButton.style.color = "white";
    closeButton.style.padding = "5px";
    closeButton.style.marginTop = "10px"
    closeButton.style.borderRadius = "5px"

    const downloadButton = document.createElement("button");
    downloadButton.id = "download-dialog";
    downloadButton.textContent = "download";
    downloadButton.style.backgroundColor = "green";
    downloadButton.style.color = "white";
    downloadButton.style.padding = "5px";
    downloadButton.style.marginLeft = "20px"
    downloadButton.style.marginTop = "10px"
    downloadButton.style.borderRadius = "5px"

    // Append all elements to the DOM
    table.appendChild(tableHeaderRow);
    contentDiv.appendChild(title);
    contentDiv.appendChild(table);
    contentDiv.appendChild(closeButton);
    contentDiv.appendChild(downloadButton)
    dialog.appendChild(contentDiv);

    //create donwloadable file
    function download(){
      let donwload_object = []

      let cnt = 0;
      all_questions.forEach((question)=>{
        cnt+=1
        let temp = {
          q_no:cnt,
          question: question.question,
          options: question.options,
          answer: question.answer
        }
        donwload_object.push(temp)
        console.log(donwload_object)
      })

      let download_string = JSON.stringify(donwload_object)
      let file_name = document.querySelector(".webtext-page-title.readable")?.innerHTML || "data"
      console.log("file name")
      console.log(file_name)
      const blob = new Blob([download_string],{type:'application/json'})
      var downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", URL.createObjectURL(blob));
      downloadAnchorNode.setAttribute("download", `${file_name}.json`);
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }
    downloadButton.addEventListener('click',download  )
    // Append the dialog to the body of the document
    // document.body.appendChild(dialog);

    // bottom.innerHTML += '<div id="dialog" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 1000;"><div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border-radius: 5px;"><h2 style="margin-bottom:5px;">Answers</h2><table border="2"><tr><th>Question</th><th>Answer</th></tr></table><button id="close-dialog" style="background-color: red; color: white; padding: 5px;">Close</button></div></div>'
    bottom.appendChild(dialog);
    setTimeout(() => {
      document.querySelector("#dialog").style.display = "block";
      document.querySelector("#close-dialog").addEventListener('click', ()=> {
        document.querySelector("#dialog").remove();
      });

      let table = document.querySelector("#dialog div table")
      console.log(table)
      let table_content = ""
      console.log("all questions with answers in console")
      console.log(all_questions)
      all_questions.forEach((question)=>{
        table_content += `<tr><td>${question.question}</td><td>${question.answer}</td></tr>`
      })

      console.log(table_content)
      table.innerHTML += table_content
      return;
    }, 500);
    return;
  }

  function init() {
    console.log("ok ok ok ");
    console.log("Content Script Loaded");
    const bottom = document.querySelector("div#lower-prev-next-links");
    let button_text =
      "<span id='fill-button' style='background-color: blue; color: white; padding: 10px 20px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; margin-bottom:5px;'>Fill Answer</span> <span id='show-button' style='background-color: green; color: white; padding: 10px 20px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer;margin-bottom:10px;'>Show Answers</span>";
    bottom.innerHTML = button_text + bottom.innerHTML;

    const reset_button = document.querySelector(
      "div[data-react-class=ResetMultipleChoiceQuestionsManager] button"
    );

    document.querySelector("#fill-button").addEventListener("click", () => {
      console.log("fill the answerws");
      fillAnswers();
    });

    document.querySelector("#show-button").addEventListener("click", () => {
      console.log("show the answerws");
      showAnswers();
    });
  }

  init();
})();
