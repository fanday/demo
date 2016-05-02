(function() {
    'use strict';

    angular
        .module('demoApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('captcha', {
            parent: 'entity',
            url: '/captcha',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'demoApp.captcha.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/captcha/captchas.html',
                    controller: 'CaptchaController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('captcha');
                    $translatePartialLoader.addPart('captchaStatus');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('captcha-detail', {
            parent: 'entity',
            url: '/captcha/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'demoApp.captcha.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/captcha/captcha-detail.html',
                    controller: 'CaptchaDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('captcha');
                    $translatePartialLoader.addPart('captchaStatus');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Captcha', function($stateParams, Captcha) {
                    return Captcha.get({id : $stateParams.id});
                }]
            }
        })
        .state('captcha.new', {
            parent: 'captcha',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/captcha/captcha-dialog.html',
                    controller: 'CaptchaDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                mobilePhoneNumber: null,
                                captcha: null,
                                captchaStatus: null,
                                createDate: null,
                                modifyDate: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('captcha', null, { reload: true });
                }, function() {
                    $state.go('captcha');
                });
            }]
        })
        .state('captcha.edit', {
            parent: 'captcha',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/captcha/captcha-dialog.html',
                    controller: 'CaptchaDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Captcha', function(Captcha) {
                            return Captcha.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('captcha', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('captcha.delete', {
            parent: 'captcha',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/captcha/captcha-delete-dialog.html',
                    controller: 'CaptchaDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Captcha', function(Captcha) {
                            return Captcha.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('captcha', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
