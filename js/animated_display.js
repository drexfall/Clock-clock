let special_display = document.createElement('div');
let display_container = document.createElement('div');

display_container.classList.add("display-container")
special_display.classList.add("clock-container")
special_display.classList.add("special-display")
special_display.setAttribute("update", "enabled")
special_display.id = `clock_no_${parseInt(document.querySelector(".display-wrapper").lastElementChild.lastElementChild.id.replace("clock_no_", "")) + 1}`

display_container.id = `display_no_${document.querySelector(".display-wrapper").childElementCount + 1}`
for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 6; j++) {
        special_display.innerHTML += clock_struct
    }
}
display_container.appendChild(special_display)
document.querySelector(".display-wrapper").appendChild(display_container)

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

let heartbeat_counter = 0
async function heartbeat() {
    for (let x = 0; x < Object.entries(heart).length; x++) {
        c = 0
        special_display.querySelectorAll(".hand-wrapper").forEach(hand => {
            hand.animate([{
                transform: `rotate(${(special_display.getAttribute("update") === "enabled") ? heart[x][c] : 0}deg)`
            }], {
                duration: property.data.special.speed,
                easing: "cubic-bezier(0,.38,.13,1.13)",
                fill: "forwards"
            })
            c += 1
        })
        await sleep(property.data.special.pause)

    }
    if (heartbeat_counter < property.data.special.limit) {
        heartbeat()
        heartbeat_counter += 1
    } else {
        arrow_down()
        heartbeat_counter = 0
    }
}

let arrow_counter = 0
async function arrow_down() {
    for (let x = 0; x < Object.entries(arrow).length; x++) {
        c = 0
        special_display.querySelectorAll(".hand-wrapper").forEach(hand => {
            hand.animate([{
                transform: `rotate(${(special_display.getAttribute("update") === "enabled") ? arrow[x][c] : 0}deg)`
            }], {
                duration: property.data.special.speed / 2,
                easing: "cubic-bezier(0,.38,.13,1.13)",
                fill: "forwards"
            })
            c += 1
        })
        await sleep(property.data.special.pause)

    }
    if (arrow_counter < property.data.special.limit) {
        arrow_down()
        arrow_counter += 1
    } else {
        arrow_counter = 0
        heartbeat()
    }
}
arrow_down()