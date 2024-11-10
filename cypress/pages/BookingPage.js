class BookingPage {
    /* locators */
    getOneWayRadioButton() {
        return cy.get('[value^="One"]');
    }

    getRoundTripRadioButton() {
        return cy.get('[value^="Round"]');
    }

    getCabinClassLabel() {
        return cy.get('.label').contains('Cabin Class');
    }

    getCabinClassDropdown() {
        return this.getCabinClassLabel().next().children();
    }

    getFromLabel() {
        return cy.get('.label').contains('From');
    }

    getFromDropdown() {
        return this.getFromLabel().next().children();
    }
    
    getToLabel() {
        return cy.get('.label').contains('To');
    }

    getToDropdown() {
        return this.getToLabel().next().children();
    }

    getDepartLabel() {
        return cy.get('.label').contains('Depart');
    }

    getDepartDatePicker() {
        return this.getDepartLabel().next().find('input');
    }

    getReturnLabel() {
        return cy.get('.label').contains('Return');
    }

    getReturnDatePicker() {
        return this.getReturnLabel().next().find('input');
    }

    getNumberOfPassengersLabel() {
        return cy.get('.label').contains('Number of passengers');
    }

    getNumberOfPassengersDropdown() {
        return this.getNumberOfPassengersLabel().next().children();
    }

    getBookingInfoElements() {
        return cy.get('[class^="ml"] h1,[class^="ml"] h3,[class^="ml"] p');
    }

    /**
     * 
     * @param {number} n number of passengers
     * @returns the dropdown option with the number of passengers passed as an argument
     */
    getNumberOfPassengersDropdownOption(n) {
        return this.getNumberOfPassengersDropdown().children().eq(n - 1);
    }

    /**
     * 
     * @param {number} n the passenger number
     * @returns the corresponding label element
     */

    getPassengerCategoryLabel(n) {
        return cy.get('.label').contains(`Passenger ${n}`);
    }

    /**
     * 
     * @param {*} n the passenger number
     * @returns the corresponding dropdown
     */
    getPassengerCategoryDropdown(n) {
        return this.getPassengerCategoryLabel(n).next().children();
    }

    /**
     * 
     * @param {*} n1 the passenger number 
     * @param {*} category can be 'Adult (16-64)', 'Senior (65+)', 'Young Adult (12-15)', 'Child (2-11)', 'Infant in seat (under 2)'
     * @returns 
     */
    getPassengerCategoryDropdownOption(n, category) {
        return this.getPassengerCategoryDropdown(n).children().contains(category);
    }

    getBookButton() {
        return cy.get('button').contains('BOOK');
    }

    /* methods */

    /**
     * clicks on the Round Trip Radio Button
     */
    clickRoundTripRadioButton() {
        this.getRoundTripRadioButton().click();
    }

    /**
     * clicks on the One Way Radio Button
     */
    clickOneWayRadioButton() {
        this.getOneWayRadioButton().click();
    }

    clickBookButton() {
        this.getBookButton().click();
    }

    /**
     * 
     * @param {*} date in format MM/DD/YYYY
     * clears depart date picker and enters the provided date
     */
    clearAndEnterDateForDepart(date) {
        this.getDepartDatePicker().clear().type(`${date}{enter}`);
    }

    /**
     * 
     * @param {*} date in format MM/DD/YYYY
     * clears return date picker and enters the provided date
     */
    clearAndEnterDateForReturn(date) {
        this.getReturnDatePicker().clear().type(`${date}{enter}`);
    }


    /**
     * 
     * @param {*} cabinClass can be "Premium Economy", "Business", "First"
     */
    selectCabinClass(cabinClass) {
        this.getCabinClassDropdown().select(cabinClass);
    }

    /**
     * 
     * @param {*} state US state in format "Alabama", "California"...
     */
    selectFrom(state) {
        this.getFromDropdown().select(state);
    }

    /**
     * 
     * @param {*} state US state in format "Alabama", "California"...
     */
    selectTo(state) {
        this.getToDropdown().select(state);
    }

    /**
     * 
     * @param {*} n number of passengers
     */
    selectNumberOfPassengers(n) {
        this.getNumberOfPassengersDropdown().select(`${n}`);
    }

    /**
     * @param {n} n passanger number
     * @param {*} category can be 'Adult (16-64)', 'Senior (65+)', 'Young Adult (12-15)', 'Child (2-11)', 'Infant in seat (under 2)'
     */
    selectPassengerCategory(n, category) {
        this.getPassengerCategoryDropdown(n).select(category);
    }

    /**
     * 
     * @param {*} n number of days from the current date
     * @returns an object with future date (+n days from current date) in two formats:
     * MM/DD/YYYY
     * weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' (@example Sat Nov 16 2024)
     */
    futureDate(n) {
// Get current date
const currentDate = new Date();

// Add 7 days to the current date to get the date for next week
currentDate.setDate(currentDate.getDate() + n);

// Extract the month, day, and year
const month = currentDate.getMonth() + 1; // Months are 0-indexed, so add 1
const day = currentDate.getDate();
const year = currentDate.getFullYear();

// Format as MM/DD/YYYY (pad with leading zeros if necessary)
const formattedFutureDate = `${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}/${year}`;


const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
const futureDateString = currentDate.toLocaleDateString('en-US', options).replace(/,/g, '');

return {
    formattedFutureDate,
    futureDateString
    }
}
}

export default BookingPage;

