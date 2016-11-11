/**
 * Created by paul on 16/1/25.


angular.module("crying").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){

        $locationProvider.html5Mode(true);

        $stateProvider
            .state('main', {
                url: '/main',
                templateUrl: 'client/prays/views/main.ng.html',
                controller: 'MainCtrl',
                resolve: {
                    'subscribe': [
                        '$meteor','$stateParams', function($meteor,$stateParams) {

                            // 默认订阅10条
                            $stateParams.publisherArguments = {
                                userId: 'all',
                                answeredState: 0,
                                fromAt: new Date(),
                                limit: 10
                            };

                            $stateParams.title = '呼 声';
                            // {{user.profile.nickname}}的动态
                            // $stateParams.goBackUrl = '';

                            $meteor.subscribe('oldPrays', $stateParams.publisherArguments);

                            return $meteor.subscribe('me');
                        }
                    ]
                }
            })
            .state('myselfNews', {
                url: '/myselfNews/:userID',
                templateUrl: 'client/prays/views/main.ng.html',
                controller: 'MainCtrl',
                resolve: {
                    'subscribe': [
                        '$meteor','$stateParams', function($meteor,$stateParams) {

                            // 默认订阅10条
                            $stateParams.publisherArguments = {
                                userId: $stateParams.userID,
                                answeredState: -1,
                                fromAt: new Date(),
                                limit: 10
                            };

                            var userTmp = $meteor.object(Meteor.users, {_id: $stateParams.userID}, false);

                            $stateParams.title = userTmp.profile.nickname + '的动态';

                            $stateParams.goBackUrl = '/user/'+$stateParams.userID;

                            $meteor.subscribe('oldPrays', $stateParams.publisherArguments);

                            return $meteor.subscribe('me');
                        }
                    ]
                }
            })
            .state('tags', {
                url: '/tags',
                templateUrl: 'client/tags/views/tags.ng.html',
                controller: 'TagsCtrl',
                resolve: {
                    'subscribe': [
                        '$meteor', function($meteor) {
                            $meteor.subscribe('systemTags');
                            return $meteor.subscribe('hotTags');
                        }
                    ]
                }
            })
            .state('newPray', {
                url: '/newPray',
                templateUrl: 'client/prays/views/new-pray.ng.html',
                controller: 'NewPrayCtrl',
                resolve: {
                    'subscribe': [
                        '$meteor', function($meteor) {
                            $meteor.subscribe('systemTags');
                            return $meteor.subscribe('me');
                        }
                    ]
                }
            })
            .state('me', {
                url: '/me',
                templateUrl: 'client/users/views/me.ng.html',
                controller: 'MeCtrl',
                resolve: {
                    'subscribe': [
                        '$meteor', function($meteor) {
                            return $meteor.subscribe('me');
                        }
                    ]
                }
            })
            .state('user', {
                url: '/user/:userID',
                templateUrl: 'client/users/views/me.ng.html',
                controller: 'MeCtrl',
                resolve: {
                    'subscribe': [
                        '$meteor','$stateParams' , function($meteor, $stateParams) {
                            return $meteor.subscribe('other',$stateParams.userID);
                        }
                    ]
                }
            })
            .state('register', {
                url: '/register',
                templateUrl: 'client/users/views/register.ng.html',
                controller: 'RegisterCtrl'
            })
            .state('improveProfile', {
                url: '/improveProfile',
                templateUrl: 'client/users/views/improveProfile.ng.html',
                controller: 'ImproveProfileCtrl',
                resolve: {
                    'subscribe': [
                        '$meteor', function($meteor) {
                            return $meteor.subscribe('me');
                        }
                    ]
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'client/users/views/login.ng.html',
                controller: 'LoginCtrl'
            })
            .state('setting', {
                url: '/setting',
                templateUrl: 'client/settings/views/setting.ng.html',
                controller: 'SettingCtrl',
                resolve: {
                    'subscribe': [
                        '$meteor', function($meteor) {
                            return $meteor.subscribe('me');
                        }
                    ]
                }
            })
            .state('resetPassword', {
                url: '/resetPassword',
                templateUrl: 'client/users/views/register.ng.html',
                controller: 'ResetPasswordCtrl'
            })
            .state('changePassword', {
                url: '/changePassword',
                templateUrl: 'client/users/views/changePassword.ng.html',
                controller: 'ChangePasswordCtrl'
            })
            .state('changeTel', {
                url: '/changeTel',
                templateUrl: 'client/users/views/changeTel.ng.html',
                controller: 'changeTelCtrl'
            })
            .state('feedback', {
                url: '/feedback',
                templateUrl: 'client/other/views/feedback.ng.html',
                controller: 'FeedbackCtrl',
                resolve: {
                    'subscribe': [
                        '$meteor', function($meteor) {
                            return $meteor.subscribe('me');
                        }
                    ]
                }
            })
            .state('test', {
                url: '/test',
                templateUrl: 'client/test/views/test.ng.html',
                controller: 'TestCtrl',
                resolve: {
                    'subscribe': [
                        '$meteor', function($meteor) {
                            //不订阅祷告，只订阅me
                            return $meteor.subscribe('me');
                        }
                    ]
                }
            })
        ;

        $urlRouterProvider.otherwise("/login");
    }]);
 */