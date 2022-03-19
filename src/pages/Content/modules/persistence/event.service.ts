import { SystemEvent, SystemEventEnum } from '../types';
import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';

export class EventService {
  localDB: PouchDB.Database<SystemEvent>;
  remoteDB: PouchDB.Database<SystemEvent>;

  constructor(dbName: string) {
    PouchDB.plugin(PouchFind);

    this.localDB = new PouchDB(dbName);
    this.remoteDB = new PouchDB(
      `http://admin@admin192.168.1.11:5984/${dbName}`
    );

    this.localDB.createIndex({
      index: { fields: ['user.username', 'type'] },
    });

    this.localDB
      .sync(this.remoteDB, { live: true, retry: true })
      .on('complete', function () {
        // yay, we're in sync!
      })
      .on('error', function (err) {
        // boo, we hit an error!
      });
  }

  async persistEvent(event: SystemEvent) {
    return this.localDB.put({
      ...event,
      _id: `${event.user?.username}-${+new Date()}`,
    });
  }

  /**
   * Checks if user already followed today and is he spamming
   * @param username
   */
  async isFollowEventOrganic(event: SystemEvent) {
    const response = await this.localDB.find({
      selector: {
        'user.username': event.user?.username,
        type: SystemEventEnum.Follow,
      },
    });

    if (response.docs[0]) {
      console.log(
        `User ${event.user?.username} FAKES the FOLLOW`,
        event,
        response.docs[0]
      );
      return false;
    } else {
      return true;
    }
  }
}
