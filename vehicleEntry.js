class Records {
  constructor() {
    let records = [];

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

    //Exit Vehicle
    this.exit = (plate_no) => {

      records.forEach((record) => {
        if (record.plate_no === plate_no) {
        //   record.exit_time = +new Date();
        record.exit_time = +new Date(2026, 1, 27, 12, 0), // Tommorow's Date for testing
          record.currently_parked = false;
          receiptGeneration(record, rules)
        }
      });
    };


    //Create record for Vehicle entry
    this.createRecord = function (plate_no, vehicle_type) {
      const record = {
        plate_no: plate_no,
        vehicle_type: vehicle_type,
        entry_time: +new Date(),
        exit_time: null,
        currently_parked: true,
      };

      records.push(record);
    };



    //List all Records
    this.listRecords = function () {
      return records;
    };




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
      const totalDuration_m = Math.round(
        (exit_time - entry_time) / (1000 * 60),
      );
      const hours = Math.floor(totalDuration_m / 60);
      const mins = totalDuration_m - hours * 60;
      let totalDuration = [hours, mins];


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
  }
}

const vehicleRecord = new Records();
vehicleRecord.createRecord("LEO 1015", "Bike");
// console.log(vehicleRecord.listRecords());

vehicleRecord.exit("LEO 1015");
console.log(vehicleRecord.listRecords());

// const vehicle = {
//   plate_no: "LEO1015",
//   vehicle_type: "Bike",
//   // entry_time: +new Date(2026, 1, 26, 6, 44),
//   entry_time: +new Date(),
//   exit_time: +new Date(2026, 1, 26, 12, 0),
//   currently_parked: true,
//   // total_revenue: 0,
// };
