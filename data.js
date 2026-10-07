let workoutList = []

const binUrl = "https://api.jsonbin.io/v3"
const binId = "6ac5dd98ffd5d1605354f194"

async function getJsonBin() {
    const response = await axios.get(`${binUrl}/b/${binId}/latest`);
    return response.data.record
}

async function updateJsonBin(data) {
    return await axios.put(`${binUrl}/b/${binId}`, data )
}

function createWorkout(workoutList, workoutName, workoutDate, workoutSets, workoutReps, workoutWeight, workoutIntensity) {
    const workout = {
        workoutId: Math.floor(Math.random() * 10000),
        workoutName,
        workoutDate,
        workoutSets,
        workoutReps,
        workoutWeight,
        workoutIntensity
    }
    workoutList.push(workout)
}

function checkColor(intensity) {
    if (intensity === "low") {
        return "success text-light"
    } else if (intensity === "medium") {
        return "warning text-dark"
    } else {
        return "danger text-light"
    }
}

function deleteWorkout(workoutList, toDeleteWorkoutId) {
    const indexToDelete = workoutList.findIndex(i => i.workoutId === toDeleteWorkoutId)
    if (indexToDelete != -1) {
        workoutList.splice(indexToDelete, 1)
    }
}

function updateWorkout(workoutList, toUpdateWorkoutId, updateWorkoutName, updateWorkoutDate, updateWorkoutSets, updateWorkoutReps, updateWorkoutWeight, updateWorkoutIntensity) {
    const indexToUpdate = workoutList.findIndex(i => i.workoutId === toUpdateWorkoutId)
    if (indexToUpdate != -1) {
        workoutList[indexToUpdate] = {
            workoutId: toUpdateWorkoutId,
            workoutName: updateWorkoutName,
            workoutDate: updateWorkoutDate,
            workoutSets: updateWorkoutSets,
            workoutReps: updateWorkoutReps,
            workoutWeight: updateWorkoutWeight,
            workoutIntensity: updateWorkoutIntensity
        }
    }
}


function validateWorkout(workoutName, workoutDate, workoutSets, workoutReps, workoutWeight, workoutIntensity) {
    if (workoutName.trim() === "") {
        return "Please enter a workout name."
    }
    if (workoutDate === "") {
    return "Please choose a date."
}
    if (workoutDate > getTodayString()) {
        return "The date can't be in the future."
    }
    if (workoutSets === "" || Number(workoutSets) < 1 || !Number.isInteger(Number(workoutSets))) {
        return "Sets must be a whole number of at least 1."
    }
    if (workoutReps === "" || Number(workoutReps) < 1 || !Number.isInteger(Number(workoutReps))) {
        return "Reps must be a whole number of at least 1."
    }
    if (workoutWeight === "" || Number(workoutWeight) < 0) {
        return "Weight must be 0 or more (use 0 for bodyweight exercises)."
    }
    if (workoutIntensity === "") {
        return "Please choose an intensity."
    }
    return null
}

function getTodayString() {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const day = String(today.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
}

function groupByDate(workoutList) {
    const groups = {}
    workoutList.forEach(w => {
        if (!groups[w.workoutDate]) {
            groups[w.workoutDate] = []
        }
        groups[w.workoutDate].push(w)
    })
    return groups
}