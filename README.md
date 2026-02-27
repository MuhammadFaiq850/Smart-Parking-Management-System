# SMART PARKING MANAGEMENT SYSTEM
## Project Overview
This project is about a smart parking. It is written completely in JavaScript in Object Oriented Programming(OOP) paradigm. It keeps track of all the vehicles entering and leaving the parking ,and generates a receipt containing the Plate number, Entry time, Exit time, duration and the Final fee and the detailed breakdown of Calculation steps. It has a defined set of rules that can be changed easily by the user so new vehicle types or pricing rules can be added easily and making it versatile and easy to use. In addition to that it also provides a whole summary report of how many vehicles are currnetly parked inside the parking lot, the count of vehicles by type, total revenue collected and violations. It records three types of violations. First violation is losing ticket and a fine is applied based on the fine amount defined in rules. The second  violation is if the system detects a duplicate entry and prevents the duplication of entry in parking records. The third violation is invalid exit, meaning that it checks if the vehicle exiting was in the records or not. If not then it records it as a violation.

## Getting Started
To set up this project you only need an environment which can run JavaScript code like a Browser's console or by using Node.js inside VS code.

## Usage Guidelines
There are already lines inside the code which initiates the project and test different scenarios of vehicle entering, exiting and reporting lost ticket etc.
But if you want to check the methods yourself these guidelines will help you getting started.
To get started with this project:
1) Firstly, create new vehicle record object 
   const vehicleRecord = new Records();
2) Secondly apply the enter() method to simulate a vehicle entering and exit() method for vehicle leaving the smart parking.
3) Thirdly you can view records using listRecords() method or listSummary() to get the whole summary of the smart parking or listHistory() method for transaction history.

The user can also report ticket lost using the reportTicketLost() method.

#### Note:  The testing.js file is only for testing chunks of during development. All the code of working project in inside vehicleEntry.js. The exit time is created when the vehicle exits. For testing purposes inside the code the exit time is set to 27/02/2026 12:00pm. Change it according to your need.



