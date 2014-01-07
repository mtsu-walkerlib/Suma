'use strict';

describe('Directive: datepicker', function () {

  // load the directive's module
  beforeEach(module('sumaAnalysis'));

  beforeEach(module('views/directives/datepicker.html'));

  var element,
    scope,
    stub;

  beforeEach(inject(function ($rootScope, $compile) {
    stub = sinon.stub($.fn, 'datetimepicker');
    stub.returns(true);

    element = angular.element('<datepicker model="params.sdate"></datepicker>');

    scope = $rootScope.$new();
    $compile(element)(scope);
    scope.$digest();

    scope.$apply(function() {
      scope.params = {};
      scope.params.sdate = moment().subtract('months', 6).add('days', 1).format('YYYY-MM-DD');;
    });
  }));

  it('should make hidden element visible', inject(function ($compile) {
    expect($.fn.datetimepicker).to.be.calledOnce;
    expect($.fn.datetimepicker).to.be.calledWith({
      defaultDate: scope.model,
      pickDate: true,
      pickTime: false
    });

    stub.restore();
  }));
});
