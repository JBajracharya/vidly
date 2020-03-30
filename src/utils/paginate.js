import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;

    // using lodash _(items) wraps the array into lodash object and makes it eligible to use chaining method. slice() gets the starting index of the array and take() grabs items in array to the size of the page to display. and .value() converts the lodash object to regular array.
    // returns the selected array
    return _(items).slice(startIndex).take(pageSize).value();
}

