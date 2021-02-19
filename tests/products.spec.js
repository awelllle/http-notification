

const chai = require("chai");
let chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);


 //assuming you're using port 3019 according to the env file. Please change to whichever port you're using
 //Also, please make sure your server is running on another terminal
 let url = "http://localhost:3019";

 
describe('Get all products', () => {
  it('it should be successful', (done) => {
    
  
    chai.request(url)
        .get('/products')
        .end((err, res) => {
           expect(err).to.be.null;
           expect(res).to.be.json;
           expect(res).to.have.status(200);
             
          done();
        });
  }).timeout(11000);
});



// describe('/Add a product', () => {
//     it('it should be successful', (done) => {
      
//       let name = "demo product";
//        let price = "2000";
//        let description = "cool product"
  
//       chai.request(url)
//           .post('/add')
//           .set('Authorization', 'Bearer ' + token)
//           .send({ name: name, price: price, description: description })
//           .end((err, res) => {
  
//              expect(err).to.be.null;
//              expect(res).to.be.json;
//              expect(res).to.have.status(200);
               
//             done();
//           });
//     }).timeout(11000);
//   });
  

