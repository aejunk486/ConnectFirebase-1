// src/data/peopleApi.js
import {db} from "../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs,
  writeBatch,
  doc,
} from "firebase/firestore";

/** ฟังข้อมูล people แบบเรียลไทม์ */
export function listenPeople(onChange, onError) {
  const col = collection(db, "people");
  const q = query(col);
  return onSnapshot(
    q,
    (snap) => onChange(snap.docs.map((d) => d.data())),
    (err) => onError?.(err)
  );
}

export async function readPeopleOnce() {
  const snap = await getDocs(collection(db, "people"));
  return snap.docs.map((d) => d.data());
}

/**
 * เติมข้อมูลตัวอย่าง
 */
export async function addPeople() {
  console.log("[addPeople] start");
  const batch = writeBatch(db);

  batch.set(doc(db, "people", "1"), {id: "1", name: "Alice"});
  batch.set(doc(db, "people", "2"), {id: "2", name: "Bob"});
  batch.set(doc(db, "people", "3"), {id: "3", name: "Charlie"});
  batch.set(doc(db, "people", "4"), {id: "4", name: "sasithorn"});
  batch.set(doc(db, "people", "5"), {id: "5", name: "Cat"});
  batch.set(doc(db, "people", "6"), {id: "6", name: "dog"});

  try {
    await batch.commit();
    console.log("[addPeople] commit OK");
  } catch (e) {
    console.error("[addPeople] commit ERROR:", e.code, e.message, e);
    throw e;
  }
}


