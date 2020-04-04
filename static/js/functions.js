//  A function that counts the occurances of an element in an array.
function counts(arr) {
    let dict = {}
    arr.forEach(element => {

        if (element in dict) {
            dict[element] += 1
        } else {
            dict[element] = 1
        }
    });
    return dict;
};

function fillColor(magnitude) {
    if (magnitude > 500) {
        return 'maroon'
    } else if (magnitude > 400 && magnitude < 500) {
        return 'orange'
    } else if (magnitude > 300 && magnitude < 400) {
        return 'yellow'
    } else if (magnitude > 200 && magnitude < 300) {
        return 'green'
    } else if (magnitude > 20 && magnitude < 200) {
        return 'purple'
    } else if (magnitude > 1 && magnitude < 20) {
        return 'aqua'
    } else {
        return 'lime'
    }
};

function markerSize(cases) {

    if (cases >= 350) {
        return (cases / 10)
    } else if (cases >= 250 && cases < 350) {
        return (cases / 9)
    } else if (cases >= 150 && cases < 250) {
        return (cases / 8)
    } else if (cases >= 100 && cases < 150) {
        return (cases / 7)
    } else if (cases >= 50 && cases < 100) {
        return (cases / 6)
    } else if (cases >= 40 && cases < 50) {
        return (cases / 5)
    } else if (cases >= 30 && cases < 40) {
        return (cases / 4)
    } else if (cases >= 20 && cases < 30) {
        return (cases / 3)
    } else if (cases >= 10 && cases < 20) {
        return (cases / 2)
    } else if (cases >= 2 && cases < 10) {
        return (cases)
    } else {
        return (cases * 5)
    }
};