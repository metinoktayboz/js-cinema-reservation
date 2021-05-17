const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const movie = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');
const button = document.getElementById('btn-submit');

getFromLocalStroge();
calculateTotal();

container.addEventListener('click', function (e) {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected');
        calculateTotal();
    }
});

movie.addEventListener('change', function (e) {
    calculateTotal();

});

function calculateTotal() {
    const selectedSeats = container.querySelectorAll('.seat.selected');
    const reservedSeats = container.querySelectorAll('.seat.reserved');

    const selectedSeatsArr = [];
    const seatsArr = [];
    const reservedSeatsArr = [];

    selectedSeats.forEach(function(seat){
        selectedSeatsArr.push(seat);
    });

    reservedSeats.forEach(function(seat){
        reservedSeatsArr.push(seat);
    });


    seats.forEach(function(seat){
        seatsArr.push(seat);
    });

    let selectedSeatsIndexs = selectedSeatsArr.map(function(seat){
        return seatsArr.indexOf(seat);
    });

    let reservedSeatsIndexs = reservedSeatsArr.map(function(seat){
        return seatsArr.indexOf(seat);
    });


    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;
    amount.innerText = movie.value * selectedSeatCount;

    saveToLocalStorage(selectedSeatsIndexs,reservedSeatsIndexs);
}

function saveToLocalStorage(sIndexs,rIndexs){
    localStorage.setItem('selectedSeats', JSON.stringify(sIndexs));
    localStorage.setItem('reservedSeats', JSON.stringify(rIndexs));
    localStorage.setItem('selectedMovieIndex', movie.selectedIndex);
}

function getFromLocalStroge(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const selectedMovieIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'));
    const reservedSeats = JSON.parse(localStorage.getItem('reservedSeats'));



    if(selectedSeats!=null && selectedSeats.length>0){
        seats.forEach(function(seat,index){
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add('selected');
            }
        })
    }


    if(reservedSeats!=null && reservedSeats.length>0){
        seats.forEach(function(seat,index){
            if(reservedSeats.indexOf(index)>-1){
                seat.classList.add('reserved');
            }
        })
    }


    if(selectedMovieIndex!=null){
        movie.selectedIndex = selectedMovieIndex;
    }
}


button.addEventListener('click',function(){
    const selectedSeats = container.querySelectorAll('.seat.selected');
    selectedSeats.forEach(function(seat){
        seat.classList.replace('selected','reserved');
    });
    calculateTotal();
});