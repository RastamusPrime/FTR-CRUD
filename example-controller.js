angular.module('plunkerApp')
  .controller('ContactsCtrl', function($scope, $location, $routeParams, $route, $filter, AlertService, ContactsService) {

    /**
     * initial value of creation/alteration contact form
     *
     * @type {Array}
     */
    $scope.contact = [];

    /**
     * Reinitialize form values
     */
    $scope.reset = function() {
      $scope.contact = [{
        name: '',
        address: '',
        phone: ''
      }];
    };

    /**
     * Returns count of contacts
     * @return {Int}
     */
    $scope.numberOfPages = function() {
      return Math.ceil($scope.filteredData.length / $scope.pageSize);
    };

    /**
     * Add um contato
     */
    $scope.create = function(contact) {
      $scope.listContacts = ContactsService.create(contact);
    };

    /**
     * Return a specific contact for edition
     */
    $scope.edit = function() {
      var id = $routeParams.id;
      $scope.contact = $filter('filter')($scope.listContacts, {
        _id: id
      })[0];
      window.scrollTo(0, 0);
    };

    /**
     * Update a contact
     * @param  {Object} item Contact informations
     */
    $scope.update = function(item) {
      $scope.listContacts = ContactsService.update(item);
    };

    /**
     * Insert/update abstraction
     * @param  {Object} item Contact informations
     */
    $scope.save = function(item) {
      if (typeof item._id !== 'undefined') {
        $scope.update(item);
      } else {
        $scope.create(item);
      }
      $scope.reset();
      $location.path('/contacts');
    };

    /**
     * Remove a contact of contact list
     * @param  {Integer} index        `_id` value's contact
     * @param  {Boolean} confirmation boolean verificator for call "confirm" method
     * @return {Boolean}
     */
    $scope.delete = function(index, confirmation) {
      confirmation = (typeof confirmation !== 'undefined') ? confirmation : true;
      if (confirmDelete(confirmation)) {
        var message,
          item = ContactsService.delete(index);
        if (!!item) {
          message = 'Contact "' + item.name + '" with id "' + item._id + '" was removed of your contact\'s list';
          AlertService.add('success', message, 5000);
          $scope.listContacts = ContactsService.getListItems();
          return true;
        }
        AlertService.add('error', 'Houston, we have a problem. This operation cannot be executed correctly.', 5000);
        return false;
      }
    };

    /**
     * Method for access "window.confirm()"
     * @param  {Boolean} confirmation boolean verificator for call "confirm" method
     * @return {Boolean}
     */
    var confirmDelete = function(confirmation) {
      return confirmation ? confirm('This action is irreversible. Do you want to delete this contact?') : true;
    };

    /**
     * Method called for initialize our controller
     */
    $scope.init = function() {
      $scope.listContacts = $scope.filteredData = ContactsService.getListItems();
      $scope.reset();
      //  Calling routeParam method
      if ($route.current.method !== undefined) {
        $scope[$route.current.method]();
      }
    };

    $scope.init();

  });
