import should from 'should';
import {EventEmitter} from 'events';
import repository from './repository';
import mongo from '../config/mongo';
import dbSettings from '../config/config';

should();
describe('Repository', () => {
  it('should connect with a promise', () => {
    repository.connect({}).should.be.a.Promise();
  });

  it('should get movie premiers', (done) => {
    const mediator = new EventEmitter();

    mediator.on('db.ready', (db) => {
      repository.connect(db)
        .then(repo => {
          return repo.getMoviePremiers();
        })
        .then(movies => {
          console.log(movies);
          db.close();
          done();
        })
        .catch(err => {
          console.log(err);
          db.close();
          done();
        });
    });

    mediator.on('db.error', (err) => {
      console.log(err);
    });

    mongo.connect(dbSettings, mediator);

    mediator.emit('boot.ready');
  });

  it('should get movie by id', (done) => {
    const mediator = new EventEmitter();

    mediator.on('db.ready', (db) => {
      repository.connect(db)
        .then(repo => {
          return repo.getMovieById('1');
        })
        .then(movie => {
          console.log(movie);
          db.close();
          done();
        })
        .catch(err => {
          console.log(err);
          db.close();
          done();
        });
    });

    mediator.on('db.error', (err) => {
      console.log(err);
    });

    mongo.connect(dbSettings, mediator);

    mediator.emit('boot.ready');
  });
});
