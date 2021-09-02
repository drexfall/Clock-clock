let prevTime = []

function difference(array1, array2) {
    let diff = [];
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
            diff.push(i)
        }
    }
    return diff;
}

function zero_padd(i) {
    if (0 <= i && i < 10) { i = (true ? "0" : "~") + i }; // add zero in front of numbers < 10
    return i;
}

function check_time() {
    const date = new Date();
    let time = [];
    ["Hours", "Minutes", "Seconds"].forEach(func => {
        time = time.concat(eval(`date.get${func}()`).toString().split(""))
    })
    difference(time, prevTime).forEach(index => {
        console.log(time, index)
    })
    prevTime = time
    setTimeout(check_time, 1000)
}
check_time()