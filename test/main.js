const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const getCityTimeAndWeather = require("../main")

//use should
chai.should();
chai.use(chaiAsPromised);

//UNIT TESTS
describe('City Current Time and Weather Information Function Test',function(){
   it('should reject when no city name is provided',function(){
      return getCityTimeAndWeather().should.eventually.be.rejected;
   })

   it('should reject when a non-existent city name is provided',function(){
      return getCityTimeAndWeather('zqa').should.eventually.be.rejected;
   })

   it('should return a city time and weather information without postal code and current date',function(){
      return getCityTimeAndWeather('Accra',null,null).should.eventually.be.a('string');
   })

   it('should return a city time and weather information without current date',function(){
      return getCityTimeAndWeather('Accra','0251',null).should.eventually.be.a('string');
   })

   it('should return city name in response matching provided city location',function(){
      return getCityTimeAndWeather('Accra','0251',null)
      .should.eventually.be.a('string').and.match(new RegExp(/Accra/,'i'));
   })

})