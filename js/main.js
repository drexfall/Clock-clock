let clock_wrapper = document.querySelector(".clock-wrapper")
let clock_style = getComputedStyle(document.querySelector(":root"))

for (let x = 0; x < 6; x++) {
    let clock_container = document.createElement("div")
    clock_container.id = `clock_no_${x+1}`
    clock_container.classList.add("clock-container")
    clock_wrapper.appendChild(clock_container)


    for (let i = 0; i < clock_style.getPropertyValue("--rows"); i++) {
        for (let j = 0; j < clock_style.getPropertyValue("--cols"); j++) {

            clock_container.innerHTML += clock_struct
        }
    }
}

function zero_padding(i) {
    if (0 <= i && i < 10) { i = "0" + i }; // add zero in front of numbers < 10
    return i;
}

function changeTime() {
    let date_object = new Date()
    let hours = zero_padding(date_object.getHours() - ((property.twelve_hour && date_object.getHours() > 12) ? 12 : 0)).toString().split("")

    let minutes = (zero_padding(date_object.getMinutes()).toString()).split("")
    let seconds = zero_padding(date_object.getSeconds()).toString().split("")
    let time = hours.concat(minutes).concat(seconds)

    d = 0
    for (let y = 0; y < time.length; y++) {
        c = 0
        document.getElementById(`clock_no_${y+1}`).querySelectorAll(".hand-wrapper").forEach(hand => {

            hand.animate([{

                transform: `rotate(${hand_rotation["clock"+time[y]][c]}deg)`
            }], {
                duration: y < 4 ? ((y < 2) ? property.speed * 5 : property.speed * 3) : property.speed,
                easing: "cubic-bezier(0,.38,.13,1.13)",
                fill: "forwards"
            })
            d += 10
            c += 1
        })

    }

    setTimeout(changeTime, 1000)
}


function setTheme(mode) {

    if (document.body.getAttribute("data-theme") == "dark") {
        mode = "light"
    }

    document.body.setAttribute("data-theme", mode)
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change", (e) => {
    let mode = 'light';

    if (e["matches"]) {
        mode = 'dark'
    }
    setTheme(mode)
})
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme("dark")
}
window.addEventListener("load", changeTime)