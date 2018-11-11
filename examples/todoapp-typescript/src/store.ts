import { FirebaseFirestore } from "@firebase/firestore-types";
import firebase from "@firebase/app";
import "@firebase/firestore";
import { initFirestorter, Collection, Document } from "firestorter";
import { DocumentSource, IDocumentOptions } from "firestorter/lib/Types";
import { struct } from "superstruct";

const app = firebase.initializeApp({
	apiKey: "AIzaSyBiY-6xQrji8oe5E90d1P8J8OvfIo3F6kE",
	authDomain: "firestore-mobx-todo.firebaseapp.com",
	databaseURL: "https://firestore-mobx-todo.firebaseio.com",
	messagingSenderId: "680642766706",
	projectId: "firestore-mobx-todo",
	storageBucket: "firestore-mobx-todo.appspot.com"
});

const firestore: FirebaseFirestore = (app as any).firestore();
firestore.settings({ timestampsInSnapshots: true });

initFirestorter({ firebase });

class Todo extends Document {
	constructor(source: DocumentSource, options: IDocumentOptions) {
		super(source, {
			...(options || {}),
			schema: struct({
				finished: "boolean?",
				text: "string"
			})
		});
	}
}

const todos = new Collection("todos", {
	DocumentClass: Todo
});

export { todos };