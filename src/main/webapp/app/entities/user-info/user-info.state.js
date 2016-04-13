(function() {
    'use strict';

    angular
        .module('demoApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('user-info', {
            parent: 'entity',
            url: '/user-info',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'demoApp.userInfo.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/user-info/user-infos.html',
                    controller: 'UserInfoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('userInfo');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('user-info-detail', {
            parent: 'entity',
            url: '/user-info/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'demoApp.userInfo.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/user-info/user-info-detail.html',
                    controller: 'UserInfoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('userInfo');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'UserInfo', function($stateParams, UserInfo) {
                    return UserInfo.get({id : $stateParams.id});
                }]
            }
        })
        .state('user-info.new', {
            parent: 'user-info',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/user-info/user-info-dialog.html',
                    controller: 'UserInfoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                email: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('user-info', null, { reload: true });
                }, function() {
                    $state.go('user-info');
                });
            }]
        })
        .state('user-info.edit', {
            parent: 'user-info',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/user-info/user-info-dialog.html',
                    controller: 'UserInfoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['UserInfo', function(UserInfo) {
                            return UserInfo.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('user-info', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('user-info.delete', {
            parent: 'user-info',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/user-info/user-info-delete-dialog.html',
                    controller: 'UserInfoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['UserInfo', function(UserInfo) {
                            return UserInfo.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('user-info', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
