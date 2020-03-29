{
    init: function(elevators, floors) {
        var elevator = elevators[0]; // Let's use the first elevator
        var elevator1 = elevators[1];
        var callingQueue = [];
        // Whenever the elevator is idle (has no more queued destinations) ...
    //elevator
        elevators.forEach((elevator) => {
          elevator.on("idle", function() {
              // let's go to all the floors (or did we forget one?)
              if (callingQueue.length > 0) {
                elevator.destinationQueue.push(callingQueue.shift());
                elevator.checkDestinationQueue();
              }
          });
          elevator.on("floor_button_pressed", function(floorNum) {
            elevator.goToFloor(floorNum);
          })
        });

        floors.forEach((floor) => {
          floor.on("up_button_pressed", function() {
            callingQueue.push(floor.floorNum());
          });
          floor.on("down_button_pressed", function() {
            callingQueue.push(floor.floorNum());
          })
        });
    },

    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
