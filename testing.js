// Implementing Vehicle report generation using dummy data

const vehicle = {
  plate_no: "LEO1015",
  vehicle_type: "Bike",
  // entry_time: +new Date(2026, 1, 26, 6, 44),
  entry_time: +new Date(),
  exit_time: +new Date(2026, 1, 27, 12, 0),
  currently_parked: true,
  // total_revenue: 0,
};

// Parking Rules Configuration

// const rules = {
//   currency: "PKR",
//   lostTicketFine: 2000,
//   hourlyRates: {
//     Car: 100,
//     Bike: 50,
//     Truck: 200,
//   },
//   graceMinutes: 15,
//   dailyCaps: {
//     Car: 800,
//     Bike: 400,
//     Truck: 1500,
//   },
// };

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

// receiptGeneration(vehicle, rules);

let records = [
  {
    plate_no: "LEO 1015",
    vehicle_type: "Bike",
    entry_time: 1772084829391,
    exit_time: null,
    currently_parked: true,
    fee: 0,
    ticketViolationFee: 2000,
  },
  {
    plate_no: "LEO 1016",
    vehicle_type: "Bike",
    entry_time: 1772084829391,
    exit_time: null,
    currently_parked: true,
    fee: 300,
    ticketViolationFee: 0,
  },
  {
    plate_no: "LEX 7749",
    vehicle_type: "Car",
    entry_time: 1772084829391,
    exit_time: null,
    currently_parked: true,
    fee: 800,
    ticketViolationFee: 0,
  },
];

// function calculateVehicles(records) {

//   let vehicles = {bike:0, car:0, truck:0, totalVehiclesParked:0}
//   records.forEach((record) => {
//     record.vehicle_type == "Bike" && record.currently_parked
//       ? ++vehicles.bike
//       : vehicles.bike + 0;
//     record.vehicle_type == "Car" && record.currently_parked
//       ? ++vehicles.car
//       : vehicles.car + 0;
//     record.vehicle_type == "Truck" && record.currently_parked
//       ? ++vehicles.truck
//       : vehicles.truck + 0;
//   });
//     vehicles.totalVehiclesParked = vehicles.bike + vehicles.car + vehicles.truck;
//     return vehicles;
// };

// console.log(calculateVehicles(records));

//Revenue Calcultaion
// function calculateRevenue(records){
//   let sum;
//     const totalRevenue = records.forEach((curr)=>return acc + curr.fee + curr.ticketViolationFee,0);
//     return totalRevenue;
// }

//Revenue Calcultaion
// function calculateRevenue(){
//     const totalRevenue = records.reduce((acc, curr)=>{return acc+curr.fee+curr.ticketViolationFee});
//     return totalRevenue;
// }

// console.log(calculateRevenue());

//Revenue Per Vehicle Calculation
// function revenuePerVehicle(records) {
//   // add this function after exit
//   let vehicleRevenue = {
//     bikesRevenue: 0,
//     carsRevenue: 0,
//     trucksRevenue: 0,
//   };
//   const Bikes = records.filter((record) => record.vehicle_type == "Bike");
//   const Cars = records.filter((record) => record.vehicle_type == "Car");
//   const Trucks = records.filter((record) => record.vehicle_type == "Truck");

//   vehicleRevenue.bikesRevenue = Bikes.reduce((acc, curr) => {
//     return acc + curr.fee + curr.ticketViolationFee;
//   }, 0);
//   vehicleRevenue.carsRevenue = Cars.reduce((acc, curr) => {
//     return acc + curr.fee + curr.ticketViolationFee;
//   }, 0);
//   vehicleRevenue.truckssRevenue = Trucks.reduce((acc, curr) => {
//     return acc + curr.fee + curr.ticketViolationFee;
//   }, 0);
//   return vehicleRevenue;
// }

// console.log(revenuePerVehicle(records));

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

const vehicles = Object.keys(rules.hourlyRates);
console.log(vehicles);

// [ 'Car', 'Bike', 'Truck' ]

function revenuePerVehicle() {
  let vehicleRevenue = vehicles.reduce((acc, curr) => {
    acc[curr] = 0;
    return acc;
  }, {});

  for (const vehicle of Object.keys(vehicleRevenue)) {
    vehicleRevenue[vehicle] = records
      .filter((record) => record.vehicle_type == vehicle)
      .reduce((acc, curr) => {
        return acc + curr.fee + curr.ticketViolationFee;
      }, 0);
  }
  return vehicleRevenue;
}

// console.log(revenuePerVehicle());

function receiptGeneration(vehicle_data, rules) {
  //Destructuring vehicle and rules
  const { plate_no, entry_time, exit_time, vehicle_type } = vehicle_data;
  const { graceMinutes } = rules;

  //Calculating Duration
  const totalDuration_m = Math.round((+exit_time - +entry_time) / (1000 * 60));
  const hours = Math.floor(totalDuration_m / 60);
  const mins = totalDuration_m - hours * 60;
  let totalDuration = [hours, mins];

  // Calculating Final fee with grace minutes and price cap
  const bill = (vehicle_type, totalDuration) => {
    const V_bill =
      totalDuration[1] <= graceMinutes
        ? rules.hourlyRates[vehicle_type] * totalDuration[0]
        : rules.hourlyRates[vehicle_type] * (totalDuration[0] + 1);
    return V_bill > rules.dailyCaps[vehicle_type]
      ? rules.dailyCaps[vehicle_type]
      : V_bill;
  };
  const final_fee = bill(vehicle_type, totalDuration);

  // Exiting Reciept
  const receipt = {
    plate_no: plate_no,
    entry_time: new Date(entry_time),
    exit_time: new Date(exit_time),
    total_duration: totalDuration, // hours and minutes
    final_fee: final_fee,
    calculationSteps: "Fee = (Parking Duration) X (Hourly Rate)",
  };

  return receipt;
}

//Vehicle Calculation
function calculateVehicles() {
  let parkredVehicleCount = vehicles.reduce((acc, curr) => {
    acc[curr] = 0;
    return acc;
  }, {});


  for (const x of Object.keys(parkredVehicleCount)){
        records.forEach((record) => {
          record.vehicle_type == x && record.currently_parked
            ? ++parkredVehicleCount[x]
            : parkredVehicleCount[x] + 0;
  });
  }

  const totalVehiclesParked = (Object.entries(parkredVehicleCount)).reduce((acc, curr)=>{return acc+curr[1]},0);
  console.log(Object.entries(parkredVehicleCount));
  return [totalVehiclesParked, parkredVehicleCount];
}

console.log(calculateVehicles());
