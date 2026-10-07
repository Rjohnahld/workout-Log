document.addEventListener("DOMContentLoaded", () => {
    function main() {
        // create
        document.querySelector("#submitWorkout")
            .addEventListener("click", () => {
                const workoutName = document.querySelector("#workoutName").value
                const workoutDate = document.querySelector("#workoutDate").value
                const workoutSets = document.querySelector("#sets").value
                const workoutReps = document.querySelector("#reps").value
                const workoutWeight = document.querySelector("#weight").value
                const workoutIntensity = document.querySelector("#intensity").value
                const error = validateWorkout(workoutName, workoutDate, workoutSets, workoutReps, workoutWeight, workoutIntensity)
                if (error) {
                    Swal.fire({
                        title: "Oops!",
                        text: error,
                        icon: "error"
                    })
                    return
                }
                createWorkout(workoutList, workoutName.trim(), workoutDate, workoutSets, workoutReps, workoutWeight, workoutIntensity)
                Swal.fire({
                    title: "Successful!",
                    text: "Your workout has been added",
                    icon: "success"
                });
                renderList(workoutList)
            })

        renderList(workoutList)
    }

    function renderList(workoutList) {
        const list = document.querySelector("#list")
        const groups = groupByDate(workoutList)
        const dates = Object.keys(groups).sort().reverse()
        list.innerHTML = ""
        dates.forEach(date => {
            const dayWorkouts = groups[date]

            const dayCard = document.createElement("div")
            dayCard.className = "card shadow-sm mb-4"
            dayCard.innerHTML = `
              <div class="card-header d-flex justify-content-between align-items-center">
                <h3 class="h6 mb-0 fw-bold">${date}</h3>
                <span class="badge bg-secondary">${dayWorkouts.length} ${dayWorkouts.length === 1 ? "workout" : "workouts"}</span>
              </div>
              <ul class="list-group list-group-flush"></ul>
            `
            const dayList = dayCard.querySelector("ul")
            dayWorkouts.forEach(i => {
                const newLi = document.createElement("li")
                newLi.className = "list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2"
                newLi.innerHTML = `
              <div>
                <h3 class="h6 mb-1">${i.workoutName}</h3>
                <small class="text-muted">${i.workoutSets} x ${i.workoutReps} reps ${i.workoutWeight} kg</small>
                <span class="badge bg-${checkColor(i.workoutIntensity)} ms-2">${i.workoutIntensity}</span>
              </div>
              <div>
                <button class="btn btn-sm btn-outline-secondary editBtn">Edit</button>
                <button class="btn btn-sm btn-outline-danger deleteBtn">Delete</button>
              </div>
              `
                newLi.querySelector(".deleteBtn")
                    .addEventListener("click", () => {
                        Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!"
                        }).then((result) => {

                            if (result.isConfirmed) {
                                deleteWorkout(workoutList, i.workoutId)
                                renderList(workoutList)
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Workout has been deleted.",
                                    icon: "success"
                                })
                            };
                        });

                    })

                newLi.querySelector(".editBtn")
                    .addEventListener("click", () => {
                        Swal.fire({
                            title: "Update Workout",
                            html: `<div class="row">
                        <div class="col-sm-7 mb-3">
                        <label for="workoutName" class="form-label">Workout Name</label>
                        <input type="text" class="form-control" id="updateWorkoutName" name="workoutName" value="${i.workoutName}"
                        placeholder="e.g. Bench Press">
                        </div>
                        <div class="col-sm-5 mb-3">
                        <label for="workoutDate" class="form-label">Date</label>
                        <input type="date" class="form-control" id="updateWorkoutDate" name="workoutDate" value="${i.workoutDate}">
                        </div>
                        </div>

                        <div class="row">
                        <div class="col-sm-4 mb-3">
                            <label for="sets" class="form-label">Sets</label>
                            <input type="number" class="form-control" id="updateSets" name="sets" min="1" step="1" placeholder="e.g. 3"
                            value="${i.workoutSets}">
                        </div>
                        <div class="col-sm-4 mb-3">
                            <label for="reps" class="form-label">Reps</label>
                            <input type="number" class="form-control" id="updateReps" name="reps" min="1" step="1"
                         value="${i.workoutReps}">
                        </div>
                        <div class="col-sm-4 mb-3">
                            <label for="weight" class="form-label">Weight (kg)</label>
                            <input type="number" class="form-control" id="updateWeight" name="weight" min="0" step="1"
                        value="${i.workoutWeight}">
                        </div>
                        </div>

                        <div class="mb-4">
                        <label for="intensity" class="form-label">Intensity</label>
                        <select class="form-select" id="updateIntensity" name="intensity" required>
                        <option value="low" ${i.workoutIntensity === "low" ? "selected" : ""}>Low</option>
                        <option value="medium" ${i.workoutIntensity === "medium" ? "selected" : ""}>Medium</option>
                        <option value="high" ${i.workoutIntensity === "high" ? "selected" : ""}>High</option>
                        </select>
                        </div>`,
                            showCancelButton: true,
                            preConfirm: function () {
                                const updateWorkoutName = document.querySelector("#updateWorkoutName").value;
                                const updateWorkoutDate = document.querySelector("#updateWorkoutDate").value
                                const updateSets = document.querySelector("#updateSets").value;
                                const updateReps = document.querySelector("#updateReps").value;
                                const updateWeight = document.querySelector("#updateWeight").value;
                                const updateIntensity = document.querySelector("#updateIntensity").value;
                                const error = validateWorkout(updateWorkoutName, updateWorkoutDate, updateSets, updateReps, updateWeight, updateIntensity)
                                if (error) {
                                    Swal.showValidationMessage(error)
                                    return
                                }
                                updateWorkout(workoutList, i.workoutId, updateWorkoutName.trim(), updateWorkoutDate, updateSets, updateReps, updateWeight, updateIntensity);
                                renderList(workoutList);
                            }
                        }).then((result) => {
                            if (result.isConfirmed) {
                                Swal.fire({
                                    title: "Updated!",
                                    text: "Workout has been updated.",
                                    icon: "success"
                                })
                            };
                        });
                    })
                dayList.appendChild(newLi)
            })
            list.appendChild(dayCard)
        })
    }

    main()
})