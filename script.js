document.addEventListener("DOMContentLoaded", () => {
    function main() {
        const workoutName = document.querySelector("#workoutName").value
        const workoutReps = document.querySelector("#reps").value
        const workoutWeight = document.querySelector("#weight").value
        const workoutIntensity = document.querySelector("#intensity").value
        document.querySelector("#submitWorkout")
            .addEventListener("click", () => {
                createWorkout(workoutList, workoutName, workoutReps, workoutWeight, workoutIntensity)
                renderList()
            })
        
        renderList()
    }
    function renderList() {
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
                <button class="btn btn-sm btn-outline-secondary">Edit</button>
                <button class="btn btn-sm btn-outline-danger">Delete</button>
              </div>
              `
            list.appendChild(newLi)
        })
    }

    main()
})