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
        }).error(function (data, status, headers) {
            self.formError = true;
            self.submitted = false;
            toastr.error(data, 'Erreur');
            self.errorMsg = data;
        });
    };
}).directive('countTo', ['$timeout', function ($timeout) {
        return {
            replace: false,
            scope: true,
            link: function (scope, element, attrs) {

                var e = element[0];
                var num, refreshInterval, duration, steps, step, countTo, value, increment;

                var calculate = function () {
                    refreshInterval = 30;
                    step = 0;
                    scope.timoutId = null;
                    countTo = parseInt(attrs.countTo) || 0;
                    scope.value = parseInt(attrs.value, 10) || 0;
                    duration = (parseFloat(attrs.duration) * 1000) || 0;

                    steps = Math.ceil(duration / refreshInterval);
                    increment = ((countTo - scope.value) / steps);
                    num = scope.value;
                }

                var tick = function () {
                    scope.timoutId = $timeout(function () {
                        num += increment;
                        step++;
                        if (step >= steps) {
                            $timeout.cancel(scope.timoutId);
                            num = countTo;
                            e.textContent = countTo;
                        } else {
                            e.textContent = Math.round(num);
                            tick();
                        }
                    }, refreshInterval);

                }

                var start = function () {
                    if (scope.timoutId) {
                        $timeout.cancel(scope.timoutId);
                    }
                    calculate();
                    tick();
                }

                attrs.$observe('countTo', function (val) {
                    if (val) {
                        start();
                    }
                });

                attrs.$observe('value', function (val) {
                    start();
                });

                return true;
            }
        }

    }]);

app.config(function(toastrConfig) {
    angular.extend(toastrConfig, {
        positionClass: 'toast-bottom-full-width'
    });
});