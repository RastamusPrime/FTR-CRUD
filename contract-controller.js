var app = angular.module('app', [])
  .controller('ContractsCtrl', ['$scope', '$http', '$location', '$routeParams', '$route', '$filter', 'ContractsService', function(s, h, l, rp, r, f, cs) {



          s.listContracts = function() {
            h.get('api/contract').success(function(data) {
              $scope.contract = data;
            });
          };

          s.addContracts= function (contract){
                s.listContracts = cs.create(contact);
          };

          s.edit = function ()
          {
              var id = rp.id;
              s.contract = f.('filter')(s.listContracts, {
                    //What Does this do?
                      _id: id
                        })[0];
              window.scrollTo(0, 0);
          };

          s.update = function(item)
          {
              s.listContracts = cs.update(item);
          };

          s.save = function (item)
          {
              if (typeof item._id !== 'undefined') {
                  s.update(item);
              } else {
                  s.create(item);}
                s.reset();
                l.path('/contracts');
          };

            s.delete = function(index, confirmation) {
            confirmation = (typeof confirmation !== 'undefined') ? confirmation : true;
            if (confirmDelete(confirmation)) {
                  var message,
                  item = cs.delete(index);
                  if (!!item) {
                          message = '"Contact ID "' + item._id + '" was removed.';
                          AlertService.add('success', message, 5000);
                          s.listContacts = cs.getListItems();
                          return true;
                        }
                AlertService.add('error', 'Houston, we have a problem. This operation cannot be executed correctly.', 5000);
                return false;
                  }
                  };

                  var confirmDelete = function(confirmation) {
                  return confirmation ? confirm('Are you sure you want to delete this contract?') : true;
      };



              })
          };
      }]);
