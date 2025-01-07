// Handle date input change
document.getElementById("dateInput").onchange = function () {
  var dateValue = this.value;
  var date = new Date(dateValue);

  var year = date.getFullYear();
  var monthIndex = date.getMonth();

  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var monthName = months[monthIndex];
  document.getElementById("doutput").textContent = `${monthName} ${year}`;
};

// Convert number to words
function numberToWords(num) {
  const belowTwenty = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  if (num === 0) return "Zero";
  if (num < 20) return belowTwenty[num];
  if (num < 100)
    return (
      tens[Math.floor(num / 10)] + (num % 10 ? " " + belowTwenty[num % 10] : "")
    );
  if (num < 1000)
    return (
      belowTwenty[Math.floor(num / 100)] +
      " Hundred" +
      (num % 100 ? " " + numberToWords(num % 100) : "")
    );
  return "One Thousand";
}

// Calculate total marks and update in real-time
function calculateTotalMarks() {
  const marksInputs = document.querySelectorAll(".marks");
  let total = 0;

  marksInputs.forEach((input) => {
    const value = parseInt(input.value) || 0;
    total += value;
  });

  document.getElementById("totalMarks").textContent = total;
  document.getElementById("totalWords").textContent = numberToWords(total);
}

// Attach oninput handlers for marks inputs
const marksInputs = document.querySelectorAll(".marks");
marksInputs.forEach((input) => {
  input.oninput = calculateTotalMarks;
});

// Handle form submission
document.querySelector("button[type='submit']").onclick = function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const fatherName = document.getElementById("Fname").value;
  const motherName = document.getElementById("Mname").value;
  const regNo = document.getElementById("regno").value;
  const examDate = document.getElementById("dateInput").value;
  const totalMarks = document.getElementById("totalMarks").textContent;
  const totalWords = document.getElementById("totalWords").textContent;

  if (!name || !fatherName || !motherName || !regNo || !examDate) {
    alert("Please fill out all fields.");
    return;
  }

  const tableRows = document.querySelectorAll(".table tbody tr");
  let marksDetails = `<table border="1" style="width: 100%; border-collapse: collapse;">
      <thead>
          <tr>
              <th>Subject</th>
              <th>I Year (Max Marks)</th>
              <th>I Year (Marks Secured)</th>
              <th>II Year (Max Marks)</th>
              <th>II Year (Marks Secured)</th>
          </tr>
      </thead>
      <tbody>`;

  tableRows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    marksDetails += `
          <tr>
              <td>${cells[0].textContent}</td>
              <td>${cells[1].textContent}</td>
              <td>${cells[2].querySelector("input").value || 0}</td>
              <td>${cells[3].textContent}</td>
              <td>${cells[4].querySelector("input").value || 0}</td>
          </tr>`;
  });

  marksDetails += `
      </tbody>
      <tfoot>
          <tr>
              <td><strong>Total</strong></td>
              <td colspan="4"><strong>${totalMarks}</strong></td>
          </tr>
          <tr>
              <td><strong>In Words</strong></td>
              <td colspan="4">${totalWords}</td>
          </tr>
      </tfoot>
  </table>`;

  const certificateHTML = `
      <div class="certificate">
          <h1>Board of Intermediate Education, A.P</h1>
          <h2>Intermediate Pass Certificate</h2>
          <div class="logosection">
              <img src="imges/QRcode.jpeg" alt="QR Code" class="qrimage" />
              <img src="imges/Interlogo.jpeg" alt="Government Logo" class="symbol" />
              <img src="imges/IMG_0034.jpg" alt="Passport Photo" class="passport_photo" />
          </div>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Father's Name:</strong> ${fatherName}</p>
          <p><strong>Mother's Name:</strong> ${motherName}</p>
          <p><strong>Registration No:</strong> ${regNo}</p>
          <p>has appeared at the Intermediate Public Examination held in <strong>${examDate}</strong> as the medium of Instruction.</p>
          <h3>Marks Details</h3>
          <div>${marksDetails}</div>
      </div>`;

  const popupWindow = window.open("", "_blank", "width=1000, height=800");
  popupWindow.document.write(`
      <html>
          <head>
              <title>Intermediate Certificate</title>
              <link rel="stylesheet" href="style.css" />
          </head>
          <body>${certificateHTML}</body>
      </html>`);
};
