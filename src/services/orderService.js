import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export async function createOrder({
  userId,
  items,
  total,
  customer,
  paymentMethod = "cod",
}) {
  const ref = await addDoc(collection(db, "orders"), {
    userId,
    customer, // {name, phone, address, notes}
    items,
    total,
    paymentMethod,
    status: "pending",
    createdAt: serverTimestamp(),
  });

  return ref.id;
}

export async function getOrdersByUser(userId) {
  // Prefer server-side ordering; if index/createdAt missing, fall back to simple query.
  try {
    const q = query(
      collection(db, "orders"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const snap = await getDocs(q);
    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.warn("Fallback orders query (no orderBy):", err?.message || err);
    const q = query(collection(db, "orders"), where("userId", "==", userId));
    const snap = await getDocs(q);
    return snap.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .sort((a, b) => {
        const da = a.createdAt?.toDate ? a.createdAt.toDate() : a.createdAt;
        const dbb = b.createdAt?.toDate ? b.createdAt.toDate() : b.createdAt;
        return (dbb || 0) - (da || 0);
      });
  }
}

export async function getAllOrders() {
  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function updateOrderStatus(orderId, status) {
  const ref = doc(db, "orders", orderId);
  await updateDoc(ref, { status });
}

export async function deleteOrder(orderId) {
  const ref = doc(db, "orders", orderId);
  await deleteDoc(ref);
}
