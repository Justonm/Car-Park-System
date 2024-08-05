<<<<<<< HEAD

=======
document.addEventListener('DOMContentLoaded', () => {
  const parkingLot = document.getElementById('parking-lot');
  const addCarForm = document.getElementById('add-car-form');
  const numberPlateInput = document.getElementById('numberPlate');
  const modelInput = document.getElementById('model');
  const ownerInput = document.getElementById('owner');

  // Fetch and display cars in order
  function fetchCars() {
    fetch('http://localhost:3000/cars')
      .then(response => response.json())
      .then(cars => {
        cars.sort((a, b) => a.id - b.id); // Sort cars by id
        parkingLot.innerHTML = '';
        cars.forEach(car => {
          const carElement = document.createElement('div');
          carElement.classList.add('car');
          carElement.innerHTML = `
              <p>Number Plate: ${car.numberPlate}</p>
              <p>Model: ${car.model}</p>
              <p>Owner: ${car.owner}</p>
              <p>Parked At: ${new Date(car.parkedAt).toLocaleString()}</p>
              <button onclick="editCar(${car.id})">Edit</button>
              <button onclick="deleteCar(${car.id})">Delete</button>
            `;
          parkingLot.appendChild(carElement);
        });
      });
  }

  // Add a new car
  addCarForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Fetch existing cars to determine the next ID
    fetch('http://localhost:3000/cars')
      .then(response => response.json())
      .then(cars => {
        const nextId = cars.length > 0 ? Math.max(...cars.map(car => car.id)) + 1 : 1; // Determine next ID
        const newCar = {
          id: nextId,
          numberPlate: numberPlateInput.value,
          model: modelInput.value,
          owner: ownerInput.value,
          parkedAt: new Date().toISOString()
        };

        return fetch('http://localhost:3000/cars', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newCar)
        });
      })
      .then(response => response.json())
      .then(car => {
        fetchCars();
        addCarForm.reset();
      });
  });

  // Edit a car
  window.editCar = (id) => {
    const carElement = document.querySelector(`.car[data-id="${id}"]`);
    const numberPlate = prompt('Enter new number plate:', carElement.querySelector('p:nth-child(1)').textContent.replace('Number Plate: ', ''));
    const model = prompt('Enter new model:', carElement.querySelector('p:nth-child(2)').textContent.replace('Model: ', ''));
    const owner = prompt('Enter new owner:', carElement.querySelector('p:nth-child(3)').textContent.replace('Owner: ', ''));

    if (numberPlate && model && owner) {
      fetch(`http://localhost:3000/cars/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ numberPlate, model, owner })
      })
        .then(response => response.json())
        .then(car => fetchCars());
    }
  };

  // Delete a car
  window.deleteCar = (id) => {
    fetch(`http://localhost:3000/cars/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(() => fetchCars());
  };

  fetchCars();
});
>>>>>>> d0b6c52 (Initial commit)
