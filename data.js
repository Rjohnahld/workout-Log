const workoutList = [{
    workoutId: 1,
    workoutName: "Bench Press",
    workoutReps: 10,
    workoutWeight: 60,
    workoutIntensity: "medium"
},
{
    workoutId: 2,
    workoutName: "Squat",
    workoutReps: 8,
    workoutWeight: 80,
    workoutIntensity: "high"
},
{
    workoutId: 3,
    workoutName: "Bicep Curl",
    workoutReps: 12,
    workoutWeight: 12,
    workoutIntensity: "low"
}]


function createWorkout(workoutList, workoutName, workoutReps, workoutWeight, workoutIntensity) {
    const workout = {
        workoutId: Math.floor(Math.random() * 10000),
        workoutName,
        workoutReps,
        workoutWeight,
        workoutIntensity
    }
    workoutList.push(workout)
}

function checkColor(intensity){
    if(intensity === "low"){
        return "success text-light"
    }else if(intensity === "medium"){
        return "warning text-dark"
    }else {
        return "danger text-light"
    }
}

function deleteWorkout(workoutList, toDeleteWorkoutId){
    const indexToDelete = workoutList.findIndex(i => i.workoutId === toDeleteWorkoutId)
    if(indexToDelete != -1){
        workoutList.splice(indexToDelete,1)
    }
}

function updateWorkout(workoutList, toUpdateWorkoutId, updateWorkoutName, updateWorkoutReps, updateWorkoutWeight, updateWorkoutIntensity){
    const indexToUpdate = workoutList.findIndex(i => i.workoutId === toUpdateWorkoutId)
    if(indexToUpdate != -1){
        workoutList[indexToUpdate] = {
            workoutId: toUpdateWorkoutId,
            workoutName: updateWorkoutName,
            workoutReps: updateWorkoutReps,
            workoutWeight: updateWorkoutWeight,
            workoutIntensity: updateWorkoutIntensity
        } 
    }
}