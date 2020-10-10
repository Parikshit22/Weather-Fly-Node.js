console.log("CLient side javascript file is loaded!");

document.querySelector("#locationsubmit").addEventListener("click", demo);

function demo(e) {
  e.preventDefault();

  var loaction_name = document.getElementById("locationname").value;
  fetch("http://localhost:3000/weather?address=" + loaction_name).then(
    (response) => {
      response.json().then((data) => {
        document.querySelector(".myImage").style.display = "block";
        if (data.error) {
          console.log(data.error);
          document.querySelector("#message_1").innerText = data.error;
          document.querySelector("#message_2").innerText = "";
        } else {
          document.querySelector("#message_1").innerText = data.location;
          document.querySelector("#message_2").innerText = data.forecast;
        }
      });
    }
  );
}
