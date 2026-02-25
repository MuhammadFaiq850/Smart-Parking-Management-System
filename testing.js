// Implementing Vehicle report generation using dummy data

const vehicle = {
  // now: new Date(),
  plate_no: "LEO1015",
  vehicle_type: "Bike",
  //  timming: [{entry_time: this.now ,
  //             exit_time: new Date(2026,2,26,12,0)
  //  }],
  entry_time: +new Date(),
  exit_time: +new Date(2026, 1, 26, 12, 0),
  fee: 0,
  park_history: [{ amount: 10, exit_time: this.exit_time }],
  currently_parked: false,
  total_revenue: 0,
};

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

// let time = new Date();
// console.log(time);
// console.log(new Date(2026, 1, 26, 12, 0));

// console.log(vehicle.entry_time);
// // console.log(vehicle.entry_time.getTime());
// // console.log(vehicle.now);
// console.log(vehicle.exit_time);
// // console.log((vehicle.exit_time-vehicle.entry_time).getHours());

// let duration = vehicle.exit_time-vehicle.entry_time;
// console.log(duration/(1000*86400));

// const {entry_time, exit_time } = vehicle;
// const entry_time = vehicle.entry_time;
// const exit_time = vehicle.exit_time;

// console.log(entry_time);
// console.log(exit_time);

function receiptGeneration(vehicle, rules) {

  const{plate_no, entry_time, exit_time} = vehicle;
  const duration = Math.round((exit_time-entry_time)/(1000*60*60));


  const receipt = {
    plate_no: plate_no,
    entry_time: entry_time,
    exit_time: exit_time,
    total_duration: duration, // hours
    final_fee: 0,
  };
  console.log(receipt);
}

receiptGeneration(vehicle, rules);


