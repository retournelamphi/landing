var app = angular.module('app', ['ngAnimate', 'toastr', 'ui.bootstrap']);

app.controller('MainCtrl', MainCtrl)
    .directive('countTo', CountoDirective)
    .config(function (toastrConfig) {
        angular.extend(toastrConfig, {
            positionClass: 'toast-top-right'
        });
    });


function CountoDirective($timeout) {
    return {
        replace: false,
        scope: true,
        link: function (scope, element, attrs) {

            var e = element[0];
            var num, refreshInterval, duration, steps, step, countTo, value, increment;

            function calculate() {
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

            function tick() {
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

            function start() {
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
}

function MainCtrl($http, toastr, $uibModal) {

    var self = this;

    function _init() {
        self.email = '';
        self.submitted = false;
        self.formError = false;
        self.formSuccess = false;
        self.errorMsg = '';

        self.getCount = getCount;
        self.submit = submit;
        self.open = openModal;
    }


    function getCount() {
        var req = {
            method: 'GET',
            url: '/count'
        };
        $http(req).success(function (data) {
            self.count = data;
        });
    }

    function submit() {
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

        $http(req).success(function (data) {
            self.submitted = true;
            self.formSuccess = true;
            toastr.success(data, 'La communauté Retourne L\'amphi');
        }).error(function (data) {
            self.formError = true;
            self.submitted = false;
            toastr.error(data, 'Erreur');
            self.errorMsg = data;
        });
    }

    function openModal(size) {
        $uibModal.open({
            animation: true,
            templateUrl: 'myModalContent.html',
            controller: function ($scope, $uibModalInstance) {
                $scope.ok = function () {
                    $uibModalInstance.close();
                }
            },
            size: size
        });
    }

    _init();
}