angular.module('app', []);

angular.module('app', []).controller('MainCtrl', function($http) {

  var self = this;

  self.email = '';
  self.submitted = false;
  self.formError = false;
  self.formSuccess = false;
  self.errorMsg = '';

  self.submit = function() {
    self.submitted = true;
    self.formError = false;

    var req = {
      method: 'POST',
      url: '/subscription',
      headers: {
       'Content-Type': 'application/json'
      },
      data: {
        email: self.email
      }
    };

    $http(req).success(function(data, status, headers){
      self.submitted = true;
      self.formSuccess = true;
      self.successMsg = data;
      console.log(data);
    }).error(function(data, status, headers){
      self.formError = true;
      self.submitted = false;
      self.errorMsg = data;
      console.log(data);
    });
  };
});
