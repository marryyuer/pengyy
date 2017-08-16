import { DataSource } from '@angular/cdk';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';
import { FamilyMember } from './family-member';

export class TableDataSource extends DataSource<FamilyMember> {
    constructor(private db: AngularFireDatabase) {
        super();
    }

    connect(): Observable<FamilyMember[]> {
        return this.db.list('family/members');
    }

    disconnect() {

    }
}