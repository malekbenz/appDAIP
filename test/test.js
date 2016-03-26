var assert = require('assert');
var utils = require('../server/utilsdaip.js')

describe('UtilsDAIP', function() {
  describe('#getPersoneFromStr()', function () {
    it('Test de CCP ', function () {
      assert.equal('', utils.getPersoneFromStr('Hi Mr benz').CCP);
      assert.equal('1212', utils.getPersoneFromStr('Hi Mr 1212 benz').CCP);
      assert.equal('1021112', utils.getPersoneFromStr('1021112').CCP);
    });
  });
describe('#getPersoneFromStr()', function () {
    it('Test de  Date naissance ', function () {
      assert.equal('', utils.getPersoneFromStr('Hi Mr benz').dateNaissance);
      assert.equal('15/03/2012', utils.getPersoneFromStr('Hi Mr 15.03.2012 1212 benz').dateNaissance);
      assert.equal('01/11/1944', utils.getPersoneFromStr('12 01.11.1944').dateNaissance);
      assert.equal('01/11/1944', utils.getPersoneFromStr('hi hjhj 1.11.1944').dateNaissance);
      assert.equal('12/12/1960', utils.getPersoneFromStr('12.12.1960').dateNaissance);
      assert.equal('12/12/1988', utils.getPersoneFromStr('12/12/1988').dateNaissance);
      assert.equal('12/12/1912', utils.getPersoneFromStr('12/12/12').dateNaissance);
    });
  });

});
