document.addEventListener("DOMContentLoaded", () => {
    function main() {
        // create
        document.querySelector("#submitWorkout")
            .addEventListener("click", () => {
                const workoutName = document.querySelector("#workoutName").value
                const workoutReps = document.querySelector("#reps").value
                const workoutWeight = document.querySelector("#weight").value
                const workoutIntensity = document.querySelector("#intensity").value
                createWorkout(workoutList, workoutName, workoutReps, workoutWeight, workoutIntensity)
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
        list.innerHTML = ""
        workoutList.forEach(i => {
            const newLi = document.createElement("li")
            newLi.className = "list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2"
            newLi.innerHTML = `
              <div>
                <h3 class="h6 mb-1">${i.workoutName}</h3>
                <small class="text-muted">${i.workoutReps} reps ${i.workoutWeight} kg</small>
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
                        html: `<div class="mb-3">
                        <label for="workoutName" class="form-label">Workout Name</label>
                        <input type="text" class="form-control" id="updateWorkoutName" name="workoutName"
                         value="${i.workoutName}">
                        </div>

                        <div class="row">
                        <div class="col-sm-6 mb-3">
                        <label for="reps" class="form-label">Reps</label>
                        <input type="number" class="form-control" id="updateReps" name="reps" min="1" step="1"
                         value="${i.workoutReps}">
                        </div>
                        <div class="col-sm-6 mb-3">
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
                        <option value="high" ${i.workoutIntensity === "hard" ? "selected" : ""}>High</option>
                        </select>
                        </div>`,
                        showCancelButton: true,
                        preConfirm: function () {
                            const updateWorkoutName = document.querySelector("#updateWorkoutName").value;
                            const updateReps = document.querySelector("#updateReps").value;
                            const updateWeight = document.querySelector("#updateWeight").value;
                            const updateIntensity = document.querySelector("#updateIntensity").value;
                            updateWorkout(workoutList, i.workoutId, updateWorkoutName, updateReps, updateWeight, updateIntensity);
                            renderList(workoutList);
                        }
                    })
                })

            list.appendChild(newLi)
        })
    }

    main()
})