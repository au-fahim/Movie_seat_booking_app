const container = document.querySelector(".container");
const allSeat = document.querySelectorAll(".row .seat");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

// const ticketPrice = parseInt(movieSelect.value);
let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update total and count
function updateSelectCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  /**
   * Copy selectedseats into arr
   * Map through array
   * returna new array indexes
   * */

  // const seatsIndex = [...selectedSeats].map(function (seat) {
  //   return [...allSeat].indexOf(seat);
  // });

  const seatsIndex = [...selectedSeats].map((seat) =>
    [...allSeat].indexOf(seat)
  );

  // Save selected seat index

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatCount = selectedSeats.length;

  count.innerText = selectedSeatCount;
  total.innerText = selectedSeatCount * ticketPrice;
}

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    allSeat.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;

  setMovieData(e.target.selectedIndex, e.target.value);

  updateSelectCount();
});

// Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectCount();
  }
});

// Initial count and total set
updateSelectCount();
