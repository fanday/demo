(function() {
    'use strict';

    angular
        .module('demoApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('metric', {
            parent: 'entity',
            url: '/metric',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'demoApp.metric.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/metric/metrics.html',
                    controller: 'MetricController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('metric');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('metric-detail', {
            parent: 'entity',
            url: '/metric/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'demoApp.metric.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/metric/metric-detail.html',
                    controller: 'MetricDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('metric');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Metric', function($stateParams, Metric) {
                    return Metric.get({id : $stateParams.id});
                }]
            }
        })
        .state('metric.new', {
            parent: 'metric',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/metric/metric-dialog.html',
                    controller: 'MetricDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                amount: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('metric', null, { reload: true });
                }, function() {
                    $state.go('metric');
                });
            }]
        })
        .state('metric.edit', {
            parent: 'metric',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/metric/metric-dialog.html',
                    controller: 'MetricDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Metric', function(Metric) {
                            return Metric.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('metric', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('metric.delete', {
            parent: 'metric',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/metric/metric-delete-dialog.html',
                    controller: 'MetricDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Metric', function(Metric) {
                            return Metric.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('metric', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
