/*jshint -W030 */
/*jshint -W116 */
/**
 * requestNotificationPermission directive test
 */

'use strict';

/*
 * Helper function to check the notification permission status based on the sent
 * user-agent header. We need to check based on per browser since each browser
 * has different implementation.
 *
 * @param {String} userAgent the user-agent header
 */

function checkPermission(userAgent) {

  // permission status
  var PERMISSION_ALLOWED = 0,
    PERMISSION_NOT_ALLOWED = 1;

  // expected user agents
  var USER_AGENT = {
    FIREFOX: userAgent.match(/Firefox\//),
    CHROME: userAgent.match(/Chrome\//) || userAgent.match(/PhantomJS\//)
  };

  var notification;

  var FIREFOX = {},
    CHROME = {};

  if (USER_AGENT.FIREFOX) {
    notification = Notification;

    if (notification.permission) {
      FIREFOX.NOTIF_ALLOWED = notification.permission === 'granted',
      FIREFOX.NOTIF_NOT_ALLOWED = notification.permission === 'default';
    }
  } else if (USER_AGENT.CHROME) {
    notification = webkitNotifications || Notification;

    CHROME.NOTIF_ALLOWED = notification.checkPermission() === 0;
    CHROME.NOTIF_NOT_ALLOWED = notification.checkPermission() === 1;
  }

  spyOn(notification, 'requestPermission').andCallThrough();

  if (USER_AGENT.FIREFOX && FIREFOX.NOTIF_ALLOWED) {
    return PERMISSION_ALLOWED;
  } else if (USER_AGENT.FIREFOX && FIREFOX.NOTIF_NOT_ALLOWED) {
    return PERMISSION_NOT_ALLOWED;
  } else if (USER_AGENT.CHROME && CHROME.NOTIF_ALLOWED) {
    return PERMISSION_ALLOWED;
  } else if (USER_AGENT.CHROME && CHROME.NOTIF_NOT_ALLOWED) {
    return PERMISSION_NOT_ALLOWED;
  }
}

/*
 * A helper function to Spy on the Notification object to see if the
 * requestPermission method has been called or not.
 * @param {String} userAgent the user-agent header
 */

function isRequestPermissionMethodCalled(userAgent) {

  // user agents used on test
  // expected user agents
  var USER_AGENT = {
    FIREFOX: userAgent.match(/Firefox\//),
    CHROME: userAgent.match(/Chrome\//) || userAgent.match(/PhantomJS\//)
  };

  if (USER_AGENT.FIREFOX) {
    // somehow the returned value is always a function
    expect(Notification.requestPermission).toBeDefined();
  } else if (USER_AGENT.CHROME) {
    expect(webkitNotifications.requestPermission).toHaveBeenCalled();
  }
}

describe('Directive: kbm-notification', function() {

  var $compile,
    $rootScope;

  // load the kabam.requestNotificationPermission, which contains the directive
  beforeEach(module('kabam.requestNotificationPermission'));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('should be able to request permission', function() {
    var htmlElement =
      '<button request-notification-permission>Call</button>';
    // Compile a piece of HTML containing the directive
    var element = $compile(htmlElement)($rootScope);
    // fire all the watches
    $rootScope.$digest();

    // evaluate the permission status before requesting permission
    expect(checkPermission(navigator.userAgent)).toEqual(1);

    // check to see if the buttons was there
    expect(element.html()).toContain('Call');
    expect(element.attr('request-notification-permission')).toMatch('');

    // when clicking the button, the directive will request the permission
    element[0].click();

    // expect the requestPermission method has been called
    isRequestPermissionMethodCalled(navigator.userAgent);
  });
});