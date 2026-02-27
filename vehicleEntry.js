class Records {
  constructor() {
    let records = [];

    let summary = {
      totalVehiclesParked: 0,
      vehiclesParked: null,
      totalRevenue: 0,
      revenuePerVehicle: null,
      allViolations: [],
    };

    // Parking Rules Configuration
    const rules = {
      currency: "PKR",
      lostTicketFine: 2000,
      hourlyRates: {
        Car: 100,
        Bike: 50,
        Truck: 200,
        Rickshaw: 0
      },
      graceMinutes: 15,
      dailyCaps: {
        Car: 800,
        Bike: 400,
        Truck: 1500,
        Rickshaw: 0
      },
    };

    // List of all Vehicle Categories
    const vehicles = Object.keys(rules.hourlyRates);

    //Enter Vehicle
    this.enter = (plate_no, vehicle_type) => {
      // Check for Duplicate Entry
      if (
        records.some(
          (curr) => curr.plate_no == plate_no && curr.currently_parked,
        )
      ) {
        summary.allViolations.push(`Duplicate Entry Violation: ${plate_no}`);
      } else {
        createRecord(plate_no, vehicle_type);
        const calculated = calculateVehicles();
        updateSummaryOnEntry(calculated);
      }
    };

    //Exit Vehicle
    this.exit = (plate_no, vehicle_type) => {
      if (!records.some((curr) => curr.plate_no == plate_no)) {
        summary.allViolations.push(`No Record Exit Violation: ${plate_no}`);
      } else {
        records.forEach((record) => {
          if (record.plate_no === plate_no) {
            record.exit_time = new Date(2026, 1, 27, 12, 0); // Tommorow's Date for testing
            const receipt = receiptGeneration(record, rules); //Generate Receipt

            if (record.ticketViolation) {
              record.fee = 0; //Update fee in records
              handleTicketViolation(plate_no);
              record.currently_parked = false;
            } else {
              //   record.exit_time = +new Date();
              record.currently_parked = false;
              console.log("********RECEIPT*******");
              console.log(receipt);
              // finance.totalRevenue += receipt.final_fee;
              record.fee = receipt.final_fee; //Update fee in records
            }

            summary.revenuePerVehicle = revenuePerVehicle(); // Update revenue per vehicle in summary
            summary.totalRevenue = calculateRevenue(); //Update total revenue in summary
            summary.totalVehiclesParked -= 1;
            summary.vehiclesParked[vehicle_type] -= 1;
          }
        });
      }
    };

    //Report Lost Ticket
    this.reportTicketLost = function (plate_no) {
      records.forEach((record) => {
        if (record.plate_no === plate_no) {
          record.ticketViolation = true;
          summary.allViolations.push(`Ticket Lost Violation: ${plate_no}`);
        }
      });
    };

    //Handle Ticket Violation
    function handleTicketViolation(plate_no) {
      records.forEach((record) => {
        if (record.plate_no === plate_no) {
          record.ticketViolationFee = rules.lostTicketFine; // Apply fine for ticket lost
        }
      });
    }

    //Revenue Calcultaion
    function calculateRevenue() {
      const totalRevenue = records.reduce((acc, curr) => {
        return acc + curr.fee + curr.ticketViolationFee;
      }, 0);
      return totalRevenue;
    }

    //Revenue Per Vehicle Category
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

    //Vehicle Calculation
    function calculateVehicles() {
      let parkredVehicleCount = vehicles.reduce((acc, curr) => {
        acc[curr] = 0;
        return acc;
      }, {});

      for (const x of Object.keys(parkredVehicleCount)) {
        records.forEach((record) => {
          record.vehicle_type == x && record.currently_parked
            ? ++parkredVehicleCount[x]
            : parkredVehicleCount[x] + 0;
        });
      }

      const totalVehiclesParked = Object.entries(parkredVehicleCount).reduce(
        (acc, curr) => {
          return acc + curr[1];
        },
        0,
      );
      return [totalVehiclesParked, parkredVehicleCount];
    }

    // Update Summary

    function updateSummaryOnEntry(vehicleCount) {
      summary.totalVehiclesParked = vehicleCount[0];
      let vehiclesParked = vehicles.reduce((acc, curr) => {
        acc[curr] = 0;
        return acc;
      }, {});

      for (const x of Object.keys(vehiclesParked)) {
        vehiclesParked[x] = vehicleCount[1][x];
      }

      summary.vehiclesParked = vehiclesParked;
    }

    //Create record for Vehicle entry
    function createRecord(plate_no, vehicle_type) {
      const record = {
        plate_no: plate_no,
        vehicle_type: vehicle_type,
        entry_time: new Date(),
        exit_time: null,
        currently_parked: true,
        fee: 0,
        ticketViolation: false,
        ticketViolationFee: 0,
      };

      records.push(record);
    }

    //List all Records
    this.listRecords = function () {
      return records;
    };

    //List all Transaction History
    this.listHistory = function () {
      return records;
    };

    // List Summary
    this.listSummary = function () {
      return summary;
    };

    // Generate receipt for vehicle exit
    function receiptGeneration(vehicle_data, rules) {
      //Destructuring vehicle and rules
      const { plate_no, entry_time, exit_time, vehicle_type } = vehicle_data;
      const { graceMinutes } = rules;

      //Calculating Duration
      const totalDuration_m = Math.round(
        (+exit_time - +entry_time) / (1000 * 60),
      );
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
  }
}

const vehicleRecord = new Records();
vehicleRecord.enter("LEO-1015", "Bike"); // Bike Enter
vehicleRecord.enter("LEO-1015", "Bike"); // To Check Duplicate Entry Working
vehicleRecord.enter("LEX-7749", "Car");  // Car Enter 
console.log(vehicleRecord.listRecords());

vehicleRecord.reportTicketLost("LEO-1015"); // To Check Lost Ticket Report Working
// vehicleRecord.reportTicketLost("LEX 7749");
vehicleRecord.exit("LEO-1015", "Bike"); // Bike Exit
vehicleRecord.exit("LEX-7749", "Car");  // Car Exit
vehicleRecord.exit("ABC-1234", "Rickshaw"); // Non-existing Vehicle Exit
console.log("********RECORDS********");
console.log(vehicleRecord.listRecords()); 
console.log("********SUMMARY********");
console.log(vehicleRecord.listSummary()); // Summary Report
// console.log("********TRANSACTION HISTORY********");
// console.log(vehicleRecord.listHistory());

// const vehicle = {
//   plate_no: "LEO1015",
//   vehicle_type: "Bike",
//   // entry_time: +new Date(2026, 1, 26, 6, 44),
//   entry_time: +new Date(),
//   exit_time: +new Date(2026, 1, 26, 12, 0),
//   currently_parked: true,
//   // total_revenue: 0,
// };
