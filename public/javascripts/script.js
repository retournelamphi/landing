var app = angular.module('app', ['ngAnimate', 'toastr']);

app.controller('MainCtrl', function ($http, toastr) {

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
            if (!self.submitted) {
                toastr.success('et ces ' + data + ' personnes t\'attendent pour la révolution !', 'La communauté Retourne L\'amphi');
            }
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
            toastr.success(data, 'La communauté Retourne L\'amphi');
            self.getCount();
        }).error(function (data, status, headers) {
            self.formError = true;
            self.submitted = false;
            toastr.error(data, 'Erreur');
            self.errorMsg = data;
        });
    };
});

app.config(function(toastrConfig) {
    angular.extend(toastrConfig, {
        positionClass: 'toast-bottom-full-width'
    });
});