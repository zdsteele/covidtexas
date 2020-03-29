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
    if (magnitude > 20) {
        return 'red'
    } else if (magnitude > 10 && magnitude < 20) {
        return 'orange'
    } else if (magnitude > 4 && magnitude < 10) {
        return 'yellow'
    } else if (magnitude > 3 && magnitude < 4) {
        return 'purple'
    } else if (magnitude > 2 && magnitude < 3) {
        return 'purple'
    } else if (magnitude > .1 && magnitude < 2) {
        return 'purple'
    } else {
        return 'purple'
    }
};

function markerSize(cases) {

    if (cases >= 50) {
        return (cases / 7)
    } else if (cases >= 20 && cases < 50) {
        return (cases / 5)
    } else if (cases >= 5 && cases < 20) {
        return (cases / 2)
    } else {
        return (cases * 5)
    }
};