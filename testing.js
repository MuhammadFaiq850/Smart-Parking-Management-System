// Implementing Vehicle report generation using dummy data

const vehicle = {
  plate_no: "LEO1015",
  vehicle_type: "Bike",
  // entry_time: +new Date(2026, 1, 26, 6, 44),
  entry_time: +new Date(),
  exit_time: +new Date(2026, 1, 26, 12, 0),
  fee: 0,
  park_history: [{ amount: 10, exit_time: this.exit_time }],
  currently_parked: false,
  total_revenue: 0,
};

// Parking Rules Configuration

const rules = {
  currency: "PKR",
  lostTicketFine: 2000,
  hourlyRates: {
    Car: 100,
    Bike: 50,
    Truck: 200,
  },
  graceMinutes: 15,
  dailyCaps: {
    Car: 800,
    Bike: 400,
    Truck: 1500,
  },
};

// Generatig Reciepts

function receiptGeneration(vehicle, rules) {
  //Destructuring vehicle and rules
  const { plate_no, entry_time, exit_time, vehicle_type } = vehicle;
  const {
    lostTicketFine,
    graceMinutes,
    hourlyRates: { Car: car_rate, Bike: bike_rate, Truck: truck_rate },
    dailyCaps: { Car: car_cap, Bike: bike_cap, Truck: truck_cap },
  } = rules;

  //Calculating Duration
  const totalDuration_m = Math.round((exit_time - entry_time) / (1000 * 60));
  const hours = Math.floor(totalDuration_m / 60);
  const mins = totalDuration_m - hours * 60;
  let totalDuration = [hours, mins];

  console.log(totalDuration);
  console.log(totalDuration_m);

  // Calculating Final fee with grace minutes and price cap
  const bill = (vehicle_type, totalDuration) => {
    if (vehicle_type == "Bike") {

      //Bike total fee with grace minutes and price cap
      const bike_bill =
        totalDuration[1] <= 15
          ? bike_rate * totalDuration[0]
          : bike_rate * (totalDuration[0] + 1); 
      return bike_bill > bike_cap ? bike_cap : bike_bill;

      //Car total fee with grace minutes and price cap
    } else if (vehicle_type == "Car") {
      const car_bill =
        totalDuration[1] <= 15
          ? car_rate * totalDuration[0]
          : car_rate * (totalDuration[0] + 1); 
      return car_bill > car_cap ? car_cap : car_bill;

      //Truck total fee with grace minutes and price cap
    } else if (vehicle_type == "Truck") {
      const truck_bill =
        totalDuration[1] <= 15
          ? truck_rate * totalDuration[0]
          : truck_rate * (totalDuration[0] + 1); 
      return truck_bill > truck_cap ? truck_cap : truck_bill;
    }
  };
  const final_fee = bill(vehicle_type, totalDuration);

  // Exiting Reciept
  const receipt = {
    plate_no: plate_no,
    entry_time: new Date(entry_time),
    exit_time: new Date(exit_time),
    total_duration: totalDuration, // hours and minutes
    final_fee: final_fee,
  };
  console.log(receipt);
}

receiptGeneration(vehicle, rules);


