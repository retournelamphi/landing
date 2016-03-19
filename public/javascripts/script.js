angular.module('app', []);

angular.module('app', []).controller('MainCtrl', function ($http) {

    var self = this;


    self.email = '';
    self.submitted = false;
    self.formError = false;
    self.formSuccess = false;
    self.errorMsg = '';

    self.getCount = function () {
        var req = {
            method: 'GET',
            url: '/count'
        };
        $http(req).success(function (data, status, headers) {
            self.count = data;
        });
    };

    self.getCount();


    self.submit = function () {
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

        $http(req).success(function (data, status, headers) {
            self.submitted = true;
            self.formSuccess = true;
            self.successMsg = data;
            self.getCount();
        }).error(function (data, status, headers) {
            self.formError = true;
            self.submitted = false;
            self.errorMsg = data;
        });
    };
});
