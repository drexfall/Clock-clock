let special_display = document.createElement('div');

special_display.classList.add("clock-container")
special_display.classList.add("special-display")

for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 6; j++) {
        special_display.innerHTML += clock_struct
    }
}
document.querySelector(".clock-wrapper").appendChild(special_display)

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

let heartbeat_counter = 0
async function heartbeat() {
    for (let x = 0; x < Object.entries(heart).length; x++) {
        c = 0
        special_display.querySelectorAll(".hand-wrapper").forEach(hand => {
            hand.animate([{
                transform: `rotate(${heart[x][c]}deg)`
            }], {
                duration: property.heart_animation.speed,
                easing: "cubic-bezier(0,.38,.13,1.13)",
                fill: "forwards"
            })
            c += 1
        })
        await sleep(property.heart_animation.pause)

    }
    if (heartbeat_counter < property.heart_animation.limit) {
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
                transform: `rotate(${arrow[x][c]}deg)`
            }], {
                duration: property.arrow_animation.speed,
                easing: "cubic-bezier(0,.38,.13,1.13)",
                fill: "forwards"
            })
            c += 1
        })
        await sleep(property.arrow_animation.pause)

    }
    if (arrow_counter < property.arrow_animation.limit) {
        arrow_down()
        arrow_counter += 1
    } else {
        arrow_counter = 0
        heartbeat()
    }
}
heartbeat()