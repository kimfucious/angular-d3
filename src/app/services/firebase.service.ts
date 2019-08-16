import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Threat, ThreatId } from "../models/ThreatDoughnut";
import { FlashMessagesService } from "angular2-flash-messages";
import uuid from "uuid/v4";

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  threatsCollection: AngularFirestoreCollection<ThreatId>;
  threats: Observable<ThreatId[]>;
  loading: boolean;
  constructor(
    private afs: AngularFirestore,
    private flashMessage: FlashMessagesService
  ) {
    this.threatsCollection = this.afs.collection("threats", ref =>
      ref.orderBy("name", "asc")
    );
  }

  addThreat(formData: Threat) {
    try {
      return this.afs.collection("threats").add({
        name: formData.name,
        code: formData.code,
        value: formData.value
      });
    } catch (error) {
      this.flashMessage.show(error.message, {
        cssClass: "alert-danger",
        timeout: 5000
      });
    }
  }
  async deleteThreat(id: string) {
    try {
      await this.afs.doc<ThreatId>(`threats/${id}`).delete();
      console.log("Threat deleted!");
    } catch (e) {
      console.log(e);
    }
  }
  getLoadingStatus(): boolean {
    return this.loading;
  }

  getThreats() {
    this.loading = true;
    try {
      this.threats = this.threatsCollection.snapshotChanges().pipe(
        map(actions =>
          actions.map(action => {
            const data = action.payload.doc.data() as ThreatId;
            data.id = action.payload.doc.id;
            data.type = action.type;
            return data;
          })
        )
      );
      this.loading = false;
      return this.threats;
    } catch (error) {
      this.flashMessage.show(error.message, {
        cssClass: "alert-danger",
        timeout: 5000
      });
    }
  }
  async seedThreats(seedData: Threat[]) {
    console.log(seedData);
    try {
      const batch = this.afs.firestore.batch();
      seedData.forEach(item => {
        const ref = this.afs.collection("threats").doc(uuid());
        batch.set(ref.ref, item);
      });
      return batch.commit().then(data => {
        this.flashMessage.show("Data seeding complete.", {
          cssClass: "alert-success",
          timeout: 3000
        });
      });
    } catch (error) {
      console.log(error);
      this.flashMessage.show(error.message, {
        cssClass: "alert-danger",
        timeout: 5000
      });
    }
  }
}
