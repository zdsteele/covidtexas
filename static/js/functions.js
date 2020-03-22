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